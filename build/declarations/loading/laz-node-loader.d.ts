import { Box3 } from 'three';
import { PointCloudOctreeGeometryNode } from '../point-cloud-octree-geometry-node';
import { WorkerPool } from '../utils/worker-pool';
import { Version } from '../version';
import { GetUrlFn, XhrRequest } from './types';
import { IV1NodeLoader, V1NodeLoaderCallback } from './v1-node-loader';
interface LazNodeLoaderOptions {
  getUrl?: GetUrlFn;
  version: string | Version;
  boundingBox: Box3;
  xhrRequest: XhrRequest;
}
export declare class LazNodeLoader implements IV1NodeLoader {
  version: Version;
  boundingBox: Box3;
  getUrl: GetUrlFn;
  disposed: boolean;
  xhrRequest: XhrRequest;
  callbacks: V1NodeLoaderCallback[];
  static readonly WORKER_POOL: WorkerPool;
  constructor({ getUrl, version, boundingBox, xhrRequest }: LazNodeLoaderOptions);
  dispose(): void;
  load(node: PointCloudOctreeGeometryNode): Promise<void>;
  private getNodeUrl;
  private parse;
  private getTightBoundingBox;
  private addBufferAttributes;
  private addIndices;
  private addNormalAttribute;
}
export {};
