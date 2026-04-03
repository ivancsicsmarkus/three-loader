!(function (t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e(require('three')))
    : 'function' == typeof define && define.amd
      ? define('potree', ['three'], e)
      : 'object' == typeof exports
        ? (exports.potree = e(require('three')))
        : (t.potree = e(t.three));
})(self, (t) =>
  (() => {
    'use strict';
    var e = {
        539(t, e, n) {
          (n.r(e), n.d(e, { default: () => i }));
          const i =
            'precision highp float;\nprecision highp int;\n\nuniform mat4 projectionMatrix;\n\nuniform float screenWidth;\nuniform float screenHeight;\n\nuniform sampler2D map;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n\tfloat dx = 1.0 / screenWidth;\n\tfloat dy = 1.0 / screenHeight;\n\n\tvec3 color = vec3(0.0, 0.0, 0.0);\n\tcolor += texture2D(map, vUv + vec2(-dx, -dy)).rgb;\n\tcolor += texture2D(map, vUv + vec2(  0, -dy)).rgb;\n\tcolor += texture2D(map, vUv + vec2(+dx, -dy)).rgb;\n\tcolor += texture2D(map, vUv + vec2(-dx,   0)).rgb;\n\tcolor += texture2D(map, vUv + vec2(  0,   0)).rgb;\n\tcolor += texture2D(map, vUv + vec2(+dx,   0)).rgb;\n\tcolor += texture2D(map, vUv + vec2(-dx,  dy)).rgb;\n\tcolor += texture2D(map, vUv + vec2(  0,  dy)).rgb;\n\tcolor += texture2D(map, vUv + vec2(+dx,  dy)).rgb;\n    \n\tcolor = color / 9.0;\n\t\n\tgl_FragColor = vec4(color, 1.0);\n\t\n\t\n}';
        },
        850(t, e, n) {
          (n.r(e), n.d(e, { default: () => i }));
          const i =
            'precision highp float;\nprecision highp int;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n\n    gl_Position =   projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}';
        },
        61(t, e, n) {
          n.d(e, { A: () => i });
          const i =
            'precision highp float;\nprecision highp int;\n\nuniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n\nuniform mat4 projectionMatrix;\nuniform float opacity;\n\nuniform float blendHardness;\nuniform float blendDepthSupplement;\nuniform float fov;\nuniform float spacing;\nuniform float pcIndex;\nuniform float screenWidth;\nuniform float screenHeight;\n\nuniform sampler2D depthMap;\n\n#if defined (clip_horizontally) || defined (clip_vertically)\n\tuniform vec4 clipExtent;\n#endif\n\n#ifdef use_texture_blending\n\tuniform sampler2D backgroundMap;\n#endif\n\n\n#ifdef use_point_cloud_mixing\n\tuniform int pointCloudMixingMode;\n\tuniform float pointCloudID;\n\tuniform float pointCloudMixAngle;\n\tuniform float stripeDistanceX;\n\tuniform float stripeDistanceY;\n\n\tuniform float stripeDivisorX;\n\tuniform float stripeDivisorY;\n#endif\n\n#ifdef highlight_point\n\tuniform vec4 highlightedPointColor;\n#endif\n\nin vec3 vColor;\n\n#if !defined(color_type_point_index)\n\tin float vOpacity;\n#endif\n\n#if defined(weighted_splats)\n\tin float vLinearDepth;\n#endif\n\n#if !defined(paraboloid_point_shape) && defined(use_edl)\n\tin float vLogDepth;\n#endif\n\n#if defined(color_type_phong) && (MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0) || defined(paraboloid_point_shape)\n\tin vec3 vViewPosition;\n#endif\n\n#if defined(weighted_splats) || defined(paraboloid_point_shape)\n\tin float vRadius;\n#endif\n\n#if defined(color_type_phong) && (MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0)\n\tin vec3 vNormal;\n#endif\n\n#ifdef highlight_point\n\tin float vHighlight;\n#endif\n\nout vec4 outFragColor;\n\nfloat specularStrength = 1.0;\n\nvoid main() {\n\tvec3 color = vColor;\n\tfloat depth = gl_FragCoord.z;\n\n\t#if defined (clip_horizontally) || defined (clip_vertically)\n\tvec2 ndc = vec2((gl_FragCoord.x / screenWidth), 1.0 - (gl_FragCoord.y / screenHeight));\n\n\tif(step(clipExtent.x, ndc.x) * step(ndc.x, clipExtent.z) < 1.0)\n\t{\n\t\tdiscard;\n\t}\n\n\tif(step(clipExtent.y, ndc.y) * step(ndc.y, clipExtent.w) < 1.0)\n\t{\n\t\tdiscard;\n\t}\n\t#endif  \n\n\t#if defined(circle_point_shape) || defined(paraboloid_point_shape) || defined (weighted_splats)\n\t\tfloat u = 2.0 * gl_PointCoord.x - 1.0;\n\t\tfloat v = 2.0 * gl_PointCoord.y - 1.0;\n\t#endif\n\n\t#if defined(circle_point_shape) || defined (weighted_splats)\n\t\tfloat cc = u*u + v*v;\n\t\tif(cc > 1.0){\n\t\t\tdiscard;\n\t\t}\n\t#endif\n\n\t#if defined weighted_splats\n\t\tvec2 uv = gl_FragCoord.xy / vec2(screenWidth, screenHeight);\n\t\tfloat sDepth = texture(depthMap, uv).r;\n\t\tif(vLinearDepth > sDepth + vRadius + blendDepthSupplement){\n\t\t\tdiscard;\n\t\t}\n\t#endif\n\n\t#if defined color_type_point_index\n\t\toutFragColor = vec4(color, pcIndex / 255.0);\n\t#else\n\t\toutFragColor = vec4(color, vOpacity);\n\t#endif\n\n\t#ifdef use_point_cloud_mixing\n\t\tbool discardFragment = false;\n\n\t\tif (pointCloudMixingMode == 1) {  // Checkboard\n\t\t\tfloat vPointCloudID = pointCloudID > 10. ? pointCloudID/10.: pointCloudID;\n\t\t\tdiscardFragment = mod(gl_FragCoord.x, vPointCloudID) > 0.5 && mod(gl_FragCoord.y, vPointCloudID) > 0.5;\n\t\t}\n\t\telse if (pointCloudMixingMode == 2) {  // Stripes\n\t\t\tfloat angle = pointCloudMixAngle * pointCloudID / 180.;\n\t\t\tfloat u = cos(angle) * gl_FragCoord.x + sin(angle) * gl_FragCoord.y;\n\t\t\tfloat v = -sin(angle) * gl_FragCoord.x + cos(angle) * gl_FragCoord.y;\n\n\t\t\tdiscardFragment = mod(u, stripeDistanceX) >= stripeDistanceX/stripeDivisorX && mod(v, stripeDistanceY) >= stripeDistanceY/stripeDivisorY;\n\t\t}\n\t\tif (discardFragment) {\n\t\t\tdiscard;\n\t\t}\n\t#endif\n\n\t#ifdef use_texture_blending\n\t\tvec2 vUv = gl_FragCoord.xy / vec2(screenWidth, screenHeight);\n\n\t\tvec4 tColor = texture(backgroundMap, vUv);\n\t\toutFragColor = vec4(vOpacity * color, 1.) + vec4((1. - vOpacity) * tColor.rgb, 0.);\n\t#endif\n\n\t#if defined(color_type_phong)\n\t\t#if MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0\n\t\t\tvec3 normal = normalize( vNormal );\n\t\t\tnormal.z = abs(normal.z);\n\n\t\t\tvec3 viewPosition = normalize( vViewPosition );\n\t\t#endif\n\n\t\t// code taken from three.js phong light fragment shader\n\n\t\t#if MAX_POINT_LIGHTS > 0\n\n\t\t\tvec3 pointDiffuse = vec3( 0.0 );\n\t\t\tvec3 pointSpecular = vec3( 0.0 );\n\n\t\t\tfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n\t\t\t\tvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n\t\t\t\tvec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n\t\t\t\tfloat lDistance = 1.0;\n\t\t\t\tif ( pointLightDistance[ i ] > 0.0 )\n\t\t\t\t\tlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n\n\t\t\t\tlVector = normalize( lVector );\n\n\t\t\t\t\t\t// diffuse\n\n\t\t\t\tfloat dotProduct = dot( normal, lVector );\n\n\t\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\t\tfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\t\t\tfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\t\t\tvec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n\t\t\t\t#else\n\n\t\t\t\t\tfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t\t\t#endif\n\n\t\t\t\tpointDiffuse += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\n\n\t\t\t\t// specular\n\n\t\t\t\tvec3 pointHalfVector = normalize( lVector + viewPosition );\n\t\t\t\tfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n\t\t\t\tfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n\t\t\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\t\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n\t\t\t\tpointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n\t\t\t\tpointSpecular = vec3(0.0, 0.0, 0.0);\n\t\t\t}\n\n\t\t#endif\n\n\t\t#if MAX_DIR_LIGHTS > 0\n\n\t\t\tvec3 dirDiffuse = vec3( 0.0 );\n\t\t\tvec3 dirSpecular = vec3( 0.0 );\n\n\t\t\tfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n\t\t\t\tvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n\t\t\t\tvec3 dirVector = normalize( lDirection.xyz );\n\n\t\t\t\t\t\t// diffuse\n\n\t\t\t\tfloat dotProduct = dot( normal, dirVector );\n\n\t\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\t\tfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\t\t\tfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\t\t\tvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n\t\t\t\t#else\n\n\t\t\t\t\tfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t\t\t#endif\n\n\t\t\t\tdirDiffuse += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\n\n\t\t\t\t// specular\n\n\t\t\t\tvec3 dirHalfVector = normalize( dirVector + viewPosition );\n\t\t\t\tfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n\t\t\t\tfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n\t\t\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\t\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n\t\t\t\tdirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\t\t\t}\n\n\t\t#endif\n\n\t\tvec3 totalDiffuse = vec3( 0.0 );\n\t\tvec3 totalSpecular = vec3( 0.0 );\n\n\t\t#if MAX_POINT_LIGHTS > 0\n\n\t\t\ttotalDiffuse += pointDiffuse;\n\t\t\ttotalSpecular += pointSpecular;\n\n\t\t#endif\n\n\t\t#if MAX_DIR_LIGHTS > 0\n\n\t\t\ttotalDiffuse += dirDiffuse;\n\t\t\ttotalSpecular += dirSpecular;\n\n\t\t#endif\n\n\t\toutFragColor.xyz = outFragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n\n\t#endif\n\n\t#if defined weighted_splats\n\t    //float w = pow(1.0 - (u*u + v*v), blendHardness);\n\n\t\tfloat wx = 2.0 * length(2.0 * gl_PointCoord - 1.0);\n\t\tfloat w = exp(-wx * wx * 0.5);\n\n\t\t//float distance = length(2.0 * gl_PointCoord - 1.0);\n\t\t//float w = exp( -(distance * distance) / blendHardness);\n\n\t\toutFragColor.rgb = outFragColor.rgb * w;\n\t\toutFragColor.a = w;\n\t#endif\n\n\t#if defined paraboloid_point_shape\n\t\tfloat wi = 0.0 - ( u*u + v*v);\n\t\tvec4 pos = vec4(vViewPosition, 1.0);\n\t\tpos.z += wi * vRadius;\n\t\tfloat linearDepth = -pos.z;\n\t\tpos = projectionMatrix * pos;\n\t\tpos = pos / pos.w;\n\t\tfloat expDepth = pos.z;\n\t\tdepth = (pos.z + 1.0) / 2.0;\n\t\tgl_FragDepth = depth;\n\n\t\t#if defined(color_type_depth)\n\t\t\toutFragColor.r = linearDepth;\n\t\t\toutFragColor.g = expDepth;\n\t\t#endif\n\n\t\t#if defined(use_edl)\n\t\t\toutFragColor.a = log2(linearDepth);\n\t\t#endif\n\n\t#else\n\t\t#if defined(use_edl)\n\t\t\toutFragColor.a = vLogDepth;\n\t\t#endif\n\t#endif\n\n\t#ifdef highlight_point\n\t\tif (vHighlight > 0.0) {\n\t\t\toutFragColor = highlightedPointColor;\n\t\t}\n\t#endif\n}\n';
        },
        600(t, e, n) {
          n.d(e, { A: () => i });
          const i =
            'precision highp float;\nprecision highp int;\n\n#define max_clip_boxes 30\n\nin vec3 position;\nin vec3 color;\n\n#ifdef color_rgba\n\tin vec4 rgba;\n#endif\n\nin vec3 normal;\nin float intensity;\nin float classification;\nin float returnNumber;\nin float numberOfReturns;\nin float pointSourceID;\nin vec4 indices;\nin vec2 uv;\n\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\n\nuniform float pcIndex;\n\nuniform float screenWidth;\nuniform float screenHeight;\nuniform float fov;\nuniform float spacing;\n\n#if defined use_clip_box\n\tuniform mat4 clipBoxes[max_clip_boxes];\n#endif\n\nuniform float heightMin;\nuniform float heightMax;\nuniform float size; // pixel size factor\nuniform float minSize; // minimum pixel size\nuniform float maxSize; // maximum pixel size\nuniform float octreeSize;\nuniform vec3 bbSize;\nuniform vec3 uColor;\nuniform float opacity;\nuniform float clipBoxCount;\nuniform float level;\nuniform float vnStart;\nuniform bool isLeafNode;\n\nuniform float filterByNormalThreshold;\nuniform vec2 intensityRange;\nuniform float opacityAttenuation;\nuniform float intensityGamma;\nuniform float intensityContrast;\nuniform float intensityBrightness;\nuniform float rgbGamma;\nuniform float rgbContrast;\nuniform float rgbBrightness;\nuniform float transition;\nuniform float wRGB;\nuniform float wIntensity;\nuniform float wElevation;\nuniform float wClassification;\nuniform float wReturnNumber;\nuniform float wSourceID;\n\nuniform bool renderDepth;\n\nuniform sampler2D visibleNodes;\nuniform sampler2D gradient;\nuniform sampler2D classificationLUT;\nuniform sampler2D depthMap;\n\n#ifdef use_texture_blending\n\tuniform sampler2D backgroundMap;\n#endif\n\n#ifdef use_point_cloud_mixing\n\tuniform int pointCloudMixingMode;\n\tuniform float pointCloudID;\n\n\tuniform float pointCloudMixAngle;\n\tuniform float stripeDistanceX;\n\tuniform float stripeDistanceY;\n\n\tuniform float stripeDivisorX;\n\tuniform float stripeDivisorY;\n#endif\n\n#ifdef highlight_point\n\tuniform vec3 highlightedPointCoordinate;\n\tuniform bool enablePointHighlighting;\n\tuniform float highlightedPointScale;\n#endif\n\n#ifdef use_filter_by_normal\n\tuniform int normalFilteringMode;\n#endif\n\n#ifdef use_filter_by_classification\n\tuniform bool classificationFilter[256];\n#endif\n\nout vec3 vColor;\n\n#if !defined(color_type_point_index)\n\tout float vOpacity;\n#endif\n\n#if defined(weighted_splats)\n\tout float vLinearDepth;\n#endif\n\n#if !defined(paraboloid_point_shape) && defined(use_edl)\n\tout float vLogDepth;\n#endif\n\n#if defined(color_type_phong) && (MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0) || defined(paraboloid_point_shape)\n\tout vec3 vViewPosition;\n#endif\n\n#if defined(weighted_splats) || defined(paraboloid_point_shape)\n\tout float vRadius;\n#endif\n\n#if defined(color_type_phong) && (MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0)\n\tout vec3 vNormal;\n#endif\n\n#ifdef highlight_point\n\tout float vHighlight;\n#endif\n\n// ---------------------\n// OCTREE\n// ---------------------\n\n#if (defined(adaptive_point_size) || defined(color_type_lod)) && defined(tree_type_octree)\n\n/**\n * Rounds the specified number to the closest integer.\n */\nfloat safeRound(float number){\n\treturn floor(number + 0.5);\n}\n\n/**\n * Gets the number of 1-bits up to inclusive index position.\n *\n * number is treated as if it were an integer in the range 0-255\n */\nint numberOfOnes(int number, int index) {\n\tint numOnes = 0;\n\tint tmp = 128;\n\tfor (int i = 7; i >= 0; i--) {\n\n\t\tif (number >= tmp) {\n\t\t\tnumber = number - tmp;\n\n\t\t\tif (i <= index) {\n\t\t\t\tnumOnes++;\n\t\t\t}\n\t\t}\n\n\t\ttmp = tmp / 2;\n\t}\n\n\treturn numOnes;\n}\n\n/**\n * Checks whether the bit at index is 1.0\n *\n * number is treated as if it were an integer in the range 0-255\n */\nbool isBitSet(int number, int index){\n\n\t// weird multi else if due to lack of proper array, int and bitwise support in WebGL 1.0\n\tint powi = 1;\n\tif (index == 0) {\n\t\tpowi = 1;\n\t} else if (index == 1) {\n\t\tpowi = 2;\n\t} else if (index == 2) {\n\t\tpowi = 4;\n\t} else if (index == 3) {\n\t\tpowi = 8;\n\t} else if (index == 4) {\n\t\tpowi = 16;\n\t} else if (index == 5) {\n\t\tpowi = 32;\n\t} else if (index == 6) {\n\t\tpowi = 64;\n\t} else if (index == 7) {\n\t\tpowi = 128;\n\t}\n\n\tint ndp = number / powi;\n\n\treturn mod(float(ndp), 2.0) != 0.0;\n}\n\n/**\n * Gets the the LOD at the point position.\n */\nfloat getLOD() {\n\tvec3 offset = vec3(0.0, 0.0, 0.0);\n\tint iOffset = int(vnStart);\n\tfloat depth = level;\n\n\tfor (float i = 0.0; i <= 30.0; i++) {\n\t\tfloat nodeSizeAtLevel = octreeSize  / pow(2.0, i + level + 0.0);\n\n\t\tvec3 index3d = (position-offset) / nodeSizeAtLevel;\n\t\tindex3d = floor(index3d + 0.5);\n\t\tint index = int(safeRound(4.0 * index3d.x + 2.0 * index3d.y + index3d.z));\n\n\t\tvec4 value = texture(visibleNodes, vec2(float(iOffset) / 2048.0, 0.0));\n\t\tint mask = int(safeRound(value.r * 255.0));\n\n\t\tif (isBitSet(mask, index)) {\n\t\t\t// there are more visible child nodes at this position\n\t\t\tint advanceG = int(safeRound(value.g * 255.0)) * 256;\n\t\t\tint advanceB = int(safeRound(value.b * 255.0));\n\t\t\tint advanceChild = numberOfOnes(mask, index - 1);\n\t\t\tint advance = advanceG + advanceB + advanceChild;\n\n\t\t\tiOffset = iOffset + advance;\n\n\t\t\tdepth++;\n\t\t} else {\n\t\t\treturn value.a * 255.0; // no more visible child nodes at this position\n\t\t}\n\n\t\toffset = offset + (vec3(1.0, 1.0, 1.0) * nodeSizeAtLevel * 0.5) * index3d;\n\t}\n\n\treturn depth;\n}\n\nfloat getPointSizeAttenuation() {\n\treturn 0.5 * pow(2.0, getLOD());\n}\n\n#endif\n\n// ---------------------\n// KD-TREE\n// ---------------------\n\n#if (defined(adaptive_point_size) || defined(color_type_lod)) && defined(tree_type_kdtree)\n\nfloat getLOD() {\n\tvec3 offset = vec3(0.0, 0.0, 0.0);\n\tfloat intOffset = 0.0;\n\tfloat depth = 0.0;\n\n\tvec3 size = bbSize;\n\tvec3 pos = position;\n\n\tfor (float i = 0.0; i <= 1000.0; i++) {\n\n\t\tvec4 value = texture(visibleNodes, vec2(intOffset / 2048.0, 0.0));\n\n\t\tint children = int(value.r * 255.0);\n\t\tfloat next = value.g * 255.0;\n\t\tint split = int(value.b * 255.0);\n\n\t\tif (next == 0.0) {\n\t\t \treturn depth;\n\t\t}\n\n\t\tvec3 splitv = vec3(0.0, 0.0, 0.0);\n\t\tif (split == 1) {\n\t\t\tsplitv.x = 1.0;\n\t\t} else if (split == 2) {\n\t\t \tsplitv.y = 1.0;\n\t\t} else if (split == 4) {\n\t\t \tsplitv.z = 1.0;\n\t\t}\n\n\t\tintOffset = intOffset + next;\n\n\t\tfloat factor = length(pos * splitv / size);\n\t\tif (factor < 0.5) {\n\t\t \t// left\n\t\t\tif (children == 0 || children == 2) {\n\t\t\t\treturn depth;\n\t\t\t}\n\t\t} else {\n\t\t\t// right\n\t\t\tpos = pos - size * splitv * 0.5;\n\t\t\tif (children == 0 || children == 1) {\n\t\t\t\treturn depth;\n\t\t\t}\n\t\t\tif (children == 3) {\n\t\t\t\tintOffset = intOffset + 1.0;\n\t\t\t}\n\t\t}\n\t\tsize = size * ((1.0 - (splitv + 1.0) / 2.0) + 0.5);\n\n\t\tdepth++;\n\t}\n\n\n\treturn depth;\n}\n\nfloat getPointSizeAttenuation() {\n\treturn 0.5 * pow(1.3, getLOD());\n}\n\n#endif\n\n// formula adapted from: http://www.dfstudios.co.uk/articles/programming/image-programming-algorithms/image-processing-algorithms-part-5-contrast-adjustment/\nfloat getContrastFactor(float contrast) {\n\treturn (1.0158730158730156 * (contrast + 1.0)) / (1.0158730158730156 - contrast);\n}\n\nvec3 getRGB() {\n\t\n\t#ifdef color_rgba\n\t\tvec3 rgb = rgba.rgb;\n\t#else\t\n\t\tvec3 rgb = color;\n\t#endif\t\t\n\n\t#if defined(use_rgb_gamma_contrast_brightness)\n\t\trgb = pow(rgb, vec3(rgbGamma));\n\t\trgb = rgb + rgbBrightness;\n\t\trgb = (rgb - 0.5) * getContrastFactor(rgbContrast) + 0.5;\n\t\trgb = clamp(rgb, 0.0, 1.0);\n\t\treturn rgb;\n\t#else\n\t\treturn rgb;\n\t#endif\n}\n\nfloat getIntensity() {\n\tfloat w = (intensity - intensityRange.x) / (intensityRange.y - intensityRange.x);\n\tw = pow(w, intensityGamma);\n\tw = w + intensityBrightness;\n\tw = (w - 0.5) * getContrastFactor(intensityContrast) + 0.5;\n\tw = clamp(w, 0.0, 1.0);\n\n\treturn w;\n}\n\nvec3 getElevation() {\n\tvec4 world = modelMatrix * vec4( position, 1.0 );\n\tfloat w = (world.z - heightMin) / (heightMax-heightMin);\n\tvec3 cElevation = texture(gradient, vec2(w,1.0-w)).rgb;\n\n\treturn cElevation;\n}\n\nvec4 getClassification() {\n\tvec2 uv = vec2(classification / 255.0, 0.5);\n\tvec4 classColor = texture(classificationLUT, uv);\n\n\treturn classColor;\n}\n\nvec3 getReturnNumber() {\n\tif (numberOfReturns == 1.0) {\n\t\treturn vec3(1.0, 1.0, 0.0);\n\t} else {\n\t\tif (returnNumber == 1.0) {\n\t\t\treturn vec3(1.0, 0.0, 0.0);\n\t\t} else if (returnNumber == numberOfReturns) {\n\t\t\treturn vec3(0.0, 0.0, 1.0);\n\t\t} else {\n\t\t\treturn vec3(0.0, 1.0, 0.0);\n\t\t}\n\t}\n}\n\nvec3 getSourceID() {\n\tfloat w = mod(pointSourceID, 10.0) / 10.0;\n\treturn texture(gradient, vec2(w, 1.0 - w)).rgb;\n}\n\nvec3 getCompositeColor() {\n\tvec3 c;\n\tfloat w;\n\n\tc += wRGB * getRGB();\n\tw += wRGB;\n\n\tc += wIntensity * getIntensity() * vec3(1.0, 1.0, 1.0);\n\tw += wIntensity;\n\n\tc += wElevation * getElevation();\n\tw += wElevation;\n\n\tc += wReturnNumber * getReturnNumber();\n\tw += wReturnNumber;\n\n\tc += wSourceID * getSourceID();\n\tw += wSourceID;\n\n\tvec4 cl = wClassification * getClassification();\n\tc += cl.a * cl.rgb;\n\tw += wClassification * cl.a;\n\n\tc = c / w;\n\n\tif (w == 0.0) {\n\t\tgl_Position = vec4(100.0, 100.0, 100.0, 0.0);\n\t}\n\n\treturn c;\n}\n\nvoid main() {\n\tvec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n\n\tgl_Position = projectionMatrix * mvPosition;\n\n\t#if defined(color_type_phong) && (MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0) || defined(paraboloid_point_shape)\n\t\tvViewPosition = mvPosition.xyz;\n\t#endif\n\n\t#if defined weighted_splats\n\t\tvLinearDepth = gl_Position.w;\n\t#endif\n\n\t#if defined(color_type_phong) && (MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0)\n\t\tvNormal = normalize(normalMatrix * normal);\n\t#endif\n\n\t#if !defined(paraboloid_point_shape) && defined(use_edl)\n\t\tvLogDepth = log2(-mvPosition.z);\n\t#endif\n\n\t// ---------------------\n\t// POINT SIZE\n\t// ---------------------\n\n\tfloat pointSize = 1.0;\n\tfloat slope = tan(fov / 2.0);\n\tfloat projFactor =  -0.5 * screenHeight / (slope * mvPosition.z);\n\n\t#if defined fixed_point_size\n\t\tpointSize = size;\n\t#elif defined attenuated_point_size\n\t\tpointSize = size * spacing * projFactor;\n\t#elif defined adaptive_point_size\n\t\tfloat worldSpaceSize = 2.0 * size * spacing / getPointSizeAttenuation();\n\t\tpointSize = worldSpaceSize * projFactor;\n\t#endif\n\n\tpointSize = max(minSize, pointSize);\n\tpointSize = min(maxSize, pointSize);\n\n\t#if defined(weighted_splats) || defined(paraboloid_point_shape)\n\t\tvRadius = pointSize / projFactor;\n\t#endif\n\n\tgl_PointSize = pointSize;\n\n\t// ---------------------\n\t// HIGHLIGHTING\n\t// ---------------------\n\n\t#ifdef highlight_point\n\t\tvec4 mPosition = modelMatrix * vec4(position, 1.0);\n\t\tif (enablePointHighlighting && abs(mPosition.x - highlightedPointCoordinate.x) < 0.0001 &&\n\t\t\tabs(mPosition.y - highlightedPointCoordinate.y) < 0.0001 &&\n\t\t\tabs(mPosition.z - highlightedPointCoordinate.z) < 0.0001) {\n\t\t\tvHighlight = 1.0;\n\t\t\tgl_PointSize = pointSize * highlightedPointScale;\n\t\t} else {\n\t\t\tvHighlight = 0.0;\n\t\t}\n\t#endif\n\n\t// ---------------------\n\t// OPACITY\n\t// ---------------------\n\n\t#ifndef color_type_point_index\n\t\t#ifdef attenuated_opacity\n\t\t\tvOpacity = opacity * exp(-length(-mvPosition.xyz) / opacityAttenuation);\n\t\t#else\n\t\t\tvOpacity = opacity;\n\t\t#endif\n\t#endif\n\n\t// ---------------------\n\t// FILTERING\n\t// ---------------------\n\n\t#ifdef use_filter_by_normal\n\t\tbool discardPoint = false;\n\t\t// Absolute normal filtering\n\t\tif (normalFilteringMode == 1) {\n\t\t\tdiscardPoint = (abs((modelViewMatrix * vec4(normal, 0.0)).z) > filterByNormalThreshold);\n\t\t}\n\t\t// less than equal to\n\t\telse if (normalFilteringMode == 2) {\n\t\t\tdiscardPoint = (modelViewMatrix * vec4(normal, 0.0)).z <= filterByNormalThreshold;\n\t\t\t}\n\t\t// greater than\n\t\telse if(normalFilteringMode == 3) {\n\t\t\tdiscardPoint = (modelViewMatrix * vec4(normal, 0.0)).z > filterByNormalThreshold;\n\t\t\t}\n\n\t\tif (discardPoint)\n\t\t{\n\t\t\tgl_Position = vec4(0.0, 0.0, 2.0, 1.0);\n\t\t}\n\t#endif\n\n\t#ifdef use_filter_by_classification\n\t\n\t\tint classIndex = int(classification);\n\t\tbool discardPoint = !classificationFilter[classIndex];\n\n\t\tif (discardPoint) {\n\t\t\tgl_Position = vec4(0.0, 0.0, 2.0, 1.0);\n\t\t\treturn;\n\t\t}\n\n\n\n\t#endif\n\n\t// ---------------------\n\t// POINT COLOR\n\t// ---------------------\n\n\t#ifdef color_type_rgb\n\t\tvColor = getRGB();\n\t#elif defined color_type_height\n\t\tvColor = getElevation();\n\t#elif defined color_type_rgb_height\n\t\tvec3 cHeight = getElevation();\n\t\tvColor = (1.0 - transition) * getRGB() + transition * cHeight;\n\t#elif defined color_type_depth\n\t\tfloat linearDepth = -mvPosition.z ;\n\t\tfloat expDepth = (gl_Position.z / gl_Position.w) * 0.5 + 0.5;\n\t\tvColor = vec3(linearDepth, expDepth, 0.0);\n\t#elif defined color_type_intensity\n\t\tfloat w = getIntensity();\n\t\tvColor = vec3(w, w, w);\n\t#elif defined color_type_intensity_gradient\n\t\tfloat w = getIntensity();\n\t\tvColor = texture(gradient, vec2(w, 1.0 - w)).rgb;\n\t#elif defined color_type_color\n\t\tvColor = uColor;\n\t#elif defined color_type_lod\n\tfloat w = getLOD() / 10.0;\n\tvColor = texture(gradient, vec2(w, 1.0 - w)).rgb;\n\t#elif defined color_type_point_index\n\t\tvColor = indices.rgb;\n\t#elif defined color_type_classification\n\t  vec4 cl = getClassification();\n\t\tvColor = cl.rgb;\n\t#elif defined color_type_return_number\n\t\tvColor = getReturnNumber();\n\t#elif defined color_type_source\n\t\tvColor = getSourceID();\n\t#elif defined color_type_normal\n\t\tvColor = (modelMatrix * vec4(normal, 0.0)).xyz;\n\t#elif defined color_type_phong\n\t\tvColor = color;\n\t#elif defined color_type_composite\n\t\tvColor = getCompositeColor();\n\t#endif\n\n\t#if !defined color_type_composite && defined color_type_classification\n\t\tif (cl.a == 0.0) {\n\t\t\tgl_Position = vec4(100.0, 100.0, 100.0, 0.0);\n\t\t\treturn;\n\t\t}\n\t#endif\n\n\t// ---------------------\n\t// CLIPPING\n\t// ---------------------\n\n\t#if defined use_clip_box\n\t\tbool insideAny = false;\n\t\tfor (int i = 0; i < max_clip_boxes; i++) {\n\t\t\tif (i == int(clipBoxCount)) {\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tvec4 clipPosition = clipBoxes[i] * modelMatrix * vec4(position, 1.0);\n\t\t\tbool inside = -0.5 <= clipPosition.x && clipPosition.x <= 0.5;\n\t\t\tinside = inside && -0.5 <= clipPosition.y && clipPosition.y <= 0.5;\n\t\t\tinside = inside && -0.5 <= clipPosition.z && clipPosition.z <= 0.5;\n\t\t\tinsideAny = insideAny || inside;\n\t\t}\n\n\t\tif (!insideAny) {\n\t\t\t#if defined clip_outside\n\t\t\t\tgl_Position = vec4(1000.0, 1000.0, 1000.0, 1.0);\n\t\t\t#elif defined clip_highlight_inside && !defined(color_type_depth)\n\t\t\t\tfloat c = (vColor.r + vColor.g + vColor.b) / 6.0;\n\t\t\t#endif\n\t\t} else {\n\t\t\t#if defined clip_highlight_inside\n\t\t\t\tvColor.r += 0.5;\n\t\t\t#elif defined clip_inside\n\t\t\t\tgl_Position = vec4(1000.0, 1000.0, 1000.0, 1.0);\n\t\t\t#endif\n\t\t}\n\t#endif\n\n\n\t// ---------------------\n\t// For Depth purposes\n\t// ---------------------\n\n\tif(renderDepth) {\n\t\tvColor = vec3(1. - gl_Position.z / gl_Position.w);\n\t}\n\n}\n';
        },
        315(t, e, n) {
          n.d(e, { A: () => i });
          const i =
            'precision highp float;\nprecision highp int;\n\nuniform float opacity;\nuniform bool renderIds;\nuniform bool debugMode;\n\nuniform bool useClipping;\nuniform float screenWidth;\nuniform float screenHeight;\nuniform vec4 clipExtent;\n\nin vec3 vColor;\nin float vOpacity;\nin vec2 vPosition;\nin float backfaseCulling;\nin vec2 vID;\nin float vRenderScale;\n\nout vec4 color_data;\n\nuvec3 murmurHash31(uint src) {\n    const uint M = 0x5bd1e995u;\n    uvec3 h = uvec3(1190494759u, 2147483647u, 3559788179u);\n    src *= M; src ^= src>>24u; src *= M;\n    h *= M; h ^= src;\n    h ^= h>>13u; h *= M; h ^= h>>15u;\n    return h;\n}\n\n// 3 outputs, 1 input\nvec3 hash31(float src) {\n    uvec3 h = murmurHash31(floatBitsToUint(src));\n    return uintBitsToFloat(h & 0x007fffffu | 0x3f800000u) - 1.0;\n}\n\nvoid main() {\n\n\tif(useClipping) {\n\t\tvec2 ndc = vec2((gl_FragCoord.x / screenWidth), 1.0 - (gl_FragCoord.y / screenHeight));\n\n\t\tif(step(clipExtent.x, ndc.x) * step(ndc.x, clipExtent.z) < 1.0)\n\t\t{\n\t\t\tdiscard;\n\t\t}\n\n\t\tif(step(clipExtent.y, ndc.y) * step(ndc.y, clipExtent.w) < 1.0)\n\t\t{\n\t\t\tdiscard;\n\t\t}\n\t}\n\n\tfloat A = dot(vPosition, vPosition);\n\tif (A > 8.0) discard;\n\t\n\tfloat opacity = exp(-0.5 * A) * vOpacity;\n\tcolor_data = vec4(vColor, opacity);\n\t\n\tif(debugMode){\n\t\tif(opacity < 0.1) discard;\n\t\tcolor_data = vec4( hash31(vID.x), 1.);\t\n\t}\n\n\tif(renderIds) {\n\t\tif(opacity < 0.1) discard;\n\t\tcolor_data = vec4(vID, vRenderScale, 1.);\n\t} \n\n}\n';
        },
        469(t, e, n) {
          n.d(e, { A: () => i });
          const i =
            'precision highp float;\nprecision highp int;\n\nuniform vec2 focal;\nuniform float inverseFocalAdjustment;\nuniform float splatScale;\nuniform float initialSplatScale;\nuniform vec2 basisViewport;\nuniform float harmonicsDegree;\nuniform bool renderIds;\nuniform bool adaptiveSize;\nuniform bool renderLoD;\nuniform vec3 globalOffset;\n\nuniform sampler2D covarianceTexture0;\nuniform sampler2D covarianceTexture1;\nuniform sampler2D nodeTexture;\nuniform sampler2D nodeTexture2;\n\n\nuniform highp usampler2D sortedTexture;\nuniform highp usampler2D posColorTexture;\nuniform highp usampler2D nodeIndicesTexture;\nuniform highp usampler2D harmonicsTexture1;\nuniform highp usampler2D harmonicsTexture2;\nuniform highp usampler2D harmonicsTexture3;\n\nuniform float fov;\nuniform float spacing;\nuniform float screenHeight;\nuniform float maxSplatScale;\n\nuniform float maxDepth;\n\n\nuniform bool renderOnlyHarmonics;\nuniform float harmonicsScale;\n\n//To read the LOD for each point\nuniform sampler2D visibleNodes;\nuniform float octreeSize;\n\nout vec3 vColor;\nout float vOpacity;\nout vec2 vPosition;\nout float vZ;\nout float backfaseCulling;\nout vec2 vID;\nout float vRenderScale;\n\nconst float sqrt8 = sqrt(8.0);\nconst float minAlpha = 1.0 / 255.0;\n\n\nconst vec4 encodeNorm4 = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);\nconst uvec4 mask4 = uvec4(uint(0x000000FF), uint(0x0000FF00), uint(0x00FF0000), uint(0xFF000000));\nconst uvec4 shift4 = uvec4(0, 8, 16, 24);\nvec4 uintToRGBAVec (uint u) {\n    uvec4 urgba = mask4 & u;\n    urgba = urgba >> shift4;\n    vec4 rgba = vec4(urgba) * encodeNorm4;\n    return rgba;\n}\nvec3 unpack111011s(uint bits) { \n    vec3 result = vec3((uvec3(bits) >> uvec3(21u, 11u, 0u)) & uvec3(0x7ffu, 0x3ffu, 0x7ffu)) / vec3(2047.0, 1023.0, 2047.0); \n    return result * 2. - 1.;\n}       \nivec2 getDataUVSplat(in int stride, in int offset, in vec2 dimensions, in int index) {\n    ivec2 samplerUV = ivec2(0, 0);\n    float d = float(uint(index) * uint(stride) + uint(offset));\n    samplerUV.y = int(floor(d / dimensions.x));\n    samplerUV.x = int(mod(d, dimensions.x));\n    return samplerUV;\n}\n\nconst float SH_C1 = 0.4886025119029199f;\nconst float[5] SH_C2 = float[](1.0925484, -1.0925484, 0.3153916, -1.0925484, 0.5462742);\nconst float[7] SH_C3 = float[](-0.5900435899266435, \n                                2.890611442640554, \n                                -0.4570457994644658, \n                                0.3731763325901154, \n                                -0.4570457994644658, \n                                1.445305721320277, \n                                -0.5900435899266435);\n\n/**\n * Rounds the specified number to the closest integer.\n */\nfloat safeRound(float number){\n\treturn floor(number + 0.5);\n}\n\n\n/**\n * Gets the number of 1-bits up to inclusive index position.\n *\n * number is treated as if it were an integer in the range 0-255\n */\nint numberOfOnes(int number, int index) {\n\tint numOnes = 0;\n\tint tmp = 128;\n\tfor (int i = 7; i >= 0; i--) {\n\n\t\tif (number >= tmp) {\n\t\t\tnumber = number - tmp;\n\n\t\t\tif (i <= index) {\n\t\t\t\tnumOnes++;\n\t\t\t}\n\t\t}\n\n\t\ttmp = tmp / 2;\n\t}\n\n\treturn numOnes;\n}\n\n/**\n * Checks whether the bit at index is 1.0\n *\n * number is treated as if it were an integer in the range 0-255\n */\nbool isBitSet(int number, int index){\n\n\t// weird multi else if due to lack of proper array, int and bitwise support in WebGL 1.0\n\tint powi = 1;\n\tif (index == 0) {\n\t\tpowi = 1;\n\t} else if (index == 1) {\n\t\tpowi = 2;\n\t} else if (index == 2) {\n\t\tpowi = 4;\n\t} else if (index == 3) {\n\t\tpowi = 8;\n\t} else if (index == 4) {\n\t\tpowi = 16;\n\t} else if (index == 5) {\n\t\tpowi = 32;\n\t} else if (index == 6) {\n\t\tpowi = 64;\n\t} else if (index == 7) {\n\t\tpowi = 128;\n\t}\n\n\tint ndp = number / powi;\n\n\treturn mod(float(ndp), 2.0) != 0.0;\n}\n\n/**\n * Gets the the LOD at the point position.\n */\nfloat getLOD(vec3 pos, int vnStart, float level) {\n\tvec3 offset = vec3(0.0, 0.0, 0.0);\n\tint iOffset = vnStart;\n\tfloat depth = level;\n\n\tfor (float i = 0.0; i <= 30.0; i++) {\n\t\tfloat nodeSizeAtLevel = octreeSize  / pow(2.0, i + level + 0.0);\n\n\t\tvec3 index3d = (pos-offset) / nodeSizeAtLevel;\n\t\tindex3d = floor(index3d + 0.5);\n\t\tint index = int(safeRound(4.0 * index3d.x + 2.0 * index3d.y + index3d.z));\n\n\t\tvec4 value = texture2D(visibleNodes, vec2(float(iOffset) / 2048.0, 0.0));\n\t\tint mask = int(safeRound(value.r * 255.0));\n\n\t\tif (isBitSet(mask, index)) {\n\t\t\t// there are more visible child nodes at this position\n\t\t\tint advanceG = int(safeRound(value.g * 255.0)) * 256;\n\t\t\tint advanceB = int(safeRound(value.b * 255.0));\n\t\t\tint advanceChild = numberOfOnes(mask, index - 1);\n\t\t\tint advance = advanceG + advanceB + advanceChild;\n\n\t\t\tiOffset = iOffset + advance;\n\n\t\t\tdepth++;\n\t\t} else {\n\t\t\treturn value.a * 255.0; // no more visible child nodes at this position\n\t\t}\n\n\t\toffset = offset + (vec3(1.0, 1.0, 1.0) * nodeSizeAtLevel * 0.5) * index3d;\n\t}\n\n\treturn depth;\n}\n\n\nvoid main() {\n\n    ivec2 samplerUV = ivec2(0, 0);\n    vec2 dim = vec2(textureSize(covarianceTexture0, 0).xy);\n\n    float dd = float(gl_InstanceID);\n    samplerUV.y = int(floor(dd / dim.x));\n    samplerUV.x = int(mod(dd, dim.x));\n\n    int indexes_sorted = int(texelFetch(sortedTexture, samplerUV, 0));\n\n    dd = float(indexes_sorted);\n    samplerUV.y = int(floor(dd / dim.x));\n    samplerUV.x = int(mod(dd, dim.x));\n\n    vec4 cov3D_4 = texelFetch(covarianceTexture0, samplerUV, 0);\n    vec2 cov3D_2 = texelFetch(covarianceTexture1, samplerUV, 0).rg;\n\n\n    uvec4 sampledCenterColor = texelFetch(posColorTexture, samplerUV, 0);\n    vec3 instancePosition = uintBitsToFloat(uvec3(sampledCenterColor.gba));\n    \n    vec3 nodePosition = instancePosition;\n    instancePosition += globalOffset;\n\n    uint nodeIndex = texelFetch(nodeIndicesTexture, samplerUV, 0).r;\n\n\n    vID = vec2(indexes_sorted, nodeIndex);\n\n    samplerUV = ivec2(0, 0);\n    dd = float(nodeIndex);\n    samplerUV.y = int(floor(dd / 100.));\n    samplerUV.x = int(mod(dd, 100.));\n\n    vec4 nodeData = texelFetch(nodeTexture, samplerUV, 0);\n    vec4 nodeData2 = texelFetch(nodeTexture2, samplerUV, 0);\n\n    nodePosition += vec3(nodeData.a, nodeData2.ba);\n\n    ivec2 levelAndVnStart =  ivec2(nodeData2.rg);\n    int vnStart = levelAndVnStart.r;\n    int level = levelAndVnStart.g;\n\n    vec4 viewCenter = modelViewMatrix * vec4(instancePosition, 1.0);\n    vec4 clipCenter = projectionMatrix * viewCenter;\n    vec3 ndcCenter = clipCenter.xyz / clipCenter.w;\n\n    mat3 Vrk = mat3(\n        cov3D_4.x, cov3D_4.y, cov3D_4.z,\n        cov3D_4.y, cov3D_4.w, cov3D_2.x,\n        cov3D_4.z, cov3D_2.x, cov3D_2.y\n    );\n\n    mat3 J;\n    float s = 1.0 / (viewCenter.z * viewCenter.z);\n    J = mat3(\n        focal.x / viewCenter.z, 0., -(focal.x * viewCenter.x) * s,\n        0., focal.y / viewCenter.z, -(focal.y * viewCenter.y) * s,\n        0., 0., 0.\n    );\n\n    mat3 W = transpose(mat3(modelViewMatrix));\n    mat3 T = W * J;\n\n    mat3 cov2Dm = transpose(T) * Vrk * T;\n    cov2Dm[0][0] += 0.3;\n    cov2Dm[1][1] += 0.3;\n\n    vec3 cov2Dv = vec3(cov2Dm[0][0], cov2Dm[0][1], cov2Dm[1][1]);\n\n    float a = cov2Dv.x;\n    float d = cov2Dv.z;\n    float b = cov2Dv.y;\n    float D = a * d - b * b;\n    float trace = a + d;\n    float traceOver2 = 0.5 * trace;\n    float term2 = sqrt(max(0.1f, traceOver2 * traceOver2 - D));\n    float eigenValue1 = traceOver2 + term2;\n    float eigenValue2 = traceOver2 - term2;\n\n    if (eigenValue2 <= 0.0) return;\n\n    vec2 eigenVector1 = normalize(vec2(b, eigenValue1 - a));\n    // since the eigen vectors are orthogonal, we derive the second one from the first\n    vec2 eigenVector2 = vec2(eigenVector1.y, -eigenVector1.x);\n\n    //Get the adaptive size\n    float renderScale = 1.;\n\n    if(adaptiveSize) {\n        float lodSplatScale = clamp(getLOD( nodePosition, int(vnStart), float(level) ) / maxDepth, 0., 1.);\n        float currentSplatScale = lodSplatScale < 2. ? initialSplatScale : splatScale;\n        renderScale = mix(maxSplatScale * currentSplatScale, 1., lodSplatScale);\n    }\n\n    vRenderScale = renderScale;\n\n    float cameraDistance = length(cameraPosition - instancePosition);\n\n    // We use sqrt(8) standard deviations instead of 3 to eliminate more of the splat with a very low opacity.\n    vec2 basisVector1 = eigenVector1 * renderScale * min(sqrt8 * sqrt(eigenValue1), 1024.);\n    vec2 basisVector2 = eigenVector2 * renderScale * min(sqrt8 * sqrt(eigenValue2), 1024.);\n\n    vec2 ndcOffset = vec2(position.x * basisVector1 + position.y * basisVector2) *\n                        basisViewport * 2.0 * inverseFocalAdjustment;\n\n    vec4 quadPos = vec4(ndcCenter.xy + ndcOffset, ndcCenter.z, 1.0);\n    vZ = ndcCenter.z;\n    gl_Position = quadPos;\n\n    vPosition = position.xy;\n    vPosition *= sqrt8;\n\n    vec4 colorData = uintToRGBAVec(sampledCenterColor.r);\n\n    vColor = colorData.rgb;\n\n    vec4 worldCenter = modelMatrix * vec4(instancePosition, 1.0);\n\n    vec3 worldViewDir = normalize(worldCenter.xyz - cameraPosition);\n\n    //Harmonics\n    vec3 harmonics = vec3(0.);\n    vec3 sh1 = vec3(0.);\n    vec3 sh2 = vec3(0.);\n    vec3 sh3 = vec3(0.);\n\n    vec3 sh4 = vec3(0.);\n    vec3 sh5 = vec3(0.);\n    vec3 sh6 = vec3(0.);\n    vec3 sh7 = vec3(0.);\n    vec3 sh8 = vec3(0.);\n\n    vec3 sh9 = vec3(0.);\n    vec3 sh10 = vec3(0.);\n    vec3 sh11 = vec3(0.);\n    vec3 sh12 = vec3(0.);\n    vec3 sh13 = vec3(0.);\n    vec3 sh14 = vec3(0.);\n    vec3 sh15 = vec3(0.);\n\n    if(harmonicsDegree > 0. && !renderIds) {\n\n        vec2 degree1TextureSize = vec2(textureSize(harmonicsTexture1, 0));\n\n        uint d1 = texelFetch(harmonicsTexture1, getDataUVSplat(3, 0, degree1TextureSize, indexes_sorted), 0).r;\n        uint d2 = texelFetch(harmonicsTexture1, getDataUVSplat(3, 1, degree1TextureSize, indexes_sorted), 0).r;\n        uint d3 = texelFetch(harmonicsTexture1, getDataUVSplat(3, 2, degree1TextureSize, indexes_sorted), 0).r;\n\n        sh1 = unpack111011s(d1);\n        sh2 = unpack111011s(d2);\n        sh3 = unpack111011s(d3);\n\n        float x = worldViewDir.x;\n        float y = worldViewDir.y;\n        float z = worldViewDir.z;\n\n        float xx = 1.;\n        float yy = 1.;\n        float zz = 1.;\n        float xy = 1.;\n        float yz = 1.;\n        float xz = 1.;\n\n        harmonics = SH_C1 * (-sh1 * y + sh2 * z - sh3 * x);\n\n        if(harmonicsDegree > 1.) {\n\n            vec2 degree2TextureSize = vec2(textureSize(harmonicsTexture2, 0));\n\n            uint d4 = texelFetch(harmonicsTexture2, getDataUVSplat(5, 0, degree2TextureSize, indexes_sorted), 0).r;\n            uint d5 = texelFetch(harmonicsTexture2, getDataUVSplat(5, 1, degree2TextureSize, indexes_sorted), 0).r;\n            uint d6 = texelFetch(harmonicsTexture2, getDataUVSplat(5, 2, degree2TextureSize, indexes_sorted), 0).r;\n            uint d7 = texelFetch(harmonicsTexture2, getDataUVSplat(5, 3, degree2TextureSize, indexes_sorted), 0).r;\n            uint d8 = texelFetch(harmonicsTexture2, getDataUVSplat(5, 4, degree2TextureSize, indexes_sorted), 0).r;\n\n\n            sh4 = unpack111011s(d4);\n            sh5 = unpack111011s(d5);\n            sh6 = unpack111011s(d6);\n            sh7 = unpack111011s(d7);\n            sh8 = unpack111011s(d8);\n\n\n            xx = x * x;\n            yy = y * y;\n            zz = z * z;\n            xy = x * y;\n            yz = y * z;\n            xz = x * z;\n\n            harmonics += \n                (SH_C2[0] * xy) * sh4 +\n                (SH_C2[1] * yz) * sh5 +\n                (SH_C2[2] * (2.0 * zz - xx - yy)) * sh6 +\n                (SH_C2[3] * xz) * sh7 +\n                (SH_C2[4] * (xx - yy)) * sh8;\n\n            if(harmonicsDegree > 2.) {\n\n                vec2 degree3TextureSize = vec2(textureSize(harmonicsTexture3, 0));\n\n                uint d9 =  texelFetch(harmonicsTexture3, getDataUVSplat(7, 0, degree3TextureSize, indexes_sorted), 0).r;\n                uint d10 = texelFetch(harmonicsTexture3, getDataUVSplat(7, 1, degree3TextureSize, indexes_sorted), 0).r;\n                uint d11 = texelFetch(harmonicsTexture3, getDataUVSplat(7, 2, degree3TextureSize, indexes_sorted), 0).r;\n                uint d12 = texelFetch(harmonicsTexture3, getDataUVSplat(7, 3, degree3TextureSize, indexes_sorted), 0).r;\n                uint d13 = texelFetch(harmonicsTexture3, getDataUVSplat(7, 4, degree3TextureSize, indexes_sorted), 0).r;\n                uint d14 = texelFetch(harmonicsTexture3, getDataUVSplat(7, 5, degree3TextureSize, indexes_sorted), 0).r;\n                uint d15 = texelFetch(harmonicsTexture3, getDataUVSplat(7, 6, degree3TextureSize, indexes_sorted), 0).r;\n\n                sh9 =  unpack111011s(d9);\n                sh10 = unpack111011s(d10);\n                sh11 = unpack111011s(d11);\n                sh12 = unpack111011s(d12);\n                sh13 = unpack111011s(d13);\n                sh14 = unpack111011s(d14);\n\n                harmonics +=\n                    SH_C3[0] * y * (3.0 * xx - yy) * sh9 +\n                    SH_C3[1] * xy * z * sh10 +\n                    SH_C3[2] * y * (4.0 * zz - xx - yy) * sh11 +\n                    SH_C3[3] * z * (2.0 * zz - 3.0 * xx - 3.0 * yy) * sh12 +\n                    SH_C3[4] * x * (4.0 * zz - xx - yy) * sh13 +\n                    SH_C3[5] * z * (xx - yy) * sh14 +\n                    SH_C3[6] * x * (xx - 3.0 * yy) * sh15;\n            }\n        }\n    }\n\n    if(renderOnlyHarmonics) {\n        vColor = harmonicsScale * harmonics;\n    } else {\n        vColor += harmonics;\n    }\n    \n    vColor.rgb = clamp(vColor.rgb, vec3(0.), vec3(1.));\n\n    if(renderLoD) {\n        //Test the LOD\n        int LOD = int(getLOD( nodePosition, int(vnStart), float(level) ));\n        switch ( LOD ) {\n            case 0:\n                vColor.rgb = vec3(1., 0., 0.);\n            break;\n            case 1:\n                vColor.rgb = vec3(0., 1., 0.);\n            break;\n            case 2:\n                vColor.rgb = vec3(0., 0., 1.);\n            break;\n            case 3:\n                vColor.rgb = vec3(1., 0., 1.);\n            break;\n            case 4:\n                vColor.rgb = vec3(1., 1., 0.);\n            break;\n            case 5:\n                vColor.rgb = vec3(0., 1., 1.);\n            break;\n            case 6:\n                vColor.rgb = vec3(0.5, 0., 0.);\n            break;\n            case 7:\n                vColor.rgb = vec3(0., 0.5, 0.);\n            break;\n            case 8:\n                vColor.rgb = vec3(0.0, 0., 0.5);\n            break;\n            case 9:\n                vColor.rgb = vec3(0.5, 0., 0.5);\n            break;\n            case 10:\n                vColor.rgb = vec3(0.5, 0.5, 0.0);\n            break;\n            case 11:\n                vColor.rgb = vec3(0.0, 0.5, 0.5);\n            break;\n            case 12:\n                vColor.rgb = vec3(1., 1., 1.);\n            break;\n        }\n    }\n\n\tvOpacity = colorData.a;\n}\n';
        },
        42(t, e, n) {
          n.d(e, { A: () => o });
          var i = n(734),
            r = n.n(i);
          function o() {
            return r()(
              '(()=>{var e={350(e,t){"use strict";t.byteLength=function(e){var t=s(e),n=t[0],r=t[1];return 3*(n+r)/4-r},t.toByteArray=function(e){var t,n,o=s(e),a=o[0],f=o[1],w=new i(function(e,t,n){return 3*(t+n)/4-n}(0,a,f)),u=0,d=f>0?a-4:a;for(n=0;n<d;n+=4)t=r[e.charCodeAt(n)]<<18|r[e.charCodeAt(n+1)]<<12|r[e.charCodeAt(n+2)]<<6|r[e.charCodeAt(n+3)],w[u++]=t>>16&255,w[u++]=t>>8&255,w[u++]=255&t;return 2===f&&(t=r[e.charCodeAt(n)]<<2|r[e.charCodeAt(n+1)]>>4,w[u++]=255&t),1===f&&(t=r[e.charCodeAt(n)]<<10|r[e.charCodeAt(n+1)]<<4|r[e.charCodeAt(n+2)]>>2,w[u++]=t>>8&255,w[u++]=255&t),w},t.fromByteArray=function(e){for(var t,r=e.length,i=r%3,o=[],a=16383,s=0,f=r-i;s<f;s+=a)o.push(w(e,s,s+a>f?f:s+a));return 1===i?(t=e[r-1],o.push(n[t>>2]+n[t<<4&63]+"==")):2===i&&(t=(e[r-2]<<8)+e[r-1],o.push(n[t>>10]+n[t>>4&63]+n[t<<2&63]+"=")),o.join("")};for(var n=[],r=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0;a<64;++a)n[a]=o[a],r[o.charCodeAt(a)]=a;function s(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");return-1===n&&(n=t),[n,n===t?0:4-n%4]}function f(e){return n[e>>18&63]+n[e>>12&63]+n[e>>6&63]+n[63&e]}function w(e,t,n){for(var r,i=[],o=t;o<n;o+=3)r=(e[o]<<16&16711680)+(e[o+1]<<8&65280)+(255&e[o+2]),i.push(f(r));return i.join("")}r["-".charCodeAt(0)]=62,r["_".charCodeAt(0)]=63},518(e){var t=4096,n=new Uint32Array([0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535,131071,262143,524287,1048575,2097151,4194303,8388607,16777215]);function r(e){this.buf_=new Uint8Array(8224),this.input_=e,this.reset()}r.READ_SIZE=t,r.IBUF_MASK=8191,r.prototype.reset=function(){this.buf_ptr_=0,this.val_=0,this.pos_=0,this.bit_pos_=0,this.bit_end_pos_=0,this.eos_=0,this.readMoreInput();for(var e=0;e<4;e++)this.val_|=this.buf_[this.pos_]<<8*e,++this.pos_;return this.bit_end_pos_>0},r.prototype.readMoreInput=function(){if(!(this.bit_end_pos_>256))if(this.eos_){if(this.bit_pos_>this.bit_end_pos_)throw new Error("Unexpected end of input "+this.bit_pos_+" "+this.bit_end_pos_)}else{var e=this.buf_ptr_,n=this.input_.read(this.buf_,e,t);if(n<0)throw new Error("Unexpected end of input");if(n<t){this.eos_=1;for(var r=0;r<32;r++)this.buf_[e+n+r]=0}if(0===e){for(r=0;r<32;r++)this.buf_[8192+r]=this.buf_[r];this.buf_ptr_=t}else this.buf_ptr_=0;this.bit_end_pos_+=n<<3}},r.prototype.fillBitWindow=function(){for(;this.bit_pos_>=8;)this.val_>>>=8,this.val_|=this.buf_[8191&this.pos_]<<24,++this.pos_,this.bit_pos_=this.bit_pos_-8>>>0,this.bit_end_pos_=this.bit_end_pos_-8>>>0},r.prototype.readBits=function(e){32-this.bit_pos_<e&&this.fillBitWindow();var t=this.val_>>>this.bit_pos_&n[e];return this.bit_pos_+=e,t},e.exports=r},210(e,t){t.lookup=new Uint8Array([0,0,0,0,0,0,0,0,0,4,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,12,16,12,12,20,12,16,24,28,12,12,32,12,36,12,44,44,44,44,44,44,44,44,44,44,32,32,24,40,28,12,12,48,52,52,52,48,52,52,52,48,52,52,52,52,52,48,52,52,52,52,52,48,52,52,52,52,52,24,12,28,12,12,12,56,60,60,60,56,60,60,60,56,60,60,60,60,60,56,60,60,60,60,60,56,60,60,60,60,60,24,12,28,12,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,56,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,24,25,25,25,25,26,26,26,26,27,27,27,27,28,28,28,28,29,29,29,29,30,30,30,30,31,31,31,31,32,32,32,32,33,33,33,33,34,34,34,34,35,35,35,35,36,36,36,36,37,37,37,37,38,38,38,38,39,39,39,39,40,40,40,40,41,41,41,41,42,42,42,42,43,43,43,43,44,44,44,44,45,45,45,45,46,46,46,46,47,47,47,47,48,48,48,48,49,49,49,49,50,50,50,50,51,51,51,51,52,52,52,52,53,53,53,53,54,54,54,54,55,55,55,55,56,56,56,56,57,57,57,57,58,58,58,58,59,59,59,59,60,60,60,60,61,61,61,61,62,62,62,62,63,63,63,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),t.lookupOffsets=new Uint16Array([1024,1536,1280,1536,0,256,768,512])},327(e,t,n){var r=n(556).z,i=n(556).y,o=n(518),a=n(29),s=n(956).z,f=n(956).u,w=n(210),u=n(573),d=n(33),l=1080,h=new Uint8Array([1,2,3,4,0,5,17,6,16,7,8,9,10,11,12,13,14,15]),p=new Uint8Array([3,2,1,0,3,3,3,3,3,3,2,2,2,2,2,2]),b=new Int8Array([0,0,0,0,-1,1,-2,2,-3,3,-1,1,-2,2,-3,3]),c=new Uint16Array([256,402,436,468,500,534,566,598,630,662,694,726,758,790,822,854,886,920,952,984,1016,1048,1080]);function y(e){var t;return 0===e.readBits(1)?16:(t=e.readBits(3))>0?17+t:(t=e.readBits(3))>0?8+t:17}function v(e){if(e.readBits(1)){var t=e.readBits(3);return 0===t?1:e.readBits(t)+(1<<t)}return 0}function m(){this.meta_block_length=0,this.input_end=0,this.is_uncompressed=0,this.is_metadata=!1}function A(e){var t,n,r,i=new m;if(i.input_end=e.readBits(1),i.input_end&&e.readBits(1))return i;if(7===(t=e.readBits(2)+4)){if(i.is_metadata=!0,0!==e.readBits(1))throw new Error("Invalid reserved bit");if(0===(n=e.readBits(2)))return i;for(r=0;r<n;r++){var o=e.readBits(8);if(r+1===n&&n>1&&0===o)throw new Error("Invalid size byte");i.meta_block_length|=o<<8*r}}else for(r=0;r<t;++r){var a=e.readBits(4);if(r+1===t&&t>4&&0===a)throw new Error("Invalid size nibble");i.meta_block_length|=a<<4*r}return++i.meta_block_length,i.input_end||i.is_metadata||(i.is_uncompressed=e.readBits(1)),i}function E(e,t,n){var r;return n.fillBitWindow(),(r=e[t+=n.val_>>>n.bit_pos_&255].bits-8)>0&&(n.bit_pos_+=8,t+=e[t].value,t+=n.val_>>>n.bit_pos_&(1<<r)-1),n.bit_pos_+=e[t].bits,e[t].value}function N(e,t,n,r){var i,o,a=new Uint8Array(e);if(r.readMoreInput(),1===(o=r.readBits(2))){for(var w=e-1,u=0,d=new Int32Array(4),l=r.readBits(2)+1;w;)w>>=1,++u;for(p=0;p<l;++p)d[p]=r.readBits(u)%e,a[d[p]]=2;switch(a[d[0]]=1,l){case 1:break;case 3:if(d[0]===d[1]||d[0]===d[2]||d[1]===d[2])throw new Error("[ReadHuffmanCode] invalid symbols");break;case 2:if(d[0]===d[1])throw new Error("[ReadHuffmanCode] invalid symbols");a[d[1]]=1;break;case 4:if(d[0]===d[1]||d[0]===d[2]||d[0]===d[3]||d[1]===d[2]||d[1]===d[3]||d[2]===d[3])throw new Error("[ReadHuffmanCode] invalid symbols");r.readBits(1)?(a[d[2]]=3,a[d[3]]=3):a[d[0]]=2}}else{var p,b=new Uint8Array(18),c=32,y=0,v=[new s(2,0),new s(2,4),new s(2,3),new s(3,2),new s(2,0),new s(2,4),new s(2,3),new s(4,1),new s(2,0),new s(2,4),new s(2,3),new s(3,2),new s(2,0),new s(2,4),new s(2,3),new s(4,5)];for(p=o;p<18&&c>0;++p){var m,A=h[p],E=0;r.fillBitWindow(),E+=r.val_>>>r.bit_pos_&15,r.bit_pos_+=v[E].bits,m=v[E].value,b[A]=m,0!==m&&(c-=32>>m,++y)}if(1!==y&&0!==c)throw new Error("[ReadHuffmanCode] invalid num_codes or space");!function(e,t,n,r){for(var i=0,o=8,a=0,w=0,u=32768,d=[],l=0;l<32;l++)d.push(new s(0,0));for(f(d,0,5,e,18);i<t&&u>0;){var h,p=0;if(r.readMoreInput(),r.fillBitWindow(),p+=r.val_>>>r.bit_pos_&31,r.bit_pos_+=d[p].bits,(h=255&d[p].value)<16)a=0,n[i++]=h,0!==h&&(o=h,u-=32768>>h);else{var b,c,y=h-14,v=0;if(16===h&&(v=o),w!==v&&(a=0,w=v),b=a,a>0&&(a-=2,a<<=y),i+(c=(a+=r.readBits(y)+3)-b)>t)throw new Error("[ReadHuffmanCodeLengths] symbol + repeat_delta > num_symbols");for(var m=0;m<c;m++)n[i+m]=w;i+=c,0!==w&&(u-=c<<15-w)}}if(0!==u)throw new Error("[ReadHuffmanCodeLengths] space = "+u);for(;i<t;i++)n[i]=0}(b,e,a,r)}if(0===(i=f(t,n,8,a,e)))throw new Error("[ReadHuffmanCode] BuildHuffmanTable failed: ");return i}function U(e,t,n){var r,i;return r=E(e,t,n),i=u.kBlockLengthPrefixCode[r].nbits,u.kBlockLengthPrefixCode[r].offset+n.readBits(i)}function T(e,t,n){var r;return e<16?(n+=p[e],r=t[n&=3]+b[e]):r=e-16+1,r}function W(e,t){for(var n=e[t],r=t;r;--r)e[r]=e[r-1];e[0]=n}function O(e,t){this.alphabet_size=e,this.num_htrees=t,this.codes=new Array(t+t*c[e+31>>>5]),this.htrees=new Uint32Array(t)}function x(e,t){var n,r,i={num_htrees:null,context_map:null},o=0;t.readMoreInput();var a=i.num_htrees=v(t)+1,f=i.context_map=new Uint8Array(e);if(a<=1)return i;for(t.readBits(1)&&(o=t.readBits(4)+1),n=[],r=0;r<l;r++)n[r]=new s(0,0);for(N(a+o,n,0,t),r=0;r<e;){var w;if(t.readMoreInput(),0===(w=E(n,0,t)))f[r]=0,++r;else if(w<=o)for(var u=1+(1<<w)+t.readBits(w);--u;){if(r>=e)throw new Error("[DecodeContextMap] i >= context_map_size");f[r]=0,++r}else f[r]=w-o,++r}return t.readBits(1)&&function(e,t){var n,r=new Uint8Array(256);for(n=0;n<256;++n)r[n]=n;for(n=0;n<t;++n){var i=e[n];e[n]=r[i],i&&W(r,i)}}(f,e),i}function Y(e,t,n,r,i,o,a){var s,f=2*n,w=n,u=E(t,n*l,a);(s=0===u?i[f+(1&o[w])]:1===u?i[f+(o[w]-1&1)]+1:u-2)>=e&&(s-=e),r[n]=s,i[f+(1&o[w])]=s,++o[w]}function I(e,t,n,r,i,a){var s,f=i+1,w=n&i,u=a.pos_&o.IBUF_MASK;if(t<8||a.bit_pos_+(t<<3)<a.bit_end_pos_)for(;t-- >0;)a.readMoreInput(),r[w++]=a.readBits(8),w===f&&(e.write(r,f),w=0);else{if(a.bit_end_pos_<32)throw new Error("[CopyUncompressedBlockToOutput] br.bit_end_pos_ < 32");for(;a.bit_pos_<32;)r[w]=a.val_>>>a.bit_pos_,a.bit_pos_+=8,++w,--t;if(u+(s=a.bit_end_pos_-a.bit_pos_>>3)>o.IBUF_MASK){for(var d=o.IBUF_MASK+1-u,l=0;l<d;l++)r[w+l]=a.buf_[u+l];s-=d,w+=d,t-=d,u=0}for(l=0;l<s;l++)r[w+l]=a.buf_[u+l];if(t-=s,(w+=s)>=f)for(e.write(r,f),w-=f,l=0;l<w;l++)r[l]=r[f+l];for(;w+t>=f;){if(s=f-w,a.input_.read(r,w,s)<s)throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");e.write(r,f),t-=s,w=0}if(a.input_.read(r,w,t)<t)throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");a.reset()}}function V(e){var t=e.bit_pos_+7&-8;return 0==e.readBits(t-e.bit_pos_)}O.prototype.decode=function(e){var t,n=0;for(t=0;t<this.num_htrees;++t)this.htrees[t]=n,n+=N(this.alphabet_size,this.codes,n,e)},t.BrotliDecompressBuffer=function(e,t){var n=new r(e);null==t&&(t=function(e){var t=new r(e),n=new o(t);return y(n),A(n).meta_block_length}(e));var f=new Uint8Array(t),h=new i(f);return function(e,t){var n,r,i,f,h,p,b,c,m,W,P=0,R=0,M=0,g=[16,15,11,4],B=0,F=0,q=0,H=[new O(0,0),new O(0,0),new O(0,0)],D=128+o.READ_SIZE;i=(1<<(r=y(W=new o(e))))-16,h=(f=1<<r)-1,p=new Uint8Array(f+D+a.maxDictionaryWordLength),b=f,c=[],m=[];for(var Z=0;Z<3240;Z++)c[Z]=new s(0,0),m[Z]=new s(0,0);for(;!R;){var L,K,z,k,G,X,J,S,j,C,Q,_=0,$=[1<<28,1<<28,1<<28],ee=[0],te=[1,1,1],ne=[0,1,0,1,0,1],re=[0],ie=null,oe=null,ae=0,se=null,fe=0,we=0,ue=0;for(n=0;n<3;++n)H[n].codes=null,H[n].htrees=null;W.readMoreInput();var de=A(W);if(P+(_=de.meta_block_length)>t.buffer.length){var le=new Uint8Array(P+_);le.set(t.buffer),t.buffer=le}if(R=de.input_end,L=de.is_uncompressed,de.is_metadata)for(V(W);_>0;--_)W.readMoreInput(),W.readBits(8);else if(0!==_)if(L)W.bit_pos_=W.bit_pos_+7&-8,I(t,_,P,p,h,W),P+=_;else{for(n=0;n<3;++n)te[n]=v(W)+1,te[n]>=2&&(N(te[n]+2,c,n*l,W),N(26,m,n*l,W),$[n]=U(m,n*l,W),re[n]=1);for(W.readMoreInput(),k=(1<<(K=W.readBits(2)))-1,G=(z=16+(W.readBits(4)<<K))+(48<<K),ie=new Uint8Array(te[0]),n=0;n<te[0];++n)W.readMoreInput(),ie[n]=W.readBits(2)<<1;var he=x(te[0]<<6,W);J=he.num_htrees,X=he.context_map;var pe=x(te[2]<<2,W);for(j=pe.num_htrees,S=pe.context_map,H[0]=new O(256,J),H[1]=new O(704,te[1]),H[2]=new O(G,j),n=0;n<3;++n)H[n].decode(W);for(oe=0,se=0,C=ie[ee[0]],we=w.lookupOffsets[C],ue=w.lookupOffsets[C+1],Q=H[1].htrees[0];_>0;){var be,ce,ye,ve,me,Ae,Ee,Ne,Ue,Te,We,Oe;for(W.readMoreInput(),0===$[1]&&(Y(te[1],c,1,ee,ne,re,W),$[1]=U(m,l,W),Q=H[1].htrees[ee[1]]),--$[1],(ce=(be=E(H[1].codes,Q,W))>>6)>=2?(ce-=2,Ee=-1):Ee=0,ye=u.kInsertRangeLut[ce]+(be>>3&7),ve=u.kCopyRangeLut[ce]+(7&be),me=u.kInsertLengthPrefixCode[ye].offset+W.readBits(u.kInsertLengthPrefixCode[ye].nbits),Ae=u.kCopyLengthPrefixCode[ve].offset+W.readBits(u.kCopyLengthPrefixCode[ve].nbits),F=p[P-1&h],q=p[P-2&h],Ue=0;Ue<me;++Ue)W.readMoreInput(),0===$[0]&&(Y(te[0],c,0,ee,ne,re,W),$[0]=U(m,0,W),oe=ee[0]<<6,C=ie[ee[0]],we=w.lookupOffsets[C],ue=w.lookupOffsets[C+1]),ae=X[oe+(w.lookup[we+F]|w.lookup[ue+q])],--$[0],q=F,F=E(H[0].codes,H[0].htrees[ae],W),p[P&h]=F,(P&h)===h&&t.write(p,f),++P;if((_-=me)<=0)break;if(Ee<0&&(W.readMoreInput(),0===$[2]&&(Y(te[2],c,2,ee,ne,re,W),$[2]=U(m,2160,W),se=ee[2]<<2),--$[2],fe=S[se+(255&(Ae>4?3:Ae-2))],(Ee=E(H[2].codes,H[2].htrees[fe],W))>=z&&(Oe=(Ee-=z)&k,Ee=z+((xe=(2+(1&(Ee>>=K))<<(We=1+(Ee>>1)))-4)+W.readBits(We)<<K)+Oe)),(Ne=T(Ee,g,B))<0)throw new Error("[BrotliDecompress] invalid distance");if(Te=P&h,Ne>(M=P<i&&M!==i?P:i)){if(!(Ae>=a.minDictionaryWordLength&&Ae<=a.maxDictionaryWordLength))throw new Error("Invalid backward reference. pos: "+P+" distance: "+Ne+" len: "+Ae+" bytes left: "+_);var xe=a.offsetsByLength[Ae],Ye=Ne-M-1,Ie=a.sizeBitsByLength[Ae],Ve=Ye>>Ie;if(xe+=(Ye&(1<<Ie)-1)*Ae,!(Ve<d.kNumTransforms))throw new Error("Invalid backward reference. pos: "+P+" distance: "+Ne+" len: "+Ae+" bytes left: "+_);var Pe=d.transformDictionaryWord(p,Te,xe,Ae,Ve);if(P+=Pe,_-=Pe,(Te+=Pe)>=b){t.write(p,f);for(var Re=0;Re<Te-b;Re++)p[Re]=p[b+Re]}}else{if(Ee>0&&(g[3&B]=Ne,++B),Ae>_)throw new Error("Invalid backward reference. pos: "+P+" distance: "+Ne+" len: "+Ae+" bytes left: "+_);for(Ue=0;Ue<Ae;++Ue)p[P&h]=p[P-Ne&h],(P&h)===h&&t.write(p,f),++P,--_}F=p[P-1&h],q=p[P-2&h]}P&=1073741823}}t.write(p,P&h)}(n,h),h.pos<h.buffer.length&&(h.buffer=h.buffer.subarray(0,h.pos)),h.buffer},a.init()},588(e,t,n){var r=n(350);t.init=function(){return(0,n(327).BrotliDecompressBuffer)(r.toByteArray(n(558)))}},558(e){e.exports="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"},29(e,t,n){var r=n(588);t.init=function(){t.dictionary=r.init()},t.offsetsByLength=new Uint32Array([0,0,0,0,0,4096,9216,21504,35840,44032,53248,63488,74752,87040,93696,100864,104704,106752,108928,113536,115968,118528,119872,121280,122016]),t.sizeBitsByLength=new Uint8Array([0,0,0,0,10,10,11,11,10,10,10,10,10,9,9,8,7,7,8,7,7,6,6,5,5]),t.minDictionaryWordLength=4,t.maxDictionaryWordLength=24},956(e,t){function n(e,t){this.bits=e,this.value=t}t.z=n;function r(e,t){for(var n=1<<t-1;e&n;)n>>=1;return(e&n-1)+n}function i(e,t,r,i,o){do{e[t+(i-=r)]=new n(o.bits,o.value)}while(i>0)}function o(e,t,n){for(var r=1<<t-n;t<15&&!((r-=e[t])<=0);)++t,r<<=1;return t-n}t.u=function(e,t,a,s,f){var w,u,d,l,h,p,b,c,y,v,m=t,A=new Int32Array(16),E=new Int32Array(16);for(v=new Int32Array(f),u=0;u<f;u++)A[s[u]]++;for(E[1]=0,w=1;w<15;w++)E[w+1]=E[w]+A[w];for(u=0;u<f;u++)0!==s[u]&&(v[E[s[u]]++]=u);if(y=c=1<<(b=a),1===E[15]){for(d=0;d<y;++d)e[t+d]=new n(0,65535&v[0]);return y}for(d=0,u=0,w=1,l=2;w<=a;++w,l<<=1)for(;A[w]>0;--A[w])i(e,t+d,l,c,new n(255&w,65535&v[u++])),d=r(d,w);for(p=y-1,h=-1,w=a+1,l=2;w<=15;++w,l<<=1)for(;A[w]>0;--A[w])(d&p)!==h&&(t+=c,y+=c=1<<(b=o(A,w,a)),e[m+(h=d&p)]=new n(b+a&255,t-m-h&65535)),i(e,t+(d>>a),l,c,new n(w-a&255,65535&v[u++])),d=r(d,w);return y}},573(e,t){function n(e,t){this.offset=e,this.nbits=t}t.kBlockLengthPrefixCode=[new n(1,2),new n(5,2),new n(9,2),new n(13,2),new n(17,3),new n(25,3),new n(33,3),new n(41,3),new n(49,4),new n(65,4),new n(81,4),new n(97,4),new n(113,5),new n(145,5),new n(177,5),new n(209,5),new n(241,6),new n(305,6),new n(369,7),new n(497,8),new n(753,9),new n(1265,10),new n(2289,11),new n(4337,12),new n(8433,13),new n(16625,24)],t.kInsertLengthPrefixCode=[new n(0,0),new n(1,0),new n(2,0),new n(3,0),new n(4,0),new n(5,0),new n(6,1),new n(8,1),new n(10,2),new n(14,2),new n(18,3),new n(26,3),new n(34,4),new n(50,4),new n(66,5),new n(98,5),new n(130,6),new n(194,7),new n(322,8),new n(578,9),new n(1090,10),new n(2114,12),new n(6210,14),new n(22594,24)],t.kCopyLengthPrefixCode=[new n(2,0),new n(3,0),new n(4,0),new n(5,0),new n(6,0),new n(7,0),new n(8,0),new n(9,0),new n(10,1),new n(12,1),new n(14,2),new n(18,2),new n(22,3),new n(30,3),new n(38,4),new n(54,4),new n(70,5),new n(102,5),new n(134,6),new n(198,7),new n(326,8),new n(582,9),new n(1094,10),new n(2118,24)],t.kInsertRangeLut=[0,0,8,8,0,16,8,16,16],t.kCopyRangeLut=[0,8,0,8,16,0,16,8,16]},556(e,t){function n(e){this.buffer=e,this.pos=0}function r(e){this.buffer=e,this.pos=0}n.prototype.read=function(e,t,n){this.pos+n>this.buffer.length&&(n=this.buffer.length-this.pos);for(var r=0;r<n;r++)e[t+r]=this.buffer[this.pos+r];return this.pos+=n,n},t.z=n,r.prototype.write=function(e,t){if(this.pos+t>this.buffer.length)throw new Error("Output buffer is not large enough");return this.buffer.set(e.subarray(0,t),this.pos),this.pos+=t,t},t.y=r},33(e,t,n){var r=n(29),i=10,o=11;function a(e,t,n){this.prefix=new Uint8Array(e.length),this.transform=t,this.suffix=new Uint8Array(n.length);for(var r=0;r<e.length;r++)this.prefix[r]=e.charCodeAt(r);for(r=0;r<n.length;r++)this.suffix[r]=n.charCodeAt(r)}var s=[new a("",0,""),new a("",0," "),new a(" ",0," "),new a("",12,""),new a("",i," "),new a("",0," the "),new a(" ",0,""),new a("s ",0," "),new a("",0," of "),new a("",i,""),new a("",0," and "),new a("",13,""),new a("",1,""),new a(", ",0," "),new a("",0,", "),new a(" ",i," "),new a("",0," in "),new a("",0," to "),new a("e ",0," "),new a("",0,\'"\'),new a("",0,"."),new a("",0,\'">\'),new a("",0,"\\n"),new a("",3,""),new a("",0,"]"),new a("",0," for "),new a("",14,""),new a("",2,""),new a("",0," a "),new a("",0," that "),new a(" ",i,""),new a("",0,". "),new a(".",0,""),new a(" ",0,", "),new a("",15,""),new a("",0," with "),new a("",0,"\'"),new a("",0," from "),new a("",0," by "),new a("",16,""),new a("",17,""),new a(" the ",0,""),new a("",4,""),new a("",0,". The "),new a("",o,""),new a("",0," on "),new a("",0," as "),new a("",0," is "),new a("",7,""),new a("",1,"ing "),new a("",0,"\\n\\t"),new a("",0,":"),new a(" ",0,". "),new a("",0,"ed "),new a("",20,""),new a("",18,""),new a("",6,""),new a("",0,"("),new a("",i,", "),new a("",8,""),new a("",0," at "),new a("",0,"ly "),new a(" the ",0," of "),new a("",5,""),new a("",9,""),new a(" ",i,", "),new a("",i,\'"\'),new a(".",0,"("),new a("",o," "),new a("",i,\'">\'),new a("",0,\'="\'),new a(" ",0,"."),new a(".com/",0,""),new a(" the ",0," of the "),new a("",i,"\'"),new a("",0,". This "),new a("",0,","),new a(".",0," "),new a("",i,"("),new a("",i,"."),new a("",0," not "),new a(" ",0,\'="\'),new a("",0,"er "),new a(" ",o," "),new a("",0,"al "),new a(" ",o,""),new a("",0,"=\'"),new a("",o,\'"\'),new a("",i,". "),new a(" ",0,"("),new a("",0,"ful "),new a(" ",i,". "),new a("",0,"ive "),new a("",0,"less "),new a("",o,"\'"),new a("",0,"est "),new a(" ",i,"."),new a("",o,\'">\'),new a(" ",0,"=\'"),new a("",i,","),new a("",0,"ize "),new a("",o,"."),new a("Â ",0,""),new a(" ",0,","),new a("",i,\'="\'),new a("",o,\'="\'),new a("",0,"ous "),new a("",o,", "),new a("",i,"=\'"),new a(" ",i,","),new a(" ",o,\'="\'),new a(" ",o,", "),new a("",o,","),new a("",o,"("),new a("",o,". "),new a(" ",o,"."),new a("",o,"=\'"),new a(" ",o,". "),new a(" ",i,\'="\'),new a(" ",o,"=\'"),new a(" ",i,"=\'")];function f(e,t){return e[t]<192?(e[t]>=97&&e[t]<=122&&(e[t]^=32),1):e[t]<224?(e[t+1]^=32,2):(e[t+2]^=5,3)}t.kTransforms=s,t.kNumTransforms=s.length,t.transformDictionaryWord=function(e,t,n,a,w){var u,d=s[w].prefix,l=s[w].suffix,h=s[w].transform,p=h<12?0:h-11,b=0,c=t;p>a&&(p=a);for(var y=0;y<d.length;)e[t++]=d[y++];for(n+=p,a-=p,h<=9&&(a-=h),b=0;b<a;b++)e[t++]=r.dictionary[n+b];if(u=t-a,h===i)f(e,u);else if(h===o)for(;a>0;){var v=f(e,u);u+=v,a-=v}for(var m=0;m<l.length;)e[t++]=l[m++];return t-c}},727(e,t,n){e.exports=n(327).BrotliDecompressBuffer}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}(()=>{"use strict";const e={DATA_TYPE_DOUBLE:{ordinal:0,name:"double",size:8},DATA_TYPE_FLOAT:{ordinal:1,name:"float",size:4},DATA_TYPE_INT8:{ordinal:2,name:"int8",size:1},DATA_TYPE_UINT8:{ordinal:3,name:"uint8",size:1},DATA_TYPE_INT16:{ordinal:4,name:"int16",size:2},DATA_TYPE_UINT16:{ordinal:5,name:"uint16",size:2},DATA_TYPE_INT32:{ordinal:6,name:"int32",size:4},DATA_TYPE_UINT32:{ordinal:7,name:"uint32",size:4},DATA_TYPE_INT64:{ordinal:8,name:"int64",size:8},DATA_TYPE_UINT64:{ordinal:9,name:"uint64",size:8}};let t=0;for(const n in e)e[t]=e[n],t++;class r{constructor(e,t,n,r=[1/0,-1/0],i=void 0){this.name=e,this.type=t,this.numElements=n,this.range=r,this.uri=i,this.byteSize=this.numElements*this.type.size,this.description=""}}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,o,a,s=[],f=!0,w=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;f=!1}else for(;!(f=(r=o.call(n)).done)&&(s.push(r.value),s.length!==t);f=!0);}catch(e){w=!0,i=e}finally{try{if(!f&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(w)throw i}}return s}}(e,t)||a(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=a(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,f=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){f=!0,o=e},f:function(){try{s||null==n.return||n.return()}finally{if(f)throw o}}}}function a(e,t){if(e){if("string"==typeof e)return s(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}new r("POSITION_CARTESIAN",e.DATA_TYPE_FLOAT,3),new r("COLOR_PACKED",e.DATA_TYPE_INT8,4),new r("COLOR_PACKED",e.DATA_TYPE_INT8,4),new r("COLOR_PACKED",e.DATA_TYPE_INT8,3),new r("NORMAL_FLOATS",e.DATA_TYPE_FLOAT,3),new r("INTENSITY",e.DATA_TYPE_UINT16,1),new r("CLASSIFICATION",e.DATA_TYPE_UINT8,1),new r("NORMAL_SPHEREMAPPED",e.DATA_TYPE_UINT8,2),new r("NORMAL_OCT16",e.DATA_TYPE_UINT8,2),new r("NORMAL",e.DATA_TYPE_FLOAT,3),new r("RETURN_NUMBER",e.DATA_TYPE_UINT8,1),new r("NUMBER_OF_RETURNS",e.DATA_TYPE_UINT8,1),new r("SOURCE_ID",e.DATA_TYPE_UINT16,1),new r("INDICES",e.DATA_TYPE_UINT32,1),new r("SPACING",e.DATA_TYPE_FLOAT,1),new r("GPS_TIME",e.DATA_TYPE_DOUBLE,1);var f=n(727),w={int8:Int8Array,int16:Int16Array,int32:Int32Array,int64:Float64Array,uint8:Uint8Array,uint16:Uint16Array,uint32:Uint32Array,uint64:Float64Array,float:Float32Array,double:Float64Array};function u(e){var t=e;return(0&(t=(61440&(t=(786624&(t=(2130440&t)>>2|266305&t))>>4|12291&t))>>8|15&t))>>16|255&t}onmessage=function(t){var n,a=t.data,s=a.pointAttributes,d=a.scale,l=a.min,h=a.size,p=a.offset,b=a.numPoints,c=f(new Uint8Array(t.data.buffer),t.data.buffer.byteLength),y=new DataView(c.buffer),v={},m=32,A=new Uint32Array(Math.pow(m,3)),E=function(e,t,n){var r=m*e/h.x,i=m*t/h.y,o=m*n/h.z,a=Math.min(parseInt(r),31),s=Math.min(parseInt(i),31),f=Math.min(parseInt(o),31);return a+s*m+f*m*m},N=0,U=0,T=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],W=[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],O=o(s.attributes);try{for(O.s();!(n=O.n()).done;){var x=n.value;if(["POSITION_CARTESIAN","position"].includes(x.name)){for(var Y=new ArrayBuffer(4*b*3),I=new Float32Array(Y),V=0;V<b;V++){var P=y.getUint32(U+4,!0),R=y.getUint32(U+0,!0),M=y.getUint32(U+12,!0),g=y.getUint32(U+8,!0);U+=16;var B=u((16777215&g)>>>0)|u((g>>>24|M<<8)>>>0)<<8,F=u((16777215&g)>>>1)|u((g>>>24|M<<8)>>>1)<<8,q=u((16777215&g)>>>2)|u((g>>>24|M<<8)>>>2)<<8;0==R&&0==M||(B=B|u((16777215&R)>>>0)<<16|u((R>>>24|P<<8)>>>0)<<24,F=F|u((16777215&R)>>>1)<<16|u((R>>>24|P<<8)>>>1)<<24,q=q|u((16777215&R)>>>2)<<16|u((R>>>24|P<<8)>>>2)<<24);var H=parseInt(B)*d[0]+p[0]-l.x,D=parseInt(F)*d[1]+p[1]-l.y,Z=parseInt(q)*d[2]+p[2]-l.z;T[0]=Math.min(T[0],H),T[1]=Math.min(T[1],D),T[2]=Math.min(T[2],Z),W[0]=Math.max(W[0],H),W[1]=Math.max(W[1],D),W[2]=Math.max(W[2],Z),0===A[E(H,D,Z)]++&&N++,I[3*V+0]=H,I[3*V+1]=D,I[3*V+2]=Z}v[x.name]={buffer:Y,attribute:x}}else if(["RGBA","rgba"].includes(x.name)){for(var L=new ArrayBuffer(4*b),K=new Uint8Array(L),z=0;z<b;z++){var k=y.getUint32(U+4,!0),G=y.getUint32(U+0,!0);U+=8;var X=u((16777215&G)>>>0)|u((G>>>24|k<<8)>>>0)<<8,J=u((16777215&G)>>>1)|u((G>>>24|k<<8)>>>1)<<8,S=u((16777215&G)>>>2)|u((G>>>24|k<<8)>>>2)<<8;K[4*z+0]=X>255?X/256:X,K[4*z+1]=J>255?J/256:J,K[4*z+2]=S>255?S/256:S}v[x.name]={buffer:L,attribute:x}}else{var j=new ArrayBuffer(4*b),C=new Float32Array(j),Q=new(0,w[x.type.name])(b),_=0,$=1,ee={int8:y.getInt8,int16:y.getInt16,int32:y.getInt32,uint8:y.getUint8,uint16:y.getUint16,uint32:y.getUint32,float:y.getFloat32,double:y.getFloat64}[x.type.name].bind(y);if(x.type.size>4){var te=i(x.range,2),ne=te[0],re=te[1];_=ne,$=1/(re-ne)}for(var ie=0;ie<b;ie++){var oe=ee(U,!0);U+=x.byteSize,C[ie]=(oe-_)*$,Q[ie]=oe}v[x.name]={buffer:j,preciseBuffer:Q,attribute:x,offset:_,scale:$}}}}catch(e){O.e(e)}finally{O.f()}for(var ae=parseInt(b/N),se=new ArrayBuffer(4*b),fe=new Uint32Array(se),we=0;we<b;we++)fe[we]=we;v.INDICES={buffer:se,attribute:r.INDICES};var ue,de=o(s.vectors);try{for(de.s();!(ue=de.n()).done;){var le,he=ue.value,pe=he.name,be=he.attributes,ce=be.length,ye=new ArrayBuffer(ce*b*4),ve=new Float32Array(ye),me=0,Ae=o(be);try{for(Ae.s();!(le=Ae.n()).done;){for(var Ee=v[le.value],Ne=Ee.offset,Ue=Ee.scale,Te=new DataView(Ee.buffer),We=Te.getFloat32.bind(Te),Oe=0;Oe<b;Oe++){var xe=We(4*Oe,!0);ve[Oe*ce+me]=xe/Ue+Ne}me++}}catch(e){Ae.e(e)}finally{Ae.f()}var Ye=new r(pe,e.DATA_TYPE_FLOAT,3);v[pe]={buffer:ye,attribute:Ye}}}catch(e){de.e(e)}finally{de.f()}var Ie={buffer:c,attributeBuffers:v,density:ae,tightBoundingBox:{min:T,max:W}},Ve=[];for(var Pe in Ie.attributeBuffers)Ve.push(Ie.attributeBuffers[Pe].buffer);postMessage(Ie,Ve)}})()})();\n',
              'Worker',
              void 0,
              void 0,
            );
          }
        },
        257(t, e, n) {
          n.d(e, { A: () => o });
          var i = n(734),
            r = n.n(i);
          function o() {
            return r()(
              '(()=>{"use strict";const t={DATA_TYPE_DOUBLE:{ordinal:0,name:"double",size:8},DATA_TYPE_FLOAT:{ordinal:1,name:"float",size:4},DATA_TYPE_INT8:{ordinal:2,name:"int8",size:1},DATA_TYPE_UINT8:{ordinal:3,name:"uint8",size:1},DATA_TYPE_INT16:{ordinal:4,name:"int16",size:2},DATA_TYPE_UINT16:{ordinal:5,name:"uint16",size:2},DATA_TYPE_INT32:{ordinal:6,name:"int32",size:4},DATA_TYPE_UINT32:{ordinal:7,name:"uint32",size:4},DATA_TYPE_INT64:{ordinal:8,name:"int64",size:8},DATA_TYPE_UINT64:{ordinal:9,name:"uint64",size:8}};let e=0;for(const n in t)t[e]=t[n],e++;class n{constructor(t,e,n,r=[1/0,-1/0],a=void 0){this.name=t,this.type=e,this.numElements=n,this.range=r,this.uri=a,this.byteSize=this.numElements*this.type.size,this.description=""}}function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,i,o,u=[],A=!0,f=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;A=!1}else for(;!(A=(r=i.call(n)).done)&&(u.push(r.value),u.length!==e);A=!0);}catch(t){f=!0,a=t}finally{try{if(!A&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(f)throw a}}return u}}(t,e)||i(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=i(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,u=!0,A=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return u=t.done,t},e:function(t){A=!0,o=t},f:function(){try{u||null==n.return||n.return()}finally{if(A)throw o}}}}function i(t,e){if(t){if("string"==typeof t)return o(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}new n("POSITION_CARTESIAN",t.DATA_TYPE_FLOAT,3),new n("COLOR_PACKED",t.DATA_TYPE_INT8,4),new n("COLOR_PACKED",t.DATA_TYPE_INT8,4),new n("COLOR_PACKED",t.DATA_TYPE_INT8,3),new n("NORMAL_FLOATS",t.DATA_TYPE_FLOAT,3),new n("INTENSITY",t.DATA_TYPE_UINT16,1),new n("CLASSIFICATION",t.DATA_TYPE_UINT8,1),new n("NORMAL_SPHEREMAPPED",t.DATA_TYPE_UINT8,2),new n("NORMAL_OCT16",t.DATA_TYPE_UINT8,2),new n("NORMAL",t.DATA_TYPE_FLOAT,3),new n("RETURN_NUMBER",t.DATA_TYPE_UINT8,1),new n("NUMBER_OF_RETURNS",t.DATA_TYPE_UINT8,1),new n("SOURCE_ID",t.DATA_TYPE_UINT16,1),new n("INDICES",t.DATA_TYPE_UINT32,1),new n("SPACING",t.DATA_TYPE_FLOAT,1),new n("GPS_TIME",t.DATA_TYPE_DOUBLE,1);var u={int8:Int8Array,int16:Int16Array,int32:Int32Array,int64:Float64Array,uint8:Uint8Array,uint16:Uint16Array,uint32:Uint32Array,uint64:Float64Array,float:Float32Array,double:Float64Array};onmessage=function(e){var i,o=e.data,A=o.buffer,f=o.pointAttributes,T=o.scale,l=(o.name,o.min),s=(o.max,o.size),I=o.offset,_=o.numPoints,y=new DataView(A),m={},E=0,N=0,c=a(f.attributes);try{for(c.s();!(i=c.n()).done;)N+=i.value.byteSize}catch(t){c.e(t)}finally{c.f()}var b,d=32,h=new Uint32Array(Math.pow(d,3)),v=function(t,e,n){var r=d*t/s.x,a=d*e/s.y,i=d*n/s.z,o=Math.min(parseInt(r),31),u=Math.min(parseInt(a),31),A=Math.min(parseInt(i),31);return o+u*d+A*d*d},w=0,P=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],D=[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],Y=a(f.attributes);try{for(Y.s();!(b=Y.n()).done;){var O=b.value;if(["POSITION_CARTESIAN","position"].includes(O.name)){for(var U=new ArrayBuffer(4*_*3),g=new Float32Array(U),S=0;S<_;S++){var p=S*N,F=y.getInt32(p+E+0,!0)*T[0]+I[0]-l.x,M=y.getInt32(p+E+4,!0)*T[1]+I[1]-l.y,z=y.getInt32(p+E+8,!0)*T[2]+I[2]-l.z;P[0]=Math.min(P[0],F),P[1]=Math.min(P[1],M),P[2]=Math.min(P[2],z),D[0]=Math.max(D[0],F),D[1]=Math.max(D[1],M),D[2]=Math.max(D[2],z),0===h[v(F,M,z)]++&&w++,g[3*S+0]=F,g[3*S+1]=M,g[3*S+2]=z}m[O.name]={buffer:U,attribute:O}}else if(["RGBA","rgba"].includes(O.name)){for(var R=new ArrayBuffer(4*_),C=new Uint8Array(R),L=0;L<_;L++){var B=L*N,x=y.getUint16(B+E+0,!0),V=y.getUint16(B+E+2,!0),G=y.getUint16(B+E+4,!0);C[4*L+0]=x>255?x/256:x,C[4*L+1]=V>255?V/256:V,C[4*L+2]=G>255?G/256:G}m[O.name]={buffer:R,attribute:O}}else{var j=new ArrayBuffer(4*_),K=new Float32Array(j),H=new(0,u[O.type.name])(_),$=0,k=1,q={int8:y.getInt8,int16:y.getInt16,int32:y.getInt32,uint8:y.getUint8,uint16:y.getUint16,uint32:y.getUint32,float:y.getFloat32,double:y.getFloat64}[O.type.name].bind(y);if(O.type.size>4){var J=r(O.range,2),Q=J[0],W=J[1];$=Q,k=1/(W-Q)}for(var X=0;X<_;X++){var Z=q(X*N+E,!0);K[X]=(Z-$)*k,H[X]=Z}m[O.name]={buffer:j,preciseBuffer:H,attribute:O,offset:$,scale:k}}E+=O.byteSize}}catch(t){Y.e(t)}finally{Y.f()}for(var tt=parseInt(_/w),et=new ArrayBuffer(4*_),nt=new Uint32Array(et),rt=0;rt<_;rt++)nt[rt]=rt;m.INDICES={buffer:et,attribute:n.INDICES};var at,it=a(f.vectors);try{for(it.s();!(at=it.n()).done;){var ot,ut=at.value,At=ut.name,ft=ut.attributes,Tt=ft.length,lt=new ArrayBuffer(Tt*_*4),st=new Float32Array(lt),It=0,_t=a(ft);try{for(_t.s();!(ot=_t.n()).done;){for(var yt=m[ot.value],mt=yt.offset,Et=yt.scale,Nt=new DataView(yt.buffer),ct=Nt.getFloat32.bind(Nt),bt=0;bt<_;bt++){var dt=ct(4*bt,!0);st[bt*Tt+It]=dt/Et+mt}It++}}catch(t){_t.e(t)}finally{_t.f()}var ht=new n(At,t.DATA_TYPE_FLOAT,3);m[At]={buffer:lt,attribute:ht}}}catch(t){it.e(t)}finally{it.f()}var vt={buffer:A,attributeBuffers:m,density:tt,tightBoundingBox:{min:P,max:D}},wt=[];for(var Pt in vt.attributeBuffers)wt.push(vt.attributeBuffers[Pt].buffer);wt.push(A),postMessage(vt,wt)}})();\n',
              'Worker',
              void 0,
              void 0,
            );
          }
        },
        601(t, e, n) {
          n.d(e, { A: () => o });
          var i = n(734),
            r = n.n(i);
          function o() {
            return r()(
              '(()=>{"use strict";const e={DATA_TYPE_DOUBLE:{ordinal:0,name:"double",size:8},DATA_TYPE_FLOAT:{ordinal:1,name:"float",size:4},DATA_TYPE_INT8:{ordinal:2,name:"int8",size:1},DATA_TYPE_UINT8:{ordinal:3,name:"uint8",size:1},DATA_TYPE_INT16:{ordinal:4,name:"int16",size:2},DATA_TYPE_UINT16:{ordinal:5,name:"uint16",size:2},DATA_TYPE_INT32:{ordinal:6,name:"int32",size:4},DATA_TYPE_UINT32:{ordinal:7,name:"uint32",size:4},DATA_TYPE_INT64:{ordinal:8,name:"int64",size:8},DATA_TYPE_UINT64:{ordinal:9,name:"uint64",size:8}};let t=0;for(const n in e)e[t]=e[n],t++;class n{constructor(e,t,n,r=[1/0,-1/0],a=void 0){this.name=e,this.type=t,this.numElements=n,this.range=r,this.uri=a,this.byteSize=this.numElements*this.type.size,this.description=""}}function r(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return a(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var A,T=!0,o=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return T=e.done,e},e:function(e){o=!0,A=e},f:function(){try{T||null==n.return||n.return()}finally{if(o)throw A}}}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}new n("POSITION_CARTESIAN",e.DATA_TYPE_FLOAT,3),new n("COLOR_PACKED",e.DATA_TYPE_INT8,4),new n("COLOR_PACKED",e.DATA_TYPE_INT8,4),new n("COLOR_PACKED",e.DATA_TYPE_INT8,3),new n("NORMAL_FLOATS",e.DATA_TYPE_FLOAT,3),new n("INTENSITY",e.DATA_TYPE_UINT16,1),new n("CLASSIFICATION",e.DATA_TYPE_UINT8,1),new n("NORMAL_SPHEREMAPPED",e.DATA_TYPE_UINT8,2),new n("NORMAL_OCT16",e.DATA_TYPE_UINT8,2),new n("NORMAL",e.DATA_TYPE_FLOAT,3),new n("RETURN_NUMBER",e.DATA_TYPE_UINT8,1),new n("NUMBER_OF_RETURNS",e.DATA_TYPE_UINT8,1),new n("SOURCE_ID",e.DATA_TYPE_UINT16,1),new n("INDICES",e.DATA_TYPE_UINT32,1),new n("SPACING",e.DATA_TYPE_FLOAT,1),new n("GPS_TIME",e.DATA_TYPE_DOUBLE,1),Int8Array,Int16Array,Int32Array,Float64Array,Uint8Array,Uint16Array,Uint32Array,Float64Array,Float32Array,Float64Array,onmessage=function(t){var a,i=t.data,A=i.buffer,T=i.pointAttributes,o=(i.scale,i.name,i.min),u=(i.max,i.size),I=i.offset,s=i.numPoints,f=new DataView(A),_={},l=32,E=new Uint32Array(Math.pow(l,3)),N=function(e,t,n){var r=l*e/u.x,a=l*t/u.y,i=l*n/u.z,A=Math.min(parseInt(r),31),T=Math.min(parseInt(a),31),o=Math.min(parseInt(i),31);return A+T*l+o*l*l},m=0,y=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],c=[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],P=r(T.attributes);try{for(P.s();!(a=P.n()).done;){var D=a.value;if(["POSITION_CARTESIAN","position"].includes(D.name)){for(var b=new ArrayBuffer(4*s*3),h=new Float32Array(b),Y=0;Y<s;Y++){var w=12*Y,d=f.getFloat32(w+0,!0)+I[0]-o.x,O=f.getFloat32(w+4,!0)+I[1]-o.y,v=f.getFloat32(w+8,!0)+I[2]-o.z;y[0]=Math.min(y[0],d),y[1]=Math.min(y[1],O),y[2]=Math.min(y[2],v),c[0]=Math.max(c[0],d),c[1]=Math.max(c[1],O),c[2]=Math.max(c[2],v),0===E[N(d,O,v)]++&&m++,h[3*Y+0]=d,h[3*Y+1]=O,h[3*Y+2]=v}_[D.name]={buffer:b,attribute:D}}else["RGBA","rgba"].includes(D.name)&&(_[D.name]={buffer:A.slice(12*s),attribute:D})}}catch(e){P.e(e)}finally{P.f()}for(var F=parseInt(s/m),S=new ArrayBuffer(4*s),U=new Uint32Array(S),p=0;p<s;p++)U[p]=p;_.INDICES={buffer:S,attribute:n.INDICES};var M,g=r(T.vectors);try{for(g.s();!(M=g.n()).done;){var R,C=M.value,L=C.name,z=C.attributes,B=z.length,x=new ArrayBuffer(B*s*4),V=new Float32Array(x),G=0,K=r(z);try{for(K.s();!(R=K.n()).done;){for(var j=_[R.value],H=j.offset,$=j.scale,k=new DataView(j.buffer),q=k.getFloat32.bind(k),J=0;J<s;J++){var Q=q(4*J,!0);V[J*B+G]=Q/$+H}G++}}catch(e){K.e(e)}finally{K.f()}var W=new n(L,e.DATA_TYPE_FLOAT,3);_[L]={buffer:x,attribute:W}}}catch(e){g.e(e)}finally{g.f()}var X={buffer:A,attributeBuffers:_,density:F,tightBoundingBox:{min:y,max:c}},Z=[];for(var ee in X.attributeBuffers)Z.push(X.attributeBuffers[ee].buffer);Z.push(A),postMessage(X,Z)}})();\n',
              'Worker',
              void 0,
              void 0,
            );
          }
        },
        521(t, e, n) {
          n.d(e, { A: () => o });
          var i = n(734),
            r = n.n(i);
          function o() {
            return r()(
              '(()=>{"use strict";const r={DATA_TYPE_DOUBLE:{ordinal:0,name:"double",size:8},DATA_TYPE_FLOAT:{ordinal:1,name:"float",size:4},DATA_TYPE_INT8:{ordinal:2,name:"int8",size:1},DATA_TYPE_UINT8:{ordinal:3,name:"uint8",size:1},DATA_TYPE_INT16:{ordinal:4,name:"int16",size:2},DATA_TYPE_UINT16:{ordinal:5,name:"uint16",size:2},DATA_TYPE_INT32:{ordinal:6,name:"int32",size:4},DATA_TYPE_UINT32:{ordinal:7,name:"uint32",size:4},DATA_TYPE_INT64:{ordinal:8,name:"int64",size:8},DATA_TYPE_UINT64:{ordinal:9,name:"uint64",size:8}};let t=0;for(const e in r)r[t]=r[e],t++;class e{constructor(r,t,e,a=[1/0,-1/0],n=void 0){this.name=r,this.type=t,this.numElements=e,this.range=a,this.uri=n,this.byteSize=this.numElements*this.type.size,this.description=""}}function a(r){throw new TypeError(\'"\'+r+\'" is read-only\')}function n(r,t){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!e){if(Array.isArray(r)||(e=function(r,t){if(r){if("string"==typeof r)return i(r,t);var e={}.toString.call(r).slice(8,-1);return"Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e?Array.from(r):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?i(r,t):void 0}}(r))||t&&r&&"number"==typeof r.length){e&&(r=e);var a=0,n=function(){};return{s:n,n:function(){return a>=r.length?{done:!0}:{done:!1,value:r[a++]}},e:function(r){throw r},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,f=!0,A=!1;return{s:function(){e=e.call(r)},n:function(){var r=e.next();return f=r.done,r},e:function(r){A=!0,o=r},f:function(){try{f||null==e.return||e.return()}finally{if(A)throw o}}}}function i(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,a=Array(t);e<t;e++)a[e]=r[e];return a}new e("POSITION_CARTESIAN",r.DATA_TYPE_FLOAT,3),new e("COLOR_PACKED",r.DATA_TYPE_INT8,4),new e("COLOR_PACKED",r.DATA_TYPE_INT8,4),new e("COLOR_PACKED",r.DATA_TYPE_INT8,3),new e("NORMAL_FLOATS",r.DATA_TYPE_FLOAT,3),new e("INTENSITY",r.DATA_TYPE_UINT16,1),new e("CLASSIFICATION",r.DATA_TYPE_UINT8,1),new e("NORMAL_SPHEREMAPPED",r.DATA_TYPE_UINT8,2),new e("NORMAL_OCT16",r.DATA_TYPE_UINT8,2),new e("NORMAL",r.DATA_TYPE_FLOAT,3),new e("RETURN_NUMBER",r.DATA_TYPE_UINT8,1),new e("NUMBER_OF_RETURNS",r.DATA_TYPE_UINT8,1),new e("SOURCE_ID",r.DATA_TYPE_UINT16,1),new e("INDICES",r.DATA_TYPE_UINT32,1),new e("SPACING",r.DATA_TYPE_FLOAT,1),new e("GPS_TIME",r.DATA_TYPE_DOUBLE,1),Int8Array,Int16Array,Int32Array,Float64Array,Uint8Array,Uint16Array,Uint32Array,Float64Array,Float32Array,Float64Array,onmessage=function(t){var i,o,f,A=t.data,_=A.buffer,u=A.pointAttributes,l=(A.scale,A.name,A.min),s=(A.max,A.size),T=A.offset,y=A.numPoints,I=A.harmonicsEnabled,h=new DataView(_),w={},b=32,m=new Uint32Array(Math.pow(b,3)),N=function(r,t,e){var a=b*r/s.x,n=b*t/s.y,i=b*e/s.z,o=Math.min(parseInt(a),31),f=Math.min(parseInt(n),31),A=Math.min(parseInt(i),31);return o+f*b+A*b*b},E=function(r,t,e){return Math.max(Math.min(r,e),t)},d=0,c=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],v=[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],M=new ArrayBuffer(4*y*3),p=new Float32Array(M),O=new ArrayBuffer(4*y*4),F=new Float32Array(O),P=new ArrayBuffer(4*y*4),x=new Float32Array(P),D=new ArrayBuffer(4*y*4),z=new Float32Array(D),Y=new ArrayBuffer(4*y*4),C=new Float32Array(Y),S=new ArrayBuffer(4*y*45),g=new Float32Array(S),R=["sh_band_1_triplet_0","sh_band_1_triplet_1","sh_band_1_triplet_2","sh_band_2_triplet_0","sh_band_2_triplet_1","sh_band_2_triplet_2","sh_band_2_triplet_3","sh_band_2_triplet_4","sh_band_3_triplet_0","sh_band_3_triplet_1","sh_band_3_triplet_2","sh_band_3_triplet_3","sh_band_3_triplet_4","sh_band_3_triplet_5","sh_band_3_triplet_6"],U=n(u.attributes);try{for(U.s();!(i=U.n()).done;){var B=i.value;if(["POSITION_CARTESIAN","position"].includes(B.name)){for(var L=0;L<y;L++){var V=12*L,H=h.getFloat32(V+0,!0),G=h.getFloat32(V+4,!0),K=h.getFloat32(V+8,!0),j=H+T[0]-l.x,q=G+T[1]-l.y,$=K+T[2]-l.z;c[0]=Math.min(c[0],j),c[1]=Math.min(c[1],q),c[2]=Math.min(c[2],$),v[0]=Math.max(v[0],j),v[1]=Math.max(v[1],q),v[2]=Math.max(v[2],$),0===m[N(j,q,$)]++&&d++,x[4*L+0]=j,x[4*L+1]=q,x[4*L+2]=$,C[4*L+0]=H,C[4*L+1]=G,C[4*L+2]=K}w.raw_position={buffer:Y,attribute:"raw_position"},w.position={buffer:P,attribute:"position"}}else if(["sh_band_0"].includes(B.name))for(var k=.28209479177387814,J=0;J<y;J++){var Q=4*J+0,W=4*J+1,X=4*J+2,Z=4*J+3,rr=12*J+12*y,tr=4*J+24*y,er=h.getFloat32(rr+0,!0),ar=h.getFloat32(rr+4,!0),nr=h.getFloat32(rr+8,!0);z[Q]=255*(.5+k*er),z[W]=255*(.5+k*ar),z[X]=255*(.5+k*nr),z[Q]=E(Math.floor(z[Q]),0,255),z[W]=E(Math.floor(z[W]),0,255),z[X]=E(Math.floor(z[X]),0,255);var ir=h.getFloat32(tr,!0);ir=1/(1+Math.exp(-ir))*255,ir=E(Math.floor(ir),0,255),z[Z]=ir}else if(["scale"].includes(B.name)){for(var or=0,fr=0;fr<y;fr++){var Ar=12*fr+28*y,_r=h.getFloat32(Ar+0,!0),ur=h.getFloat32(Ar+4,!0),lr=h.getFloat32(Ar+8,!0);p[3*fr+0]=Math.exp(_r),p[3*fr+1]=Math.exp(ur),p[3*fr+2]=Math.exp(lr);var sr=Math.max(Math.exp(_r),Math.exp(ur));sr>or&&(or=sr)}w.scale={buffer:M,attribute:"scale"}}else if(["rotation"].includes(B.name)){for(var Tr={x:0,y:0,z:0,w:0},yr=0;yr<y;yr++){var Ir=16*yr+40*y,hr=h.getFloat32(Ir+0,!0),wr=h.getFloat32(Ir+4,!0),br=h.getFloat32(Ir+8,!0),mr=h.getFloat32(Ir+12,!0);Tr.x=hr,Tr.y=wr,Tr.z=br,Tr.w=mr;var Nr=Math.sqrt(hr*hr+wr*wr+br*br+mr*mr);0==Nr?(Tr.x=0,Tr.y=0,Tr.z=0,Tr.w=1):(Tr.x=hr/Nr,Tr.y=wr/Nr,Tr.z=br/Nr,Tr.w=mr/Nr),F[4*yr+0]=Tr.x,F[4*yr+1]=Tr.y,F[4*yr+2]=Tr.z,F[4*yr+3]=Tr.w}w.orientation={buffer:O,attribute:"orientation"}}else if(B.name.indexOf("triplet")>-1&&I)for(var Er=0;Er<y;Er++){var dr=R.indexOf(B.name),cr=12*Er+y*(56+12*dr),vr=h.getFloat32(cr+0,!0),Mr=h.getFloat32(cr+4,!0),pr=h.getFloat32(cr+8,!0);g[45*Er+3*dr+0]=vr,g[45*Er+3*dr+1]=Mr,g[45*Er+3*dr+2]=pr}}}catch(r){U.e(r)}finally{U.f()}for(var Or=function(r,t,e){var a=function(r,t){var e=new Array(16),a=r.x,n=r.y,i=r.z,o=r.w,f=a+a,A=n+n,_=i+i,u=a*f,l=a*A,s=a*_,T=n*A,y=n*_,I=i*_,h=o*f,w=o*A,b=o*_,m=t.x,N=t.y,E=t.z;e[0]=(1-(T+I))*m,e[1]=(l+b)*m,e[2]=(s-w)*m,e[3]=(l-b)*N,e[4]=(1-(u+I))*N,e[5]=(y+h)*N,e[6]=(s+w)*E,e[7]=(y-h)*E,e[8]=(1-(u+T))*E;var d,c,v,M,p,O,F,P,x,D,z,Y,C,S,g,R,U,B,L,V,H,G,K=e.map(function(r){return r}),j=K;return d=j[1],j[1]=j[3],j[3]=d,d=j[2],j[2]=j[6],j[6]=d,d=j[5],j[5]=j[7],j[7]=d,c=e,v=K,M=new Array(9),p=c[0],O=c[3],F=c[6],P=c[1],x=c[4],D=c[7],z=c[2],Y=c[5],C=c[8],S=v[0],g=v[3],R=v[6],U=v[1],B=v[4],L=v[7],V=v[2],H=v[5],G=v[8],M[0]=p*S+O*U+F*V,M[3]=p*g+O*B+F*H,M[6]=p*R+O*L+F*G,M[1]=P*S+x*U+D*V,M[4]=P*g+x*B+D*H,M[7]=P*R+x*L+D*G,M[2]=z*S+Y*U+C*V,M[5]=z*g+Y*B+C*H,M[8]=z*R+Y*L+C*G,M}(t,r);Pr[4*e+0]=a[0],Pr[4*e+1]=a[3],Pr[4*e+2]=a[6],Pr[4*e+3]=a[4],Dr[2*e+0]=a[7],Dr[2*e+1]=a[8]},Fr=new ArrayBuffer(4*y*4),Pr=new Float32Array(Fr),xr=new ArrayBuffer(4*y*2),Dr=new Float32Array(xr),zr=0;zr<y;zr++){var Yr={x:0,y:0,z:0,w:0},Cr={x:0,y:0,z:0};Yr.w=F[4*zr+0],Yr.x=F[4*zr+1],Yr.y=F[4*zr+2],Yr.z=F[4*zr+3],Cr.x=p[3*zr+0],Cr.y=p[3*zr+1],Cr.z=p[3*zr+2],Or(Cr,Yr,zr)}w.COVARIANCE0={buffer:Fr,attribute:e.COVARIANCE0},w.COVARIANCE1={buffer:xr,attribute:e.COVARIANCE1};for(var Sr=function(r){return r[0]+(r[1]<<8)+(r[2]<<16)+(r[3]<<24)},gr=Math.floor(255*Math.random()),Rr=Math.floor(255*Math.random()),Ur=Math.floor(255*Math.random()),Br=(o=new Float32Array(1),f=new Int32Array(o.buffer),function(r){return o[0]=r,f[0]}),Lr=new ArrayBuffer(4*y*4),Vr=new Int32Array(Lr),Hr=0;Hr<y;Hr++){var Gr={x:0,y:0,z:0,w:0},Kr={x:0,y:0,z:0};Gr.x=z[4*Hr+0],Gr.y=z[4*Hr+1],Gr.z=z[4*Hr+2],Gr.w=z[4*Hr+3],Kr.x=C[4*Hr+0],Kr.y=C[4*Hr+1],Kr.z=C[4*Hr+2];var jr=Sr([0*gr+1*Gr.x,0*Rr+1*Gr.y,0*Ur+1*Gr.z,Gr.w]);Kr.x=Br(Kr.x),Kr.y=Br(Kr.y),Kr.z=Br(Kr.z),Vr[4*Hr+0]=jr,Vr[4*Hr+1]=Kr.x,Vr[4*Hr+2]=Kr.y,Vr[4*Hr+3]=Kr.z}w.POS_COLOR={buffer:Lr,attribute:e.POS_COLOR};var qr=new ArrayBuffer(4*y*3),$r=new Uint32Array(qr),kr=new ArrayBuffer(4*y*5),Jr=new Uint32Array(kr),Qr=new ArrayBuffer(4*y*7),Wr=new Uint32Array(Qr);g=g.map(function(r,t){r=.5*(r=Math.min(Math.max(r,-1),1))+.5;var e=t%3==1?1023:2047;return Math.min(Math.max(Math.floor(r*e),0),e)});for(var Xr=0;Xr<y;Xr++)for(var Zr=0;Zr<15;Zr++){var rt=g[45*Xr+3*Zr+0],tt=g[45*Xr+3*Zr+1],et=g[45*Xr+3*Zr+2];Zr<3&&($r[3*Xr+Zr-0]=rt<<21|tt<<11|et),Zr>=3&&Zr<8&&(Jr[5*Xr+Zr-3]=rt<<21|tt<<11|et),Zr>=8&&(Wr[7*Xr+Zr-8]=rt<<21|tt<<11|et)}w.HARMONICS1={buffer:qr,attribute:"HARMONICS1"},w.HARMONICS2={buffer:kr,attribute:"HARMONICS2"},w.HARMONICS3={buffer:Qr,attribute:"HARMONICS3"};for(var at=parseInt(y/d),nt=new ArrayBuffer(4*y),it=new Uint32Array(nt),ot=0;ot<y;ot++)it[ot]=ot;w.INDICES={buffer:nt,attribute:e.INDICES};var ft,At=n(u.vectors);try{for(At.s();!(ft=At.n()).done;){var _t,ut=ft.value,lt=ut.name,st=ut.attributes,Tt=st.length,yt=new ArrayBuffer(Tt*y*4),It=new Float32Array(yt),ht=n(st);try{for(ht.s();!(_t=ht.n()).done;){for(var wt=w[_t.value],bt=wt.offset,mt=wt.scale,Nt=new DataView(wt.buffer),Et=Nt.getFloat32.bind(Nt),dt=0;dt<y;dt++){var ct=Et(4*dt,!0);It[dt*Tt+0]=ct/mt+bt}a("iElement")}}catch(r){ht.e(r)}finally{ht.f()}var vt=new e(lt,r.DATA_TYPE_FLOAT,3);w[lt]={buffer:yt,attribute:vt}}}catch(r){At.e(r)}finally{At.f()}var Mt={buffer:_,attributeBuffers:w,density:at,tightBoundingBox:{min:c,max:v}},pt=[];for(var Ot in Mt.attributeBuffers)pt.push(Mt.attributeBuffers[Ot].buffer);pt.push(_),postMessage(Mt,pt)}})();\n',
              'Worker',
              void 0,
              void 0,
            );
          }
        },
        62(t, e, n) {
          n.d(e, { A: () => o });
          var i = n(734),
            r = n.n(i);
          function o() {
            return r()(
              '(()=>{"use strict";var t;!function(t){t[t.POSITION_CARTESIAN=0]="POSITION_CARTESIAN",t[t.COLOR_PACKED=1]="COLOR_PACKED",t[t.COLOR_FLOATS_1=2]="COLOR_FLOATS_1",t[t.COLOR_FLOATS_255=3]="COLOR_FLOATS_255",t[t.NORMAL_FLOATS=4]="NORMAL_FLOATS",t[t.FILLER=5]="FILLER",t[t.INTENSITY=6]="INTENSITY",t[t.CLASSIFICATION=7]="CLASSIFICATION",t[t.NORMAL_SPHEREMAPPED=8]="NORMAL_SPHEREMAPPED",t[t.NORMAL_OCT16=9]="NORMAL_OCT16",t[t.NORMAL=10]="NORMAL"}(t||(t={}));const e={ordinal:1,size:4},n={ordinal:2,size:1},r={ordinal:3,size:1};function i(t,e,n){return{name:t,type:e,numElements:n,byteSize:n*e.size}}const s=i(t.COLOR_PACKED,n,4),a={POSITION_CARTESIAN:i(t.POSITION_CARTESIAN,e,3),RGBA_PACKED:s,COLOR_PACKED:s,RGB_PACKED:i(t.COLOR_PACKED,n,3),NORMAL_FLOATS:i(t.NORMAL_FLOATS,e,3),FILLER_1B:i(t.FILLER,r,1),INTENSITY:i(t.INTENSITY,{ordinal:5,size:2},1),CLASSIFICATION:i(t.CLASSIFICATION,r,1),NORMAL_SPHEREMAPPED:i(t.NORMAL_SPHEREMAPPED,r,2),NORMAL_OCT16:i(t.NORMAL_OCT16,r,2),NORMAL:i(t.NORMAL,e,3)};class o{constructor(t){this.versionMinor=0,this.version=t;const e=-1===t.indexOf(".")?t.length:t.indexOf(".");this.versionMajor=parseInt(t.substr(0,e),10),this.versionMinor=parseInt(t.substr(e+1),10),isNaN(this.versionMinor)&&(this.versionMinor=0)}newerThan(t){const e=new o(t);return this.versionMajor>e.versionMajor||this.versionMajor===e.versionMajor&&this.versionMinor>e.versionMinor}equalOrHigher(t){const e=new o(t);return this.versionMajor>e.versionMajor||this.versionMajor===e.versionMajor&&this.versionMinor>=e.versionMinor}upTo(t){return!this.newerThan(t)}}class u{constructor(t){this.tmp=new ArrayBuffer(4),this.tmpf=new Float32Array(this.tmp),this.tmpu8=new Uint8Array(this.tmp),this.u8=new Uint8Array(t)}getUint32(t){return this.u8[t+3]<<24|this.u8[t+2]<<16|this.u8[t+1]<<8|this.u8[t]}getUint16(t){return this.u8[t+1]<<8|this.u8[t]}getFloat32(t){const e=this.tmpu8,n=this.u8,r=this.tmpf;return e[0]=n[t+0],e[1]=n[t+1],e[2]=n[t+2],e[3]=n[t+3],r[0]}getUint8(t){return this.u8[t]}}const f=Math.sign||function(t){return 0==(t=+t)||t!=t?t:t<0?-1:1};function A(e,n){const r=function(e,n){switch(e.name){case t.POSITION_CARTESIAN:return function(t,e){const n=new ArrayBuffer(4*e.numPoints*3),r=new Float32Array(n);for(let t=0;t<e.numPoints;t++){let n,i,s;e.version.newerThan("1.3")?(n=e.data.getUint32(e.currentOffset+t*e.pointAttributes.byteSize+0)*e.scale,i=e.data.getUint32(e.currentOffset+t*e.pointAttributes.byteSize+4)*e.scale,s=e.data.getUint32(e.currentOffset+t*e.pointAttributes.byteSize+8)*e.scale):(n=e.data.getFloat32(t*e.pointAttributes.byteSize+0)+e.nodeOffset[0],i=e.data.getFloat32(t*e.pointAttributes.byteSize+4)+e.nodeOffset[1],s=e.data.getFloat32(t*e.pointAttributes.byteSize+8)+e.nodeOffset[2]),r[3*t+0]=n,r[3*t+1]=i,r[3*t+2]=s,e.mean[0]+=n/e.numPoints,e.mean[1]+=i/e.numPoints,e.mean[2]+=s/e.numPoints,e.tightBoxMin[0]=Math.min(e.tightBoxMin[0],n),e.tightBoxMin[1]=Math.min(e.tightBoxMin[1],i),e.tightBoxMin[2]=Math.min(e.tightBoxMin[2],s),e.tightBoxMax[0]=Math.max(e.tightBoxMax[0],n),e.tightBoxMax[1]=Math.max(e.tightBoxMax[1],i),e.tightBoxMax[2]=Math.max(e.tightBoxMax[2],s)}return{buffer:n,attribute:t}}(e,n);case t.COLOR_PACKED:return function(t,e){const n=new ArrayBuffer(3*e.numPoints),r=new Uint8Array(n);for(let t=0;t<e.numPoints;t++)r[3*t+0]=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+0),r[3*t+1]=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+1),r[3*t+2]=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+2);return{buffer:n,attribute:t}}(e,n);case t.INTENSITY:return function(t,e){const n=new ArrayBuffer(4*e.numPoints),r=new Float32Array(n);for(let t=0;t<e.numPoints;t++)r[t]=e.data.getUint16(e.currentOffset+t*e.pointAttributes.byteSize);return{buffer:n,attribute:t}}(e,n);case t.CLASSIFICATION:return function(t,e){const n=new ArrayBuffer(e.numPoints),r=new Uint8Array(n);for(let t=0;t<e.numPoints;t++)r[t]=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize);return{buffer:n,attribute:t}}(e,n);case t.NORMAL_SPHEREMAPPED:return function(t,e){const n=new ArrayBuffer(4*e.numPoints*3),r=new Float32Array(n);for(let t=0;t<e.numPoints;t++){let n=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+0)/255*2-1,i=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+1)/255*2-1,s=1;const a=n*-n+i*-i+1*s;s=a,n*=Math.sqrt(a),i*=Math.sqrt(a),n*=2,i*=2,s=2*s-1,r[3*t+0]=n,r[3*t+1]=i,r[3*t+2]=s}return{buffer:n,attribute:t}}(e,n);case t.NORMAL_OCT16:return function(t,e){const n=new ArrayBuffer(4*e.numPoints*3),r=new Float32Array(n);for(let t=0;t<e.numPoints;t++){const n=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+0)/255*2-1,i=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+1)/255*2-1;let s=1-Math.abs(n)-Math.abs(i),a=0,o=0;s>=0?(a=n,o=i):(a=-(i/f(i)-1)/f(n),o=-(n/f(n)-1)/f(i));const u=Math.sqrt(a*a+o*o+s*s);a/=u,o/=u,s/=u,r[3*t+0]=a,r[3*t+1]=o,r[3*t+2]=s}return{buffer:n,attribute:t}}(e,n);case t.NORMAL:return function(t,e){const n=new ArrayBuffer(4*e.numPoints*3),r=new Float32Array(n);for(let t=0;t<e.numPoints;t++){const n=e.data.getFloat32(e.currentOffset+t*e.pointAttributes.byteSize+0),i=e.data.getFloat32(e.currentOffset+t*e.pointAttributes.byteSize+4),s=e.data.getFloat32(e.currentOffset+t*e.pointAttributes.byteSize+8);r[3*t+0]=n,r[3*t+1]=i,r[3*t+2]=s}return{buffer:n,attribute:t}}(e,n);default:return}}(e,n);void 0!==r&&(n.attributeBuffers[r.attribute.name]=r,n.transferables.push(r.buffer))}onmessage=function(e){const n=e.data.buffer,r=e.data.pointAttributes,i={attributeBuffers:{},currentOffset:0,data:new u(n),mean:[0,0,0],nodeOffset:e.data.offset,numPoints:e.data.buffer.byteLength/r.byteSize,pointAttributes:r,scale:e.data.scale,tightBoxMax:[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],tightBoxMin:[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],transferables:[],version:new o(e.data.version)};for(const t of i.pointAttributes.attributes)A(t,i),i.currentOffset+=t.byteSize;const s=new ArrayBuffer(4*i.numPoints),f=new Uint32Array(s);for(let t=0;t<i.numPoints;t++)f[t]=t;i.attributeBuffers[t.CLASSIFICATION]||function(e){const n=new ArrayBuffer(4*e.numPoints),r=new Float32Array(n);for(let t=0;t<e.numPoints;t++)r[t]=0;e.attributeBuffers[t.CLASSIFICATION]={buffer:n,attribute:a.CLASSIFICATION}}(i);const O={buffer:n,mean:i.mean,attributeBuffers:i.attributeBuffers,tightBoundingBox:{min:i.tightBoxMin,max:i.tightBoxMax},indices:s};postMessage(O,i.transferables)}})();\n',
              'Worker',
              void 0,
              void 0,
            );
          }
        },
        734(t) {
          t.exports = function (t, e, n, i) {
            var r = self || window;
            try {
              try {
                var o;
                try {
                  o = new r.Blob([t]);
                } catch (e) {
                  ((o = new (
                    r.BlobBuilder ||
                    r.WebKitBlobBuilder ||
                    r.MozBlobBuilder ||
                    r.MSBlobBuilder
                  )()).append(t),
                    (o = o.getBlob()));
                }
                var s = r.URL || r.webkitURL,
                  a = s.createObjectURL(o),
                  l = new r[e](a, n);
                return (s.revokeObjectURL(a), l);
              } catch (i) {
                return new r[e]('data:application/javascript,'.concat(encodeURIComponent(t)), n);
              }
            } catch (t) {
              if (!i) throw Error('Inline worker is not supported');
              return new r[e](i, n);
            }
          };
        },
        604(e) {
          e.exports = t;
        },
      },
      n = {};
    function i(t) {
      var r = n[t];
      if (void 0 !== r) return r.exports;
      var o = (n[t] = { exports: {} });
      return (e[t](o, o.exports, i), o.exports);
    }
    ((i.n = (t) => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return (i.d(e, { a: e }), e);
    }),
      (i.d = (t, e) => {
        for (var n in e)
          i.o(e, n) && !i.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
      }),
      (i.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (i.r = (t) => {
        ('undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 }));
      }));
    var r = {};
    (i.r(r),
      i.d(r, {
        BlurMaterial: () => p,
        ClipMode: () => o,
        GRAYSCALE: () => T,
        INFERNO: () => I,
        NormalFilteringMode: () => f,
        PLASMA: () => E,
        POINT_ATTRIBUTES: () => X,
        POINT_ATTRIBUTE_TYPES: () => q,
        PointAttributeName: () => k,
        PointAttributes: () => Z,
        PointCloudMaterial: () => V,
        PointCloudMixingMode: () => c,
        PointCloudOctree: () => dt,
        PointCloudOctreeGeometry: () => nt,
        PointCloudOctreeGeometryNode: () => et,
        PointCloudOctreeNode: () => it,
        PointCloudOctreePicker: () => ot,
        PointCloudTree: () => at,
        PointColorType: () => d,
        PointOpacityType: () => u,
        PointShape: () => a,
        PointSizeType: () => s,
        Potree: () => Zt,
        QueueItem: () => jt,
        RAINBOW: () => N,
        SPECTRAL: () => O,
        SplatsMesh: () => ut,
        TreeType: () => l,
        V1_LOADER: () => bt,
        V2_LOADER: () => Yt,
        VIRIDIS: () => P,
        Version: () => yt,
        YELLOW_GREEN: () => S,
        generateClassificationTexture: () => R,
        generateDataTexture: () => C,
        generateGradientTexture: () => D,
      }));
    var o,
      s,
      a,
      l,
      u,
      d,
      f,
      c,
      h = i(604);
    class p extends h.ShaderMaterial {
      constructor() {
        (super(...arguments),
          (this.vertexShader = i(850)),
          (this.fragmentShader = i(539)),
          (this.uniforms = {
            screenWidth: { type: 'f', value: 0 },
            screenHeight: { type: 'f', value: 0 },
            map: { type: 't', value: null },
          }));
      }
    }
    (!(function (t) {
      ((t[(t.DISABLED = 0)] = 'DISABLED'),
        (t[(t.CLIP_OUTSIDE = 1)] = 'CLIP_OUTSIDE'),
        (t[(t.HIGHLIGHT_INSIDE = 2)] = 'HIGHLIGHT_INSIDE'),
        (t[(t.CLIP_HORIZONTALLY = 3)] = 'CLIP_HORIZONTALLY'),
        (t[(t.CLIP_VERTICALLY = 4)] = 'CLIP_VERTICALLY'),
        (t[(t.CLIP_INSIDE = 5)] = 'CLIP_INSIDE'));
    })(o || (o = {})),
      (function (t) {
        ((t[(t.FIXED = 0)] = 'FIXED'),
          (t[(t.ATTENUATED = 1)] = 'ATTENUATED'),
          (t[(t.ADAPTIVE = 2)] = 'ADAPTIVE'));
      })(s || (s = {})),
      (function (t) {
        ((t[(t.SQUARE = 0)] = 'SQUARE'),
          (t[(t.CIRCLE = 1)] = 'CIRCLE'),
          (t[(t.PARABOLOID = 2)] = 'PARABOLOID'));
      })(a || (a = {})),
      (function (t) {
        ((t[(t.OCTREE = 0)] = 'OCTREE'), (t[(t.KDTREE = 1)] = 'KDTREE'));
      })(l || (l = {})),
      (function (t) {
        ((t[(t.FIXED = 0)] = 'FIXED'), (t[(t.ATTENUATED = 1)] = 'ATTENUATED'));
      })(u || (u = {})),
      (function (t) {
        ((t[(t.RGB = 0)] = 'RGB'),
          (t[(t.COLOR = 1)] = 'COLOR'),
          (t[(t.DEPTH = 2)] = 'DEPTH'),
          (t[(t.HEIGHT = 3)] = 'HEIGHT'),
          (t[(t.ELEVATION = 3)] = 'ELEVATION'),
          (t[(t.INTENSITY = 4)] = 'INTENSITY'),
          (t[(t.INTENSITY_GRADIENT = 5)] = 'INTENSITY_GRADIENT'),
          (t[(t.LOD = 6)] = 'LOD'),
          (t[(t.LEVEL_OF_DETAIL = 6)] = 'LEVEL_OF_DETAIL'),
          (t[(t.POINT_INDEX = 7)] = 'POINT_INDEX'),
          (t[(t.CLASSIFICATION = 8)] = 'CLASSIFICATION'),
          (t[(t.RETURN_NUMBER = 9)] = 'RETURN_NUMBER'),
          (t[(t.SOURCE = 10)] = 'SOURCE'),
          (t[(t.NORMAL = 11)] = 'NORMAL'),
          (t[(t.PHONG = 12)] = 'PHONG'),
          (t[(t.RGB_HEIGHT = 13)] = 'RGB_HEIGHT'),
          (t[(t.COMPOSITE = 50)] = 'COMPOSITE'));
      })(d || (d = {})),
      (function (t) {
        ((t[(t.ABSOLUTE_NORMAL_FILTERING_MODE = 1)] = 'ABSOLUTE_NORMAL_FILTERING_MODE'),
          (t[(t.LESS_EQUAL_NORMAL_FILTERING_MODE = 2)] = 'LESS_EQUAL_NORMAL_FILTERING_MODE'),
          (t[(t.GREATER_NORMAL_FILTERING_MODE = 3)] = 'GREATER_NORMAL_FILTERING_MODE'));
      })(f || (f = {})),
      (function (t) {
        ((t[(t.CHECKBOARD = 1)] = 'CHECKBOARD'), (t[(t.STRIPES = 2)] = 'STRIPES'));
      })(c || (c = {})));
    const m = 'PerspectiveCamera',
      g = new h.Color(0, 0, 0),
      A = new h.Vector4(1, 0, 0, 1);
    function y(t) {
      return parseInt(t.charAt(t.length - 1), 10);
    }
    function v(t, e) {
      const n = t.name,
        i = e.name;
      return n.length !== i.length ? n.length - i.length : n < i ? -1 : n > i ? 1 : 0;
    }
    function b(t) {
      if (200 !== t.status) throw Error('Response error');
      return t;
    }
    function w(t) {
      if (!t || 0 === t.byteLength) throw Error('Empty buffer');
      return t;
    }
    const x = {
        0: new h.Vector4(0.5, 0.5, 0.5, 1),
        1: new h.Vector4(0.5, 0.5, 0.5, 1),
        2: new h.Vector4(0.63, 0.32, 0.18, 1),
        3: new h.Vector4(0, 1, 0, 1),
        4: new h.Vector4(0, 0.8, 0, 1),
        5: new h.Vector4(0, 0.6, 0, 1),
        6: new h.Vector4(1, 0.66, 0, 1),
        7: new h.Vector4(1, 0, 1, 1),
        8: new h.Vector4(1, 0, 0, 1),
        9: new h.Vector4(0, 0, 1, 1),
        12: new h.Vector4(1, 1, 0, 1),
        DEFAULT: new h.Vector4(0.3, 0.6, 0.6, 0.5),
      },
      T = [
        [0, new h.Color(0, 0, 0)],
        [1, new h.Color(1, 1, 1)],
      ],
      I = [
        [0, new h.Color(0.077, 0.042, 0.206)],
        [0.1, new h.Color(0.225, 0.036, 0.388)],
        [0.2, new h.Color(0.373, 0.074, 0.432)],
        [0.3, new h.Color(0.522, 0.128, 0.42)],
        [0.4, new h.Color(0.665, 0.182, 0.37)],
        [0.5, new h.Color(0.797, 0.255, 0.287)],
        [0.6, new h.Color(0.902, 0.364, 0.184)],
        [0.7, new h.Color(0.969, 0.516, 0.063)],
        [0.8, new h.Color(0.988, 0.683, 0.072)],
        [0.9, new h.Color(0.961, 0.859, 0.298)],
        [1, new h.Color(0.988, 0.998, 0.645)],
      ],
      E = [
        [0, new h.Color(0.241, 0.015, 0.61)],
        [0.1, new h.Color(0.387, 0.001, 0.654)],
        [0.2, new h.Color(0.524, 0.025, 0.653)],
        [0.3, new h.Color(0.651, 0.125, 0.596)],
        [0.4, new h.Color(0.752, 0.227, 0.513)],
        [0.5, new h.Color(0.837, 0.329, 0.431)],
        [0.6, new h.Color(0.907, 0.435, 0.353)],
        [0.7, new h.Color(0.963, 0.554, 0.272)],
        [0.8, new h.Color(0.992, 0.681, 0.195)],
        [0.9, new h.Color(0.987, 0.822, 0.144)],
        [1, new h.Color(0.94, 0.975, 0.131)],
      ],
      N = [
        [0, new h.Color(0.278, 0, 0.714)],
        [1 / 6, new h.Color(0, 0, 1)],
        [2 / 6, new h.Color(0, 1, 1)],
        [0.5, new h.Color(0, 1, 0)],
        [4 / 6, new h.Color(1, 1, 0)],
        [5 / 6, new h.Color(1, 0.64, 0)],
        [1, new h.Color(1, 0, 0)],
      ],
      O = [
        [0, new h.Color(0.3686, 0.3098, 0.6353)],
        [0.1, new h.Color(0.1961, 0.5333, 0.7412)],
        [0.2, new h.Color(0.4, 0.7608, 0.6471)],
        [0.3, new h.Color(0.6706, 0.8667, 0.6431)],
        [0.4, new h.Color(0.902, 0.9608, 0.5961)],
        [0.5, new h.Color(1, 1, 0.749)],
        [0.6, new h.Color(0.9961, 0.8784, 0.5451)],
        [0.7, new h.Color(0.9922, 0.6824, 0.3804)],
        [0.8, new h.Color(0.9569, 0.4275, 0.2627)],
        [0.9, new h.Color(0.8353, 0.2431, 0.3098)],
        [1, new h.Color(0.6196, 0.0039, 0.2588)],
      ],
      P = [
        [0, new h.Color(0.267, 0.005, 0.329)],
        [0.1, new h.Color(0.283, 0.141, 0.458)],
        [0.2, new h.Color(0.254, 0.265, 0.53)],
        [0.3, new h.Color(0.207, 0.372, 0.553)],
        [0.4, new h.Color(0.164, 0.471, 0.558)],
        [0.5, new h.Color(0.128, 0.567, 0.551)],
        [0.6, new h.Color(0.135, 0.659, 0.518)],
        [0.7, new h.Color(0.267, 0.749, 0.441)],
        [0.8, new h.Color(0.478, 0.821, 0.318)],
        [0.9, new h.Color(0.741, 0.873, 0.15)],
        [1, new h.Color(0.993, 0.906, 0.144)],
      ],
      S = [
        [0, new h.Color(0.1647, 0.2824, 0.3451)],
        [0.1, new h.Color(0.1338, 0.3555, 0.4227)],
        [0.2, new h.Color(0.061, 0.4319, 0.4864)],
        [0.3, new h.Color(0, 0.5099, 0.5319)],
        [0.4, new h.Color(0, 0.5881, 0.5569)],
        [0.5, new h.Color(0.137, 0.665, 0.5614)],
        [0.6, new h.Color(0.2906, 0.7395, 0.5477)],
        [0.7, new h.Color(0.4453, 0.8099, 0.5201)],
        [0.8, new h.Color(0.6102, 0.8748, 0.485)],
        [0.9, new h.Color(0.7883, 0.9323, 0.4514)],
        [1, new h.Color(0.9804, 0.9804, 0.4314)],
      ];
    function C(t, e, n) {
      const i = t * e,
        r = new Uint8Array(4 * i),
        o = Math.floor(255 * n.r),
        s = Math.floor(255 * n.g),
        a = Math.floor(255 * n.b);
      for (let t = 0; t < i; t++) ((r[3 * t] = o), (r[3 * t + 1] = s), (r[3 * t + 2] = a));
      const l = new h.DataTexture(r, t, e, h.RGBAFormat);
      return ((l.needsUpdate = !0), (l.magFilter = h.NearestFilter), l);
    }
    function D(t) {
      const e = 64,
        n = document.createElement('canvas');
      ((n.width = e), (n.height = e));
      const i = n.getContext('2d');
      i.rect(0, 0, e, e);
      const r = i.createLinearGradient(0, 0, e, e);
      for (let e = 0; e < t.length; e++) {
        const n = t[e];
        r.addColorStop(n[0], `#${n[1].getHexString()}`);
      }
      ((i.fillStyle = r), i.fill());
      const o = new h.CanvasTexture(n);
      return ((o.needsUpdate = !0), (o.minFilter = h.LinearFilter), o);
    }
    function R(t) {
      const e = new Uint8Array(262144);
      for (let n = 0; n < 256; n++)
        for (let i = 0; i < 256; i++) {
          const r = n + 256 * i;
          let o;
          ((o = t[n] ? t[n] : t[n % 32] ? t[n % 32] : t.DEFAULT),
            (e[4 * r + 0] = 255 * o.x),
            (e[4 * r + 1] = 255 * o.y),
            (e[4 * r + 2] = 255 * o.z),
            (e[4 * r + 3] = 255 * o.w));
        }
      const n = new h.DataTexture(e, 256, 256, h.RGBAFormat);
      return ((n.magFilter = h.NearestFilter), (n.needsUpdate = !0), n);
    }
    var B = function (t, e, n, i) {
      var r,
        o = arguments.length,
        s = o < 3 ? e : null === i ? (i = Object.getOwnPropertyDescriptor(e, n)) : i;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, n, i);
      else
        for (var a = t.length - 1; a >= 0; a--)
          (r = t[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(e, n, s) : r(e, n)) || s);
      return (o > 3 && s && Object.defineProperty(e, n, s), s);
    };
    const M = { [l.OCTREE]: 'tree_type_octree', [l.KDTREE]: 'tree_type_kdtree' },
      U = {
        [s.FIXED]: 'fixed_point_size',
        [s.ATTENUATED]: 'attenuated_point_size',
        [s.ADAPTIVE]: 'adaptive_point_size',
      },
      L = { [u.ATTENUATED]: 'attenuated_opacity', [u.FIXED]: 'fixed_opacity' },
      z = {
        [a.SQUARE]: 'square_point_shape',
        [a.CIRCLE]: 'circle_point_shape',
        [a.PARABOLOID]: 'paraboloid_point_shape',
      },
      F = {
        [d.RGB]: 'color_type_rgb',
        [d.COLOR]: 'color_type_color',
        [d.DEPTH]: 'color_type_depth',
        [d.HEIGHT]: 'color_type_height',
        [d.INTENSITY]: 'color_type_intensity',
        [d.INTENSITY_GRADIENT]: 'color_type_intensity_gradient',
        [d.LOD]: 'color_type_lod',
        [d.POINT_INDEX]: 'color_type_point_index',
        [d.CLASSIFICATION]: 'color_type_classification',
        [d.RETURN_NUMBER]: 'color_type_return_number',
        [d.SOURCE]: 'color_type_source',
        [d.NORMAL]: 'color_type_normal',
        [d.PHONG]: 'color_type_phong',
        [d.RGB_HEIGHT]: 'color_type_rgb_height',
        [d.COMPOSITE]: 'color_type_composite',
      },
      _ = {
        [o.DISABLED]: 'clip_disabled',
        [o.CLIP_OUTSIDE]: 'clip_outside',
        [o.HIGHLIGHT_INSIDE]: 'clip_highlight_inside',
        [o.CLIP_HORIZONTALLY]: 'clip_horizontally',
        [o.CLIP_VERTICALLY]: 'clip_vertically',
        [o.CLIP_INSIDE]: 'clip_inside',
      };
    class V extends h.RawShaderMaterial {
      constructor(t = {}) {
        (super(),
          (this.useDrawingBufferSize = !1),
          (this.lights = !1),
          (this.fog = !1),
          (this.colorRgba = !1),
          (this.numClipBoxes = 0),
          (this.clipBoxes = []),
          (this.visibleNodeTextureOffsets = new Map()),
          (this._gradient = O),
          (this.gradientTexture = D(this._gradient)),
          (this._classification = x),
          (this.classificationTexture = R(this._classification)),
          (this.uniforms = {
            bbSize: Y('fv', [0, 0, 0]),
            blendDepthSupplement: Y('f', 0),
            blendHardness: Y('f', 2),
            classificationLUT: Y('t', this.classificationTexture || new h.Texture()),
            clipBoxCount: Y('f', 0),
            clipBoxes: Y('Matrix4fv', []),
            clipExtent: Y('fv', [0, 0, 1, 1]),
            depthMap: Y('t', null),
            diffuse: Y('fv', [1, 1, 1]),
            fov: Y('f', 1),
            gradient: Y('t', this.gradientTexture || new h.Texture()),
            heightMax: Y('f', 1),
            heightMin: Y('f', 0),
            intensityBrightness: Y('f', 0),
            intensityContrast: Y('f', 0),
            intensityGamma: Y('f', 1),
            intensityRange: Y('fv', [0, 65e3]),
            isLeafNode: Y('b', 0),
            level: Y('f', 0),
            maxSize: Y('f', 50),
            minSize: Y('f', 1),
            octreeSize: Y('f', 0),
            opacity: Y('f', 1),
            pcIndex: Y('f', 0),
            rgbBrightness: Y('f', 0),
            rgbContrast: Y('f', 0),
            rgbGamma: Y('f', 1),
            screenHeight: Y('f', 1),
            screenWidth: Y('f', 1),
            size: Y('f', 1),
            spacing: Y('f', 1),
            toModel: Y('Matrix4f', []),
            transition: Y('f', 0.5),
            uColor: Y('c', new h.Color(16777215)),
            visibleNodes: Y('t', this.visibleNodesTexture || new h.Texture()),
            vnStart: Y('f', 0),
            wClassification: Y('f', 0),
            wElevation: Y('f', 0),
            wIntensity: Y('f', 0),
            wReturnNumber: Y('f', 0),
            wRGB: Y('f', 1),
            wSourceID: Y('f', 0),
            opacityAttenuation: Y('f', 1),
            filterByNormalThreshold: Y('f', 0),
            classificationFilter: Y('iv', new Array(256).fill(!1)),
            highlightedPointCoordinate: Y('fv', new h.Vector3()),
            highlightedPointColor: Y('fv', A.clone()),
            enablePointHighlighting: Y('b', !0),
            highlightedPointScale: Y('f', 2),
            backgroundMap: Y('t', null),
            normalFilteringMode: Y('i', f.ABSOLUTE_NORMAL_FILTERING_MODE),
            pointCloudID: Y('f', 2),
            pointCloudMixingMode: Y('i', c.CHECKBOARD),
            stripeDistanceX: Y('f', 5),
            stripeDistanceY: Y('f', 5),
            stripeDivisorX: Y('f', 2),
            stripeDivisorY: Y('f', 2),
            pointCloudMixAngle: Y('f', 31),
            renderDepth: Y('bool', !1),
          }),
          (this.useClipBox = !1),
          (this.weighted = !1),
          (this.pointColorType = d.RGB),
          (this.pointSizeType = s.ADAPTIVE),
          (this.clipMode = o.DISABLED),
          (this.useEDL = !1),
          (this.shape = a.SQUARE),
          (this.treeType = l.OCTREE),
          (this.pointOpacityType = u.FIXED),
          (this.useFilterByNormal = !1),
          (this.useFilterByClassification = !1),
          (this.useTextureBlending = !1),
          (this.usePointCloudMixing = !1),
          (this.highlightPoint = !1),
          (this.attributes = {
            position: { type: 'fv', value: [] },
            color: { type: 'fv', value: [] },
            normal: { type: 'fv', value: [] },
            intensity: { type: 'f', value: [] },
            classification: { type: 'f', value: [] },
            returnNumber: { type: 'f', value: [] },
            numberOfReturns: { type: 'f', value: [] },
            pointSourceID: { type: 'f', value: [] },
            indices: { type: 'fv', value: [] },
          }),
          (this.glslVersion = h.GLSL3));
        const e = (this.visibleNodesTexture = C(2048, 1, new h.Color(16777215)));
        ((e.minFilter = h.NearestFilter),
          (e.magFilter = h.NearestFilter),
          this.setUniform('visibleNodes', e),
          (this.treeType = H(t.treeType, l.OCTREE)),
          (this.size = H(t.size, 1)),
          (this.minSize = H(t.minSize, 2)),
          (this.maxSize = H(t.maxSize, 50)),
          (this.colorRgba = Boolean(t.colorRgba)),
          (this.classification = x),
          (this.defaultAttributeValues.normal = [0, 0, 0]),
          (this.defaultAttributeValues.classification = [0, 0, 0]),
          (this.defaultAttributeValues.indices = [0, 0, 0, 0]),
          (this.vertexColors = !0),
          this.updateShaderSource());
      }
      dispose() {
        (super.dispose(),
          this.gradientTexture && (this.gradientTexture.dispose(), (this.gradientTexture = void 0)),
          this.visibleNodesTexture &&
            (this.visibleNodesTexture.dispose(), (this.visibleNodesTexture = void 0)),
          this.clearVisibleNodeTextureOffsets(),
          this.classificationTexture &&
            (this.classificationTexture.dispose(), (this.classificationTexture = void 0)),
          this.depthMap && (this.depthMap.dispose(), (this.depthMap = void 0)),
          this.backgroundMap && (this.backgroundMap.dispose(), (this.backgroundMap = void 0)));
      }
      clearVisibleNodeTextureOffsets() {
        this.visibleNodeTextureOffsets.clear();
      }
      updateShaderSource() {
        ((this.vertexShader = this.applyDefines(i(600).A)),
          (this.fragmentShader = this.applyDefines(i(61).A)),
          1 === this.opacity
            ? ((this.blending = h.NoBlending),
              (this.transparent = !1),
              (this.depthTest = !0),
              (this.depthWrite = !0),
              (this.depthFunc = h.LessEqualDepth))
            : this.opacity < 1 &&
              !this.useEDL &&
              ((this.blending = h.AdditiveBlending),
              (this.transparent = !0),
              (this.depthTest = !1),
              (this.depthWrite = !0)),
          this.weighted &&
            ((this.blending = h.AdditiveBlending),
            (this.transparent = !0),
            (this.depthTest = !0),
            (this.depthWrite = !1),
            (this.depthFunc = h.LessEqualDepth)),
          (this.needsUpdate = !0));
      }
      applyDefines(t) {
        const e = [];
        function n(t) {
          t && e.push(`#define ${t}`);
        }
        return (
          n(M[this.treeType]),
          n(U[this.pointSizeType]),
          n(z[this.shape]),
          n(F[this.pointColorType]),
          n(_[this.clipMode]),
          n(L[this.pointOpacityType]),
          (1 === this.rgbGamma && 0 === this.rgbBrightness && 0 === this.rgbContrast) ||
            n('use_rgb_gamma_contrast_brightness'),
          this.useFilterByNormal && n('use_filter_by_normal'),
          this.useFilterByClassification && n('use_filter_by_classification'),
          this.useEDL && n('use_edl'),
          this.weighted && n('weighted_splats'),
          this.numClipBoxes > 0 && n('use_clip_box'),
          this.highlightPoint && n('highlight_point'),
          this.useTextureBlending && n('use_texture_blending'),
          this.usePointCloudMixing && n('use_point_cloud_mixing'),
          this.colorRgba && n('color_rgba'),
          n('MAX_POINT_LIGHTS 0'),
          n('MAX_DIR_LIGHTS 0'),
          e.push(t),
          e.join('\n')
        );
      }
      setPointCloudMixingMode(t) {
        this.pointCloudMixingMode = t;
      }
      getPointCloudMixingMode() {
        return this.pointCloudMixingMode === c.STRIPES ? c.STRIPES : c.CHECKBOARD;
      }
      setClipBoxes(t) {
        if (!t) return;
        this.clipBoxes = t;
        const e = this.numClipBoxes !== t.length && (0 === t.length || 0 === this.numClipBoxes);
        ((this.numClipBoxes = t.length),
          this.setUniform('clipBoxCount', this.numClipBoxes),
          e && this.updateShaderSource());
        const n = 16 * this.numClipBoxes,
          i = new Float32Array(n);
        for (let e = 0; e < this.numClipBoxes; e++) i.set(t[e].inverse.elements, 16 * e);
        for (let t = 0; t < n; t++) isNaN(i[t]) && (i[t] = 1 / 0);
        this.setUniform('clipBoxes', i);
      }
      get gradient() {
        return this._gradient;
      }
      set gradient(t) {
        this._gradient !== t &&
          ((this._gradient = t),
          (this.gradientTexture = D(this._gradient)),
          this.setUniform('gradient', this.gradientTexture));
      }
      get classification() {
        return this._classification;
      }
      set classification(t) {
        const e = {};
        for (const n of Object.keys(t)) e[n] = t[n].clone();
        let n = !1;
        if (void 0 === this._classification) n = !1;
        else {
          n = Object.keys(e).length === Object.keys(this._classification).length;
          for (const t of Object.keys(e))
            ((n = n && void 0 !== this._classification[t]),
              (n = n && e[t].equals(this._classification[t])));
        }
        n || ((this._classification = e), this.recomputeClassification());
      }
      recomputeClassification() {
        ((this.classificationTexture = R(this._classification)),
          this.setUniform('classificationLUT', this.classificationTexture));
      }
      get elevationRange() {
        return [this.heightMin, this.heightMax];
      }
      set elevationRange(t) {
        ((this.heightMin = t[0]), (this.heightMax = t[1]));
      }
      getUniform(t) {
        return void 0 === this.uniforms ? void 0 : this.uniforms[t].value;
      }
      setUniform(t, e) {
        if (void 0 === this.uniforms) return;
        const n = this.uniforms[t];
        'c' === n.type ? n.value.copy(e) : e !== n.value && (n.value = e);
      }
      updateMaterial(t, e, n, i) {
        const r = i.getPixelRatio();
        n.type === m
          ? (this.fov = n.getEffectiveFOV() * (Math.PI / 180))
          : (this.fov = Math.PI / 2);
        const o = i.getRenderTarget();
        (null !== o
          ? ((this.screenWidth = o.width), (this.screenHeight = o.height))
          : ((this.screenWidth = i.domElement.clientWidth * r),
            (this.screenHeight = i.domElement.clientHeight * r)),
          this.useDrawingBufferSize &&
            (i.getDrawingBufferSize(V.helperVec2),
            (this.screenWidth = V.helperVec2.width),
            (this.screenHeight = V.helperVec2.height)));
        const a = Math.max(t.scale.x, t.scale.y, t.scale.z);
        ((this.spacing = t.pcoGeometry.spacing * a),
          (this.octreeSize = t.pcoGeometry.boundingBox.getSize(V.helperVec3).x),
          (this.pointSizeType !== s.ADAPTIVE && this.pointColorType !== d.LOD) ||
            this.updateVisibilityTextureData(e));
      }
      updateVisibilityTextureData(t) {
        t.sort(v);
        const e = new Uint8Array(4 * t.length),
          n = new Array(t.length).fill(1 / 0);
        this.visibleNodeTextureOffsets.clear();
        for (let i = 0; i < t.length; i++) {
          const r = t[i];
          if ((this.visibleNodeTextureOffsets.set(r.name, i), i > 0)) {
            const t = r.name.slice(0, -1),
              o = this.visibleNodeTextureOffsets.get(t),
              s = i - o;
            n[o] = Math.min(n[o], s);
            const a = 4 * o;
            ((e[a] = e[a] | (1 << r.index)), (e[a + 1] = n[o] >> 8), (e[a + 2] = n[o] % 256));
          }
          e[4 * i + 3] = r.name.length;
        }
        const i = this.visibleNodesTexture;
        i && (i.image.data.set(e), (i.needsUpdate = !0));
      }
      static makeOnBeforeRender(t, e, n) {
        return (i, r, o, s, a) => {
          const l = a,
            u = l.uniforms;
          ((u.level.value = e.level), (u.isLeafNode.value = e.isLeafNode));
          const d = l.visibleNodeTextureOffsets.get(e.name);
          (void 0 !== d && (u.vnStart.value = d),
            (u.pcIndex.value = void 0 !== n ? n : t.visibleNodes.indexOf(e)),
            (a.uniformsNeedUpdate = !0));
        };
      }
    }
    function Y(t, e) {
      return { type: t, value: e };
    }
    function H(t, e) {
      return void 0 === t ? e : t;
    }
    function W(t, e = !1) {
      return (n, i) => {
        Object.defineProperty(n, i, {
          get() {
            return this.getUniform(t);
          },
          set(n) {
            n !== this.getUniform(t) && (this.setUniform(t, n), e && this.updateShaderSource());
          },
        });
      };
    }
    function G() {
      return (t, e) => {
        const n = `_${e.toString()}`;
        Object.defineProperty(t, e, {
          get() {
            return this[n];
          },
          set(t) {
            t !== this[n] && ((this[n] = t), this.updateShaderSource());
          },
        });
      };
    }
    var k;
    ((V.helperVec3 = new h.Vector3()),
      (V.helperVec2 = new h.Vector2()),
      B([W('bbSize')], V.prototype, 'bbSize', void 0),
      B([W('clipExtent')], V.prototype, 'clipExtent', void 0),
      B([W('depthMap')], V.prototype, 'depthMap', void 0),
      B([W('fov')], V.prototype, 'fov', void 0),
      B([W('heightMax')], V.prototype, 'heightMax', void 0),
      B([W('heightMin')], V.prototype, 'heightMin', void 0),
      B([W('intensityBrightness')], V.prototype, 'intensityBrightness', void 0),
      B([W('intensityContrast')], V.prototype, 'intensityContrast', void 0),
      B([W('intensityGamma')], V.prototype, 'intensityGamma', void 0),
      B([W('intensityRange')], V.prototype, 'intensityRange', void 0),
      B([W('maxSize')], V.prototype, 'maxSize', void 0),
      B([W('minSize')], V.prototype, 'minSize', void 0),
      B([W('octreeSize')], V.prototype, 'octreeSize', void 0),
      B([W('opacity', !0)], V.prototype, 'opacity', void 0),
      B([W('rgbBrightness', !0)], V.prototype, 'rgbBrightness', void 0),
      B([W('rgbContrast', !0)], V.prototype, 'rgbContrast', void 0),
      B([W('rgbGamma', !0)], V.prototype, 'rgbGamma', void 0),
      B([W('screenHeight')], V.prototype, 'screenHeight', void 0),
      B([W('screenWidth')], V.prototype, 'screenWidth', void 0),
      B([W('size')], V.prototype, 'size', void 0),
      B([W('spacing')], V.prototype, 'spacing', void 0),
      B([W('transition')], V.prototype, 'transition', void 0),
      B([W('uColor')], V.prototype, 'color', void 0),
      B([W('wClassification')], V.prototype, 'weightClassification', void 0),
      B([W('wElevation')], V.prototype, 'weightElevation', void 0),
      B([W('wIntensity')], V.prototype, 'weightIntensity', void 0),
      B([W('wReturnNumber')], V.prototype, 'weightReturnNumber', void 0),
      B([W('wRGB')], V.prototype, 'weightRGB', void 0),
      B([W('wSourceID')], V.prototype, 'weightSourceID', void 0),
      B([W('opacityAttenuation')], V.prototype, 'opacityAttenuation', void 0),
      B([W('filterByNormalThreshold')], V.prototype, 'filterByNormalThreshold', void 0),
      B([W('classificationFilter')], V.prototype, 'classificationFilter', void 0),
      B([W('highlightedPointCoordinate')], V.prototype, 'highlightedPointCoordinate', void 0),
      B([W('highlightedPointColor')], V.prototype, 'highlightedPointColor', void 0),
      B([W('enablePointHighlighting')], V.prototype, 'enablePointHighlighting', void 0),
      B([W('highlightedPointScale')], V.prototype, 'highlightedPointScale', void 0),
      B([W('normalFilteringMode')], V.prototype, 'normalFilteringMode', void 0),
      B([W('backgroundMap')], V.prototype, 'backgroundMap', void 0),
      B([W('pointCloudID')], V.prototype, 'pointCloudID', void 0),
      B([W('pointCloudMixingMode')], V.prototype, 'pointCloudMixingMode', void 0),
      B([W('stripeDistanceX')], V.prototype, 'stripeDistanceX', void 0),
      B([W('stripeDistanceY')], V.prototype, 'stripeDistanceY', void 0),
      B([W('stripeDivisorX')], V.prototype, 'stripeDivisorX', void 0),
      B([W('stripeDivisorY')], V.prototype, 'stripeDivisorY', void 0),
      B([W('pointCloudMixAngle')], V.prototype, 'pointCloudMixAngle', void 0),
      B([W('renderDepth')], V.prototype, 'renderDepth', void 0),
      B([G()], V.prototype, 'useClipBox', void 0),
      B([G()], V.prototype, 'weighted', void 0),
      B([G()], V.prototype, 'pointColorType', void 0),
      B([G()], V.prototype, 'pointSizeType', void 0),
      B([G()], V.prototype, 'clipMode', void 0),
      B([G()], V.prototype, 'useEDL', void 0),
      B([G()], V.prototype, 'shape', void 0),
      B([G()], V.prototype, 'treeType', void 0),
      B([G()], V.prototype, 'pointOpacityType', void 0),
      B([G()], V.prototype, 'useFilterByNormal', void 0),
      B([G()], V.prototype, 'useFilterByClassification', void 0),
      B([G()], V.prototype, 'useTextureBlending', void 0),
      B([G()], V.prototype, 'usePointCloudMixing', void 0),
      B([G()], V.prototype, 'highlightPoint', void 0),
      (function (t) {
        ((t[(t.POSITION_CARTESIAN = 0)] = 'POSITION_CARTESIAN'),
          (t[(t.COLOR_PACKED = 1)] = 'COLOR_PACKED'),
          (t[(t.COLOR_FLOATS_1 = 2)] = 'COLOR_FLOATS_1'),
          (t[(t.COLOR_FLOATS_255 = 3)] = 'COLOR_FLOATS_255'),
          (t[(t.NORMAL_FLOATS = 4)] = 'NORMAL_FLOATS'),
          (t[(t.FILLER = 5)] = 'FILLER'),
          (t[(t.INTENSITY = 6)] = 'INTENSITY'),
          (t[(t.CLASSIFICATION = 7)] = 'CLASSIFICATION'),
          (t[(t.NORMAL_SPHEREMAPPED = 8)] = 'NORMAL_SPHEREMAPPED'),
          (t[(t.NORMAL_OCT16 = 9)] = 'NORMAL_OCT16'),
          (t[(t.NORMAL = 10)] = 'NORMAL'));
      })(k || (k = {})));
    const q = {
      DATA_TYPE_DOUBLE: { ordinal: 0, size: 8 },
      DATA_TYPE_FLOAT: { ordinal: 1, size: 4 },
      DATA_TYPE_INT8: { ordinal: 2, size: 1 },
      DATA_TYPE_UINT8: { ordinal: 3, size: 1 },
      DATA_TYPE_INT16: { ordinal: 4, size: 2 },
      DATA_TYPE_UINT16: { ordinal: 5, size: 2 },
      DATA_TYPE_INT32: { ordinal: 6, size: 4 },
      DATA_TYPE_UINT32: { ordinal: 7, size: 4 },
      DATA_TYPE_INT64: { ordinal: 8, size: 8 },
      DATA_TYPE_UINT64: { ordinal: 9, size: 8 },
    };
    function K(t, e, n) {
      return { name: t, type: e, numElements: n, byteSize: n * e.size };
    }
    const j = K(k.COLOR_PACKED, q.DATA_TYPE_INT8, 4),
      X = {
        POSITION_CARTESIAN: K(k.POSITION_CARTESIAN, q.DATA_TYPE_FLOAT, 3),
        RGBA_PACKED: j,
        COLOR_PACKED: j,
        RGB_PACKED: K(k.COLOR_PACKED, q.DATA_TYPE_INT8, 3),
        NORMAL_FLOATS: K(k.NORMAL_FLOATS, q.DATA_TYPE_FLOAT, 3),
        FILLER_1B: K(k.FILLER, q.DATA_TYPE_UINT8, 1),
        INTENSITY: K(k.INTENSITY, q.DATA_TYPE_UINT16, 1),
        CLASSIFICATION: K(k.CLASSIFICATION, q.DATA_TYPE_UINT8, 1),
        NORMAL_SPHEREMAPPED: K(k.NORMAL_SPHEREMAPPED, q.DATA_TYPE_UINT8, 2),
        NORMAL_OCT16: K(k.NORMAL_OCT16, q.DATA_TYPE_UINT8, 2),
        NORMAL: K(k.NORMAL, q.DATA_TYPE_FLOAT, 3),
      };
    class Z {
      constructor(t = []) {
        ((this.attributes = []), (this.byteSize = 0), (this.size = 0));
        for (let e = 0; e < t.length; e++) {
          const n = t[e],
            i = X[n];
          (this.attributes.push(i), (this.byteSize += i.byteSize), this.size++);
        }
      }
      add(t) {
        (this.attributes.push(t), (this.byteSize += t.byteSize), this.size++);
      }
      hasColors() {
        return void 0 !== this.attributes.find(J);
      }
      hasNormals() {
        return void 0 !== this.attributes.find(Q);
      }
    }
    function J({ name: t }) {
      return t === k.COLOR_PACKED;
    }
    function Q({ name: t }) {
      return (
        t === k.NORMAL_SPHEREMAPPED ||
        t === k.NORMAL_FLOATS ||
        t === k.NORMAL ||
        t === k.NORMAL_OCT16
      );
    }
    function $(t, e) {
      return new h.Box3().setFromPoints([
        new h.Vector3(t.min.x, t.min.y, t.min.z).applyMatrix4(e),
        new h.Vector3(t.min.x, t.min.y, t.min.z).applyMatrix4(e),
        new h.Vector3(t.max.x, t.min.y, t.min.z).applyMatrix4(e),
        new h.Vector3(t.min.x, t.max.y, t.min.z).applyMatrix4(e),
        new h.Vector3(t.min.x, t.min.y, t.max.z).applyMatrix4(e),
        new h.Vector3(t.min.x, t.max.y, t.max.z).applyMatrix4(e),
        new h.Vector3(t.max.x, t.max.y, t.min.z).applyMatrix4(e),
        new h.Vector3(t.max.x, t.min.y, t.max.z).applyMatrix4(e),
        new h.Vector3(t.max.x, t.max.y, t.max.z).applyMatrix4(e),
      ]);
    }
    function tt(t, e) {
      const n = t.min.clone(),
        i = t.max.clone(),
        r = new h.Vector3().subVectors(i, n);
      return (
        (1 & e) > 0 ? (n.z += r.z / 2) : (i.z -= r.z / 2),
        (2 & e) > 0 ? (n.y += r.y / 2) : (i.y -= r.y / 2),
        (4 & e) > 0 ? (n.x += r.x / 2) : (i.x -= r.x / 2),
        new h.Box3(n, i)
      );
    }
    class et extends h.EventDispatcher {
      constructor(t, e, n) {
        (super(),
          (this.id = et.idCount++),
          (this.level = 0),
          (this.spacing = 0),
          (this.hasChildren = !1),
          (this.children = [null, null, null, null, null, null, null, null]),
          (this.mean = new h.Vector3()),
          (this.numPoints = 0),
          (this.loaded = !1),
          (this.loading = !1),
          (this.failed = !1),
          (this.parent = null),
          (this.oneTimeDisposeHandlers = []),
          (this.isLeafNode = !0),
          (this.isTreeNode = !1),
          (this.isGeometryNode = !0),
          (this.name = t),
          (this.index = y(t)),
          (this.pcoGeometry = e),
          (this.boundingBox = n),
          (this.tightBoundingBox = n.clone()),
          (this.boundingSphere = n.getBoundingSphere(new h.Sphere())));
      }
      dispose() {
        this.geometry &&
          this.parent &&
          (this.geometry.dispose(),
          (this.geometry = void 0),
          (this.loaded = !1),
          this.oneTimeDisposeHandlers.forEach((t) => t()),
          (this.oneTimeDisposeHandlers = []));
      }
      getUrl() {
        const t = this.pcoGeometry,
          e = t.loader.version,
          n = [t.octreeDir];
        return (
          t.loader && e.equalOrHigher('1.5')
            ? (n.push(this.getHierarchyBaseUrl()), n.push(this.name))
            : (e.equalOrHigher('1.4') || e.upTo('1.3')) && n.push(this.name),
          n.join('/')
        );
      }
      getHierarchyUrl() {
        return `${this.pcoGeometry.octreeDir}/${this.getHierarchyBaseUrl()}/${this.name}.hrc`;
      }
      addChild(t) {
        ((this.children[t.index] = t), (this.isLeafNode = !1), (t.parent = this));
      }
      traverse(t, e = !0) {
        const n = e ? [this] : [];
        let i;
        for (; void 0 !== (i = n.pop()); ) {
          t(i);
          for (const t of i.children) null !== t && n.push(t);
        }
      }
      load() {
        if (!this.canLoad()) return Promise.resolve();
        let t;
        return (
          (this.loading = !0),
          this.pcoGeometry.numNodesLoading++,
          (this.pcoGeometry.needsUpdate = !0),
          (t =
            this.pcoGeometry.loader.version.equalOrHigher('1.5') &&
            this.level % this.pcoGeometry.hierarchyStepSize === 0 &&
            this.hasChildren
              ? this.loadHierachyThenPoints()
              : this.loadPoints()),
          t.catch((t) => {
            throw ((this.loading = !1), (this.failed = !0), this.pcoGeometry.numNodesLoading--, t);
          })
        );
      }
      canLoad() {
        return (
          !this.loading &&
          !this.loaded &&
          !this.pcoGeometry.disposed &&
          !this.pcoGeometry.loader.disposed &&
          this.pcoGeometry.numNodesLoading < this.pcoGeometry.maxNumNodesLoading
        );
      }
      loadPoints() {
        return ((this.pcoGeometry.needsUpdate = !0), this.pcoGeometry.loader.load(this));
      }
      loadHierachyThenPoints() {
        return this.level % this.pcoGeometry.hierarchyStepSize !== 0
          ? Promise.resolve()
          : Promise.resolve(this.pcoGeometry.loader.getUrl(this.getHierarchyUrl()))
              .then((t) => this.pcoGeometry.xhrRequest(t, { mode: 'cors' }))
              .then((t) => b(t))
              .then((t) => t.arrayBuffer())
              .then((t) => w(t))
              .then((t) => this.loadHierarchy(this, t));
      }
      getHierarchyBaseUrl() {
        const t = this.pcoGeometry.hierarchyStepSize,
          e = this.name.substr(1),
          n = Math.floor(e.length / t);
        let i = 'r/';
        for (let r = 0; r < n; r++) i += `${e.substr(r * t, t)}/`;
        return i.slice(0, -1);
      }
      loadHierarchy(t, e) {
        const n = new DataView(e),
          i = this.getNodeData(t.name, 0, n);
        t.numPoints = i.numPoints;
        const r = [i],
          o = [];
        let s = 5;
        for (; r.length > 0; ) {
          const t = r.shift();
          let i = 1;
          for (let a = 0; a < 8 && s + 1 < e.byteLength; a++) {
            if (0 !== (t.children & i)) {
              const e = this.getNodeData(t.name + a, s, n);
              (o.push(e), r.push(e), (s += 5));
            }
            i *= 2;
          }
        }
        t.pcoGeometry.needsUpdate = !0;
        const a = new Map();
        (a.set(t.name, t), o.forEach((e) => this.addNode(e, t.pcoGeometry, a)), t.loadPoints());
      }
      getNodeData(t, e, n) {
        return { children: n.getUint8(e), numPoints: n.getUint32(e + 1, !0), name: t };
      }
      addNode({ name: t, numPoints: e, children: n }, i, r) {
        const o = y(t),
          s = t.substring(0, t.length - 1),
          a = r.get(s),
          l = t.length - 1,
          u = tt(a.boundingBox, o),
          d = new et(t, i, u);
        ((d.level = l),
          (d.numPoints = e),
          (d.hasChildren = n > 0),
          (d.spacing = i.spacing / Math.pow(2, l)),
          a.addChild(d),
          r.set(t, d));
      }
    }
    et.idCount = 0;
    class nt {
      constructor(t, e, n, i, r) {
        ((this.loader = t),
          (this.boundingBox = e),
          (this.tightBoundingBox = n),
          (this.offset = i),
          (this.xhrRequest = r),
          (this.disposed = !1),
          (this.needsUpdate = !0),
          (this.octreeDir = ''),
          (this.hierarchyStepSize = -1),
          (this.nodes = {}),
          (this.numNodesLoading = 0),
          (this.maxNumNodesLoading = 3),
          (this.spacing = 0),
          (this.pointAttributes = new Z([])),
          (this.projection = null),
          (this.url = null));
      }
      dispose() {
        (this.loader.dispose(), this.root.traverse((t) => t.dispose()), (this.disposed = !0));
      }
      addNodeLoadedCallback(t) {
        this.loader.callbacks.push(t);
      }
      clearNodeLoadedCallbacks() {
        this.loader.callbacks = [];
      }
    }
    class it extends h.EventDispatcher {
      constructor(t, e) {
        (super(),
          (this.pcIndex = void 0),
          (this.boundingBoxNode = null),
          (this.loaded = !0),
          (this.isTreeNode = !0),
          (this.isGeometryNode = !1),
          (this.geometryNode = t),
          (this.sceneNode = e),
          (this.children = t.children.slice()));
      }
      dispose() {
        this.geometryNode.dispose();
      }
      disposeSceneNode() {
        const t = this.sceneNode;
        if (t.geometry instanceof h.BufferGeometry) {
          const e = t.geometry.attributes;
          for (const t in e) (delete e[t].array, delete e[t]);
          (t.geometry.dispose(), (t.geometry = void 0));
        }
      }
      traverse(t, e) {
        this.geometryNode.traverse(t, e);
      }
      get id() {
        return this.geometryNode.id;
      }
      get name() {
        return this.geometryNode.name;
      }
      get level() {
        return this.geometryNode.level;
      }
      get isLeafNode() {
        return this.geometryNode.isLeafNode;
      }
      get numPoints() {
        return this.geometryNode.numPoints;
      }
      get index() {
        return this.geometryNode.index;
      }
      get boundingSphere() {
        return this.geometryNode.boundingSphere;
      }
      get boundingBox() {
        return this.geometryNode.boundingBox;
      }
      get spacing() {
        return this.geometryNode.spacing;
      }
    }
    function rt(t, e, n) {
      return Math.min(Math.max(e, t), n);
    }
    class ot {
      dispose() {
        this.pickState &&
          (this.pickState.material.dispose(), this.pickState.renderTarget.dispose());
      }
      pick(t, e, n, i, r = {}) {
        if (0 === i.length) return null;
        const o = this.pickState ? this.pickState : (this.pickState = ot.getPickState()),
          s = o.material,
          a = t.getPixelRatio(),
          l = Math.ceil(t.domElement.clientWidth * a),
          u = Math.ceil(t.domElement.clientHeight * a);
        ot.updatePickRenderTarget(this.pickState, l, u);
        const d = ot.helperVec3;
        r.pixelPosition
          ? d.copy(r.pixelPosition)
          : (d.addVectors(n.origin, n.direction).project(e),
            (d.x = (d.x + 1) * l * 0.5),
            (d.y = (d.y + 1) * u * 0.5));
        const f = Math.floor((r.pickWindowSize || 15) * a),
          c = (f - 1) / 2,
          h = Math.floor(rt(d.x - c, 0, l)),
          p = Math.floor(rt(d.y - c, 0, u));
        ot.prepareRender(t, h, p, f, s, o);
        const m = ot.render(t, e, s, i, n, o, r);
        s.clearVisibleNodeTextureOffsets();
        const g = ot.readPixels(t, h, p, f),
          A = ot.findHit(g, f);
        return ot.getPickPoint(A, m);
      }
      static prepareRender(t, e, n, i, r, o) {
        (t.setScissor(e, n, i, i),
          t.setScissorTest(!0),
          t.state.buffers.depth.setTest(r.depthTest),
          t.state.buffers.depth.setMask(r.depthWrite),
          t.state.setBlending(h.NoBlending),
          t.setRenderTarget(o.renderTarget),
          t.getClearColor(this.clearColor));
        const s = t.getClearAlpha();
        (t.setClearColor(g, 0), t.clear(!0, !0, !0), t.setClearColor(this.clearColor, s));
      }
      static render(t, e, n, i, r, o, s) {
        const a = [];
        for (const l of i) {
          const i = ot.nodesOnRay(l, r);
          i.length &&
            (ot.updatePickMaterial(n, l.material, s),
            n.updateMaterial(l, i, e, t),
            s.onBeforePickRender && s.onBeforePickRender(n, o.renderTarget),
            (o.scene.children = ot.createTempNodes(l, i, n, a.length)),
            t.render(o.scene, e),
            i.forEach((t) => a.push({ node: t, octree: l })));
        }
        return a;
      }
      static nodesOnRay(t, e) {
        const n = [],
          i = e.clone();
        for (const e of t.visibleNodes) {
          const r = ot.helperSphere.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
          i.intersectsSphere(r) && n.push(e);
        }
        return n;
      }
      static readPixels(t, e, n, i) {
        const r = new Uint8Array(4 * i * i);
        return (
          t.readRenderTargetPixels(t.getRenderTarget(), e, n, i, i, r),
          t.setScissorTest(!1),
          t.setRenderTarget(null),
          r
        );
      }
      static createTempNodes(t, e, n, i) {
        const r = [];
        for (let o = 0; o < e.length; o++) {
          const s = e[o],
            a = s.sceneNode,
            l = new h.Points(a.geometry, n);
          ((l.matrix = a.matrix),
            (l.matrixWorld = a.matrixWorld),
            (l.matrixAutoUpdate = !1),
            (l.frustumCulled = !1));
          const u = i + o + 1;
          (u > 255 && console.error('More than 255 nodes for pick are not supported.'),
            (l.onBeforeRender = V.makeOnBeforeRender(t, s, u)),
            r.push(l));
        }
        return r;
      }
      static updatePickMaterial(t, e, n) {
        ((t.pointSizeType = e.pointSizeType),
          (t.shape = e.shape),
          (t.size = e.size),
          (t.minSize = e.minSize),
          (t.maxSize = e.maxSize),
          (t.classification = e.classification),
          (t.useFilterByNormal = e.useFilterByNormal),
          (t.classificationFilter = e.classificationFilter),
          (t.useFilterByClassification = e.useFilterByClassification),
          (t.filterByNormalThreshold = e.filterByNormalThreshold),
          n.pickOutsideClipRegion
            ? (t.clipMode = o.DISABLED)
            : ((t.clipMode = e.clipMode),
              (t.clipExtent = e.clipExtent),
              t.setClipBoxes(e.clipMode === o.CLIP_OUTSIDE ? e.clipBoxes : [])));
      }
      static updatePickRenderTarget(t, e, n) {
        (t.renderTarget.width === e && t.renderTarget.height === n) ||
          (t.renderTarget.dispose(),
          (t.renderTarget = ot.makePickRenderTarget()),
          t.renderTarget.setSize(e, n));
      }
      static makePickRenderTarget() {
        return new h.WebGLRenderTarget(1, 1, {
          minFilter: h.LinearFilter,
          magFilter: h.NearestFilter,
          format: h.RGBAFormat,
        });
      }
      static findHit(t, e) {
        const n = new Uint32Array(t.buffer);
        let i = Number.MAX_VALUE,
          r = null;
        for (let o = 0; o < e; o++)
          for (let s = 0; s < e; s++) {
            const a = o + s * e,
              l = Math.pow(o - (e - 1) / 2, 2) + Math.pow(s - (e - 1) / 2, 2),
              u = t[4 * a + 3];
            t[4 * a + 3] = 0;
            const d = n[a];
            u > 0 && l < i && ((r = { pIndex: d, pcIndex: u - 1 }), (i = l));
          }
        return r;
      }
      static getPickPoint(t, e) {
        if (!t) return null;
        const n = {},
          i = e[t.pcIndex] && e[t.pcIndex].node.sceneNode;
        if (!i) return null;
        n.pointCloud = e[t.pcIndex].octree;
        const r = i.geometry.attributes;
        for (const e in r) {
          if (!r.hasOwnProperty(e)) continue;
          const o = r[e];
          if ('position' === e) ot.addPositionToPickPoint(n, t, o, i);
          else if ('normal' === e) ot.addNormalToPickPoint(n, t, o, i);
          else if ('indices' === e);
          else if (1 === o.itemSize) n[e] = o.array[t.pIndex];
          else {
            const i = [];
            for (let e = 0; e < o.itemSize; e++) i.push(o.array[o.itemSize * t.pIndex + e]);
            n[e] = i;
          }
        }
        return n;
      }
      static addPositionToPickPoint(t, e, n, i) {
        t.position = new h.Vector3().fromBufferAttribute(n, e.pIndex).applyMatrix4(i.matrixWorld);
      }
      static addNormalToPickPoint(t, e, n, i) {
        const r = new h.Vector3().fromBufferAttribute(n, e.pIndex),
          o = new h.Vector4(r.x, r.y, r.z, 0).applyMatrix4(i.matrixWorld);
        (r.set(o.x, o.y, o.z), (t.normal = r));
      }
      static getPickState() {
        const t = new h.Scene();
        t.matrixAutoUpdate = !1;
        const e = new V();
        return (
          (e.pointColorType = d.POINT_INDEX),
          { renderTarget: ot.makePickRenderTarget(), material: e, scene: t }
        );
      }
    }
    ((ot.helperVec3 = new h.Vector3()),
      (ot.helperSphere = new h.Sphere()),
      (ot.clearColor = new h.Color()));
    class st {
      constructor(t, e) {
        ((this.loader = t),
          (this.boundingBox = e),
          (this.maxNumNodesLoading = 3),
          (this.numNodesLoading = 0),
          (this.needsUpdate = !0),
          (this.disposed = !1),
          (this.pointAttributes = null),
          (this.spacing = 0),
          (this.url = null),
          (this.tightBoundingBox = this.boundingBox.clone()),
          (this.boundingSphere = this.boundingBox.getBoundingSphere(new h.Sphere())),
          (this.tightBoundingSphere = this.boundingSphere.clone()));
      }
      dispose() {
        (this.root.traverse((t) => t.dispose()), (this.disposed = !0));
      }
    }
    class at extends h.Object3D {
      constructor() {
        (super(...arguments), (this.root = null));
      }
      initialized() {
        return null !== this.root;
      }
    }
    function lt(t) {
      function e(t) {
        return t.charCodeAt(0);
      }
      let n,
        i,
        r,
        o,
        s,
        a,
        l,
        u,
        d,
        f,
        c,
        h = 65536;
      t.onmessage = (p) => {
        (p.data.init &&
          (function (f) {
            r = f;
            const h = 4 * r,
              p = 16 * r,
              m = 4 * r,
              g = 524288,
              A = h + p + 64 + m + g + 4 * r + 2097152,
              y = Math.floor(A / 65536) + 1,
              v = {
                module: {},
                env: { memory: new WebAssembly.Memory({ initial: y, maximum: y }) },
              },
              b = new Uint8Array(
                atob(
                  'AGFzbQEAAAAADwhkeWxpbmsuMAEEAAAAAAEPAmAAAGAIf39/f39/f38AAg8BA2VudgZtZW1vcnkCAAADAwIAAQcjAhFfX3dhc21fY2FsbF9jdG9ycwAAC3NvcnRJbmRleGVzAAEKhgMCAwABC/8CAgN/A30gBwRAIAQqAighCyAEKgIYIQwgBCoCCCENQfj///8HIQlBiICAgHghBANAIAIgCkECdCIIaiALIAEgACAIaigCAEEEdGoiCCoCCJQgDSAIKgIAlCAMIAgqAgSUkpJDAACARZT8ACIINgIAIAkgCCAIIAlKGyEJIAQgCCAEIAhKGyEEIApBAWoiCiAHRw0ACyAGQQFrsyAEsiAJspOVIQtBACEEA0AgAiAEQQJ0aiIBIAsgASgCACAJa7KU/AAiATYCACADIAFBAnRqIgEgASgCAEEBajYCACAEQQFqIgQgB0cNAAsLIAZBAk8EQCADKAIAIQlBASEEA0AgAyAEQQJ0aiIBIAEoAgAgCWoiCTYCACAEQQFqIgQgBkcNAAsLIAdBAEoEQCAHIQQDQCAFIAcgAyACIARBAWsiAUECdCIGaigCAEECdGoiCSgCACIIa0ECdGogACAGaigCADYCACAJIAhBAWs2AgAgBEEBSyEGIAEhBCAGDQALCws=',
                )
                  .split('')
                  .map(e),
              );
            WebAssembly.instantiate(b, v).then((e) => {
              ((n = e.instance), (i = v.env.memory.buffer), (c = new Int32Array(r)));
              for (let t = 0; t < r; t++) c[t] = t;
              ((o = 0),
                (u = o + h),
                (d = u + p),
                (a = d + 64),
                (l = a + m),
                (s = l + g),
                t.postMessage({ sorterReady: !0 }));
            });
          })(p.data.splatCount),
          p.data.sort &&
            (function (e) {
              let r = e.data.sort.centers,
                c = e.data.sort.totalSplats,
                p = e.data.sort.modelViewProj;
              (new Float32Array(i, u, r.byteLength / 4).set(new Float32Array(r)),
                new Int32Array(i, 0, e.data.sort.indices.byteLength / 4).set(e.data.sort.indices),
                f || (f = new Uint32Array(h)),
                new Float32Array(i, d, 16).set(p),
                new Uint32Array(i, l, h).set(f),
                n.exports.sortIndexes(o, u, a, l, d, s, h, c));
              const m = new Int32Array(i, s, c);
              t.postMessage({ dataSorted: m });
            })(p));
      };
    }
    class ut extends h.Object3D {
      constructor(t = !1, e, n = !1) {
        (super(),
          (this.material = null),
          (this.forceSorting = !0),
          (this.continuousSorting = !0),
          (this.totalSplats = 5e5),
          (this.textures = new Array()),
          (this.nodesAsString = ''),
          (this.lastSortViewDir = new h.Vector3(0, 0, -1)),
          (this.sortViewDir = new h.Vector3(0, 0, -1)),
          (this.lastSortViewPos = new h.Vector3()),
          (this.sortViewOffset = new h.Vector3()),
          (this.enableSorting = !0),
          (this.enabled = !1),
          (this.instanceCount = 0),
          (this.debugMode = !1),
          (this.rendererSize = new h.Vector2()),
          (this.harmonicsEnabled = !1),
          (this.maxPointBudget = 0),
          (this.debugMode = t),
          (this.harmonicsEnabled = n),
          (this.maxPointBudget = e),
          (this.indexesBuffer = new Int32Array(e)));
        let i = new Int32Array(e);
        for (let t = 0; t < e; t++) ((this.indexesBuffer[t] = t), (i[t] = t));
        let r = Math.ceil(Math.sqrt(e)),
          o = n ? Math.ceil(Math.sqrt(3 * e)) : 1,
          s = n ? Math.ceil(Math.sqrt(5 * e)) : 1,
          a = n ? Math.ceil(Math.sqrt(7 * e)) : 1;
        ((this.bufferCenters = new Float32Array(r * r * 4)),
          (this.bufferPositions = new Float32Array(r * r * 4)),
          (this.bufferScale = new Float32Array(r * r * 3)),
          (this.bufferOrientation = new Float32Array(r * r * 4)),
          (this.bufferSorted = new Uint32Array(e)),
          (this.bufferOrientation = new Float32Array(r * r * 4)),
          (this.bufferPosColor = new Uint32Array(r * r * 4)),
          (this.bufferCovariance0 = new Float32Array(r * r * 4)),
          (this.bufferCovariance1 = new Float32Array(r * r * 2)),
          (this.bufferNodes = new Float32Array(4e4)),
          (this.bufferNodes2 = new Float32Array(4e4)),
          (this.bufferNodesIndices = new Uint32Array(r * r)),
          (this.bufferVisibilityNodes = new Uint8Array(8192)),
          (this.bufferHarmonics1 = new Uint32Array(o * o)),
          (this.bufferHarmonics2 = new Uint32Array(s * s)),
          (this.bufferHarmonics3 = new Uint32Array(a * a)),
          (this.textureNode = new h.DataTexture(
            this.bufferNodes,
            100,
            100,
            h.RGBAFormat,
            h.FloatType,
          )),
          (this.textureNode2 = new h.DataTexture(
            this.bufferNodes2,
            100,
            100,
            h.RGBAFormat,
            h.FloatType,
          )),
          (this.textureSorted = new h.DataTexture(
            this.bufferSorted,
            r,
            r,
            h.RedIntegerFormat,
            h.UnsignedIntType,
          )),
          (this.textureSorted.internalFormat = 'R32UI'),
          (this.textureNodeIndices = new h.DataTexture(
            this.bufferNodesIndices,
            r,
            r,
            h.RedIntegerFormat,
            h.UnsignedIntType,
          )),
          (this.textureNodeIndices.internalFormat = 'R32UI'),
          (this.textureCovariance0 = new h.DataTexture(
            this.bufferCovariance0,
            r,
            r,
            h.RGBAFormat,
            h.FloatType,
          )),
          (this.textureCovariance1 = new h.DataTexture(
            this.bufferCovariance1,
            r,
            r,
            h.RGFormat,
            h.FloatType,
          )),
          (this.texturePosColor = new h.DataTexture(
            this.bufferPosColor,
            r,
            r,
            h.RGBAIntegerFormat,
            h.UnsignedIntType,
          )),
          (this.texturePosColor.internalFormat = 'RGBA32UI'),
          (this.textureHarmonics1 = new h.DataTexture(
            this.bufferHarmonics1,
            o,
            o,
            h.RedIntegerFormat,
            h.UnsignedIntType,
          )),
          (this.textureHarmonics1.internalFormat = 'R32UI'),
          (this.textureHarmonics2 = new h.DataTexture(
            this.bufferHarmonics2,
            s,
            s,
            h.RedIntegerFormat,
            h.UnsignedIntType,
          )),
          (this.textureHarmonics2.internalFormat = 'R32UI'),
          (this.textureHarmonics3 = new h.DataTexture(
            this.bufferHarmonics3,
            a,
            a,
            h.RedIntegerFormat,
            h.UnsignedIntType,
          )),
          (this.textureHarmonics3.internalFormat = 'R32UI'),
          (this.textureVisibilityNodes = new h.DataTexture(
            this.bufferVisibilityNodes,
            2048,
            1,
            h.RGBAFormat,
          )),
          (this.textureVisibilityNodes.magFilter = h.NearestFilter),
          (this.textureVisibilityNodes.minFilter = h.NearestFilter),
          (this.textures = []),
          this.textures.push(this.textureSorted),
          this.textures.push(this.textureNode),
          this.textures.push(this.textureNode2),
          this.textures.push(this.textureNodeIndices),
          this.textures.push(this.textureCovariance0),
          this.textures.push(this.textureCovariance1),
          this.textures.push(this.texturePosColor),
          this.textures.push(this.textureHarmonics1),
          this.textures.push(this.textureHarmonics2),
          this.textures.push(this.textureHarmonics3),
          this.textures.push(this.textureVisibilityNodes),
          this.textures.forEach((t) => (t.needsUpdate = !0)),
          this.initialize());
      }
      initialize() {
        return ((t = this.maxPointBudget),
        new Promise((e) => {
          const n = new Worker(
            URL.createObjectURL(
              new Blob(['(', lt.toString(), ')(self)'], { type: 'application/javascript' }),
            ),
          );
          (n.postMessage({ init: !0, splatCount: t }),
            (n.onmessage = (t) => {
              t.data.sorterReady && e(n);
            }));
        })).then((t) => {
          this.sorter = t;
          const e = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]),
            n = new Uint16Array([0, 1, 2, 2, 1, 3]);
          let r = new h.ShaderMaterial({
            glslVersion: h.GLSL3,
            vertexShader: i(469).A,
            fragmentShader: i(315).A,
            transparent: !0,
            depthTest: !0,
            depthWrite: !1,
            side: h.DoubleSide,
            uniforms: {
              focal: { value: new h.Vector2(0, 0) },
              inverseFocalAdjustment: { value: 1 },
              splatScale: { value: 1 },
              initialSplatScale: { value: 1 },
              basisViewport: { value: new h.Vector2(0, 0) },
              globalOffset: { value: new h.Vector3(0, 0, 0) },
              sortedTexture: { value: null },
              covarianceTexture0: { value: null },
              covarianceTexture1: { value: null },
              posColorTexture: { value: null },
              nodeTexture: { value: null },
              nodeTexture2: { value: null },
              nodeIndicesTexture: { value: null },
              indicesTexture: { value: null },
              harmonicsTexture1: { value: null },
              harmonicsTexture2: { value: null },
              harmonicsTexture3: { value: null },
              visibleNodes: { value: null },
              cameraPosition: { value: new h.Vector3(0, 0, 0) },
              harmonicsDegree: { value: this.harmonicsEnabled ? 3 : 0 },
              renderIds: { value: !1 },
              debugMode: { value: !1 },
              renderOnlyHarmonics: { value: !1 },
              renderLoD: { value: !1 },
              adaptiveSize: { value: !0 },
              harmonicsScale: { value: 4 },
              octreeSize: { value: 0 },
              fov: { value: 1 },
              maxSplatScale: { value: 3 },
              screenHeight: { value: 1 },
              spacing: { value: 1 },
              useClipping: { value: !1 },
              screenWidth: { value: 0 },
              clipExtent: { value: new h.Vector4(0, 0, 1, 1) },
              maxDepth: { value: 1 },
            },
          });
          ((this.material = r),
            (this.instanceCount = 0),
            this.material &&
              ((this.material.uniforms.sortedTexture.value = this.textureSorted),
              (this.material.uniforms.posColorTexture.value = this.texturePosColor),
              (this.material.uniforms.covarianceTexture0.value = this.textureCovariance0),
              (this.material.uniforms.covarianceTexture1.value = this.textureCovariance1),
              (this.material.uniforms.nodeTexture.value = this.textureNode),
              (this.material.uniforms.nodeTexture2.value = this.textureNode2),
              (this.material.uniforms.nodeIndicesTexture.value = this.textureNodeIndices),
              (this.material.uniforms.harmonicsTexture1.value = this.textureHarmonics1),
              (this.material.uniforms.harmonicsTexture2.value = this.textureHarmonics2),
              (this.material.uniforms.harmonicsTexture3.value = this.textureHarmonics3),
              (this.material.uniforms.visibleNodes.value = this.textureVisibilityNodes)));
          let o = new h.InstancedBufferGeometry();
          (o.setAttribute('position', new h.BufferAttribute(e, 3)),
            o.setIndex(new h.BufferAttribute(n, 1)),
            (this.mesh = new h.Mesh(o, r)),
            (this.mesh.frustumCulled = !1),
            this.add(this.mesh),
            (this.enabled = !0));
        });
        var t;
      }
      renderSplatsIDs(t) {
        null != this.material &&
          ((this.material.uniforms.renderIds.value = t), (this.material.transparent = !t));
      }
      update(t, e, n, i = () => {}) {
        if (null == this.material) return;
        this.material.uniforms.cameraPosition.value = e.position;
        let r = t.material;
        ((r.visible = !1),
          (this.material.uniforms.octreeSize.value = r.uniforms.octreeSize.value),
          (this.material.uniforms.fov.value = r.uniforms.fov.value),
          (this.material.uniforms.spacing.value = r.uniforms.spacing.value),
          (this.material.uniforms.screenHeight.value = r.uniforms.screenHeight.value),
          (this.material.uniforms.screenWidth.value = r.uniforms.screenWidth.value));
        let o = this.material;
        o.uniforms.basisViewport.value.set(1 / n.x, 1 / n.y);
        const s = 0.5 * e.projectionMatrix.elements[0] * n.x,
          a = 0.5 * e.projectionMatrix.elements[5] * n.y;
        o.uniforms.focal.value.set(s, a);
        let l = 0,
          u = 0,
          d = '',
          f = 0,
          c = 0;
        return (
          t.traverse((t) => {
            let e = t.geometry;
            l += e.drawRange.count;
          }),
          (f = l * (this.harmonicsEnabled ? 236 : 56)),
          t.traverseVisible((t) => {
            d += t.name;
          }),
          (this.forceSorting = !1),
          d === this.nodesAsString ||
            !this.enableSorting ||
            ((this.nodesAsString = d),
            (l = 0),
            (u = 0),
            this.bufferVisibilityNodes.set(r.uniforms.visibleNodes.value.image.data),
            t.traverseVisible((e) => {
              let n = e,
                i = n.geometry;
              this.material &&
                ('r' === n.name &&
                  this.material?.uniforms.globalOffset.value.copy(i.userData.offset),
                (this.material.uniforms.maxDepth.value = i.userData.maxDepth),
                (this.material.uniforms.maxSplatScale.value = i.userData.maxDepth),
                (this.totalSplats = i.userData.totalSplats));
              const r = t.material.visibleNodeTextureOffsets.get(e.name),
                o = n.name.length - 1;
              let s = i.userData.offset,
                a = [n.position.x, n.position.y, n.position.z, s.x],
                d = [r, o, s.y, s.z];
              (this.bufferNodes.set(a, 4 * u),
                this.bufferNodes2.set(d, 4 * u),
                this.bufferNodesIndices.set(new Uint32Array(i.drawRange.count).fill(u), l),
                this.bufferCenters.set(i.getAttribute('raw_position').array, 4 * l),
                this.bufferPositions.set(i.getAttribute('centers').array, 4 * l),
                this.bufferScale.set(i.getAttribute('scale').array, 3 * l),
                this.bufferOrientation.set(i.getAttribute('orientation').array, 4 * l),
                this.bufferCovariance0.set(i.getAttribute('COVARIANCE0').array, 4 * l),
                this.bufferCovariance1.set(i.getAttribute('COVARIANCE1').array, 2 * l),
                this.bufferPosColor.set(i.getAttribute('POS_COLOR').array, 4 * l),
                this.harmonicsEnabled &&
                  (this.bufferHarmonics1.set(i.getAttribute('HARMONICS1').array, 3 * l),
                  this.bufferHarmonics2.set(i.getAttribute('HARMONICS2').array, 5 * l),
                  this.bufferHarmonics3.set(i.getAttribute('HARMONICS3').array, 7 * l)),
                (l += i.drawRange.count),
                u++);
            }),
            (c = l * (this.harmonicsEnabled ? 236 : 56)),
            this.debugMode &&
              (console.log('total memory in usage: ' + Math.ceil(f / 1e6) + ' MB'),
              console.log('total memory displayed: ' + Math.ceil(c / 1e6) + ' MB'),
              console.log('levels displayed: ' + d)),
            (this.instanceCount = l),
            (this.forceSorting = !0),
            this.sortSplats(e, i),
            !1)
        );
      }
      defer() {
        return new Promise((t) => {
          let e = 0,
            n = () => {
              let i = requestAnimationFrame(n);
              (2 == e && (t('true'), cancelAnimationFrame(i)), e++);
            };
          n();
        });
      }
      sortSplats(t, e = () => {}) {
        if (null == this.mesh || 0 == this.instanceCount) return;
        let n = new h.Matrix4();
        (t.updateMatrixWorld(),
          n.copy(t.matrixWorld).invert(),
          n.premultiply(t.projectionMatrix),
          n.multiply(this.mesh.matrixWorld));
        let i = 0,
          r = 0;
        if (
          (this.sortViewDir.set(0, 0, -1).applyQuaternion(t.quaternion),
          (i = this.sortViewDir.dot(this.lastSortViewDir)),
          (r = this.sortViewOffset.copy(t.position).sub(this.lastSortViewPos).length()),
          (this.continuousSorting || this.forceSorting || i <= 0.99 || r >= 1) &&
            this.enableSorting)
        ) {
          let i = {
            indices: this.indexesBuffer,
            centers: this.bufferCenters,
            modelViewProj: n.elements,
            totalSplats: this.instanceCount,
          };
          (this.sorter.postMessage({ sort: i }),
            (this.enableSorting = !1),
            (this.forceSorting = !1),
            (this.sorter.onmessage = async (t) => {
              t.data.dataSorted &&
                (null != t.data.dataSorted
                  ? (this.bufferSorted.set(new Uint32Array(t.data.dataSorted), 0),
                    this.textures.forEach((t) => (t.needsUpdate = !0)),
                    (this.mesh.geometry.instanceCount = this.instanceCount),
                    this.defer().then((t) => {
                      (e(), (this.enableSorting = !0));
                    }))
                  : (this.enableSorting = !0));
            }),
            this.lastSortViewPos.copy(t.position),
            this.lastSortViewDir.copy(this.sortViewDir));
        }
      }
      getSplatData(t, e) {
        if (null == this.mesh) return null;
        let n = new h.Vector3(),
          i = new h.Vector3(),
          r = new h.Vector3(),
          o = new h.Quaternion();
        return (
          (n.x = this.bufferPositions[4 * t + 0]),
          (n.y = this.bufferPositions[4 * t + 1]),
          (n.z = this.bufferPositions[4 * t + 2]),
          (r.x = this.bufferScale[3 * t + 0]),
          (r.y = this.bufferScale[3 * t + 1]),
          (r.z = this.bufferScale[3 * t + 2]),
          (o.w = this.bufferOrientation[4 * t + 0]),
          (o.x = this.bufferOrientation[4 * t + 1]),
          (o.y = this.bufferOrientation[4 * t + 2]),
          (o.z = this.bufferOrientation[4 * t + 3]),
          (i.x = this.bufferNodes[4 * e + 0]),
          (i.y = this.bufferNodes[4 * e + 1]),
          (i.z = this.bufferNodes[4 * e + 2]),
          n.add(i),
          { position: this.mesh.localToWorld(n), scale: r, orientation: o }
        );
      }
      dispose() {
        this.enabled &&
          (this.sorter.terminate(),
          (this.sorter = null),
          this.mesh.geometry.dispose(),
          this.material?.dispose(),
          this.textures.forEach((t) => {
            (t.dispose(), (t = null));
          }),
          (this.textures = []),
          (this.bufferCenters = new Float32Array(0)),
          (this.bufferPositions = new Float32Array(0)),
          (this.bufferScale = new Float32Array(0)),
          (this.bufferOrientation = new Float32Array(0)),
          (this.bufferSorted = new Uint32Array(0)),
          (this.bufferOrientation = new Float32Array(0)),
          (this.bufferPosColor = new Uint32Array(0)),
          (this.bufferCovariance0 = new Float32Array(0)),
          (this.bufferCovariance1 = new Float32Array(0)),
          (this.bufferNodes = new Float32Array(0)),
          (this.bufferNodes2 = new Float32Array(0)),
          (this.bufferNodesIndices = new Uint32Array(0)),
          (this.bufferVisibilityNodes = new Uint8Array(0)),
          (this.bufferHarmonics1 = new Uint32Array(0)),
          (this.bufferHarmonics2 = new Uint32Array(0)),
          (this.bufferHarmonics3 = new Uint32Array(0)),
          (this.mesh = null),
          (this.enabled = !1));
      }
      get splatsEnabled() {
        return this.enabled;
      }
    }
    class dt extends at {
      constructor(t, e, n, i = !1, r = 529e4) {
        (super(),
          (this.disposed = !1),
          (this.level = 0),
          (this.maxLevel = 1 / 0),
          (this.splatsMesh = null),
          (this.minNodePixelSize = 200),
          (this.root = null),
          (this.boundingBoxNodes = []),
          (this.visibleNodes = []),
          (this.visibleGeometry = []),
          (this.numVisiblePoints = 0),
          (this.showBoundingBox = !1),
          (this.visibleBounds = new h.Box3()),
          (this.renderAsSplats = null),
          (this.loadHarmonics = !1),
          (this.maxAmountOfSplats = 529e4),
          (this.name = ''),
          (this.potree = t),
          (this.root = e.root),
          (this.pcoGeometry = e),
          (this.boundingBox = e.boundingBox),
          (this.boundingSphere = this.boundingBox.getBoundingSphere(new h.Sphere())),
          (this.loadHarmonics = i),
          (this.maxAmountOfSplats = r),
          this.position.copy(e.offset),
          this.updateMatrix(),
          (this.material = n || e instanceof st ? new V({ colorRgba: !0 }) : new V()),
          this.initMaterial(this.material));
      }
      initMaterial(t) {
        this.updateMatrixWorld(!0);
        const { min: e, max: n } = $(
            this.pcoGeometry.tightBoundingBox || this.getBoundingBoxWorld(),
            this.matrixWorld,
          ),
          i = n.z - e.z;
        ((t.heightMin = e.z - 0.2 * i), (t.heightMax = n.z + 0.2 * i));
      }
      dispose() {
        (this.root && this.root.dispose(),
          this.pcoGeometry.root.traverse((t) => this.potree.lru.remove(t)),
          this.pcoGeometry.dispose(),
          this.material.dispose(),
          (this.visibleNodes = []),
          (this.visibleGeometry = []),
          this.picker && (this.picker.dispose(), (this.picker = void 0)),
          null !== this.splatsMesh && (this.splatsMesh.dispose(), (this.splatsMesh = null)),
          (this.disposed = !0));
      }
      get pointSizeType() {
        return this.material.pointSizeType;
      }
      set pointSizeType(t) {
        this.material.pointSizeType = t;
      }
      toTreeNode(t, e) {
        const n = new h.Points(t.geometry, this.material),
          i = new it(t, n);
        return (
          (n.name = t.name),
          n.position.copy(t.boundingBox.min),
          (n.frustumCulled = !1),
          (n.onBeforeRender = V.makeOnBeforeRender(this, i)),
          e
            ? (e.sceneNode.add(n),
              (e.children[t.index] = i),
              t.oneTimeDisposeHandlers.push(() => {
                (i.disposeSceneNode(), e.sceneNode.remove(i.sceneNode), (e.children[t.index] = t));
              }))
            : ((this.root = i), this.add(n)),
          i
        );
      }
      updateSplats(t, e, n = () => {}) {
        let i = this.children[0];
        if (
          i &&
          ((null !== this.renderAsSplats && this.renderAsSplats) ||
            ((this.renderAsSplats = !1),
            i.traverse((t) => {
              t.geometry.hasAttribute('COVARIANCE0') && (this.renderAsSplats = !0);
            }),
            this.renderAsSplats &&
              null === this.splatsMesh &&
              ((this.splatsMesh = new ut(!1, this.maxAmountOfSplats, this.loadHarmonics)),
              this.add(this.splatsMesh))),
          null !== this.splatsMesh && this.renderAsSplats && this.splatsMesh.splatsEnabled)
        ) {
          let r = this.splatsMesh.update(i, t, e, n);
          this.splatsMesh.splatsEnabled &&
            this.progress > 0.99 &&
            r &&
            this.splatsMesh.sortSplats(t, n);
        }
      }
      updateVisibleBounds() {
        const t = this.visibleBounds;
        (t.min.set(1 / 0, 1 / 0, 1 / 0), t.max.set(-1 / 0, -1 / 0, -1 / 0));
        for (const e of this.visibleNodes)
          e.isLeafNode && (t.expandByPoint(e.boundingBox.min), t.expandByPoint(e.boundingBox.max));
      }
      updateBoundingBoxes() {
        if (!this.showBoundingBox || !this.parent) return;
        let t = this.parent.getObjectByName('bbroot');
        t || ((t = new h.Object3D()), (t.name = 'bbroot'), this.parent.add(t));
        const e = [];
        for (const t of this.visibleNodes)
          void 0 !== t.boundingBoxNode && t.isLeafNode && e.push(t.boundingBoxNode);
        t.children = e;
      }
      updateMatrixWorld(t) {
        (!0 === this.matrixAutoUpdate && this.updateMatrix(),
          (!0 !== this.matrixWorldNeedsUpdate && !0 !== t) ||
            (this.parent
              ? this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)
              : this.matrixWorld.copy(this.matrix),
            (this.matrixWorldNeedsUpdate = !1),
            (t = !0)));
      }
      hideDescendants(t) {
        const e = [];
        for (n(t); e.length > 0; ) {
          const t = e.shift();
          ((t.visible = !1), n(t));
        }
        function n(t) {
          for (const n of t.children) n.visible && e.push(n);
        }
      }
      moveToOrigin() {
        (this.position.set(0, 0, 0),
          this.position.set(0, 0, 0).sub(this.getBoundingBoxWorld().getCenter(new h.Vector3())));
      }
      moveToGroundPlane() {
        this.position.y += -this.getBoundingBoxWorld().min.y;
      }
      getBoundingBoxWorld() {
        return (this.updateMatrixWorld(!0), $(this.boundingBox, this.matrixWorld));
      }
      getVisibleExtent() {
        return this.visibleBounds.applyMatrix4(this.matrixWorld);
      }
      pick(t, e, n, i = {}) {
        return ((this.picker = this.picker || new ot()), this.picker.pick(t, e, n, [this], i));
      }
      get progress() {
        return 0 === this.visibleGeometry.length
          ? 0
          : this.visibleNodes.length / this.visibleGeometry.length;
      }
      get maxAmountOfSplatsToRender() {
        return this.maxAmountOfSplats;
      }
    }
    const ft = document.createElement('canvas').getContext('webgl'),
      ct = {
        SHADER_INTERPOLATION: ht('EXT_frag_depth') && pt(8),
        SHADER_SPLATS: ht('EXT_frag_depth') && ht('OES_texture_float') && pt(8),
        SHADER_EDL: ht('OES_texture_float') && pt(8),
        precision: (function () {
          if (null === ft) return '';
          const t = ft.getShaderPrecisionFormat(ft.VERTEX_SHADER, ft.HIGH_FLOAT),
            e = ft.getShaderPrecisionFormat(ft.VERTEX_SHADER, ft.MEDIUM_FLOAT),
            n = ft.getShaderPrecisionFormat(ft.FRAGMENT_SHADER, ft.HIGH_FLOAT),
            i = ft.getShaderPrecisionFormat(ft.FRAGMENT_SHADER, ft.MEDIUM_FLOAT),
            r = t && n && t.precision > 0 && n.precision > 0,
            o = e && i && e.precision > 0 && i.precision > 0;
          return r ? 'highp' : o ? 'mediump' : 'lowp';
        })(),
      };
    function ht(t) {
      return null !== ft && Boolean(ft.getExtension(t));
    }
    function pt(t) {
      return null !== ft && ft.getParameter(ft.MAX_VARYING_VECTORS) >= t;
    }
    class mt {
      constructor() {
        ((this.resolvers = []), (this.promises = []));
      }
      enqueue(t) {
        (this.resolvers.length || this.add(), this.resolvers.shift()(t));
      }
      dequeue() {
        return (this.promises.length || this.add(), this.promises.shift());
      }
      add() {
        this.promises.push(
          new Promise((t) => {
            this.resolvers.push(t);
          }),
        );
      }
    }
    class gt {
      constructor(t, e) {
        ((this.wrappedWorker = t),
          (this.maxIdle = e),
          (this.timeoutId = void 0),
          (this.terminated = !1));
      }
      get worker() {
        return this.wrappedWorker;
      }
      get isTerminated() {
        return this.terminated;
      }
      markIdle() {
        this.timeoutId = window.setTimeout(() => {
          ((this.terminated = !0), this.wrappedWorker.terminate());
        }, this.maxIdle);
      }
      markInUse() {
        this.timeoutId && window.clearTimeout(this.timeoutId);
      }
    }
    class At {
      constructor(t, e) {
        ((this.maxWorkers = t), (this.workerType = e), (this.pool = new mt()), (this.poolSize = 0));
      }
      getWorker() {
        return this.poolSize < this.maxWorkers
          ? (this.poolSize++, Promise.resolve(new gt(new this.workerType(), At.POOL_MAX_IDLE)))
          : this.pool
              .dequeue()
              .then(
                (t) => (t.markInUse(), t.isTerminated ? (this.poolSize--, this.getWorker()) : t),
              );
      }
      releaseWorker(t) {
        (t.markIdle(), this.pool.enqueue(t));
      }
    }
    At.POOL_MAX_IDLE = 7e3;
    class yt {
      constructor(t) {
        ((this.versionMinor = 0), (this.version = t));
        const e = -1 === t.indexOf('.') ? t.length : t.indexOf('.');
        ((this.versionMajor = parseInt(t.substr(0, e), 10)),
          (this.versionMinor = parseInt(t.substr(e + 1), 10)),
          isNaN(this.versionMinor) && (this.versionMinor = 0));
      }
      newerThan(t) {
        const e = new yt(t);
        return (
          this.versionMajor > e.versionMajor ||
          (this.versionMajor === e.versionMajor && this.versionMinor > e.versionMinor)
        );
      }
      equalOrHigher(t) {
        const e = new yt(t);
        return (
          this.versionMajor > e.versionMajor ||
          (this.versionMajor === e.versionMajor && this.versionMinor >= e.versionMinor)
        );
      }
      upTo(t) {
        return !this.newerThan(t);
      }
    }
    class vt {
      constructor({
        getUrl: t = (t) => Promise.resolve(t),
        version: e,
        boundingBox: n,
        scale: i,
        xhrRequest: r,
      }) {
        ((this.disposed = !1),
          (this.version = 'string' == typeof e ? new yt(e) : e),
          (this.xhrRequest = r),
          (this.getUrl = t),
          (this.boundingBox = n),
          (this.scale = i),
          (this.callbacks = []));
      }
      dispose() {
        this.disposed = !0;
      }
      load(t) {
        return t.loaded || this.disposed
          ? Promise.resolve()
          : Promise.resolve(this.getUrl(this.getNodeUrl(t)))
              .then((t) => this.xhrRequest(t, { mode: 'cors' }))
              .then((t) => b(t))
              .then((t) => t.arrayBuffer())
              .then((t) => w(t))
              .then((e) => new Promise((n) => this.parse(t, e, n)));
      }
      getNodeUrl(t) {
        let e = t.getUrl();
        return (this.version.equalOrHigher('1.4') && (e += '.bin'), e);
      }
      parse(t, e, n) {
        this.disposed
          ? n()
          : vt.WORKER_POOL.getWorker().then((i) => {
              const r = t.pcoGeometry.pointAttributes,
                o = e.byteLength / r.byteSize;
              (this.version.upTo('1.5') && (t.numPoints = o),
                (i.worker.onmessage = (e) => {
                  if (this.disposed) return (n(), void vt.WORKER_POOL.releaseWorker(i));
                  const r = e.data,
                    s = (t.geometry = t.geometry || new h.BufferGeometry());
                  ((s.boundingBox = t.boundingBox),
                    this.addBufferAttributes(s, r.attributeBuffers),
                    this.addIndices(s, r.indices),
                    this.addNormalAttribute(s, o),
                    (t.mean = new h.Vector3().fromArray(r.mean)),
                    (t.tightBoundingBox = this.getTightBoundingBox(r.tightBoundingBox)),
                    (t.loaded = !0),
                    (t.loading = !1),
                    (t.failed = !1),
                    t.pcoGeometry.numNodesLoading--,
                    (t.pcoGeometry.needsUpdate = !0),
                    this.callbacks.forEach((e) => e(t)),
                    n(),
                    vt.WORKER_POOL.releaseWorker(i));
                }));
              const s = {
                buffer: e,
                pointAttributes: r,
                version: this.version.version,
                min: t.boundingBox.min.toArray(),
                offset: t.pcoGeometry.offset.toArray(),
                scale: this.scale,
                spacing: t.spacing,
                hasChildren: t.hasChildren,
              };
              i.worker.postMessage(s, [s.buffer]);
            });
      }
      getTightBoundingBox({ min: t, max: e }) {
        const n = new h.Box3(new h.Vector3().fromArray(t), new h.Vector3().fromArray(e));
        return (n.max.sub(n.min), n.min.set(0, 0, 0), n);
      }
      addBufferAttributes(t, e) {
        Object.keys(e).forEach((n) => {
          const i = e[n].buffer;
          this.isAttribute(n, k.POSITION_CARTESIAN)
            ? t.setAttribute('position', new h.BufferAttribute(new Float32Array(i), 3))
            : this.isAttribute(n, k.COLOR_PACKED)
              ? t.setAttribute('color', new h.BufferAttribute(new Uint8Array(i), 3, !0))
              : this.isAttribute(n, k.INTENSITY)
                ? t.setAttribute('intensity', new h.BufferAttribute(new Float32Array(i), 1))
                : this.isAttribute(n, k.CLASSIFICATION)
                  ? t.setAttribute('classification', new h.BufferAttribute(new Uint8Array(i), 1))
                  : (this.isAttribute(n, k.NORMAL_SPHEREMAPPED) ||
                      this.isAttribute(n, k.NORMAL_OCT16) ||
                      this.isAttribute(n, k.NORMAL)) &&
                    t.setAttribute('normal', new h.BufferAttribute(new Float32Array(i), 3));
        });
      }
      addIndices(t, e) {
        const n = new h.Uint8BufferAttribute(e, 4);
        ((n.normalized = !0), t.setAttribute('indices', n));
      }
      addNormalAttribute(t, e) {
        if (!t.getAttribute('normal')) {
          const n = new Float32Array(3 * e);
          t.setAttribute('normal', new h.BufferAttribute(new Float32Array(n), 3));
        }
      }
      isAttribute(t, e) {
        return parseInt(t, 10) === e;
      }
    }
    function bt(t, e, n) {
      return Promise.resolve(e(t)).then((t) =>
        n(t, { mode: 'cors' })
          .then((t) => b(t))
          .then((t) => t.json())
          .then(
            (function (t, e, n) {
              return (i) => {
                const {
                    offset: r,
                    boundingBox: o,
                    tightBoundingBox: s,
                  } = (function (t) {
                    const e = new h.Vector3(t.boundingBox.lx, t.boundingBox.ly, t.boundingBox.lz),
                      n = new h.Vector3(t.boundingBox.ux, t.boundingBox.uy, t.boundingBox.uz),
                      i = new h.Box3(e, n),
                      r = i.clone(),
                      o = e.clone();
                    if (t.tightBoundingBox) {
                      const { lx: e, ly: n, lz: i, ux: o, uy: s, uz: a } = t.tightBoundingBox;
                      (r.min.set(e, n, i), r.max.set(o, s, a));
                    }
                    return (
                      i.min.sub(o),
                      i.max.sub(o),
                      r.min.sub(o),
                      r.max.sub(o),
                      { offset: o, boundingBox: i, tightBoundingBox: r }
                    );
                  })(i),
                  a = new vt({
                    getUrl: e,
                    version: i.version,
                    boundingBox: o,
                    scale: i.scale,
                    xhrRequest: n,
                  }),
                  l = new nt(a, o, s, r, n);
                ((l.url = t),
                  (l.octreeDir = i.octreeDir),
                  (l.needsUpdate = !0),
                  (l.spacing = i.spacing),
                  (l.hierarchyStepSize = i.hierarchyStepSize),
                  (l.projection = i.projection),
                  (l.offset = r),
                  (l.pointAttributes = new Z(i.pointAttributes)));
                const u = {},
                  d = new yt(i.version);
                return (function (t, e, n, i) {
                  const r = new et('r', t, t.boundingBox);
                  return (
                    (r.hasChildren = !0),
                    (r.spacing = t.spacing),
                    i.upTo('1.5') ? (r.numPoints = e.hierarchy[0][1]) : (r.numPoints = 0),
                    (t.root = r),
                    (n.r = r),
                    t.root.load()
                  );
                })(l, i, u, d).then(
                  () => (
                    d.upTo('1.4') &&
                      (function (t, e, n) {
                        for (let i = 1; i < e.hierarchy.length; i++) {
                          const [r, o] = e.hierarchy[i],
                            { index: s, parentName: a, level: l } = wt(r),
                            u = n[a],
                            d = tt(u.boundingBox, s),
                            f = new et(r, t, d);
                          ((f.level = l),
                            (f.numPoints = o),
                            (f.spacing = t.spacing / Math.pow(2, f.level)),
                            (n[r] = f),
                            u.addChild(f));
                        }
                      })(l, i, u),
                    (l.nodes = u),
                    l
                  ),
                );
              };
            })(t, e, n),
          ),
      );
    }
    function wt(t) {
      return { index: y(t), parentName: t.substring(0, t.length - 1), level: t.length - 1 };
    }
    var xt;
    ((vt.WORKER_POOL = new At(32, i(62).A)),
      (function (t) {
        ((t.DECODER_WORKER = 'DECODER_WORKER'),
          (t.DECODER_WORKER_GLTF = 'DECODER_WORKER_GLTF'),
          (t.DECODER_WORKER_BROTLI = 'DECODER_WORKER_BROTLI'),
          (t.DECODER_WORKER_SPLATS = 'DECODER_WORKER_SPLATS'));
      })(xt || (xt = {})));
    class Tt {
      constructor() {
        this.workers = {
          DECODER_WORKER: [],
          DECODER_WORKER_GLTF: [],
          DECODER_WORKER_BROTLI: [],
          DECODER_WORKER_SPLATS: [],
        };
      }
      getWorker(t) {
        if (void 0 === this.workers[t]) throw new Error('Unknown worker type');
        if (0 === this.workers[t].length) {
          const e = (function (t) {
            switch (t) {
              case xt.DECODER_WORKER:
                return new (0, i(257).A)();
              case xt.DECODER_WORKER_GLTF:
                return new (0, i(601).A)();
              case xt.DECODER_WORKER_BROTLI:
                return new (0, i(42).A)();
              case xt.DECODER_WORKER_SPLATS:
                return new (0, i(521).A)();
              default:
                throw new Error('Unknown worker type');
            }
          })(t);
          this.workers[t].push(e);
        }
        const e = this.workers[t].pop();
        if (void 0 === e) throw new Error('No workers available');
        return e;
      }
      returnWorker(t, e) {
        this.workers[t].push(e);
      }
    }
    class It {
      constructor(t, e) {
        ((this.metadata = t),
          (this.context = e),
          (this.workerType = xt.DECODER_WORKER_BROTLI),
          (this._metadata = t));
      }
      async decode(t, e) {
        const { byteOffset: n, byteSize: i } = t;
        if (void 0 === n || void 0 === i) throw new Error('byteOffset and byteSize are required');
        if (i === BigInt(0))
          return {
            buffer: new ArrayBuffer(0),
            geometry: new h.BufferGeometry(),
            data: { tightBoundingBox: { min: [0, 0, 0], max: [0, 0, 0] } },
          };
        const r = await this.getUrl(this.octreePath),
          o = { Range: `bytes=${n}-${n + i - BigInt(1)}` },
          s = await this.xhrRequest(r, { headers: o }),
          a = await s.arrayBuffer(),
          l = t.octreeGeometry.pointAttributes,
          u = t.octreeGeometry.scale,
          d = t.boundingBox,
          f = t.octreeGeometry.offset.clone().add(d.min),
          c = d.max.clone().sub(d.min),
          p = f.clone().add(c),
          m = t.numPoints,
          g = this._metadata.offset,
          A = {
            name: t.name,
            buffer: a,
            pointAttributes: l,
            scale: u,
            min: f,
            max: p,
            size: c,
            offset: g,
            numPoints: m,
          };
        e.postMessage(A, [A.buffer]);
        const y = await new Promise((t) => {
          e.onmessage = t;
        });
        return this.readSuccessMessage(y, a);
      }
      get getUrl() {
        return this.context.getUrl;
      }
      get xhrRequest() {
        return this.context.xhrRequest;
      }
      get octreePath() {
        return this.context.octreePath;
      }
      readSuccessMessage(t, e) {
        const n = t.data,
          i = n.attributeBuffers,
          r = new h.BufferGeometry();
        for (const t in i) {
          const e = i[t].buffer;
          if ('position' === t)
            r.setAttribute('position', new h.BufferAttribute(new Float32Array(e), 3));
          else if ('rgba' === t)
            r.setAttribute('rgba', new h.BufferAttribute(new Uint8Array(e), 4, !0));
          else if ('NORMAL' === t)
            r.setAttribute('normal', new h.BufferAttribute(new Float32Array(e), 3));
          else if ('INDICES' === t) {
            const t = new h.BufferAttribute(new Uint8Array(e), 4);
            ((t.normalized = !0), r.setAttribute('indices', t));
          } else {
            const n = new h.BufferAttribute(new Float32Array(e), 1),
              o = i[t].attribute;
            ((n.potree = {
              offset: i[t].offset,
              scale: i[t].scale,
              preciseBuffer: i[t].preciseBuffer,
              range: o.range,
            }),
              r.setAttribute(t, n));
          }
        }
        return { data: n, buffer: e, geometry: r };
      }
    }
    class Et {
      constructor(t, e) {
        ((this.metadata = t),
          (this.context = e),
          (this.workerType = xt.DECODER_WORKER),
          (this._metadata = t));
      }
      async decode(t, e) {
        const { byteOffset: n, byteSize: i } = t;
        if (void 0 === n || void 0 === i) throw new Error('byteOffset and byteSize are required');
        let r;
        const o = await this.getUrl(this.octreePath),
          s = n,
          a = n + i - BigInt(1);
        if (i === BigInt(0))
          ((r = new ArrayBuffer(0)), console.warn(`loaded node with 0 bytes: ${t.name}`));
        else {
          const t = { Range: `bytes=${s}-${a}` },
            e = await this.xhrRequest(o, { headers: t });
          r = await e.arrayBuffer();
        }
        const l = t.octreeGeometry.pointAttributes,
          u = t.octreeGeometry.scale,
          d = t.boundingBox,
          f = t.octreeGeometry.offset.clone().add(d.min),
          c = d.max.clone().sub(d.min),
          h = f.clone().add(c),
          p = t.numPoints,
          m = this._metadata.offset,
          g = {
            name: t.name,
            buffer: r,
            pointAttributes: l,
            scale: u,
            min: f,
            max: h,
            size: c,
            offset: m,
            numPoints: p,
          };
        e.postMessage(g, [g.buffer]);
        const A = await new Promise((t) => {
          e.onmessage = t;
        });
        return this.readSuccessMessage(A, r);
      }
      get getUrl() {
        return this.context.getUrl;
      }
      get xhrRequest() {
        return this.context.xhrRequest;
      }
      get octreePath() {
        return this.context.octreePath;
      }
      readSuccessMessage(t, e) {
        const n = t.data,
          i = n.attributeBuffers,
          r = new h.BufferGeometry();
        for (const t in i) {
          const e = i[t].buffer;
          if ('position' === t)
            r.setAttribute('position', new h.BufferAttribute(new Float32Array(e), 3));
          else if ('rgba' === t)
            r.setAttribute('rgba', new h.BufferAttribute(new Uint8Array(e), 4, !0));
          else if ('NORMAL' === t)
            r.setAttribute('normal', new h.BufferAttribute(new Float32Array(e), 3));
          else if ('INDICES' === t) {
            const t = new h.BufferAttribute(new Uint8Array(e), 4);
            ((t.normalized = !0), r.setAttribute('indices', t));
          } else {
            const n = new h.BufferAttribute(new Float32Array(e), 1),
              o = i[t].attribute;
            ((n.potree = {
              offset: i[t].offset,
              scale: i[t].scale,
              preciseBuffer: i[t].preciseBuffer,
              range: o.range,
            }),
              r.setAttribute(t, n));
          }
        }
        return { data: n, buffer: e, geometry: r };
      }
    }
    function Nt(t, e) {
      return `${t}${e}`;
    }
    function Ot(t, e) {
      var n = new Uint8Array(t.byteLength + e.byteLength);
      return (n.set(new Uint8Array(t), 0), n.set(new Uint8Array(e), t.byteLength), n.buffer);
    }
    class Pt {
      constructor(t, e) {
        ((this.metadata = t),
          (this.context = e),
          (this.workerType = xt.DECODER_WORKER_GLTF),
          (this._metadata = t));
      }
      async decode(t, e) {
        const { byteOffset: n, byteSize: i } = t;
        if (void 0 === n || void 0 === i) throw new Error('byteOffset and byteSize are required');
        let r;
        const o = await this.getUrl(this.gltfColorsPath),
          s = await this.getUrl(this.gltfPositionsPath);
        if (i === BigInt(0))
          ((r = new ArrayBuffer(0)), console.warn(`loaded node with 0 bytes: ${t.name}`));
        else {
          const t = { Range: `bytes=${4n * n * 3n}-${4n * n * 3n + 4n * i * 3n - 1n}` },
            e = await this.xhrRequest(s, { headers: t }),
            a = await e.arrayBuffer(),
            l = { Range: `bytes=${4n * n}-${4n * n + 4n * i - 1n}` },
            u = await this.xhrRequest(o, { headers: l });
          r = Ot(a, await u.arrayBuffer());
        }
        const a = t.octreeGeometry.pointAttributes,
          l = t.octreeGeometry.scale,
          u = t.boundingBox,
          d = t.octreeGeometry.offset.clone().add(u.min),
          f = u.max.clone().sub(u.min),
          c = d.clone().add(f),
          p = t.numPoints,
          m = this._metadata.offset,
          g = {
            name: t.name,
            buffer: r,
            pointAttributes: a,
            scale: l,
            min: d,
            max: c,
            size: f,
            offset: m,
            numPoints: p,
          };
        e.postMessage(g, [g.buffer]);
        const A = (await new Promise((t) => (e.onmessage = t))).data,
          y = A.attributeBuffers,
          v = new h.BufferGeometry();
        for (const t in y) {
          const e = y[t].buffer;
          if ('position' === t)
            v.setAttribute('position', new h.BufferAttribute(new Float32Array(e), 3));
          else if ('rgba' === t)
            v.setAttribute('rgba', new h.BufferAttribute(new Uint8Array(e), 4, !0));
          else if ('NORMAL' === t)
            v.setAttribute('normal', new h.BufferAttribute(new Float32Array(e), 3));
          else if ('INDICES' === t) {
            const t = new h.BufferAttribute(new Uint8Array(e), 4);
            ((t.normalized = !0), v.setAttribute('indices', t));
          } else {
            const n = new h.BufferAttribute(new Float32Array(e), 1),
              i = y[t].attribute;
            ((n.potree = {
              offset: y[t].offset,
              scale: y[t].scale,
              preciseBuffer: y[t].preciseBuffer,
              range: i.range,
            }),
              v.setAttribute(t, n));
          }
        }
        return { buffer: r, geometry: v, data: A };
      }
      get gltfColorsPath() {
        return this.context.gltfColorsPath;
      }
      get gltfPositionsPath() {
        return this.context.gltfPositionsPath;
      }
      get getUrl() {
        return this.context.getUrl;
      }
      get xhrRequest() {
        return this.context.xhrRequest;
      }
    }
    class St {
      constructor(t, e) {
        ((this.metadata = t),
          (this.context = e),
          (this.workerType = xt.DECODER_WORKER_SPLATS),
          (this._metadata = t));
      }
      async decode(t, e) {
        const { byteOffset: n, byteSize: i } = t;
        if (void 0 === n || void 0 === i) throw new Error('byteOffset and byteSize are required');
        let r,
          o,
          s = this.metadata,
          a = function (t) {
            return s.attributes.filter((e) => e.name === t)[0].bufferView.uri;
          };
        ((r = {
          positions: await this.getUrl(a('position')),
          colors: await this.getUrl(a('sh_band_0')),
          opacities: await this.getUrl(a('opacity')),
          scales: await this.getUrl(a('scale')),
          rotations: await this.getUrl(a('rotation')),
        }),
          this.harmonicsEnabled &&
            (r = {
              positions: await this.getUrl(a('position')),
              colors: await this.getUrl(a('sh_band_0')),
              opacities: await this.getUrl(a('opacity')),
              scales: await this.getUrl(a('scale')),
              rotations: await this.getUrl(a('rotation')),
              shBand1_0: await this.getUrl(a('sh_band_1_triplet_0')),
              shBand1_1: await this.getUrl(a('sh_band_1_triplet_1')),
              shBand1_2: await this.getUrl(a('sh_band_1_triplet_2')),
              shBand2_0: await this.getUrl(a('sh_band_2_triplet_0')),
              shBand2_1: await this.getUrl(a('sh_band_2_triplet_1')),
              shBand2_2: await this.getUrl(a('sh_band_2_triplet_2')),
              shBand2_3: await this.getUrl(a('sh_band_2_triplet_3')),
              shBand2_4: await this.getUrl(a('sh_band_2_triplet_4')),
              shBand3_0: await this.getUrl(a('sh_band_3_triplet_0')),
              shBand3_1: await this.getUrl(a('sh_band_3_triplet_1')),
              shBand3_2: await this.getUrl(a('sh_band_3_triplet_2')),
              shBand3_3: await this.getUrl(a('sh_band_3_triplet_3')),
              shBand3_4: await this.getUrl(a('sh_band_3_triplet_4')),
              shBand3_5: await this.getUrl(a('sh_band_3_triplet_5')),
              shBand3_6: await this.getUrl(a('sh_band_3_triplet_6')),
            }));
        const l = {
          positions: 3n,
          colors: 3n,
          opacities: 1n,
          scales: 3n,
          rotations: 4n,
          shBand1_0: 3n,
          shBand1_1: 3n,
          shBand1_2: 3n,
          shBand2_0: 3n,
          shBand2_1: 3n,
          shBand2_2: 3n,
          shBand2_3: 3n,
          shBand2_4: 3n,
          shBand3_0: 3n,
          shBand3_1: 3n,
          shBand3_2: 3n,
          shBand3_3: 3n,
          shBand3_4: 3n,
          shBand3_5: 3n,
          shBand3_6: 3n,
        };
        if (i === BigInt(0)) return void console.warn(`Loaded node with 0 bytes: ${t.name}`);
        {
          const t = async (t, e) => {
              const r = 4n * n * e,
                o = {
                  Range: `bytes=${r}-${r + 4n * i * e - 1n}`,
                  'Transfer-Encoding': 'compress',
                  'Accept-Encoding': 'compress',
                };
              return (await this.xhrRequest(t, { headers: o })).arrayBuffer();
            },
            e = Object.entries(r).map(([e, n]) => t(n, l[e])),
            [s, a, u, d, f, c, h, p, m, g, A, y, v, b, w, x, T, I, E, N] = await Promise.all(e);
          ((o = Ot(s, a)),
            (o = Ot(o, u)),
            (o = Ot(o, d)),
            (o = Ot(o, f)),
            this.harmonicsEnabled &&
              ((o = Ot(o, c)),
              (o = Ot(o, h)),
              (o = Ot(o, p)),
              (o = Ot(o, m)),
              (o = Ot(o, g)),
              (o = Ot(o, A)),
              (o = Ot(o, y)),
              (o = Ot(o, v)),
              (o = Ot(o, b)),
              (o = Ot(o, w)),
              (o = Ot(o, x)),
              (o = Ot(o, T)),
              (o = Ot(o, I)),
              (o = Ot(o, E)),
              (o = Ot(o, N))));
        }
        const u = t.octreeGeometry.pointAttributes,
          d = t.octreeGeometry.scale,
          f = t.boundingBox,
          c = t.octreeGeometry.offset.clone().add(f.min),
          p = f.max.clone().sub(f.min),
          m = c.clone().add(p),
          g = t.numPoints,
          A = this._metadata.offset,
          y = {
            name: t.name,
            buffer: o,
            pointAttributes: u,
            scale: d,
            min: c,
            max: m,
            size: p,
            offset: A,
            numPoints: g,
            harmonicsEnabled: this.harmonicsEnabled,
          };
        e.postMessage(y, [y.buffer]);
        const v = (await new Promise((t) => (e.onmessage = t))).data,
          b = v.attributeBuffers,
          w = new h.BufferGeometry();
        w.drawRange.count = t.numPoints;
        for (const t in b) {
          const e = b[t].buffer;
          ('position' === t &&
            w.setAttribute('centers', new h.BufferAttribute(new Float32Array(e), 4)),
            'scale' === t && w.setAttribute('scale', new h.BufferAttribute(new Float32Array(e), 3)),
            'orientation' === t &&
              w.setAttribute('orientation', new h.BufferAttribute(new Float32Array(e), 4)),
            'raw_position' === t
              ? w.setAttribute('raw_position', new h.BufferAttribute(new Float32Array(e), 4))
              : 'COVARIANCE0' === t
                ? w.setAttribute('COVARIANCE0', new h.BufferAttribute(new Float32Array(e), 4))
                : 'COVARIANCE1' === t
                  ? w.setAttribute('COVARIANCE1', new h.BufferAttribute(new Float32Array(e), 2))
                  : 'POS_COLOR' === t &&
                    w.setAttribute('POS_COLOR', new h.BufferAttribute(new Uint32Array(e), 4)),
            this.harmonicsEnabled &&
              ('HARMONICS1' === t
                ? w.setAttribute('HARMONICS1', new h.BufferAttribute(new Uint32Array(e), 3))
                : 'HARMONICS2' === t
                  ? w.setAttribute('HARMONICS2', new h.BufferAttribute(new Uint32Array(e), 5))
                  : 'HARMONICS3' === t &&
                    w.setAttribute('HARMONICS3', new h.BufferAttribute(new Uint32Array(e), 7))));
        }
        return (
          (w.userData.maxDepth = this._metadata.hierarchy.depth + 1),
          (w.userData.totalSplats = this._metadata.points),
          (w.userData.offset = new h.Vector3(...A).sub(c)),
          { data: v, buffer: o, geometry: w }
        );
      }
      get getUrl() {
        return this.context.getUrl;
      }
      get xhrRequest() {
        return this.context.xhrRequest;
      }
      get harmonicsEnabled() {
        return this.context.harmonicsEnabled;
      }
    }
    class Ct {
      constructor(t, e, n) {
        ((this.name = t),
          (this.octreeGeometry = e),
          (this.boundingBox = n),
          (this.loaded = !1),
          (this.loading = !1),
          (this.failed = !1),
          (this.parent = null),
          (this.hasChildren = !1),
          (this.isLeafNode = !0),
          (this.isTreeNode = !1),
          (this.isGeometryNode = !0),
          (this.children = [null, null, null, null, null, null, null, null]),
          (this.id = Ct.IDCount++),
          (this.index = parseInt(t.charAt(t.length - 1))),
          (this.boundingSphere = n.getBoundingSphere(new h.Sphere())),
          (this.tightBoundingBox = n.clone()),
          (this.numPoints = 0),
          (this.oneTimeDisposeHandlers = []));
      }
      getLevel() {
        return this.level;
      }
      isLoaded() {
        return this.loaded;
      }
      getBoundingSphere() {
        return this.boundingSphere;
      }
      getBoundingBox() {
        return this.boundingBox;
      }
      load() {
        return this.octreeGeometry.numNodesLoading >= this.octreeGeometry.maxNumNodesLoading
          ? Promise.resolve()
          : this.octreeGeometry.loader
            ? this.octreeGeometry.loader.load(this)
            : ((this.loading = !1),
              (this.failed = !0),
              Promise.reject(`Loader not initialized for ${this.name}`));
      }
      getNumPoints() {
        return this.numPoints;
      }
      dispose() {
        if (this.geometry && null != this.parent) {
          (this.geometry.dispose(), (this.geometry = void 0), (this.loaded = !1));
          for (let t = 0; t < this.oneTimeDisposeHandlers.length; t++)
            (0, this.oneTimeDisposeHandlers[t])();
          this.oneTimeDisposeHandlers = [];
        }
      }
      traverse(t, e = !0) {
        const n = e ? [this] : [];
        let i;
        for (; void 0 !== (i = n.pop()); ) {
          t(i);
          for (const t of i.children) null !== t && n.push(t);
        }
      }
    }
    ((Ct.IDCount = 0), (Ct.IDCount = 0));
    const Dt = {
      DATA_TYPE_DOUBLE: { ordinal: 0, name: 'double', size: 8 },
      DATA_TYPE_FLOAT: { ordinal: 1, name: 'float', size: 4 },
      DATA_TYPE_INT8: { ordinal: 2, name: 'int8', size: 1 },
      DATA_TYPE_UINT8: { ordinal: 3, name: 'uint8', size: 1 },
      DATA_TYPE_INT16: { ordinal: 4, name: 'int16', size: 2 },
      DATA_TYPE_UINT16: { ordinal: 5, name: 'uint16', size: 2 },
      DATA_TYPE_INT32: { ordinal: 6, name: 'int32', size: 4 },
      DATA_TYPE_UINT32: { ordinal: 7, name: 'uint32', size: 4 },
      DATA_TYPE_INT64: { ordinal: 8, name: 'int64', size: 8 },
      DATA_TYPE_UINT64: { ordinal: 9, name: 'uint64', size: 8 },
    };
    let Rt = 0;
    for (const t in Dt) ((Dt[Rt] = Dt[t]), Rt++);
    class Bt {
      constructor(t, e, n, i = [1 / 0, -1 / 0], r = void 0) {
        ((this.name = t),
          (this.type = e),
          (this.numElements = n),
          (this.range = i),
          (this.uri = r),
          (this.byteSize = this.numElements * this.type.size),
          (this.description = ''));
      }
    }
    const Mt = {
      POSITION_CARTESIAN: new Bt('POSITION_CARTESIAN', Dt.DATA_TYPE_FLOAT, 3),
      RGBA_PACKED: new Bt('COLOR_PACKED', Dt.DATA_TYPE_INT8, 4),
      COLOR_PACKED: new Bt('COLOR_PACKED', Dt.DATA_TYPE_INT8, 4),
      RGB_PACKED: new Bt('COLOR_PACKED', Dt.DATA_TYPE_INT8, 3),
      NORMAL_FLOATS: new Bt('NORMAL_FLOATS', Dt.DATA_TYPE_FLOAT, 3),
      INTENSITY: new Bt('INTENSITY', Dt.DATA_TYPE_UINT16, 1),
      CLASSIFICATION: new Bt('CLASSIFICATION', Dt.DATA_TYPE_UINT8, 1),
      NORMAL_SPHEREMAPPED: new Bt('NORMAL_SPHEREMAPPED', Dt.DATA_TYPE_UINT8, 2),
      NORMAL_OCT16: new Bt('NORMAL_OCT16', Dt.DATA_TYPE_UINT8, 2),
      NORMAL: new Bt('NORMAL', Dt.DATA_TYPE_FLOAT, 3),
      RETURN_NUMBER: new Bt('RETURN_NUMBER', Dt.DATA_TYPE_UINT8, 1),
      NUMBER_OF_RETURNS: new Bt('NUMBER_OF_RETURNS', Dt.DATA_TYPE_UINT8, 1),
      SOURCE_ID: new Bt('SOURCE_ID', Dt.DATA_TYPE_UINT16, 1),
      INDICES: new Bt('INDICES', Dt.DATA_TYPE_UINT32, 1),
      SPACING: new Bt('SPACING', Dt.DATA_TYPE_FLOAT, 1),
      GPS_TIME: new Bt('GPS_TIME', Dt.DATA_TYPE_DOUBLE, 1),
    };
    class Ut {
      constructor(t, e = [], n = 0, i = 0, r = []) {
        if (
          ((this.attributes = e),
          (this.byteSize = n),
          (this.size = i),
          (this.vectors = r),
          null != t)
        )
          for (let e = 0; e < t.length; e++) {
            const n = t[e],
              i = Mt[n];
            (this.attributes.push(i), (this.byteSize += i.byteSize), this.size++);
          }
      }
      add(t) {
        (this.attributes.push(t), (this.byteSize += t.byteSize), this.size++);
      }
      addVector(t) {
        this.vectors.push(t);
      }
      hasNormals() {
        for (const t in this.attributes) {
          const e = this.attributes[t];
          if (
            e === Mt.NORMAL_SPHEREMAPPED ||
            e === Mt.NORMAL_FLOATS ||
            e === Mt.NORMAL ||
            e === Mt.NORMAL_OCT16
          )
            return !0;
        }
        return !1;
      }
      getAttribute(t) {
        return this.attributes.find((e) => e.name === t);
      }
    }
    class Lt {
      constructor(t, e, n) {
        ((this.url = t),
          (this.metadata = e),
          (this.loadingContext = n),
          'GLTF' === this.metadata.encoding
            ? e.attributes.some((t) => 'sh_band_0' === t.name)
              ? (this.decoder = new St(e, n))
              : (this.decoder = new Pt(e, n))
            : 'BROTLI' === this.metadata.encoding
              ? (this.decoder = new It(e, n))
              : (this.decoder = new Et(e, n)));
      }
      async load(t) {
        if (t.loaded || t.loading) return;
        let e;
        ((t.loading = !0), t.octreeGeometry.numNodesLoading++);
        try {
          2 === t.nodeType && (await this.loadHierarchy(t));
          const { byteOffset: n, byteSize: i } = t;
          if (void 0 === n || void 0 === i) throw new Error('byteOffset and byteSize are required');
          e = this.workerPool.getWorker(this.workerType);
          const r = await this.decoder.decode(t, e);
          if (!r) return;
          const { geometry: o, data: s } = r;
          ((t.density = s.density),
            (t.geometry = o),
            (t.loaded = !0),
            (t.octreeGeometry.needsUpdate = !0),
            (t.tightBoundingBox = this.getTightBoundingBox(s.tightBoundingBox)));
        } catch (e) {
          t.loaded = !1;
        } finally {
          ((t.loading = !1),
            t.octreeGeometry.numNodesLoading--,
            e && this.workerPool.returnWorker(this.workerType, e));
        }
      }
      get workerPool() {
        return this.loadingContext.workerPool;
      }
      get getUrl() {
        return this.loadingContext.getUrl;
      }
      get xhrRequest() {
        return this.loadingContext.xhrRequest;
      }
      get hierarchyPath() {
        return this.loadingContext.hierarchyPath;
      }
      get workerType() {
        return this.decoder.workerType;
      }
      parseHierarchy(t, e) {
        const n = new DataView(e),
          i = 22,
          r = e.byteLength / i,
          o = t.octreeGeometry,
          s = new Array(r);
        s[0] = t;
        let a = 1;
        for (let t = 0; t < r; t++) {
          const e = s[t],
            r = n.getUint8(t * i + 0),
            l = n.getUint8(t * i + 1),
            u = n.getUint32(t * i + 2, !0),
            d = n.getBigInt64(t * i + 6, !0),
            f = n.getBigInt64(t * i + 14, !0);
          if (
            (2 === e.nodeType
              ? ((e.byteOffset = d), (e.byteSize = f), (e.numPoints = u))
              : 2 === r
                ? ((e.hierarchyByteOffset = d), (e.hierarchyByteSize = f), (e.numPoints = u))
                : ((e.byteOffset = d), (e.byteSize = f), (e.numPoints = u)),
            (e.nodeType = r),
            2 !== e.nodeType)
          )
            for (let t = 0; t < 8; t++) {
              if (!((1 << t) & l)) continue;
              const n = e.name + t,
                i = Ft(e.boundingBox, t),
                r = new Ct(n, o, i);
              ((r.name = n),
                (r.spacing = e.spacing / 2),
                (r.level = e.level + 1),
                (e.children[t] = r),
                (r.parent = e),
                (s[a] = r),
                a++);
            }
        }
      }
      async loadHierarchy(t) {
        const { hierarchyByteOffset: e, hierarchyByteSize: n } = t;
        if (void 0 === e || void 0 === n)
          throw new Error(
            `hierarchyByteOffset and hierarchyByteSize are undefined for node ${t.name}`,
          );
        const i = await this.getUrl(this.hierarchyPath),
          r = { Range: `bytes=${e}-${e + n - BigInt(1)}` },
          o = await this.xhrRequest(i, { headers: r }),
          s = await o.arrayBuffer();
        this.parseHierarchy(t, s);
      }
      getTightBoundingBox({ min: t, max: e }) {
        const n = new h.Box3(new h.Vector3().fromArray(t), new h.Vector3().fromArray(e));
        return (n.max.sub(n.min), n.min.set(0, 0, 0), n);
      }
    }
    const zt = new h.Vector3();
    function Ft(t, e) {
      const n = t.min.clone(),
        i = t.max.clone(),
        r = zt.subVectors(i, n);
      return (
        (1 & e) > 0 ? (n.z += r.z / 2) : (i.z -= r.z / 2),
        (2 & e) > 0 ? (n.y += r.y / 2) : (i.y -= r.y / 2),
        (4 & e) > 0 ? (n.x += r.x / 2) : (i.x -= r.x / 2),
        new h.Box3(n, i)
      );
    }
    const _t = {
      double: Dt.DATA_TYPE_DOUBLE,
      float: Dt.DATA_TYPE_FLOAT,
      int8: Dt.DATA_TYPE_INT8,
      uint8: Dt.DATA_TYPE_UINT8,
      int16: Dt.DATA_TYPE_INT16,
      uint16: Dt.DATA_TYPE_UINT16,
      int32: Dt.DATA_TYPE_INT32,
      uint32: Dt.DATA_TYPE_UINT32,
      int64: Dt.DATA_TYPE_INT64,
      uint64: Dt.DATA_TYPE_UINT64,
    };
    class Vt {
      constructor(t, e, n, i = !1) {
        ((this.workerPool = new Tt()),
          (this.basePath = ''),
          (this.hierarchyPath = ''),
          (this.octreePath = ''),
          (this.gltfColorsPath = ''),
          (this.gltfPositionsPath = ''),
          (this.harmonicsEnabled = !1),
          (this.getUrl = t),
          (this.xhrRequest = n),
          (this.basePath = (function (t) {
            return t.substring(0, t.lastIndexOf('/') + 1);
          })(e)),
          (this.hierarchyPath = Nt(this.basePath, 'hierarchy.bin')),
          (this.octreePath = Nt(this.basePath, 'octree.bin')),
          (this.harmonicsEnabled = i),
          (this.gltfColorsPath = Nt(this.basePath, 'colors.glbin')),
          (this.gltfPositionsPath = Nt(this.basePath, 'positions.glbin')));
      }
      static parseAttributes(t) {
        const e = new Ut(),
          n = { rgb: 'rgba' };
        for (const i of t) {
          const { name: t, numElements: r, min: o, max: s, bufferView: a } = i,
            l = _t[i.type],
            u = new Bt(n[t] ? n[t] : t, l, r);
          (a && (u.uri = a.uri),
            (u.range = 1 === r && o && s ? [o[0], s[0]] : [o, s]),
            'gps-time' === t &&
              'number' == typeof u.range[0] &&
              u.range[0] === u.range[1] &&
              (u.range[1] += 1),
            (u.initialRange = u.range),
            e.add(u));
        }
        if (
          void 0 !== e.attributes.find((t) => 'NormalX' === t.name) &&
          void 0 !== e.attributes.find((t) => 'NormalY' === t.name) &&
          void 0 !== e.attributes.find((t) => 'NormalZ' === t.name)
        ) {
          const t = { name: 'NORMAL', attributes: ['NormalX', 'NormalY', 'NormalZ'] };
          e.addVector(t);
        }
        return e;
      }
      async load(t) {
        const e = await this.fetchMetadata(t),
          n = Vt.parseAttributes(e.attributes);
        this.applyCustomBufferURI(e.encoding, n);
        const i = this.createLoader(t, e),
          r = this.createBoundingBox(e),
          o = this.getOffset(r),
          s = this.initializeOctree(i, t, e, r, o, n),
          a = this.initializeRootNode(s, r, e);
        return ((s.root = a), i.load(a), { geometry: s });
      }
      async fetchMetadata(t) {
        return (await this.xhrRequest(t)).json();
      }
      applyCustomBufferURI(t, e) {
        'GLTF' === t &&
          ((this.gltfPositionsPath = e.getAttribute('position')?.uri ?? this.gltfPositionsPath),
          (this.gltfColorsPath = e.getAttribute('rgba')?.uri ?? this.gltfColorsPath));
      }
      createLoader(t, e) {
        return new Lt(t, e, this);
      }
      createBoundingBox(t) {
        const e = new h.Vector3(...t.boundingBox.min),
          n = new h.Vector3(...t.boundingBox.max);
        return new h.Box3(e, n);
      }
      getOffset(t) {
        const e = t.min.clone();
        return (t.min.sub(e), t.max.sub(e), e);
      }
      initializeOctree(t, e, n, i, r, o) {
        const s = new st(t, i);
        return (
          (s.url = e),
          (s.spacing = n.spacing),
          (s.scale = n.scale),
          (s.projection = n.projection),
          (s.boundingBox = i),
          (s.boundingSphere = i.getBoundingSphere(new h.Sphere())),
          (s.tightBoundingSphere = i.getBoundingSphere(new h.Sphere())),
          (s.tightBoundingBox = this.getTightBoundingBox(n)),
          (s.offset = r),
          (s.pointAttributes = o),
          s
        );
      }
      initializeRootNode(t, e, n) {
        const i = new Ct('r', t, e);
        return (
          (i.level = 0),
          (i.nodeType = 2),
          (i.hierarchyByteOffset = BigInt(0)),
          (i.hierarchyByteSize = BigInt(n.hierarchy.firstChunkSize)),
          (i.spacing = t.spacing),
          (i.byteOffset = BigInt(0)),
          i
        );
      }
      getTightBoundingBox(t) {
        const e = t.attributes.find((t) => 'position' === t.name);
        if (!e || !e.min || !e.max)
          return (
            console.warn(
              'Position attribute (min, max) not found. Falling back to boundingBox for tightBoundingBox',
            ),
            new h.Box3(new h.Vector3(...t.boundingBox.min), new h.Vector3(...t.boundingBox.max))
          );
        const n = t.boundingBox.min;
        return new h.Box3(
          new h.Vector3(e.min[0] - n[0], e.min[1] - n[1], e.min[2] - n[2]),
          new h.Vector3(e.max[0] - n[0], e.max[1] - n[1], e.max[2] - n[2]),
        );
      }
    }
    async function Yt(t, e, n, i = !1) {
      const r = await e(t),
        o = new Vt(e, t, n, i),
        { geometry: s } = await o.load(r);
      return s;
    }
    function Ht(t) {
      return null != t && t.isGeometryNode;
    }
    function Wt(t) {
      return null != t && t.isTreeNode;
    }
    function Gt(t) {
      ((this.content = []), (this.scoreFunction = t));
    }
    Gt.prototype = {
      push: function (t) {
        (this.content.push(t), this.bubbleUp(this.content.length - 1));
      },
      pop: function () {
        var t = this.content[0],
          e = this.content.pop();
        return (this.content.length > 0 && ((this.content[0] = e), this.sinkDown(0)), t);
      },
      remove: function (t) {
        for (var e = this.content.length, n = 0; n < e; n++)
          if (this.content[n] == t) {
            var i = this.content.pop();
            if (n == e - 1) break;
            ((this.content[n] = i), this.bubbleUp(n), this.sinkDown(n));
            break;
          }
      },
      size: function () {
        return this.content.length;
      },
      bubbleUp: function (t) {
        for (var e = this.content[t], n = this.scoreFunction(e); t > 0; ) {
          var i = Math.floor((t + 1) / 2) - 1,
            r = this.content[i];
          if (n >= this.scoreFunction(r)) break;
          ((this.content[i] = e), (this.content[t] = r), (t = i));
        }
      },
      sinkDown: function (t) {
        for (var e = this.content.length, n = this.content[t], i = this.scoreFunction(n); ; ) {
          var r = 2 * (t + 1),
            o = r - 1,
            s = null;
          if (o < e) {
            var a = this.content[o],
              l = this.scoreFunction(a);
            l < i && (s = o);
          }
          if (r < e) {
            var u = this.content[r];
            this.scoreFunction(u) < (null == s ? i : l) && (s = r);
          }
          if (null == s) break;
          ((this.content[t] = this.content[s]), (this.content[s] = n), (t = s));
        }
      },
    };
    class kt extends h.LineSegments {
      constructor(t, e = new h.Color(16776960)) {
        const n = new Uint16Array([
            0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7,
          ]),
          i = new Float32Array([
            t.min.x,
            t.min.y,
            t.min.z,
            t.max.x,
            t.min.y,
            t.min.z,
            t.max.x,
            t.min.y,
            t.max.z,
            t.min.x,
            t.min.y,
            t.max.z,
            t.min.x,
            t.max.y,
            t.min.z,
            t.max.x,
            t.max.y,
            t.min.z,
            t.max.x,
            t.max.y,
            t.max.z,
            t.min.x,
            t.max.y,
            t.max.z,
          ]),
          r = new h.BufferGeometry();
        (r.setIndex(new h.BufferAttribute(n, 1)),
          r.setAttribute('position', new h.BufferAttribute(i, 3)),
          super(r, new h.LineBasicMaterial({ color: e })));
      }
    }
    class qt {
      constructor(t) {
        ((this.node = t), (this.next = null), (this.previous = null));
      }
    }
    class Kt {
      constructor(t = 1e6) {
        ((this.pointBudget = t),
          (this.first = null),
          (this.last = null),
          (this.numPoints = 0),
          (this.items = new Map()));
      }
      get size() {
        return this.items.size;
      }
      has(t) {
        return this.items.has(t.id);
      }
      touch(t) {
        if (!t.loaded) return;
        const e = this.items.get(t.id);
        e ? this.touchExisting(e) : this.addNew(t);
      }
      addNew(t) {
        const e = new qt(t);
        ((e.previous = this.last),
          (this.last = e),
          e.previous && (e.previous.next = e),
          this.first || (this.first = e),
          this.items.set(t.id, e),
          (this.numPoints += t.numPoints));
      }
      touchExisting(t) {
        t.previous
          ? t.next &&
            ((t.previous.next = t.next),
            (t.next.previous = t.previous),
            (t.previous = this.last),
            (t.next = null),
            (this.last = t),
            t.previous && (t.previous.next = t))
          : t.next &&
            ((this.first = t.next),
            (this.first.previous = null),
            (t.previous = this.last),
            (t.next = null),
            (this.last = t),
            t.previous && (t.previous.next = t));
      }
      remove(t) {
        const e = this.items.get(t.id);
        e &&
          (1 === this.items.size
            ? ((this.first = null), (this.last = null))
            : (e.previous || ((this.first = e.next), (this.first.previous = null)),
              e.next || ((this.last = e.previous), (this.last.next = null)),
              e.previous && e.next && ((e.previous.next = e.next), (e.next.previous = e.previous))),
          this.items.delete(t.id),
          (this.numPoints -= t.numPoints));
      }
      getLRUItem() {
        return this.first ? this.first.node : void 0;
      }
      freeMemory(t = 2) {
        if (!(this.items.size <= 1))
          for (; this.numPoints > this.pointBudget * t; ) {
            const t = this.getLRUItem();
            t && this.disposeSubtree(t);
          }
      }
      disposeSubtree(t) {
        const e = [t];
        t.traverse((t) => {
          t.loaded && e.push(t);
        });
        for (const t of e) (t.dispose(), this.remove(t));
      }
    }
    class jt {
      constructor(t, e, n, i) {
        ((this.pointCloudIndex = t), (this.weight = e), (this.node = n), (this.parent = i));
      }
    }
    const Xt = { v1: bt, v2: Yt };
    class Zt {
      constructor(t = 'v1') {
        ((this._pointBudget = 1e6),
          (this._rendererSize = new h.Vector2()),
          (this.maxNumNodesLoading = 10),
          (this.memoryScale = 2),
          (this.features = ct),
          (this.lru = new Kt(this._pointBudget)),
          (this.updateVisibilityStructures = (() => {
            const t = new h.Matrix4(),
              e = new h.Matrix4(),
              n = new h.Matrix4();
            return (i, r) => {
              const o = [],
                s = [],
                a = new Gt((t) => 1 / t.weight);
              for (let l = 0; l < i.length; l++) {
                const u = i[l];
                if (!u.initialized()) continue;
                ((u.numVisiblePoints = 0),
                  (u.visibleNodes = []),
                  (u.visibleGeometry = []),
                  r.updateMatrixWorld(!1));
                const d = r.matrixWorldInverse,
                  f = u.matrixWorld;
                if (
                  (t.identity().multiply(r.projectionMatrix).multiply(d).multiply(f),
                  o.push(new h.Frustum().setFromProjectionMatrix(t)),
                  e.copy(f).invert(),
                  n.identity().multiply(e).multiply(r.matrixWorld),
                  s.push(new h.Vector3().setFromMatrixPosition(n)),
                  u.visible && null !== u.root)
                ) {
                  const t = Number.MAX_VALUE;
                  a.push(new jt(l, t, u.root));
                }
                Wt(u.root) && u.hideDescendants(u.root.sceneNode);
                for (const t of u.boundingBoxNodes) t.visible = !1;
              }
              return { frustums: o, cameraPositions: s, priorityQueue: a };
            };
          })()),
          (this.loadGeometry = Xt[t]));
      }
      loadPointCloud(t, e, n = (t, e) => fetch(t, e), i = !1, r = 529e4) {
        return this.loadGeometry(t, e, n, i).then((t) => new dt(this, t, void 0, i, r));
      }
      updatePointClouds(t, e, n, i = () => {}) {
        const r = this.updateVisibility(t, e, n);
        for (let r = 0; r < t.length; r++) {
          const o = t[r];
          o.disposed ||
            (o.material.updateMaterial(o, o.visibleNodes, e, n),
            o.updateVisibleBounds(),
            o.updateBoundingBoxes(),
            n.getSize(this._rendererSize),
            o.updateSplats(e, this._rendererSize, i));
        }
        return (this.lru.freeMemory(this.memoryScale), r);
      }
      static pick(t, e, n, i, r = {}) {
        return ((Zt.picker = Zt.picker || new ot()), Zt.picker.pick(e, n, i, t, r));
      }
      get pointBudget() {
        return this._pointBudget;
      }
      set pointBudget(t) {
        t !== this._pointBudget &&
          ((this._pointBudget = t),
          (this.lru.pointBudget = t),
          this.lru.freeMemory(this.memoryScale));
      }
      static set maxLoaderWorkers(t) {
        vt.WORKER_POOL.maxWorkers = t;
      }
      static get maxLoaderWorkers() {
        return vt.WORKER_POOL.maxWorkers;
      }
      updateVisibility(t, e, n) {
        let i = 0;
        const r = [],
          o = [],
          {
            frustums: s,
            cameraPositions: a,
            priorityQueue: l,
          } = this.updateVisibilityStructures(t, e);
        let u,
          d = 0,
          f = !1,
          c = !1;
        for (; void 0 !== (u = l.pop()); ) {
          let h = u.node;
          if (i + h.numPoints > this.pointBudget) break;
          const p = u.pointCloudIndex,
            m = t[p],
            g = void 0 !== m.maxLevel ? m.maxLevel : 1 / 0;
          if (
            h.level > g ||
            !s[p].intersectsBox(h.boundingBox) ||
            this.shouldClip(m, h.boundingBox)
          )
            continue;
          ((i += h.numPoints), (m.numVisiblePoints += h.numPoints));
          const A = u.parent;
          if (Ht(h) && (!A || Wt(A)))
            if (h.loaded && d < 10) ((h = m.toTreeNode(h, A)), d++);
            else {
              if (h.failed) {
                c = !0;
                continue;
              }
              (h.loaded && d >= 10 && (f = !0), o.push(h), m.visibleGeometry.push(h));
            }
          Wt(h) && (this.updateTreeNodeVisibility(m, h, r), m.visibleGeometry.push(h.geometryNode));
          const y = 0.5 * n.getSize(this._rendererSize).height * n.getPixelRatio();
          this.updateChildVisibility(u, l, m, h, a[p], e, y);
        }
        const h = Math.min(this.maxNumNodesLoading, o.length),
          p = [];
        for (let t = 0; t < h; t++) p.push(o[t].load());
        return {
          visibleNodes: r,
          numVisiblePoints: i,
          exceededMaxLoadsToGPU: f,
          nodeLoadFailed: c,
          nodeLoadPromises: p,
        };
      }
      updateTreeNodeVisibility(t, e, n) {
        this.lru.touch(e.geometryNode);
        const i = e.sceneNode;
        ((i.visible = !0),
          (i.material = t.material),
          i.updateMatrix(),
          i.matrixWorld.multiplyMatrices(t.matrixWorld, i.matrix),
          n.push(e),
          t.visibleNodes.push(e),
          this.updateBoundingBoxVisibility(t, e));
      }
      updateChildVisibility(t, e, n, i, r, o, s) {
        const a = i.children;
        for (let l = 0; l < a.length; l++) {
          const u = a[l];
          if (null === u) continue;
          const d = u.boundingSphere,
            f = d.center.distanceTo(r),
            c = d.radius;
          let h = 0;
          if (o.type === m) {
            const t = (o.getEffectiveFOV() * Math.PI) / 180;
            h = s / (Math.tan(t / 2) * f);
          } else {
            const t = o;
            h = (2 * s * t.zoom) / (t.top - t.bottom);
          }
          const p = c * h;
          if (p < n.minNodePixelSize) continue;
          const g = f < c ? Number.MAX_VALUE : p + 1 / f;
          e.push(new jt(t.pointCloudIndex, g, u, i));
        }
      }
      updateBoundingBoxVisibility(t, e) {
        if (t.showBoundingBox && !e.boundingBoxNode) {
          const n = new kt(e.boundingBox);
          ((n.matrixAutoUpdate = !1),
            t.boundingBoxNodes.push(n),
            (e.boundingBoxNode = n),
            e.boundingBoxNode.matrix.copy(t.matrixWorld));
        } else
          t.showBoundingBox && e.boundingBoxNode
            ? ((e.boundingBoxNode.visible = !0), e.boundingBoxNode.matrix.copy(t.matrixWorld))
            : !t.showBoundingBox && e.boundingBoxNode && (e.boundingBoxNode.visible = !1);
      }
      shouldClip(t, e) {
        const n = t.material;
        if (0 === n.numClipBoxes || n.clipMode !== o.CLIP_OUTSIDE) return !1;
        const i = e.clone();
        (t.updateMatrixWorld(!0), i.applyMatrix4(t.matrixWorld));
        const r = n.clipBoxes;
        for (let t = 0; t < r.length; t++) {
          const e = r[t].matrix,
            n = new h.Box3(
              new h.Vector3(-0.5, -0.5, -0.5),
              new h.Vector3(0.5, 0.5, 0.5),
            ).applyMatrix4(e);
          if (i.intersectsBox(n)) return !1;
        }
        return !0;
      }
    }
    return r;
  })(),
);
//# sourceMappingURL=potree.js.map
