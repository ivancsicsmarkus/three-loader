// -------------------------------------------------------------------------------------------------
// Loader for v1 Potree clouds whose `cloud.js` advertises `pointAttributes: "LAZ"` — i.e. each
// octree node is stored on disk as a self-contained LAZ file (`r.laz`, `r0.laz`, …).
// Mirrors `BinaryLoader` (uncompressed `.bin` per-node) so the rest of the v1 pipeline doesn't
// need to know how the bytes were decoded.
// -------------------------------------------------------------------------------------------------

import { Box3, BufferAttribute, BufferGeometry, Uint8BufferAttribute, Vector3 } from 'three';
import { PointCloudOctreeGeometryNode } from '../point-cloud-octree-geometry-node';
import { handleEmptyBuffer, handleFailedRequest } from '../utils/utils';
import { WorkerPool } from '../utils/worker-pool';
import { Version } from '../version';
import { GetUrlFn, XhrRequest } from './types';
import { IV1NodeLoader, V1NodeLoaderCallback } from './v1-node-loader';

interface AttributeBuffer {
  buffer: ArrayBuffer;
}

interface LazWorkerResponse {
  data: {
    numPoints: number;
    attributeBuffers: { [name: string]: AttributeBuffer };
    indices: ArrayBuffer;
    tightBoundingBox: { min: number[]; max: number[] };
    mean: number[];
    error?: string;
  };
}

interface LazNodeLoaderOptions {
  getUrl?: GetUrlFn;
  version: string | Version;
  boundingBox: Box3;
  xhrRequest: XhrRequest;
}

// PointAttributeName ordinals. Keep aligned with `src/point-attributes.ts` —
// the worker emits attribute buffers keyed by the numeric ordinal.
const ATTR_POSITION_CARTESIAN = 0;
const ATTR_COLOR_PACKED = 1;
const ATTR_INTENSITY = 6;
const ATTR_CLASSIFICATION = 7;

export class LazNodeLoader implements IV1NodeLoader {
  version: Version;
  boundingBox: Box3;
  getUrl: GetUrlFn;
  disposed: boolean = false;
  xhrRequest: XhrRequest;
  callbacks: V1NodeLoaderCallback[];

  // wasm instances inside laz-perf are memory-heavy (each one holds its own
  // ~2 MiB heap), so cap concurrency well below the binary decoder's 32.
  public static readonly WORKER_POOL = new WorkerPool(
    4,
    require('../workers/laz-decoder.worker.js').default,
  );

  constructor({
    getUrl = (s) => Promise.resolve(s),
    version,
    boundingBox,
    xhrRequest,
  }: LazNodeLoaderOptions) {
    this.version = typeof version === 'string' ? new Version(version) : version;
    this.boundingBox = boundingBox;
    this.getUrl = getUrl;
    this.xhrRequest = xhrRequest;
    this.callbacks = [];
  }

  dispose(): void {
    this.disposed = true;
  }

  load(node: PointCloudOctreeGeometryNode): Promise<void> {
    if (node.loaded || this.disposed) {
      return Promise.resolve();
    }

    return Promise.resolve(this.getUrl(this.getNodeUrl(node)))
      .then((url) => this.xhrRequest(url, { mode: 'cors' }))
      .then((res) => handleFailedRequest(res))
      .then((okRes) => okRes.arrayBuffer())
      .then((buffer) => handleEmptyBuffer(buffer))
      .then((okBuffer) => {
        if (this.disposed) {
          return;
        }
        return new Promise<void>((resolve, reject) => this.parse(node, okBuffer, resolve, reject));
      });
  }

  private getNodeUrl(node: PointCloudOctreeGeometryNode): string {
    return node.getUrl() + '.laz';
  }

  private parse(
    node: PointCloudOctreeGeometryNode,
    buffer: ArrayBuffer,
    resolve: () => void,
    reject: (reason: Error) => void,
  ): void {
    if (this.disposed) {
      resolve();
      return;
    }

    LazNodeLoader.WORKER_POOL.getWorker().then((autoTerminatingWorker) => {
      autoTerminatingWorker.worker.onmessage = (e: LazWorkerResponse) => {
        if (this.disposed) {
          resolve();
          LazNodeLoader.WORKER_POOL.releaseWorker(autoTerminatingWorker);
          return;
        }

        const data = e.data;
        if (data.error) {
          LazNodeLoader.WORKER_POOL.releaseWorker(autoTerminatingWorker);
          reject(new Error(`LAZ decode failed for node "${node.name}": ${data.error}`));
          return;
        }

        const geometry = (node.geometry = node.geometry || new BufferGeometry());
        geometry.boundingBox = node.boundingBox;

        this.addBufferAttributes(geometry, data.attributeBuffers);
        this.addIndices(geometry, data.indices);
        this.addNormalAttribute(geometry, data.numPoints);

        node.numPoints = data.numPoints;
        node.mean = new Vector3().fromArray(data.mean);
        node.tightBoundingBox = this.getTightBoundingBox(data.tightBoundingBox);
        node.loaded = true;
        node.loading = false;
        node.failed = false;
        node.pcoGeometry.numNodesLoading--;
        node.pcoGeometry.needsUpdate = true;

        this.callbacks.forEach((callback) => callback(node));
        resolve();
        LazNodeLoader.WORKER_POOL.releaseWorker(autoTerminatingWorker);
      };

      const message = {
        buffer,
        nodeMin: node.boundingBox.min.toArray(),
      };

      autoTerminatingWorker.worker.postMessage(message, [message.buffer]);
    });
  }

  private getTightBoundingBox({ min, max }: { min: number[]; max: number[] }): Box3 {
    const box = new Box3(new Vector3().fromArray(min), new Vector3().fromArray(max));
    box.max.sub(box.min);
    box.min.set(0, 0, 0);
    return box;
  }

  private addBufferAttributes(
    geometry: BufferGeometry,
    buffers: { [name: string]: AttributeBuffer },
  ): void {
    const position = buffers[ATTR_POSITION_CARTESIAN];
    if (position) {
      geometry.setAttribute('position', new BufferAttribute(new Float32Array(position.buffer), 3));
    }
    const color = buffers[ATTR_COLOR_PACKED];
    if (color) {
      geometry.setAttribute('color', new BufferAttribute(new Uint8Array(color.buffer), 3, true));
    }
    const intensity = buffers[ATTR_INTENSITY];
    if (intensity) {
      geometry.setAttribute(
        'intensity',
        new BufferAttribute(new Float32Array(intensity.buffer), 1),
      );
    }
    const classification = buffers[ATTR_CLASSIFICATION];
    if (classification) {
      geometry.setAttribute(
        'classification',
        new BufferAttribute(new Uint8Array(classification.buffer), 1),
      );
    }
  }

  private addIndices(geometry: BufferGeometry, indices: ArrayBuffer): void {
    const indicesAttribute = new Uint8BufferAttribute(indices, 4);
    indicesAttribute.normalized = true;
    geometry.setAttribute('indices', indicesAttribute);
  }

  private addNormalAttribute(geometry: BufferGeometry, numPoints: number): void {
    if (!geometry.getAttribute('normal')) {
      geometry.setAttribute('normal', new BufferAttribute(new Float32Array(numPoints * 3), 3));
    }
  }
}
