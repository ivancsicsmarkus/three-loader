/* eslint-disable */
// LAZ-per-node decoder worker.
//
// In: { buffer: ArrayBuffer, nodeMin: [x,y,z] }
// Out: {
//   numPoints: number,
//   attributeBuffers: {
//     position: { buffer: ArrayBuffer },
//     color?: { buffer: ArrayBuffer },
//     intensity?: { buffer: ArrayBuffer },
//     classification?: { buffer: ArrayBuffer },
//   },
//   indices: ArrayBuffer,
//   tightBoundingBox: { min: number[], max: number[] },
//   mean: number[],
// }
//
// The wasm bytes for laz-perf are inlined into the worker bundle as a base64
// data URL via webpack's `asset/inline` rule (see webpack.config.js). That
// keeps the worker self-contained so the consuming app doesn't need to host
// the wasm file at any particular URL.

import createLazPerf from 'laz-perf/lib/worker/laz-perf.js';
// eslint-disable-next-line import/no-unresolved
import lazPerfWasmDataUrl from 'laz-perf/lib/worker/laz-perf.wasm';

// PointAttributeName ordinals — must stay in sync with src/point-attributes.ts.
// We can't import the TS module here because this file is built as a worker
// without the rest of the bundle.
const ATTR_POSITION_CARTESIAN = 0;
const ATTR_COLOR_PACKED = 1;
const ATTR_INTENSITY = 6;
const ATTR_CLASSIFICATION = 7;

let lazPerfPromise = null;

