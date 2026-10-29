import {
  BufferGeometry,
  Camera,
  Color,
  Material,
  RawShaderMaterial,
  Scene,
  Texture,
  Vector3,
  Vector4,
  WebGLRenderer,
} from 'three';
import { PointCloudOctree } from '../point-cloud-octree';
import { PointCloudOctreeNode } from '../point-cloud-octree-node';
import { ClipMode, IClipBox } from './clipping';
import {
  PointCloudMixingMode,
  PointColorType,
  PointOpacityType,
  PointShape,
  PointSizeType,
  TreeType,
} from './enums';
import { IClassification, IGradient, IUniform } from './types';
export interface IPointCloudMaterialParameters {
  size: number;
  minSize: number;
  maxSize: number;
  treeType: TreeType;
  colorRgba: boolean;
}
export interface IPointCloudMaterialUniforms {
  bbSize: IUniform<[number, number, number]>;
  blendDepthSupplement: IUniform<number>;
  blendHardness: IUniform<number>;
  classificationLUT: IUniform<Texture>;
  clipBoxCount: IUniform<number>;
  clipBoxes: IUniform<Float32Array>;
  clipExtent: IUniform<[number, number, number, number]>;
  depthMap: IUniform<Texture | null>;
  diffuse: IUniform<[number, number, number]>;
  fov: IUniform<number>;
  gradient: IUniform<Texture>;
  heightMax: IUniform<number>;
  heightMin: IUniform<number>;
  intensityBrightness: IUniform<number>;
  intensityContrast: IUniform<number>;
  intensityGamma: IUniform<number>;
  intensityRange: IUniform<[number, number]>;
  level: IUniform<number>;
  maxSize: IUniform<number>;
  minSize: IUniform<number>;
  octreeSize: IUniform<number>;
  opacity: IUniform<number>;
  pcIndex: IUniform<number>;
  rgbBrightness: IUniform<number>;
  rgbContrast: IUniform<number>;
  rgbGamma: IUniform<number>;
  screenHeight: IUniform<number>;
  screenWidth: IUniform<number>;
  size: IUniform<number>;
  spacing: IUniform<number>;
  toModel: IUniform<number[]>;
  transition: IUniform<number>;
  uColor: IUniform<Color>;
  visibleNodes: IUniform<Texture>;
  vnStart: IUniform<number>;
  wClassification: IUniform<number>;
  wElevation: IUniform<number>;
  wIntensity: IUniform<number>;
  wReturnNumber: IUniform<number>;
  wRGB: IUniform<number>;
  wSourceID: IUniform<number>;
  opacityAttenuation: IUniform<number>;
  filterByNormalThreshold: IUniform<number>;
  classificationFilter: IUniform<boolean[]>;
  highlightedPointCoordinate: IUniform<Vector3>;
  highlightedPointColor: IUniform<Vector4>;
  enablePointHighlighting: IUniform<boolean>;
  highlightedPointScale: IUniform<number>;
  normalFilteringMode: IUniform<number>;
  backgroundMap: IUniform<Texture | null>;
  pointCloudID: IUniform<number>;
  pointCloudMixAngle: IUniform<number>;
  stripeDistanceX: IUniform<number>;
  stripeDistanceY: IUniform<number>;
  stripeDivisorX: IUniform<number>;
  stripeDivisorY: IUniform<number>;
  pointCloudMixingMode: IUniform<number>;
  renderDepth: IUniform<boolean>;
  customScalarRange: IUniform<[number, number]>;
  customScalarClassColors: IUniform<Vector4[]>;
  customScalarRgbBelow: IUniform<[number, number]>;
}
/** SKYGIS FORK: size of the `customScalarClassColors` uniform array (pointcloud.vert). */
export declare const CUSTOM_SCALAR_CLASS_SLOTS = 4;
export declare class PointCloudMaterial extends RawShaderMaterial {
  private static helperVec3;
  private static helperVec2;
  /**
   * Use the drawing buffer size instead of the dom client width and height when passing the screen height and screen width uniforms to the
   * shader. This is useful if you have offscreen canvases (which in some browsers return 0 as client width and client height).
   */
  useDrawingBufferSize: boolean;
  lights: boolean;
  fog: boolean;
  colorRgba: boolean;
  numClipBoxes: number;
  clipBoxes: IClipBox[];
  visibleNodesTexture: Texture | undefined;
  visibleNodeTextureOffsets: Map<string, number>;
  private _gradient;
  private gradientTexture;
  private _classification;
  private classificationTexture;
  uniforms: IPointCloudMaterialUniforms & Record<string, IUniform<any>>;
  bbSize: [number, number, number];
  clipExtent: [number, number, number, number];
  depthMap: Texture | undefined;
  fov: number;
  heightMax: number;
  heightMin: number;
  intensityBrightness: number;
  intensityContrast: number;
  intensityGamma: number;
  intensityRange: [number, number];
  maxSize: number;
  minSize: number;
  octreeSize: number;
  opacity: number;
  rgbBrightness: number;
  rgbContrast: number;
  rgbGamma: number;
  screenHeight: number;
  screenWidth: number;
  size: number;
  spacing: number;
  transition: number;
  color: Color;
  weightClassification: number;
  weightElevation: number;
  weightIntensity: number;
  weightReturnNumber: number;
  weightRGB: number;
  weightSourceID: number;
  opacityAttenuation: number;
  filterByNormalThreshold: number;
  classificationFilter: boolean[];
  highlightedPointCoordinate: Vector3;
  highlightedPointColor: Vector4;
  enablePointHighlighting: boolean;
  highlightedPointScale: number;
  normalFilteringMode: number;
  backgroundMap: Texture | undefined;
  pointCloudID: number;
  pointCloudMixingMode: number;
  stripeDistanceX: number;
  stripeDistanceY: number;
  stripeDivisorX: number;
  stripeDivisorY: number;
  pointCloudMixAngle: number;
  renderDepth: boolean;
  customScalarRange: [number, number];
  /**
   * SKYGIS FORK (see SKYGIS.md) — not in upstream pnext/three-loader.
   *
   * Classes drawn in a fixed colour instead of the custom-scalar gradient, as
   * `{ [classification]: Color }`, at most `CUSTOM_SCALAR_CLASS_SLOTS` entries.
   * Only read under `PointColorType.CUSTOM_SCALAR`. Uniform-only: setting it
   * never recompiles the shader.
   */
  get customScalarClassColors(): Record<number, Color>;
  set customScalarClassColors(colors: Record<number, Color>);
  /**
   * SKYGIS FORK (see SKYGIS.md) — not in upstream pnext/three-loader.
   *
   * Under `PointColorType.CUSTOM_SCALAR`, a point whose scalar is at or below
   * this value (or is not a number) is drawn in its own RGB instead of the
   * gradient. `null` (the default) turns it off. Classes in
   * `customScalarClassColors` still win. Uniform-only: setting it never
   * recompiles the shader. A cloud without RGB reads black there.
   */
  get customScalarRgbBelow(): number | null;
  set customScalarRgbBelow(value: number | null);
  useClipBox: boolean;
  weighted: boolean;
  pointColorType: PointColorType;
  pointSizeType: PointSizeType;
  clipMode: ClipMode;
  useEDL: boolean;
  shape: PointShape;
  treeType: TreeType;
  pointOpacityType: PointOpacityType;
  useFilterByNormal: boolean;
  useFilterByClassification: boolean;
  useTextureBlending: boolean;
  usePointCloudMixing: boolean;
  highlightPoint: boolean;
  customAttributeName: string;
  attributes: {
    position: {
      type: string;
      value: never[];
    };
    color: {
      type: string;
      value: never[];
    };
    normal: {
      type: string;
      value: never[];
    };
    intensity: {
      type: string;
      value: never[];
    };
    classification: {
      type: string;
      value: never[];
    };
    returnNumber: {
      type: string;
      value: never[];
    };
    numberOfReturns: {
      type: string;
      value: never[];
    };
    pointSourceID: {
      type: string;
      value: never[];
    };
    indices: {
      type: string;
      value: never[];
    };
  };
  constructor(parameters?: Partial<IPointCloudMaterialParameters>);
  dispose(): void;
  clearVisibleNodeTextureOffsets(): void;
  updateShaderSource(): void;
  applyDefines(shaderSrc: string): string;
  setPointCloudMixingMode(mode: PointCloudMixingMode): void;
  getPointCloudMixingMode(): PointCloudMixingMode;
  setClipBoxes(clipBoxes: IClipBox[]): void;
  get gradient(): IGradient;
  set gradient(value: IGradient);
  get classification(): IClassification;
  set classification(value: IClassification);
  private recomputeClassification;
  get elevationRange(): [number, number];
  set elevationRange(value: [number, number]);
  getUniform<K extends keyof IPointCloudMaterialUniforms>(
    name: K,
  ): IPointCloudMaterialUniforms[K]['value'];
  setUniform<K extends keyof IPointCloudMaterialUniforms>(
    name: K,
    value: IPointCloudMaterialUniforms[K]['value'],
  ): void;
  updateMaterial(
    octree: PointCloudOctree,
    visibleNodes: PointCloudOctreeNode[],
    camera: Camera,
    renderer: WebGLRenderer,
  ): void;
  private updateVisibilityTextureData;
  static makeOnBeforeRender(
    octree: PointCloudOctree,
    node: PointCloudOctreeNode,
    pcIndex?: number,
  ): (
    _renderer: WebGLRenderer,
    _scene: Scene,
    _camera: Camera,
    _geometry: BufferGeometry,
    material: Material,
  ) => void;
}
