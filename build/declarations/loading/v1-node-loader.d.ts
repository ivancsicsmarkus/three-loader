import { PointCloudOctreeGeometryNode } from '../point-cloud-octree-geometry-node';
import { Version } from '../version';
import { GetUrlFn } from './types';
export type V1NodeLoaderCallback = (node: PointCloudOctreeGeometryNode) => void;
/**
 * Common interface implemented by every v1 node loader (currently
 * `BinaryLoader` for uncompressed `.bin` nodes and `LazNodeLoader` for
 * `pointAttributes: "LAZ"` clouds). `PointCloudOctreeGeometry` and
 * `PointCloudOctreeGeometryNode` only depend on this surface.
 */
export interface IV1NodeLoader {
  version: Version;
  getUrl: GetUrlFn;
  disposed: boolean;
  callbacks: V1NodeLoaderCallback[];
  load(node: PointCloudOctreeGeometryNode): Promise<void>;
  dispose(): void;
}