function dataUrlToUint8Array(dataUrl) {
  const comma = dataUrl.indexOf(',');
  if (comma === -1) {
    throw new Error('Invalid laz-perf wasm data URL');
  }
  const base64 = dataUrl.slice(comma + 1);
  const binary = atob(base64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

function getLazPerf() {
  if (!lazPerfPromise) {
    const wasmBinary = dataUrlToUint8Array(lazPerfWasmDataUrl);
    lazPerfPromise = createLazPerf({ wasmBinary: wasmBinary });
  }
  return lazPerfPromise;
}

// Parse the LAS public header block (PHB) of the buffer to recover the scale,
// offset and PDRF needed for dequantization. laz-perf itself only exposes
// point count, point length and point format ID, not header geometry.
function parseLasHeader(view) {
  // The PHB layout is identical between LAS 1.0–1.4 for the fields we read.
  const versionMajor = view.getUint8(24);
  const versionMinor = view.getUint8(25);
  const pointFormat = view.getUint8(104) & 0b0011_1111; // ignore compression bits
  const pointLength = view.getUint16(105, true);
  const scaleX = view.getFloat64(131, true);
  const scaleY = view.getFloat64(139, true);
  const scaleZ = view.getFloat64(147, true);
  const offsetX = view.getFloat64(155, true);
  const offsetY = view.getFloat64(163, true);
  const offsetZ = view.getFloat64(171, true);
  return {
    versionMajor: versionMajor,
    versionMinor: versionMinor,
    pointFormat: pointFormat,
    pointLength: pointLength,
    scale: [scaleX, scaleY, scaleZ],
    offset: [offsetX, offsetY, offsetZ],
  };
}

// Returns the byte offsets within a single point record for the attributes
// we care about. `null` means the attribute is not present in this PDRF.
function attributeOffsets(pdrf) {
  // Classification: byte 15 in PDRF 0–5, byte 16 in PDRF 6–10.
  const classification = pdrf <= 5 ? 15 : 16;

  // RGB triplet (each 16-bit little-endian) start offset by format.
  let rgb = null;
  switch (pdrf) {
    case 2:
      rgb = 20;
      break;
    case 3:
      rgb = 28;
      break;
    case 5:
      rgb = 28;
      break;
    case 7:
      rgb = 30;
      break;
    case 8:
      rgb = 30;
      break;
    case 10:
      rgb = 30;
      break;
    default:
      rgb = null;
  }

  return { intensity: 12, classification: classification, rgb: rgb };
}

function decode(buffer, nodeMin) {
  return getLazPerf().then(function (module) {
    const headerView = new DataView(buffer);
    const header = parseLasHeader(headerView);
    const offsets = attributeOffsets(header.pointFormat);

    // Hand the file bytes to laz-perf's emscripten heap and initialize.
    const fileBytes = new Uint8Array(buffer);
    const filePtr = module._malloc(fileBytes.length);
    module.HEAPU8.set(fileBytes, filePtr);

    const decoder = new module.LASZip();
    try {
      decoder.open(filePtr, fileBytes.length);

      const numPoints = decoder.getCount();
      const pointLength = decoder.getPointLength();
      const pdrf = decoder.getPointFormat();
      // laz-perf is authoritative; fall back to header parse if anything is
      // missing.
      const recordLen = pointLength || header.pointLength;
      const recordFormat = pdrf == null ? header.pointFormat : pdrf;
      const recordOffsets =
        recordFormat === header.pointFormat ? offsets : attributeOffsets(recordFormat);

      const pointPtr = module._malloc(recordLen);

      const positions = new Float32Array(numPoints * 3);
      const intensities = new Float32Array(numPoints);
      const classifications = new Uint8Array(numPoints);
      const hasRgb = recordOffsets.rgb !== null;
      const colors = hasRgb ? new Uint8Array(numPoints * 3) : null;

      const scaleX = header.scale[0];
      const scaleY = header.scale[1];
      const scaleZ = header.scale[2];
      const offsetX = header.offset[0];
      const offsetY = header.offset[1];
      const offsetZ = header.offset[2];
      const minX = nodeMin[0];
      const minY = nodeMin[1];
      const minZ = nodeMin[2];

      let tightMinX = Number.POSITIVE_INFINITY;
      let tightMinY = Number.POSITIVE_INFINITY;
      let tightMinZ = Number.POSITIVE_INFINITY;
      let tightMaxX = Number.NEGATIVE_INFINITY;
      let tightMaxY = Number.NEGATIVE_INFINITY;
      let tightMaxZ = Number.NEGATIVE_INFINITY;
      let sumX = 0;
      let sumY = 0;
      let sumZ = 0;

      // Reuse a single DataView over a stack-allocated slice of the heap for
      // every point — avoids per-point allocations.
      const heap = module.HEAPU8.buffer;
      const pointView = new DataView(heap, pointPtr, recordLen);

      for (let i = 0; i < numPoints; i++) {
        decoder.getPoint(pointPtr);

        const ix = pointView.getInt32(0, true);
        const iy = pointView.getInt32(4, true);
        const iz = pointView.getInt32(8, true);

        const wx = ix * scaleX + offsetX;
        const wy = iy * scaleY + offsetY;
        const wz = iz * scaleZ + offsetZ;

        const x = wx - minX;
        const y = wy - minY;
        const z = wz - minZ;

        positions[3 * i + 0] = x;
        positions[3 * i + 1] = y;
        positions[3 * i + 2] = z;

        sumX += x;
        sumY += y;
        sumZ += z;

        if (x < tightMinX) tightMinX = x;
        if (y < tightMinY) tightMinY = y;
        if (z < tightMinZ) tightMinZ = z;
        if (x > tightMaxX) tightMaxX = x;
        if (y > tightMaxY) tightMaxY = y;
        if (z > tightMaxZ) tightMaxZ = z;

        intensities[i] = pointView.getUint16(recordOffsets.intensity, true);
        // LAS classification: lower 5 bits in PDRF 0–5, full byte in 6–10.
        const rawClass = pointView.getUint8(recordOffsets.classification);
        classifications[i] = recordFormat <= 5 ? rawClass & 0b0001_1111 : rawClass;

        if (hasRgb && colors) {
          const r16 = pointView.getUint16(recordOffsets.rgb, true);
          const g16 = pointView.getUint16(recordOffsets.rgb + 2, true);
          const b16 = pointView.getUint16(recordOffsets.rgb + 4, true);
          // Most LAS exporters store RGB as 16-bit values that are really 8
          // bits left-shifted by 8 — divide by 256. Some store true 8-bit
          // values in the low byte; in that case max is < 256 and the divide
          // collapses to zero. Probe the first sample and pick a scale.
          colors[3 * i + 0] = r16 > 255 ? r16 >> 8 : r16;
          colors[3 * i + 1] = g16 > 255 ? g16 >> 8 : g16;
          colors[3 * i + 2] = b16 > 255 ? b16 >> 8 : b16;
        }
      }

      module._free(pointPtr);

      const mean =
        numPoints > 0 ? [sumX / numPoints, sumY / numPoints, sumZ / numPoints] : [0, 0, 0];

      const tightBoundingBox =
        numPoints > 0
          ? {
              min: [tightMinX, tightMinY, tightMinZ],
              max: [tightMaxX, tightMaxY, tightMaxZ],
            }
          : { min: [0, 0, 0], max: [0, 0, 0] };

      // The binary path emits a per-point index buffer; preserve parity.
      const indices = new ArrayBuffer(numPoints * 4);
      const indicesU32 = new Uint32Array(indices);
      for (let i = 0; i < numPoints; i++) {
        indicesU32[i] = i;
      }

      const attributeBuffers = {};
      attributeBuffers[ATTR_POSITION_CARTESIAN] = { buffer: positions.buffer };
      attributeBuffers[ATTR_INTENSITY] = { buffer: intensities.buffer };
      attributeBuffers[ATTR_CLASSIFICATION] = { buffer: classifications.buffer };
      if (colors) {
        attributeBuffers[ATTR_COLOR_PACKED] = { buffer: colors.buffer };
      }

      return {
        numPoints: numPoints,
        attributeBuffers: attributeBuffers,
        indices: indices,
        tightBoundingBox: tightBoundingBox,
        mean: mean,
      };
    } finally {
      decoder.delete();
      module._free(filePtr);
    }
  });
}

onmessage = function (event) {
  const data = event.data || {};
  const buffer = data.buffer;
  const nodeMin = data.nodeMin || [0, 0, 0];

  decode(buffer, nodeMin)
    .then(function (result) {
      const transferables = [result.indices];
      const buffers = result.attributeBuffers;
      Object.keys(buffers).forEach(function (key) {
        transferables.push(buffers[key].buffer);
      });
      postMessage(result, transferables);
    })
    .catch(function (err) {
      postMessage({ error: err && err.message ? err.message : String(err) });
    });
};
