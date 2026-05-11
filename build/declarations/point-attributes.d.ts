export declare enum PointAttributeName {
  POSITION_CARTESIAN = 0,
  COLOR_PACKED = 1,
  COLOR_FLOATS_1 = 2,
  COLOR_FLOATS_255 = 3,
  NORMAL_FLOATS = 4,
  FILLER = 5,
  INTENSITY = 6,
  CLASSIFICATION = 7,
  NORMAL_SPHEREMAPPED = 8,
  NORMAL_OCT16 = 9,
  NORMAL = 10,
}
export interface PointAttributeType {
  ordinal: number;
  size: number;
}
export declare const POINT_ATTRIBUTE_TYPES: Record<string, PointAttributeType>;
export interface IPointAttribute {
  name: PointAttributeName;
  type: PointAttributeType;
  numElements: number;
  byteSize: number;
}
export interface IPointAttributes {
  attributes: IPointAttribute[];
  byteSize: number;
  size: number;
}
export declare const POINT_ATTRIBUTES: {
  POSITION_CARTESIAN: IPointAttribute;
  RGBA_PACKED: IPointAttribute;
  COLOR_PACKED: IPointAttribute;
  RGB_PACKED: IPointAttribute;
  NORMAL_FLOATS: IPointAttribute;
  FILLER_1B: IPointAttribute;
  INTENSITY: IPointAttribute;
  CLASSIFICATION: IPointAttribute;
  NORMAL_SPHEREMAPPED: IPointAttribute;
  NORMAL_OCT16: IPointAttribute;
  NORMAL: IPointAttribute;
};
export type PointAttributeStringName = keyof typeof POINT_ATTRIBUTES;
export type CompressedPointFormat = 'LAZ' | 'LAS';
/**
 * Returns true when the cloud.js `pointAttributes` value indicates that each
 * node on disk is a self-contained LAZ file rather than a raw uncompressed
 * attribute stream.
 */
export declare function isLazAttributes(p: unknown): p is 'LAZ';
export declare class PointAttributes implements IPointAttributes {
  attributes: IPointAttribute[];
  byteSize: number;
  size: number;
  /**
   * Set when the source data is a stream of complete LAZ/LAS files (one per
   * node) instead of a flat list of uncompressed attributes. In that case
   * `attributes` is empty and `byteSize` is `0` — the per-node point count
   * comes from each LAZ file's own header, not from buffer length.
   */
  compressedFormat: CompressedPointFormat | null;
  constructor(pointAttributeNames?: PointAttributeStringName[] | CompressedPointFormat | string);
  add(pointAttribute: IPointAttribute): void;
  hasColors(): boolean;
  hasNormals(): boolean;
}
