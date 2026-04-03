import { DecodedGeometry, GeometryDecoder } from './geometry-decoder';
import { OctreeGeometryNode } from './octree-geometry-node';
import { LoadingContext, Metadata } from './octree-loader';
import { WorkerType } from './worker-pool';
export declare const HIERARCHY_FILE = 'hierarchy.bin';
export declare const OCTREE_FILE = 'octree.bin';
export declare class BrotliDecoder implements GeometryDecoder {
  metadata: Metadata;
  private context;
  readonly workerType = WorkerType.DECODER_WORKER_BROTLI;
  private _metadata;
  constructor(metadata: Metadata, context: LoadingContext);
  decode(node: OctreeGeometryNode, worker: Worker): Promise<DecodedGeometry>;
  private get getUrl();
  private get xhrRequest();
  private get octreePath();
  private readSuccessMessage;
}
