!(function (A, g) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = g(require('three')))
    : 'function' == typeof define && define.amd
      ? define('potree', ['three'], g)
      : 'object' == typeof exports
        ? (exports.potree = g(require('three')))
        : (A.potree = g(A.three));
})(self, (A) =>
  (() => {
    'use strict';
    var g = {
        91: (A, g, I) => {
          I.d(g, { A: () => Q });
          var B = I(512),
            C = I.n(B);
          function Q() {
            return C()(
              '(()=>{"use strict";var t;!function(t){t[t.POSITION_CARTESIAN=0]="POSITION_CARTESIAN",t[t.COLOR_PACKED=1]="COLOR_PACKED",t[t.COLOR_FLOATS_1=2]="COLOR_FLOATS_1",t[t.COLOR_FLOATS_255=3]="COLOR_FLOATS_255",t[t.NORMAL_FLOATS=4]="NORMAL_FLOATS",t[t.FILLER=5]="FILLER",t[t.INTENSITY=6]="INTENSITY",t[t.CLASSIFICATION=7]="CLASSIFICATION",t[t.NORMAL_SPHEREMAPPED=8]="NORMAL_SPHEREMAPPED",t[t.NORMAL_OCT16=9]="NORMAL_OCT16",t[t.NORMAL=10]="NORMAL"}(t||(t={}));const e={ordinal:1,size:4},n={ordinal:2,size:1},r={ordinal:3,size:1};function i(t,e,n){return{name:t,type:e,numElements:n,byteSize:n*e.size}}const s=i(t.COLOR_PACKED,n,4),a={POSITION_CARTESIAN:i(t.POSITION_CARTESIAN,e,3),RGBA_PACKED:s,COLOR_PACKED:s,RGB_PACKED:i(t.COLOR_PACKED,n,3),NORMAL_FLOATS:i(t.NORMAL_FLOATS,e,3),FILLER_1B:i(t.FILLER,r,1),INTENSITY:i(t.INTENSITY,{ordinal:5,size:2},1),CLASSIFICATION:i(t.CLASSIFICATION,r,1),NORMAL_SPHEREMAPPED:i(t.NORMAL_SPHEREMAPPED,r,2),NORMAL_OCT16:i(t.NORMAL_OCT16,r,2),NORMAL:i(t.NORMAL,e,3)};class o{constructor(t){this.versionMinor=0,this.version=t;const e=-1===t.indexOf(".")?t.length:t.indexOf(".");this.versionMajor=parseInt(t.substr(0,e),10),this.versionMinor=parseInt(t.substr(e+1),10),isNaN(this.versionMinor)&&(this.versionMinor=0)}newerThan(t){const e=new o(t);return this.versionMajor>e.versionMajor||this.versionMajor===e.versionMajor&&this.versionMinor>e.versionMinor}equalOrHigher(t){const e=new o(t);return this.versionMajor>e.versionMajor||this.versionMajor===e.versionMajor&&this.versionMinor>=e.versionMinor}upTo(t){return!this.newerThan(t)}}class u{constructor(t){this.tmp=new ArrayBuffer(4),this.tmpf=new Float32Array(this.tmp),this.tmpu8=new Uint8Array(this.tmp),this.u8=new Uint8Array(t)}getUint32(t){return this.u8[t+3]<<24|this.u8[t+2]<<16|this.u8[t+1]<<8|this.u8[t]}getUint16(t){return this.u8[t+1]<<8|this.u8[t]}getFloat32(t){const e=this.tmpu8,n=this.u8,r=this.tmpf;return e[0]=n[t+0],e[1]=n[t+1],e[2]=n[t+2],e[3]=n[t+3],r[0]}getUint8(t){return this.u8[t]}}const f=Math.sign||function(t){return 0==(t=+t)||t!=t?t:t<0?-1:1};function A(e,n){const r=function(e,n){switch(e.name){case t.POSITION_CARTESIAN:return function(t,e){const n=new ArrayBuffer(4*e.numPoints*3),r=new Float32Array(n);for(let t=0;t<e.numPoints;t++){let n,i,s;e.version.newerThan("1.3")?(n=e.data.getUint32(e.currentOffset+t*e.pointAttributes.byteSize+0)*e.scale,i=e.data.getUint32(e.currentOffset+t*e.pointAttributes.byteSize+4)*e.scale,s=e.data.getUint32(e.currentOffset+t*e.pointAttributes.byteSize+8)*e.scale):(n=e.data.getFloat32(t*e.pointAttributes.byteSize+0)+e.nodeOffset[0],i=e.data.getFloat32(t*e.pointAttributes.byteSize+4)+e.nodeOffset[1],s=e.data.getFloat32(t*e.pointAttributes.byteSize+8)+e.nodeOffset[2]),r[3*t+0]=n,r[3*t+1]=i,r[3*t+2]=s,e.mean[0]+=n/e.numPoints,e.mean[1]+=i/e.numPoints,e.mean[2]+=s/e.numPoints,e.tightBoxMin[0]=Math.min(e.tightBoxMin[0],n),e.tightBoxMin[1]=Math.min(e.tightBoxMin[1],i),e.tightBoxMin[2]=Math.min(e.tightBoxMin[2],s),e.tightBoxMax[0]=Math.max(e.tightBoxMax[0],n),e.tightBoxMax[1]=Math.max(e.tightBoxMax[1],i),e.tightBoxMax[2]=Math.max(e.tightBoxMax[2],s)}return{buffer:n,attribute:t}}(e,n);case t.COLOR_PACKED:return function(t,e){const n=new ArrayBuffer(3*e.numPoints),r=new Uint8Array(n);for(let t=0;t<e.numPoints;t++)r[3*t+0]=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+0),r[3*t+1]=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+1),r[3*t+2]=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+2);return{buffer:n,attribute:t}}(e,n);case t.INTENSITY:return function(t,e){const n=new ArrayBuffer(4*e.numPoints),r=new Float32Array(n);for(let t=0;t<e.numPoints;t++)r[t]=e.data.getUint16(e.currentOffset+t*e.pointAttributes.byteSize);return{buffer:n,attribute:t}}(e,n);case t.CLASSIFICATION:return function(t,e){const n=new ArrayBuffer(e.numPoints),r=new Uint8Array(n);for(let t=0;t<e.numPoints;t++)r[t]=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize);return{buffer:n,attribute:t}}(e,n);case t.NORMAL_SPHEREMAPPED:return function(t,e){const n=new ArrayBuffer(4*e.numPoints*3),r=new Float32Array(n);for(let t=0;t<e.numPoints;t++){let n=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+0)/255*2-1,i=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+1)/255*2-1,s=1;const a=n*-n+i*-i+1*s;s=a,n*=Math.sqrt(a),i*=Math.sqrt(a),n*=2,i*=2,s=2*s-1,r[3*t+0]=n,r[3*t+1]=i,r[3*t+2]=s}return{buffer:n,attribute:t}}(e,n);case t.NORMAL_OCT16:return function(t,e){const n=new ArrayBuffer(4*e.numPoints*3),r=new Float32Array(n);for(let t=0;t<e.numPoints;t++){const n=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+0)/255*2-1,i=e.data.getUint8(e.currentOffset+t*e.pointAttributes.byteSize+1)/255*2-1;let s=1-Math.abs(n)-Math.abs(i),a=0,o=0;s>=0?(a=n,o=i):(a=-(i/f(i)-1)/f(n),o=-(n/f(n)-1)/f(i));const u=Math.sqrt(a*a+o*o+s*s);a/=u,o/=u,s/=u,r[3*t+0]=a,r[3*t+1]=o,r[3*t+2]=s}return{buffer:n,attribute:t}}(e,n);case t.NORMAL:return function(t,e){const n=new ArrayBuffer(4*e.numPoints*3),r=new Float32Array(n);for(let t=0;t<e.numPoints;t++){const n=e.data.getFloat32(e.currentOffset+t*e.pointAttributes.byteSize+0),i=e.data.getFloat32(e.currentOffset+t*e.pointAttributes.byteSize+4),s=e.data.getFloat32(e.currentOffset+t*e.pointAttributes.byteSize+8);r[3*t+0]=n,r[3*t+1]=i,r[3*t+2]=s}return{buffer:n,attribute:t}}(e,n);default:return}}(e,n);void 0!==r&&(n.attributeBuffers[r.attribute.name]=r,n.transferables.push(r.buffer))}onmessage=function(e){const n=e.data.buffer,r=e.data.pointAttributes,i={attributeBuffers:{},currentOffset:0,data:new u(n),mean:[0,0,0],nodeOffset:e.data.offset,numPoints:e.data.buffer.byteLength/r.byteSize,pointAttributes:r,scale:e.data.scale,tightBoxMax:[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],tightBoxMin:[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],transferables:[],version:new o(e.data.version)};for(const t of i.pointAttributes.attributes)A(t,i),i.currentOffset+=t.byteSize;const s=new ArrayBuffer(4*i.numPoints),f=new Uint32Array(s);for(let t=0;t<i.numPoints;t++)f[t]=t;i.attributeBuffers[t.CLASSIFICATION]||function(e){const n=new ArrayBuffer(4*e.numPoints),r=new Float32Array(n);for(let t=0;t<e.numPoints;t++)r[t]=0;e.attributeBuffers[t.CLASSIFICATION]={buffer:n,attribute:a.CLASSIFICATION}}(i);const O={buffer:n,mean:i.mean,attributeBuffers:i.attributeBuffers,tightBoundingBox:{min:i.tightBoxMin,max:i.tightBoxMax},indices:s};postMessage(O,i.transferables)}})();\n',
              'Worker',
              void 0,
              void 0,
            );
          }
        },
        168: (A, g, I) => {
          I.d(g, { A: () => B });
          const B =
            'precision highp float;\nprecision highp int;\n\nuniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n\nuniform mat4 projectionMatrix;\nuniform float opacity;\n\nuniform float blendHardness;\nuniform float blendDepthSupplement;\nuniform float fov;\nuniform float spacing;\nuniform float pcIndex;\nuniform float screenWidth;\nuniform float screenHeight;\n\nuniform sampler2D depthMap;\n\n#if defined (clip_horizontally) || defined (clip_vertically)\n\tuniform vec4 clipExtent;\n#endif\n\n#ifdef use_texture_blending\n\tuniform sampler2D backgroundMap;\n#endif\n\n\n#ifdef use_point_cloud_mixing\n\tuniform int pointCloudMixingMode;\n\tuniform float pointCloudID;\n\tuniform float pointCloudMixAngle;\n\tuniform float stripeDistanceX;\n\tuniform float stripeDistanceY;\n\n\tuniform float stripeDivisorX;\n\tuniform float stripeDivisorY;\n#endif\n\n#ifdef highlight_point\n\tuniform vec4 highlightedPointColor;\n#endif\n\nin vec3 vColor;\n\n#if !defined(color_type_point_index)\n\tin float vOpacity;\n#endif\n\n#if defined(weighted_splats)\n\tin float vLinearDepth;\n#endif\n\n#if !defined(paraboloid_point_shape) && defined(use_edl)\n\tin float vLogDepth;\n#endif\n\n#if defined(color_type_phong) && (MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0) || defined(paraboloid_point_shape)\n\tin vec3 vViewPosition;\n#endif\n\n#if defined(weighted_splats) || defined(paraboloid_point_shape)\n\tin float vRadius;\n#endif\n\n#if defined(color_type_phong) && (MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0)\n\tin vec3 vNormal;\n#endif\n\n#ifdef highlight_point\n\tin float vHighlight;\n#endif\n\nout vec4 outFragColor;\n\nfloat specularStrength = 1.0;\n\nvoid main() {\n\tvec3 color = vColor;\n\tfloat depth = gl_FragCoord.z;\n\n\t#if defined (clip_horizontally) || defined (clip_vertically)\n\tvec2 ndc = vec2((gl_FragCoord.x / screenWidth), 1.0 - (gl_FragCoord.y / screenHeight));\n\n\tif(step(clipExtent.x, ndc.x) * step(ndc.x, clipExtent.z) < 1.0)\n\t{\n\t\tdiscard;\n\t}\n\n\tif(step(clipExtent.y, ndc.y) * step(ndc.y, clipExtent.w) < 1.0)\n\t{\n\t\tdiscard;\n\t}\n\t#endif  \n\n\t#if defined(circle_point_shape) || defined(paraboloid_point_shape) || defined (weighted_splats)\n\t\tfloat u = 2.0 * gl_PointCoord.x - 1.0;\n\t\tfloat v = 2.0 * gl_PointCoord.y - 1.0;\n\t#endif\n\n\t#if defined(circle_point_shape) || defined (weighted_splats)\n\t\tfloat cc = u*u + v*v;\n\t\tif(cc > 1.0){\n\t\t\tdiscard;\n\t\t}\n\t#endif\n\n\t#if defined weighted_splats\n\t\tvec2 uv = gl_FragCoord.xy / vec2(screenWidth, screenHeight);\n\t\tfloat sDepth = texture(depthMap, uv).r;\n\t\tif(vLinearDepth > sDepth + vRadius + blendDepthSupplement){\n\t\t\tdiscard;\n\t\t}\n\t#endif\n\n\t#if defined color_type_point_index\n\t\toutFragColor = vec4(color, pcIndex / 255.0);\n\t#else\n\t\toutFragColor = vec4(color, vOpacity);\n\t#endif\n\n\t#ifdef use_point_cloud_mixing\n\t\tbool discardFragment = false;\n\n\t\tif (pointCloudMixingMode == 1) {  // Checkboard\n\t\t\tfloat vPointCloudID = pointCloudID > 10. ? pointCloudID/10.: pointCloudID;\n\t\t\tdiscardFragment = mod(gl_FragCoord.x, vPointCloudID) > 0.5 && mod(gl_FragCoord.y, vPointCloudID) > 0.5;\n\t\t}\n\t\telse if (pointCloudMixingMode == 2) {  // Stripes\n\t\t\tfloat angle = pointCloudMixAngle * pointCloudID / 180.;\n\t\t\tfloat u = cos(angle) * gl_FragCoord.x + sin(angle) * gl_FragCoord.y;\n\t\t\tfloat v = -sin(angle) * gl_FragCoord.x + cos(angle) * gl_FragCoord.y;\n\n\t\t\tdiscardFragment = mod(u, stripeDistanceX) >= stripeDistanceX/stripeDivisorX && mod(v, stripeDistanceY) >= stripeDistanceY/stripeDivisorY;\n\t\t}\n\t\tif (discardFragment) {\n\t\t\tdiscard;\n\t\t}\n\t#endif\n\n\t#ifdef use_texture_blending\n\t\tvec2 vUv = gl_FragCoord.xy / vec2(screenWidth, screenHeight);\n\n\t\tvec4 tColor = texture(backgroundMap, vUv);\n\t\toutFragColor = vec4(vOpacity * color, 1.) + vec4((1. - vOpacity) * tColor.rgb, 0.);\n\t#endif\n\n\t#if defined(color_type_phong)\n\t\t#if MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0\n\t\t\tvec3 normal = normalize( vNormal );\n\t\t\tnormal.z = abs(normal.z);\n\n\t\t\tvec3 viewPosition = normalize( vViewPosition );\n\t\t#endif\n\n\t\t// code taken from three.js phong light fragment shader\n\n\t\t#if MAX_POINT_LIGHTS > 0\n\n\t\t\tvec3 pointDiffuse = vec3( 0.0 );\n\t\t\tvec3 pointSpecular = vec3( 0.0 );\n\n\t\t\tfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n\t\t\t\tvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n\t\t\t\tvec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n\t\t\t\tfloat lDistance = 1.0;\n\t\t\t\tif ( pointLightDistance[ i ] > 0.0 )\n\t\t\t\t\tlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n\n\t\t\t\tlVector = normalize( lVector );\n\n\t\t\t\t\t\t// diffuse\n\n\t\t\t\tfloat dotProduct = dot( normal, lVector );\n\n\t\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\t\tfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\t\t\tfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\t\t\tvec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n\t\t\t\t#else\n\n\t\t\t\t\tfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t\t\t#endif\n\n\t\t\t\tpointDiffuse += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\n\n\t\t\t\t// specular\n\n\t\t\t\tvec3 pointHalfVector = normalize( lVector + viewPosition );\n\t\t\t\tfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n\t\t\t\tfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n\t\t\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\t\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n\t\t\t\tpointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n\t\t\t\tpointSpecular = vec3(0.0, 0.0, 0.0);\n\t\t\t}\n\n\t\t#endif\n\n\t\t#if MAX_DIR_LIGHTS > 0\n\n\t\t\tvec3 dirDiffuse = vec3( 0.0 );\n\t\t\tvec3 dirSpecular = vec3( 0.0 );\n\n\t\t\tfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n\t\t\t\tvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n\t\t\t\tvec3 dirVector = normalize( lDirection.xyz );\n\n\t\t\t\t\t\t// diffuse\n\n\t\t\t\tfloat dotProduct = dot( normal, dirVector );\n\n\t\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\t\tfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\t\t\tfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\t\t\tvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n\t\t\t\t#else\n\n\t\t\t\t\tfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t\t\t#endif\n\n\t\t\t\tdirDiffuse += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\n\n\t\t\t\t// specular\n\n\t\t\t\tvec3 dirHalfVector = normalize( dirVector + viewPosition );\n\t\t\t\tfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n\t\t\t\tfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n\t\t\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\t\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n\t\t\t\tdirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\t\t\t}\n\n\t\t#endif\n\n\t\tvec3 totalDiffuse = vec3( 0.0 );\n\t\tvec3 totalSpecular = vec3( 0.0 );\n\n\t\t#if MAX_POINT_LIGHTS > 0\n\n\t\t\ttotalDiffuse += pointDiffuse;\n\t\t\ttotalSpecular += pointSpecular;\n\n\t\t#endif\n\n\t\t#if MAX_DIR_LIGHTS > 0\n\n\t\t\ttotalDiffuse += dirDiffuse;\n\t\t\ttotalSpecular += dirSpecular;\n\n\t\t#endif\n\n\t\toutFragColor.xyz = outFragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n\n\t#endif\n\n\t#if defined weighted_splats\n\t    //float w = pow(1.0 - (u*u + v*v), blendHardness);\n\n\t\tfloat wx = 2.0 * length(2.0 * gl_PointCoord - 1.0);\n\t\tfloat w = exp(-wx * wx * 0.5);\n\n\t\t//float distance = length(2.0 * gl_PointCoord - 1.0);\n\t\t//float w = exp( -(distance * distance) / blendHardness);\n\n\t\toutFragColor.rgb = outFragColor.rgb * w;\n\t\toutFragColor.a = w;\n\t#endif\n\n\t#if defined paraboloid_point_shape\n\t\tfloat wi = 0.0 - ( u*u + v*v);\n\t\tvec4 pos = vec4(vViewPosition, 1.0);\n\t\tpos.z += wi * vRadius;\n\t\tfloat linearDepth = -pos.z;\n\t\tpos = projectionMatrix * pos;\n\t\tpos = pos / pos.w;\n\t\tfloat expDepth = pos.z;\n\t\tdepth = (pos.z + 1.0) / 2.0;\n\t\tgl_FragDepth = depth;\n\n\t\t#if defined(color_type_depth)\n\t\t\toutFragColor.r = linearDepth;\n\t\t\toutFragColor.g = expDepth;\n\t\t#endif\n\n\t\t#if defined(use_edl)\n\t\t\toutFragColor.a = log2(linearDepth);\n\t\t#endif\n\n\t#else\n\t\t#if defined(use_edl)\n\t\t\toutFragColor.a = vLogDepth;\n\t\t#endif\n\t#endif\n\n\t#ifdef highlight_point\n\t\tif (vHighlight > 0.0) {\n\t\t\toutFragColor = highlightedPointColor;\n\t\t}\n\t#endif\n}\n';
        },
        218: (A, g, I) => {
          I.d(g, { A: () => Q });
          var B = I(512),
            C = I.n(B);
          function Q() {
            return C()(
              '(()=>{"use strict";const e={DATA_TYPE_DOUBLE:{ordinal:0,name:"double",size:8},DATA_TYPE_FLOAT:{ordinal:1,name:"float",size:4},DATA_TYPE_INT8:{ordinal:2,name:"int8",size:1},DATA_TYPE_UINT8:{ordinal:3,name:"uint8",size:1},DATA_TYPE_INT16:{ordinal:4,name:"int16",size:2},DATA_TYPE_UINT16:{ordinal:5,name:"uint16",size:2},DATA_TYPE_INT32:{ordinal:6,name:"int32",size:4},DATA_TYPE_UINT32:{ordinal:7,name:"uint32",size:4},DATA_TYPE_INT64:{ordinal:8,name:"int64",size:8},DATA_TYPE_UINT64:{ordinal:9,name:"uint64",size:8}};let t=0;for(const n in e)e[t]=e[n],t++;class n{constructor(e,t,n,r=[1/0,-1/0],a=void 0){this.name=e,this.type=t,this.numElements=n,this.range=r,this.uri=a,this.byteSize=this.numElements*this.type.size,this.description=""}}function r(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return a(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var A,T=!0,o=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return T=e.done,e},e:function(e){o=!0,A=e},f:function(){try{T||null==n.return||n.return()}finally{if(o)throw A}}}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}new n("POSITION_CARTESIAN",e.DATA_TYPE_FLOAT,3),new n("COLOR_PACKED",e.DATA_TYPE_INT8,4),new n("COLOR_PACKED",e.DATA_TYPE_INT8,4),new n("COLOR_PACKED",e.DATA_TYPE_INT8,3),new n("NORMAL_FLOATS",e.DATA_TYPE_FLOAT,3),new n("INTENSITY",e.DATA_TYPE_UINT16,1),new n("CLASSIFICATION",e.DATA_TYPE_UINT8,1),new n("NORMAL_SPHEREMAPPED",e.DATA_TYPE_UINT8,2),new n("NORMAL_OCT16",e.DATA_TYPE_UINT8,2),new n("NORMAL",e.DATA_TYPE_FLOAT,3),new n("RETURN_NUMBER",e.DATA_TYPE_UINT8,1),new n("NUMBER_OF_RETURNS",e.DATA_TYPE_UINT8,1),new n("SOURCE_ID",e.DATA_TYPE_UINT16,1),new n("INDICES",e.DATA_TYPE_UINT32,1),new n("SPACING",e.DATA_TYPE_FLOAT,1),new n("GPS_TIME",e.DATA_TYPE_DOUBLE,1),Int8Array,Int16Array,Int32Array,Float64Array,Uint8Array,Uint16Array,Uint32Array,Float64Array,Float32Array,Float64Array,onmessage=function(t){var a,i=t.data,A=i.buffer,T=i.pointAttributes,o=(i.scale,i.name,i.min),u=(i.max,i.size),I=i.offset,s=i.numPoints,f=new DataView(A),_={},l=32,E=new Uint32Array(Math.pow(l,3)),N=function(e,t,n){var r=l*e/u.x,a=l*t/u.y,i=l*n/u.z,A=Math.min(parseInt(r),31),T=Math.min(parseInt(a),31),o=Math.min(parseInt(i),31);return A+T*l+o*l*l},m=0,y=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],c=[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],P=r(T.attributes);try{for(P.s();!(a=P.n()).done;){var D=a.value;if(["POSITION_CARTESIAN","position"].includes(D.name)){for(var b=new ArrayBuffer(4*s*3),h=new Float32Array(b),Y=0;Y<s;Y++){var w=12*Y,d=f.getFloat32(w+0,!0)+I[0]-o.x,O=f.getFloat32(w+4,!0)+I[1]-o.y,v=f.getFloat32(w+8,!0)+I[2]-o.z;y[0]=Math.min(y[0],d),y[1]=Math.min(y[1],O),y[2]=Math.min(y[2],v),c[0]=Math.max(c[0],d),c[1]=Math.max(c[1],O),c[2]=Math.max(c[2],v),0===E[N(d,O,v)]++&&m++,h[3*Y+0]=d,h[3*Y+1]=O,h[3*Y+2]=v}_[D.name]={buffer:b,attribute:D}}else["RGBA","rgba"].includes(D.name)&&(_[D.name]={buffer:A.slice(12*s),attribute:D})}}catch(e){P.e(e)}finally{P.f()}for(var F=parseInt(s/m),S=new ArrayBuffer(4*s),U=new Uint32Array(S),p=0;p<s;p++)U[p]=p;_.INDICES={buffer:S,attribute:n.INDICES};var M,g=r(T.vectors);try{for(g.s();!(M=g.n()).done;){var R,C=M.value,L=C.name,z=C.attributes,B=z.length,x=new ArrayBuffer(B*s*4),V=new Float32Array(x),G=0,K=r(z);try{for(K.s();!(R=K.n()).done;){for(var j=_[R.value],H=j.offset,$=j.scale,k=new DataView(j.buffer),q=k.getFloat32.bind(k),J=0;J<s;J++){var Q=q(4*J,!0);V[J*B+G]=Q/$+H}G++}}catch(e){K.e(e)}finally{K.f()}var W=new n(L,e.DATA_TYPE_FLOAT,3);_[L]={buffer:x,attribute:W}}}catch(e){g.e(e)}finally{g.f()}var X={buffer:A,attributeBuffers:_,density:F,tightBoundingBox:{min:y,max:c}},Z=[];for(var ee in X.attributeBuffers)Z.push(X.attributeBuffers[ee].buffer);Z.push(A),postMessage(X,Z)}})();\n',
              'Worker',
              void 0,
              void 0,
            );
          }
        },
        245: (A, g, I) => {
          I.d(g, { A: () => B });
          const B =
            'precision highp float;\nprecision highp int;\n\n#define max_clip_boxes 30\n\nin vec3 position;\nin vec3 color;\n\n#ifdef color_rgba\n\tin vec4 rgba;\n#endif\n\nin vec3 normal;\nin float intensity;\nin float classification;\nin float returnNumber;\nin float numberOfReturns;\nin float pointSourceID;\nin vec4 indices;\nin vec2 uv;\n\n#ifdef color_type_custom_scalar\nin float CUSTOM_ATTRIBUTE_NAME;\n#endif\n\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\n\nuniform float pcIndex;\n\nuniform float screenWidth;\nuniform float screenHeight;\nuniform float fov;\nuniform float spacing;\n\n#if defined use_clip_box\n\tuniform mat4 clipBoxes[max_clip_boxes];\n#endif\n\nuniform float heightMin;\nuniform float heightMax;\nuniform float size; // pixel size factor\nuniform float minSize; // minimum pixel size\nuniform float maxSize; // maximum pixel size\nuniform float octreeSize;\nuniform vec3 bbSize;\nuniform vec3 uColor;\nuniform float opacity;\nuniform float clipBoxCount;\nuniform float level;\nuniform float vnStart;\nuniform bool isLeafNode;\n\nuniform float filterByNormalThreshold;\nuniform vec2 intensityRange;\nuniform vec2 customScalarRange;\nuniform float opacityAttenuation;\nuniform float intensityGamma;\nuniform float intensityContrast;\nuniform float intensityBrightness;\nuniform float rgbGamma;\nuniform float rgbContrast;\nuniform float rgbBrightness;\nuniform float transition;\nuniform float wRGB;\nuniform float wIntensity;\nuniform float wElevation;\nuniform float wClassification;\nuniform float wReturnNumber;\nuniform float wSourceID;\n\nuniform bool renderDepth;\n\nuniform sampler2D visibleNodes;\nuniform sampler2D gradient;\nuniform sampler2D classificationLUT;\nuniform sampler2D depthMap;\n\n#ifdef use_texture_blending\n\tuniform sampler2D backgroundMap;\n#endif\n\n#ifdef use_point_cloud_mixing\n\tuniform int pointCloudMixingMode;\n\tuniform float pointCloudID;\n\n\tuniform float pointCloudMixAngle;\n\tuniform float stripeDistanceX;\n\tuniform float stripeDistanceY;\n\n\tuniform float stripeDivisorX;\n\tuniform float stripeDivisorY;\n#endif\n\n#ifdef highlight_point\n\tuniform vec3 highlightedPointCoordinate;\n\tuniform bool enablePointHighlighting;\n\tuniform float highlightedPointScale;\n#endif\n\n#ifdef use_filter_by_normal\n\tuniform int normalFilteringMode;\n#endif\n\n#ifdef use_filter_by_classification\n\tuniform bool classificationFilter[256];\n#endif\n\nout vec3 vColor;\n\n#if !defined(color_type_point_index)\n\tout float vOpacity;\n#endif\n\n#if defined(weighted_splats)\n\tout float vLinearDepth;\n#endif\n\n#if !defined(paraboloid_point_shape) && defined(use_edl)\n\tout float vLogDepth;\n#endif\n\n#if defined(color_type_phong) && (MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0) || defined(paraboloid_point_shape)\n\tout vec3 vViewPosition;\n#endif\n\n#if defined(weighted_splats) || defined(paraboloid_point_shape)\n\tout float vRadius;\n#endif\n\n#if defined(color_type_phong) && (MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0)\n\tout vec3 vNormal;\n#endif\n\n#ifdef highlight_point\n\tout float vHighlight;\n#endif\n\n// ---------------------\n// OCTREE\n// ---------------------\n\n#if (defined(adaptive_point_size) || defined(color_type_lod)) && defined(tree_type_octree)\n\n/**\n * Rounds the specified number to the closest integer.\n */\nfloat safeRound(float number){\n\treturn floor(number + 0.5);\n}\n\n/**\n * Gets the number of 1-bits up to inclusive index position.\n *\n * number is treated as if it were an integer in the range 0-255\n */\nint numberOfOnes(int number, int index) {\n\tint numOnes = 0;\n\tint tmp = 128;\n\tfor (int i = 7; i >= 0; i--) {\n\n\t\tif (number >= tmp) {\n\t\t\tnumber = number - tmp;\n\n\t\t\tif (i <= index) {\n\t\t\t\tnumOnes++;\n\t\t\t}\n\t\t}\n\n\t\ttmp = tmp / 2;\n\t}\n\n\treturn numOnes;\n}\n\n/**\n * Checks whether the bit at index is 1.0\n *\n * number is treated as if it were an integer in the range 0-255\n */\nbool isBitSet(int number, int index){\n\n\t// weird multi else if due to lack of proper array, int and bitwise support in WebGL 1.0\n\tint powi = 1;\n\tif (index == 0) {\n\t\tpowi = 1;\n\t} else if (index == 1) {\n\t\tpowi = 2;\n\t} else if (index == 2) {\n\t\tpowi = 4;\n\t} else if (index == 3) {\n\t\tpowi = 8;\n\t} else if (index == 4) {\n\t\tpowi = 16;\n\t} else if (index == 5) {\n\t\tpowi = 32;\n\t} else if (index == 6) {\n\t\tpowi = 64;\n\t} else if (index == 7) {\n\t\tpowi = 128;\n\t}\n\n\tint ndp = number / powi;\n\n\treturn mod(float(ndp), 2.0) != 0.0;\n}\n\n/**\n * Gets the the LOD at the point position.\n */\nfloat getLOD() {\n\tvec3 offset = vec3(0.0, 0.0, 0.0);\n\tint iOffset = int(vnStart);\n\tfloat depth = level;\n\n\tfor (float i = 0.0; i <= 30.0; i++) {\n\t\tfloat nodeSizeAtLevel = octreeSize  / pow(2.0, i + level + 0.0);\n\n\t\tvec3 index3d = (position-offset) / nodeSizeAtLevel;\n\t\tindex3d = floor(index3d + 0.5);\n\t\tint index = int(safeRound(4.0 * index3d.x + 2.0 * index3d.y + index3d.z));\n\n\t\tvec4 value = texture(visibleNodes, vec2(float(iOffset) / 2048.0, 0.0));\n\t\tint mask = int(safeRound(value.r * 255.0));\n\n\t\tif (isBitSet(mask, index)) {\n\t\t\t// there are more visible child nodes at this position\n\t\t\tint advanceG = int(safeRound(value.g * 255.0)) * 256;\n\t\t\tint advanceB = int(safeRound(value.b * 255.0));\n\t\t\tint advanceChild = numberOfOnes(mask, index - 1);\n\t\t\tint advance = advanceG + advanceB + advanceChild;\n\n\t\t\tiOffset = iOffset + advance;\n\n\t\t\tdepth++;\n\t\t} else {\n\t\t\treturn value.a * 255.0; // no more visible child nodes at this position\n\t\t}\n\n\t\toffset = offset + (vec3(1.0, 1.0, 1.0) * nodeSizeAtLevel * 0.5) * index3d;\n\t}\n\n\treturn depth;\n}\n\nfloat getPointSizeAttenuation() {\n\treturn 0.5 * pow(2.0, getLOD());\n}\n\n#endif\n\n// ---------------------\n// KD-TREE\n// ---------------------\n\n#if (defined(adaptive_point_size) || defined(color_type_lod)) && defined(tree_type_kdtree)\n\nfloat getLOD() {\n\tvec3 offset = vec3(0.0, 0.0, 0.0);\n\tfloat intOffset = 0.0;\n\tfloat depth = 0.0;\n\n\tvec3 size = bbSize;\n\tvec3 pos = position;\n\n\tfor (float i = 0.0; i <= 1000.0; i++) {\n\n\t\tvec4 value = texture(visibleNodes, vec2(intOffset / 2048.0, 0.0));\n\n\t\tint children = int(value.r * 255.0);\n\t\tfloat next = value.g * 255.0;\n\t\tint split = int(value.b * 255.0);\n\n\t\tif (next == 0.0) {\n\t\t \treturn depth;\n\t\t}\n\n\t\tvec3 splitv = vec3(0.0, 0.0, 0.0);\n\t\tif (split == 1) {\n\t\t\tsplitv.x = 1.0;\n\t\t} else if (split == 2) {\n\t\t \tsplitv.y = 1.0;\n\t\t} else if (split == 4) {\n\t\t \tsplitv.z = 1.0;\n\t\t}\n\n\t\tintOffset = intOffset + next;\n\n\t\tfloat factor = length(pos * splitv / size);\n\t\tif (factor < 0.5) {\n\t\t \t// left\n\t\t\tif (children == 0 || children == 2) {\n\t\t\t\treturn depth;\n\t\t\t}\n\t\t} else {\n\t\t\t// right\n\t\t\tpos = pos - size * splitv * 0.5;\n\t\t\tif (children == 0 || children == 1) {\n\t\t\t\treturn depth;\n\t\t\t}\n\t\t\tif (children == 3) {\n\t\t\t\tintOffset = intOffset + 1.0;\n\t\t\t}\n\t\t}\n\t\tsize = size * ((1.0 - (splitv + 1.0) / 2.0) + 0.5);\n\n\t\tdepth++;\n\t}\n\n\n\treturn depth;\n}\n\nfloat getPointSizeAttenuation() {\n\treturn 0.5 * pow(1.3, getLOD());\n}\n\n#endif\n\n// formula adapted from: http://www.dfstudios.co.uk/articles/programming/image-programming-algorithms/image-processing-algorithms-part-5-contrast-adjustment/\nfloat getContrastFactor(float contrast) {\n\treturn (1.0158730158730156 * (contrast + 1.0)) / (1.0158730158730156 - contrast);\n}\n\nvec3 getRGB() {\n\t\n\t#ifdef color_rgba\n\t\tvec3 rgb = rgba.rgb;\n\t#else\t\n\t\tvec3 rgb = color;\n\t#endif\t\t\n\n\t#if defined(use_rgb_gamma_contrast_brightness)\n\t\trgb = pow(rgb, vec3(rgbGamma));\n\t\trgb = rgb + rgbBrightness;\n\t\trgb = (rgb - 0.5) * getContrastFactor(rgbContrast) + 0.5;\n\t\trgb = clamp(rgb, 0.0, 1.0);\n\t\treturn rgb;\n\t#else\n\t\treturn rgb;\n\t#endif\n}\n\nfloat getIntensity() {\n\tfloat w = (intensity - intensityRange.x) / (intensityRange.y - intensityRange.x);\n\tw = pow(w, intensityGamma);\n\tw = w + intensityBrightness;\n\tw = (w - 0.5) * getContrastFactor(intensityContrast) + 0.5;\n\tw = clamp(w, 0.0, 1.0);\n\n\treturn w;\n}\n\nvec3 getElevation() {\n\tvec4 world = modelMatrix * vec4( position, 1.0 );\n\tfloat w = (world.z - heightMin) / (heightMax-heightMin);\n\tvec3 cElevation = texture(gradient, vec2(w,1.0-w)).rgb;\n\n\treturn cElevation;\n}\n\n#ifdef color_type_custom_scalar\nvec3 getCustomScalar() {\n\tfloat w = (CUSTOM_ATTRIBUTE_NAME - customScalarRange.x) / (customScalarRange.y - customScalarRange.x);\n\tw = clamp(w, 0.0, 1.0);\n\treturn texture(gradient, vec2(w, 1.0 - w)).rgb;\n}\n#endif\n\nvec4 getClassification() {\n\tvec2 uv = vec2(classification / 255.0, 0.5);\n\tvec4 classColor = texture(classificationLUT, uv);\n\n\treturn classColor;\n}\n\nvec3 getReturnNumber() {\n\tif (numberOfReturns == 1.0) {\n\t\treturn vec3(1.0, 1.0, 0.0);\n\t} else {\n\t\tif (returnNumber == 1.0) {\n\t\t\treturn vec3(1.0, 0.0, 0.0);\n\t\t} else if (returnNumber == numberOfReturns) {\n\t\t\treturn vec3(0.0, 0.0, 1.0);\n\t\t} else {\n\t\t\treturn vec3(0.0, 1.0, 0.0);\n\t\t}\n\t}\n}\n\nvec3 getSourceID() {\n\tfloat w = mod(pointSourceID, 10.0) / 10.0;\n\treturn texture(gradient, vec2(w, 1.0 - w)).rgb;\n}\n\nvec3 getCompositeColor() {\n\tvec3 c;\n\tfloat w;\n\n\tc += wRGB * getRGB();\n\tw += wRGB;\n\n\tc += wIntensity * getIntensity() * vec3(1.0, 1.0, 1.0);\n\tw += wIntensity;\n\n\tc += wElevation * getElevation();\n\tw += wElevation;\n\n\tc += wReturnNumber * getReturnNumber();\n\tw += wReturnNumber;\n\n\tc += wSourceID * getSourceID();\n\tw += wSourceID;\n\n\tvec4 cl = wClassification * getClassification();\n\tc += cl.a * cl.rgb;\n\tw += wClassification * cl.a;\n\n\tc = c / w;\n\n\tif (w == 0.0) {\n\t\tgl_Position = vec4(100.0, 100.0, 100.0, 0.0);\n\t}\n\n\treturn c;\n}\n\nvoid main() {\n\tvec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n\n\tgl_Position = projectionMatrix * mvPosition;\n\n\t#if defined(color_type_phong) && (MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0) || defined(paraboloid_point_shape)\n\t\tvViewPosition = mvPosition.xyz;\n\t#endif\n\n\t#if defined weighted_splats\n\t\tvLinearDepth = gl_Position.w;\n\t#endif\n\n\t#if defined(color_type_phong) && (MAX_POINT_LIGHTS > 0 || MAX_DIR_LIGHTS > 0)\n\t\tvNormal = normalize(normalMatrix * normal);\n\t#endif\n\n\t#if !defined(paraboloid_point_shape) && defined(use_edl)\n\t\tvLogDepth = log2(-mvPosition.z);\n\t#endif\n\n\t// ---------------------\n\t// POINT SIZE\n\t// ---------------------\n\n\tfloat pointSize = 1.0;\n\tfloat slope = tan(fov / 2.0);\n\tfloat projFactor =  -0.5 * screenHeight / (slope * mvPosition.z);\n\n\t#if defined fixed_point_size\n\t\tpointSize = size;\n\t#elif defined attenuated_point_size\n\t\tpointSize = size * spacing * projFactor;\n\t#elif defined adaptive_point_size\n\t\tfloat worldSpaceSize = 2.0 * size * spacing / getPointSizeAttenuation();\n\t\tpointSize = worldSpaceSize * projFactor;\n\t#endif\n\n\tpointSize = max(minSize, pointSize);\n\tpointSize = min(maxSize, pointSize);\n\n\t#if defined(weighted_splats) || defined(paraboloid_point_shape)\n\t\tvRadius = pointSize / projFactor;\n\t#endif\n\n\tgl_PointSize = pointSize;\n\n\t// ---------------------\n\t// HIGHLIGHTING\n\t// ---------------------\n\n\t#ifdef highlight_point\n\t\tvec4 mPosition = modelMatrix * vec4(position, 1.0);\n\t\tif (enablePointHighlighting && abs(mPosition.x - highlightedPointCoordinate.x) < 0.0001 &&\n\t\t\tabs(mPosition.y - highlightedPointCoordinate.y) < 0.0001 &&\n\t\t\tabs(mPosition.z - highlightedPointCoordinate.z) < 0.0001) {\n\t\t\tvHighlight = 1.0;\n\t\t\tgl_PointSize = pointSize * highlightedPointScale;\n\t\t} else {\n\t\t\tvHighlight = 0.0;\n\t\t}\n\t#endif\n\n\t// ---------------------\n\t// OPACITY\n\t// ---------------------\n\n\t#ifndef color_type_point_index\n\t\t#ifdef attenuated_opacity\n\t\t\tvOpacity = opacity * exp(-length(-mvPosition.xyz) / opacityAttenuation);\n\t\t#else\n\t\t\tvOpacity = opacity;\n\t\t#endif\n\t#endif\n\n\t// ---------------------\n\t// FILTERING\n\t// ---------------------\n\n\t#ifdef use_filter_by_normal\n\t\tbool discardPoint = false;\n\t\t// Absolute normal filtering\n\t\tif (normalFilteringMode == 1) {\n\t\t\tdiscardPoint = (abs((modelViewMatrix * vec4(normal, 0.0)).z) > filterByNormalThreshold);\n\t\t}\n\t\t// less than equal to\n\t\telse if (normalFilteringMode == 2) {\n\t\t\tdiscardPoint = (modelViewMatrix * vec4(normal, 0.0)).z <= filterByNormalThreshold;\n\t\t\t}\n\t\t// greater than\n\t\telse if(normalFilteringMode == 3) {\n\t\t\tdiscardPoint = (modelViewMatrix * vec4(normal, 0.0)).z > filterByNormalThreshold;\n\t\t\t}\n\n\t\tif (discardPoint)\n\t\t{\n\t\t\tgl_Position = vec4(0.0, 0.0, 2.0, 1.0);\n\t\t}\n\t#endif\n\n\t#ifdef use_filter_by_classification\n\t\n\t\tint classIndex = int(classification);\n\t\tbool discardPoint = !classificationFilter[classIndex];\n\n\t\tif (discardPoint) {\n\t\t\tgl_Position = vec4(0.0, 0.0, 2.0, 1.0);\n\t\t\treturn;\n\t\t}\n\n\n\n\t#endif\n\n\t// ---------------------\n\t// POINT COLOR\n\t// ---------------------\n\n\t#ifdef color_type_rgb\n\t\tvColor = getRGB();\n\t#elif defined color_type_height\n\t\tvColor = getElevation();\n\t#elif defined color_type_rgb_height\n\t\tvec3 cHeight = getElevation();\n\t\tvColor = (1.0 - transition) * getRGB() + transition * cHeight;\n\t#elif defined color_type_depth\n\t\tfloat linearDepth = -mvPosition.z ;\n\t\tfloat expDepth = (gl_Position.z / gl_Position.w) * 0.5 + 0.5;\n\t\tvColor = vec3(linearDepth, expDepth, 0.0);\n\t#elif defined color_type_intensity\n\t\tfloat w = getIntensity();\n\t\tvColor = vec3(w, w, w);\n\t#elif defined color_type_intensity_gradient\n\t\tfloat w = getIntensity();\n\t\tvColor = texture(gradient, vec2(w, 1.0 - w)).rgb;\n\t#elif defined color_type_color\n\t\tvColor = uColor;\n\t#elif defined color_type_lod\n\tfloat w = getLOD() / 10.0;\n\tvColor = texture(gradient, vec2(w, 1.0 - w)).rgb;\n\t#elif defined color_type_point_index\n\t\tvColor = indices.rgb;\n\t#elif defined color_type_classification\n\t  vec4 cl = getClassification();\n\t\tvColor = cl.rgb;\n\t#elif defined color_type_return_number\n\t\tvColor = getReturnNumber();\n\t#elif defined color_type_source\n\t\tvColor = getSourceID();\n\t#elif defined color_type_normal\n\t\tvColor = (modelMatrix * vec4(normal, 0.0)).xyz;\n\t#elif defined color_type_phong\n\t\tvColor = color;\n\t#elif defined color_type_composite\n\t\tvColor = getCompositeColor();\n\t#elif defined color_type_custom_scalar\n\t\tvColor = getCustomScalar();\n\t#endif\n\n\t#if !defined color_type_composite && defined color_type_classification\n\t\tif (cl.a == 0.0) {\n\t\t\tgl_Position = vec4(100.0, 100.0, 100.0, 0.0);\n\t\t\treturn;\n\t\t}\n\t#endif\n\n\t// ---------------------\n\t// CLIPPING\n\t// ---------------------\n\n\t#if defined use_clip_box\n\t\tbool insideAny = false;\n\t\tfor (int i = 0; i < max_clip_boxes; i++) {\n\t\t\tif (i == int(clipBoxCount)) {\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tvec4 clipPosition = clipBoxes[i] * modelMatrix * vec4(position, 1.0);\n\t\t\tbool inside = -0.5 <= clipPosition.x && clipPosition.x <= 0.5;\n\t\t\tinside = inside && -0.5 <= clipPosition.y && clipPosition.y <= 0.5;\n\t\t\tinside = inside && -0.5 <= clipPosition.z && clipPosition.z <= 0.5;\n\t\t\tinsideAny = insideAny || inside;\n\t\t}\n\n\t\tif (!insideAny) {\n\t\t\t#if defined clip_outside\n\t\t\t\tgl_Position = vec4(1000.0, 1000.0, 1000.0, 1.0);\n\t\t\t#elif defined clip_highlight_inside && !defined(color_type_depth)\n\t\t\t\tfloat c = (vColor.r + vColor.g + vColor.b) / 6.0;\n\t\t\t#endif\n\t\t} else {\n\t\t\t#if defined clip_highlight_inside\n\t\t\t\tvColor.r += 0.5;\n\t\t\t#elif defined clip_inside\n\t\t\t\tgl_Position = vec4(1000.0, 1000.0, 1000.0, 1.0);\n\t\t\t#endif\n\t\t}\n\t#endif\n\n\n\t// ---------------------\n\t// For Depth purposes\n\t// ---------------------\n\n\tif(renderDepth) {\n\t\tvColor = vec3(1. - gl_Position.z / gl_Position.w);\n\t}\n\n}\n';
        },
        300: (A, g, I) => {
          I.d(g, { A: () => Q });
          var B = I(512),
            C = I.n(B);
          function Q() {
            return C()(
              '(()=>{"use strict";const t={DATA_TYPE_DOUBLE:{ordinal:0,name:"double",size:8},DATA_TYPE_FLOAT:{ordinal:1,name:"float",size:4},DATA_TYPE_INT8:{ordinal:2,name:"int8",size:1},DATA_TYPE_UINT8:{ordinal:3,name:"uint8",size:1},DATA_TYPE_INT16:{ordinal:4,name:"int16",size:2},DATA_TYPE_UINT16:{ordinal:5,name:"uint16",size:2},DATA_TYPE_INT32:{ordinal:6,name:"int32",size:4},DATA_TYPE_UINT32:{ordinal:7,name:"uint32",size:4},DATA_TYPE_INT64:{ordinal:8,name:"int64",size:8},DATA_TYPE_UINT64:{ordinal:9,name:"uint64",size:8}};let e=0;for(const n in t)t[e]=t[n],e++;class n{constructor(t,e,n,r=[1/0,-1/0],a=void 0){this.name=t,this.type=e,this.numElements=n,this.range=r,this.uri=a,this.byteSize=this.numElements*this.type.size,this.description=""}}function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,i,o,u=[],A=!0,f=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;A=!1}else for(;!(A=(r=i.call(n)).done)&&(u.push(r.value),u.length!==e);A=!0);}catch(t){f=!0,a=t}finally{try{if(!A&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(f)throw a}}return u}}(t,e)||i(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=i(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,u=!0,A=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return u=t.done,t},e:function(t){A=!0,o=t},f:function(){try{u||null==n.return||n.return()}finally{if(A)throw o}}}}function i(t,e){if(t){if("string"==typeof t)return o(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}new n("POSITION_CARTESIAN",t.DATA_TYPE_FLOAT,3),new n("COLOR_PACKED",t.DATA_TYPE_INT8,4),new n("COLOR_PACKED",t.DATA_TYPE_INT8,4),new n("COLOR_PACKED",t.DATA_TYPE_INT8,3),new n("NORMAL_FLOATS",t.DATA_TYPE_FLOAT,3),new n("INTENSITY",t.DATA_TYPE_UINT16,1),new n("CLASSIFICATION",t.DATA_TYPE_UINT8,1),new n("NORMAL_SPHEREMAPPED",t.DATA_TYPE_UINT8,2),new n("NORMAL_OCT16",t.DATA_TYPE_UINT8,2),new n("NORMAL",t.DATA_TYPE_FLOAT,3),new n("RETURN_NUMBER",t.DATA_TYPE_UINT8,1),new n("NUMBER_OF_RETURNS",t.DATA_TYPE_UINT8,1),new n("SOURCE_ID",t.DATA_TYPE_UINT16,1),new n("INDICES",t.DATA_TYPE_UINT32,1),new n("SPACING",t.DATA_TYPE_FLOAT,1),new n("GPS_TIME",t.DATA_TYPE_DOUBLE,1);var u={int8:Int8Array,int16:Int16Array,int32:Int32Array,int64:Float64Array,uint8:Uint8Array,uint16:Uint16Array,uint32:Uint32Array,uint64:Float64Array,float:Float32Array,double:Float64Array};onmessage=function(e){var i,o=e.data,A=o.buffer,f=o.pointAttributes,T=o.scale,l=(o.name,o.min),s=(o.max,o.size),I=o.offset,_=o.numPoints,y=new DataView(A),m={},E=0,N=0,c=a(f.attributes);try{for(c.s();!(i=c.n()).done;)N+=i.value.byteSize}catch(t){c.e(t)}finally{c.f()}var b,d=32,h=new Uint32Array(Math.pow(d,3)),v=function(t,e,n){var r=d*t/s.x,a=d*e/s.y,i=d*n/s.z,o=Math.min(parseInt(r),31),u=Math.min(parseInt(a),31),A=Math.min(parseInt(i),31);return o+u*d+A*d*d},w=0,P=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],D=[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],Y=a(f.attributes);try{for(Y.s();!(b=Y.n()).done;){var O=b.value;if(["POSITION_CARTESIAN","position"].includes(O.name)){for(var U=new ArrayBuffer(4*_*3),g=new Float32Array(U),S=0;S<_;S++){var p=S*N,F=y.getInt32(p+E+0,!0)*T[0]+I[0]-l.x,M=y.getInt32(p+E+4,!0)*T[1]+I[1]-l.y,z=y.getInt32(p+E+8,!0)*T[2]+I[2]-l.z;P[0]=Math.min(P[0],F),P[1]=Math.min(P[1],M),P[2]=Math.min(P[2],z),D[0]=Math.max(D[0],F),D[1]=Math.max(D[1],M),D[2]=Math.max(D[2],z),0===h[v(F,M,z)]++&&w++,g[3*S+0]=F,g[3*S+1]=M,g[3*S+2]=z}m[O.name]={buffer:U,attribute:O}}else if(["RGBA","rgba"].includes(O.name)){for(var R=new ArrayBuffer(4*_),C=new Uint8Array(R),L=0;L<_;L++){var B=L*N,x=y.getUint16(B+E+0,!0),V=y.getUint16(B+E+2,!0),G=y.getUint16(B+E+4,!0);C[4*L+0]=x>255?x/256:x,C[4*L+1]=V>255?V/256:V,C[4*L+2]=G>255?G/256:G}m[O.name]={buffer:R,attribute:O}}else{var j=new ArrayBuffer(4*_),K=new Float32Array(j),H=new(0,u[O.type.name])(_),$=0,k=1,q={int8:y.getInt8,int16:y.getInt16,int32:y.getInt32,uint8:y.getUint8,uint16:y.getUint16,uint32:y.getUint32,float:y.getFloat32,double:y.getFloat64}[O.type.name].bind(y);if(O.type.size>4){var J=r(O.range,2),Q=J[0],W=J[1];$=Q,k=1/(W-Q)}for(var X=0;X<_;X++){var Z=q(X*N+E,!0);K[X]=(Z-$)*k,H[X]=Z}m[O.name]={buffer:j,preciseBuffer:H,attribute:O,offset:$,scale:k}}E+=O.byteSize}}catch(t){Y.e(t)}finally{Y.f()}for(var tt=parseInt(_/w),et=new ArrayBuffer(4*_),nt=new Uint32Array(et),rt=0;rt<_;rt++)nt[rt]=rt;m.INDICES={buffer:et,attribute:n.INDICES};var at,it=a(f.vectors);try{for(it.s();!(at=it.n()).done;){var ot,ut=at.value,At=ut.name,ft=ut.attributes,Tt=ft.length,lt=new ArrayBuffer(Tt*_*4),st=new Float32Array(lt),It=0,_t=a(ft);try{for(_t.s();!(ot=_t.n()).done;){for(var yt=m[ot.value],mt=yt.offset,Et=yt.scale,Nt=new DataView(yt.buffer),ct=Nt.getFloat32.bind(Nt),bt=0;bt<_;bt++){var dt=ct(4*bt,!0);st[bt*Tt+It]=dt/Et+mt}It++}}catch(t){_t.e(t)}finally{_t.f()}var ht=new n(At,t.DATA_TYPE_FLOAT,3);m[At]={buffer:lt,attribute:ht}}}catch(t){it.e(t)}finally{it.f()}var vt={buffer:A,attributeBuffers:m,density:tt,tightBoundingBox:{min:P,max:D}},wt=[];for(var Pt in vt.attributeBuffers)wt.push(vt.attributeBuffers[Pt].buffer);wt.push(A),postMessage(vt,wt)}})();\n',
              'Worker',
              void 0,
              void 0,
            );
          }
        },
        361: (A, g, I) => {
          I.d(g, { A: () => Q });
          var B = I(512),
            C = I.n(B);
          function Q() {
            return C()(
              '(()=>{var A={962:A=>{var g,I=(g="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0,function(A){var I,B,C=void 0!==(A=A||{})?A:{};C.ready=new Promise(function(A,g){I=A,B=g}),["_main","___getTypeName","__embind_initialize_bindings","_fflush","onRuntimeInitialized"].forEach(A=>{Object.getOwnPropertyDescriptor(C.ready,A)||Object.defineProperty(C.ready,A,{get:()=>O("You are getting "+A+" on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"),set:()=>O("You are setting "+A+" on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js")})});var Q=Object.assign({},C),E=[],i="./this.program";if(C.ENVIRONMENT)throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");var o,D="";if(D=self.location.href,g&&(D=g),D=0!==D.indexOf("blob:")?D.substr(0,D.replace(/[?#].*/,"").lastIndexOf("/")+1):"","object"!=typeof window&&"function"!=typeof importScripts)throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");o=A=>{var g=new XMLHttpRequest;return g.open("GET",A,!1),g.responseType="arraybuffer",g.send(null),new Uint8Array(g.response)};var a,w,t,s=C.print||console.log.bind(console),F=C.printErr||console.warn.bind(console);function y(A,g){Object.getOwnPropertyDescriptor(C,A)||Object.defineProperty(C,A,{configurable:!0,get:function(){O("Module."+A+" has been replaced with plain "+g+" (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")}})}function N(A){return"FS_createPath"===A||"FS_createDataFile"===A||"FS_createPreloadedFile"===A||"FS_unlink"===A||"addRunDependency"===A||"FS_createLazyFile"===A||"FS_createDevice"===A||"removeRunDependency"===A}Object.assign(C,Q),Q=null,a="fetchSettings",Object.getOwnPropertyDescriptor(C,a)&&O("`Module."+a+"` was supplied but `"+a+"` not included in INCOMING_MODULE_JS_API"),C.arguments&&(E=C.arguments),y("arguments","arguments_"),C.thisProgram&&(i=C.thisProgram),y("thisProgram","thisProgram"),C.quit&&C.quit,y("quit","quit_"),R(void 0===C.memoryInitializerPrefixURL,"Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"),R(void 0===C.pthreadMainPrefixURL,"Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"),R(void 0===C.cdInitializerPrefixURL,"Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"),R(void 0===C.filePackagePrefixURL,"Module.filePackagePrefixURL option was removed, use Module.locateFile instead"),R(void 0===C.read,"Module.read option was removed (modify read_ in JS)"),R(void 0===C.readAsync,"Module.readAsync option was removed (modify readAsync in JS)"),R(void 0===C.readBinary,"Module.readBinary option was removed (modify readBinary in JS)"),R(void 0===C.setWindowTitle,"Module.setWindowTitle option was removed (modify setWindowTitle in JS)"),R(void 0===C.TOTAL_MEMORY,"Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"),y("read","read_"),y("readAsync","readAsync"),y("readBinary","readBinary"),y("setWindowTitle","setWindowTitle"),R(!0,"web environment detected but not enabled at build time.  Add \'web\' to `-sENVIRONMENT` to enable."),R(!0,"node environment detected but not enabled at build time.  Add \'node\' to `-sENVIRONMENT` to enable."),R(!0,"shell environment detected but not enabled at build time.  Add \'shell\' to `-sENVIRONMENT` to enable."),C.wasmBinary&&(w=C.wasmBinary),y("wasmBinary","wasmBinary"),C.noExitRuntime,y("noExitRuntime","noExitRuntime"),"object"!=typeof WebAssembly&&O("no native wasm support detected");var e=!1;function R(A,g){A||O("Assertion failed"+(g?": "+g:""))}var G,M,r,c,Y,S,h,n,L,K="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function U(A,g,I){for(var B=g+I,C=g;A[C]&&!(C>=B);)++C;if(C-g>16&&A.buffer&&K)return K.decode(A.subarray(g,C));for(var Q="";g<C;){var E=A[g++];if(128&E){var i=63&A[g++];if(192!=(224&E)){var o=63&A[g++];if(224==(240&E)?E=(15&E)<<12|i<<6|o:(240!=(248&E)&&IA("Invalid UTF-8 leading byte 0x"+E.toString(16)+" encountered when deserializing a UTF-8 string in wasm memory to a JS string!"),E=(7&E)<<18|i<<12|o<<6|63&A[g++]),E<65536)Q+=String.fromCharCode(E);else{var D=E-65536;Q+=String.fromCharCode(55296|D>>10,56320|1023&D)}}else Q+=String.fromCharCode((31&E)<<6|i)}else Q+=String.fromCharCode(E)}return Q}function k(A,g){return A?U(r,A,g):""}function J(A,g,I,B){if(!(B>0))return 0;for(var C=I,Q=I+B-1,E=0;E<A.length;++E){var i=A.charCodeAt(E);if(i>=55296&&i<=57343&&(i=65536+((1023&i)<<10)|1023&A.charCodeAt(++E)),i<=127){if(I>=Q)break;g[I++]=i}else if(i<=2047){if(I+1>=Q)break;g[I++]=192|i>>6,g[I++]=128|63&i}else if(i<=65535){if(I+2>=Q)break;g[I++]=224|i>>12,g[I++]=128|i>>6&63,g[I++]=128|63&i}else{if(I+3>=Q)break;i>1114111&&IA("Invalid Unicode code point 0x"+i.toString(16)+" encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF)."),g[I++]=240|i>>18,g[I++]=128|i>>12&63,g[I++]=128|i>>6&63,g[I++]=128|63&i}}return g[I]=0,I-C}function H(A){for(var g=0,I=0;I<A.length;++I){var B=A.charCodeAt(I);B<=127?g++:B<=2047?g+=2:B>=55296&&B<=57343?(g+=4,++I):g+=3}return g}function d(A){G=A,C.HEAP8=M=new Int8Array(A),C.HEAP16=c=new Int16Array(A),C.HEAP32=S=new Int32Array(A),C.HEAPU8=r=new Uint8Array(A),C.HEAPU16=Y=new Uint16Array(A),C.HEAPU32=h=new Uint32Array(A),C.HEAPF32=n=new Float32Array(A),C.HEAPF64=L=new Float64Array(A)}var l=65536;C.TOTAL_STACK&&R(l===C.TOTAL_STACK,"the stack size can no longer be determined at runtime");var f,q=C.INITIAL_MEMORY||262144;function p(){if(!e){var A=Yg(),g=h[A>>2],I=h[A+4>>2];34821223==g&&2310721022==I||O("Stack overflow! Stack cookie has been overwritten at 0x"+A.toString(16)+", expected hex dwords 0x89BACDFE and 0x2135467, but received 0x"+I.toString(16)+" 0x"+g.toString(16)),1668509029!==h[0]&&O("Runtime error: The application has corrupted its heap memory area (address zero)!")}}y("INITIAL_MEMORY","INITIAL_MEMORY"),R(q>=l,"INITIAL_MEMORY should be larger than TOTAL_STACK, was "+q+"! (TOTAL_STACK="+l+")"),R("undefined"!=typeof Int32Array&&"undefined"!=typeof Float64Array&&null!=Int32Array.prototype.subarray&&null!=Int32Array.prototype.set,"JS engine does not provide full typed array support"),R(!C.wasmMemory,"Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally"),R(262144==q,"Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically"),function(){var A=new Int16Array(1),g=new Int8Array(A.buffer);if(A[0]=25459,115!==g[0]||99!==g[1])throw"Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)"}();var u=[],m=[],T=[],j=!1;function x(A){u.unshift(A)}function b(A){T.unshift(A)}R(Math.imul,"This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"),R(Math.fround,"This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"),R(Math.clz32,"This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"),R(Math.trunc,"This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");var W=0,V=null,X=null,Z={};function O(A){C.onAbort&&C.onAbort(A),F(A="Aborted("+A+")"),e=!0;var g=new WebAssembly.RuntimeError(A);throw B(g),g}var v,P,z={error:function(){O("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM")},init:function(){z.error()},createDataFile:function(){z.error()},createPreloadedFile:function(){z.error()},createLazyFile:function(){z.error()},open:function(){z.error()},mkdev:function(){z.error()},registerDevice:function(){z.error()},analyzePath:function(){z.error()},loadFilesFromDB:function(){z.error()},ErrnoError:function(){z.error()}};function _(A){return A.startsWith("data:application/octet-stream;base64,")}function $(A,g){return function(){var I=A,B=g;return g||(B=C.asm),R(j,"native function `"+I+"` called before runtime initialization"),B[A]||R(B[A],"exported native function `"+I+"` not found"),B[A].apply(null,arguments)}}function AA(A){try{if(A==v&&w)return new Uint8Array(w);if(o)return o(A);throw"both async and sync fetching of the wasm failed"}catch(A){O(A)}}function gA(A){for(;A.length>0;)A.shift()(C)}function IA(A){IA.shown||(IA.shown={}),IA.shown[A]||(IA.shown[A]=1,F(A))}function BA(A){this.excPtr=A,this.ptr=A-24,this.set_type=function(A){h[this.ptr+4>>2]=A},this.get_type=function(){return h[this.ptr+4>>2]},this.set_destructor=function(A){h[this.ptr+8>>2]=A},this.get_destructor=function(){return h[this.ptr+8>>2]},this.set_refcount=function(A){S[this.ptr>>2]=A},this.set_caught=function(A){A=A?1:0,M[this.ptr+12|0]=A},this.get_caught=function(){return 0!=M[this.ptr+12|0]},this.set_rethrown=function(A){A=A?1:0,M[this.ptr+13|0]=A},this.get_rethrown=function(){return 0!=M[this.ptr+13|0]},this.init=function(A,g){this.set_adjusted_ptr(0),this.set_type(A),this.set_destructor(g),this.set_refcount(0),this.set_caught(!1),this.set_rethrown(!1)},this.add_ref=function(){var A=S[this.ptr>>2];S[this.ptr>>2]=A+1},this.release_ref=function(){var A=S[this.ptr>>2];return S[this.ptr>>2]=A-1,R(A>0),1===A},this.set_adjusted_ptr=function(A){h[this.ptr+16>>2]=A},this.get_adjusted_ptr=function(){return h[this.ptr+16>>2]},this.get_exception_ptr=function(){if(Sg(this.get_type()))return h[this.excPtr>>2];var A=this.get_adjusted_ptr();return 0!==A?A:this.excPtr}}function CA(A){switch(A){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+A)}}C.FS_createDataFile=z.createDataFile,C.FS_createPreloadedFile=z.createPreloadedFile,_(v="laz-perf.wasm")||(P=v,v=C.locateFile?C.locateFile(P,D):D+P);var QA=void 0;function EA(A){for(var g="",I=A;r[I];)g+=QA[r[I++]];return g}var iA={},oA={},DA={};function aA(A){if(void 0===A)return"_unknown";var g=(A=A.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return g>=48&&g<=57?"_"+A:A}function wA(A,g){return A=aA(A),function(){"use strict";return g.apply(this,arguments)}}function tA(A,g){var I=wA(g,function(A){this.name=g,this.message=A;var I=new Error(A).stack;void 0!==I&&(this.stack=this.toString()+"\\n"+I.replace(/^Error(:[^\\n]*)?\\n/,""))});return I.prototype=Object.create(A.prototype),I.prototype.constructor=I,I.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message},I}var sA=void 0;function FA(A){throw new sA(A)}var yA=void 0;function NA(A){throw new yA(A)}function eA(A,g,I){function B(g){var B=I(g);B.length!==A.length&&NA("Mismatched type converter count");for(var C=0;C<A.length;++C)RA(A[C],B[C])}A.forEach(function(A){DA[A]=g});var C=new Array(g.length),Q=[],E=0;g.forEach((A,g)=>{oA.hasOwnProperty(A)?C[g]=oA[A]:(Q.push(A),iA.hasOwnProperty(A)||(iA[A]=[]),iA[A].push(()=>{C[g]=oA[A],++E===Q.length&&B(C)}))}),0===Q.length&&B(C)}function RA(A,g,I={}){if(!("argPackAdvance"in g))throw new TypeError("registerType registeredInstance requires argPackAdvance");var B=g.name;if(A||FA(\'type "\'+B+\'" must have a positive integer typeid pointer\'),oA.hasOwnProperty(A)){if(I.ignoreDuplicateRegistrations)return;FA("Cannot register type \'"+B+"\' twice")}if(oA[A]=g,delete DA[A],iA.hasOwnProperty(A)){var C=iA[A];delete iA[A],C.forEach(A=>A())}}function GA(A){FA(A.$$.ptrType.registeredClass.name+" instance already deleted")}var MA=!1;function rA(A){}function cA(A){A.count.value-=1,0===A.count.value&&function(A){A.smartPtr?A.smartPtrType.rawDestructor(A.smartPtr):A.ptrType.registeredClass.rawDestructor(A.ptr)}(A)}function YA(A,g,I){if(g===I)return A;if(void 0===I.baseClass)return null;var B=YA(A,g,I.baseClass);return null===B?null:I.downcast(B)}var SA={};var hA=[];function nA(){for(;hA.length;){var A=hA.pop();A.$$.deleteScheduled=!1,A.delete()}}var LA=void 0;var KA={};function UA(A,g){return g.ptrType&&g.ptr||NA("makeClassHandle requires ptr and ptrType"),!!g.smartPtrType!=!!g.smartPtr&&NA("Both smartPtrType and smartPtr must be specified"),g.count={value:1},JA(Object.create(A,{$$:{value:g}}))}function kA(A){var g=this.getPointee(A);if(!g)return this.destructor(A),null;var I=function(A,g){return g=function(A,g){for(void 0===g&&FA("ptr should not be undefined");A.baseClass;)g=A.upcast(g),A=A.baseClass;return g}(A,g),KA[g]}(this.registeredClass,g);if(void 0!==I){if(0===I.$$.count.value)return I.$$.ptr=g,I.$$.smartPtr=A,I.clone();var B=I.clone();return this.destructor(A),B}function C(){return this.isSmartPointer?UA(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:g,smartPtrType:this,smartPtr:A}):UA(this.registeredClass.instancePrototype,{ptrType:this,ptr:A})}var Q,E=this.registeredClass.getActualType(g),i=SA[E];if(!i)return C.call(this);Q=this.isConst?i.constPointerType:i.pointerType;var o=YA(g,this.registeredClass,Q.registeredClass);return null===o?C.call(this):this.isSmartPointer?UA(Q.registeredClass.instancePrototype,{ptrType:Q,ptr:o,smartPtrType:this,smartPtr:A}):UA(Q.registeredClass.instancePrototype,{ptrType:Q,ptr:o})}function JA(A){return"undefined"==typeof FinalizationRegistry?(JA=A=>A,A):(MA=new FinalizationRegistry(A=>{console.warn(A.leakWarning.stack.replace(/^Error: /,"")),cA(A.$$)}),JA=A=>{var g=A.$$;if(g.smartPtr){var I={$$:g},B=g.ptrType.registeredClass;I.leakWarning=new Error("Embind found a leaked C++ instance "+B.name+" <0x"+g.ptr.toString(16)+">.\\nWe\'ll free it automatically in this case, but this functionality is not reliable across various environments.\\nMake sure to invoke .delete() manually once you\'re done with the instance instead.\\nOriginally allocated"),"captureStackTrace"in Error&&Error.captureStackTrace(I.leakWarning,kA),MA.register(A,I,A)}return A},rA=A=>MA.unregister(A),JA(A))}function HA(){}function dA(A,g,I){if(void 0===A[g].overloadTable){var B=A[g];A[g]=function(){return A[g].overloadTable.hasOwnProperty(arguments.length)||FA("Function \'"+I+"\' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+A[g].overloadTable+")!"),A[g].overloadTable[arguments.length].apply(this,arguments)},A[g].overloadTable=[],A[g].overloadTable[B.argCount]=B}}function lA(A,g,I,B,C,Q,E,i){this.name=A,this.constructor=g,this.instancePrototype=I,this.rawDestructor=B,this.baseClass=C,this.getActualType=Q,this.upcast=E,this.downcast=i,this.pureVirtualFunctions=[]}function fA(A,g,I){for(;g!==I;)g.upcast||FA("Expected null or instance of "+I.name+", got an instance of "+g.name),A=g.upcast(A),g=g.baseClass;return A}function qA(A,g){if(null===g)return this.isReference&&FA("null is not a valid "+this.name),0;g.$$||FA(\'Cannot pass "\'+_A(g)+\'" as a \'+this.name),g.$$.ptr||FA("Cannot pass deleted object as a pointer of type "+this.name);var I=g.$$.ptrType.registeredClass;return fA(g.$$.ptr,I,this.registeredClass)}function pA(A,g){var I;if(null===g)return this.isReference&&FA("null is not a valid "+this.name),this.isSmartPointer?(I=this.rawConstructor(),null!==A&&A.push(this.rawDestructor,I),I):0;g.$$||FA(\'Cannot pass "\'+_A(g)+\'" as a \'+this.name),g.$$.ptr||FA("Cannot pass deleted object as a pointer of type "+this.name),!this.isConst&&g.$$.ptrType.isConst&&FA("Cannot convert argument of type "+(g.$$.smartPtrType?g.$$.smartPtrType.name:g.$$.ptrType.name)+" to parameter type "+this.name);var B=g.$$.ptrType.registeredClass;if(I=fA(g.$$.ptr,B,this.registeredClass),this.isSmartPointer)switch(void 0===g.$$.smartPtr&&FA("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:g.$$.smartPtrType===this?I=g.$$.smartPtr:FA("Cannot convert argument of type "+(g.$$.smartPtrType?g.$$.smartPtrType.name:g.$$.ptrType.name)+" to parameter type "+this.name);break;case 1:I=g.$$.smartPtr;break;case 2:if(g.$$.smartPtrType===this)I=g.$$.smartPtr;else{var C=g.clone();I=this.rawShare(I,zA.toHandle(function(){C.delete()})),null!==A&&A.push(this.rawDestructor,I)}break;default:FA("Unsupporting sharing policy")}return I}function uA(A,g){if(null===g)return this.isReference&&FA("null is not a valid "+this.name),0;g.$$||FA(\'Cannot pass "\'+_A(g)+\'" as a \'+this.name),g.$$.ptr||FA("Cannot pass deleted object as a pointer of type "+this.name),g.$$.ptrType.isConst&&FA("Cannot convert argument of type "+g.$$.ptrType.name+" to parameter type "+this.name);var I=g.$$.ptrType.registeredClass;return fA(g.$$.ptr,I,this.registeredClass)}function mA(A){return this.fromWireType(S[A>>2])}function TA(A,g,I,B,C,Q,E,i,o,D,a){this.name=A,this.registeredClass=g,this.isReference=I,this.isConst=B,this.isSmartPointer=C,this.pointeeType=Q,this.sharingPolicy=E,this.rawGetPointee=i,this.rawConstructor=o,this.rawShare=D,this.rawDestructor=a,C||void 0!==g.baseClass?this.toWireType=pA:B?(this.toWireType=qA,this.destructorFunction=null):(this.toWireType=uA,this.destructorFunction=null)}var jA=[];function xA(A){var g=jA[A];return g||(A>=jA.length&&(jA.length=A+1),jA[A]=g=f.get(A)),R(f.get(A)==g,"JavaScript-side Wasm function table mirror is out of date!"),g}function bA(A,g){var I=(A=EA(A)).includes("j")?function(A,g){R(A.includes("j")||A.includes("p"),"getDynCaller should only be called with i64 sigs");var I=[];return function(){return I.length=0,Object.assign(I,arguments),function(A,g,I){return A.includes("j")?function(A,g,I){R("dynCall_"+A in C,"bad function pointer type - no table for sig \'"+A+"\'"),I&&I.length?R(I.length===A.substring(1).replace(/j/g,"--").length):R(1==A.length);var B=C["dynCall_"+A];return I&&I.length?B.apply(null,[g].concat(I)):B.call(null,g)}(A,g,I):(R(xA(g),"missing table entry in dynCall: "+g),xA(g).apply(null,I))}(A,g,I)}}(A,g):xA(g);return"function"!=typeof I&&FA("unknown function pointer with signature "+A+": "+g),I}var WA=void 0;function VA(A){var g=rg(A),I=EA(g);return Mg(g),I}function XA(A,g){var I=[],B={};throw g.forEach(function A(g){B[g]||oA[g]||(DA[g]?DA[g].forEach(A):(I.push(g),B[g]=!0))}),new WA(A+": "+I.map(VA).join([", "]))}function ZA(A,g){for(var I=[],B=0;B<A;B++)I.push(h[g+4*B>>2]);return I}function OA(A,g,I,B,C){var Q=g.length;Q<2&&FA("argTypes array size mismatch! Must at least get return value and \'this\' types!");for(var E=null!==g[1]&&null!==I,i=!1,o=1;o<g.length;++o)if(null!==g[o]&&void 0===g[o].destructorFunction){i=!0;break}var D="void"!==g[0].name,a=Q-2,w=new Array(a),t=[],s=[];return function(){var I;arguments.length!==a&&FA("function "+A+" called with "+arguments.length+" arguments, expected "+a+" args!"),s.length=0,t.length=E?2:1,t[0]=C,E&&(I=g[1].toWireType(s,this),t[1]=I);for(var Q=0;Q<a;++Q)w[Q]=g[Q+2].toWireType(s,arguments[Q]),t.push(w[Q]);return function(A){if(i)!function(A){for(;A.length;){var g=A.pop();A.pop()(g)}}(s);else for(var B=E?1:2;B<g.length;B++){var C=1===B?I:w[B-2];null!==g[B].destructorFunction&&g[B].destructorFunction(C)}if(D)return g[0].fromWireType(A)}(B.apply(null,t))}}var vA=[],PA=[{},{value:void 0},{value:null},{value:!0},{value:!1}];var zA={toValue:A=>(A||FA("Cannot use deleted val. handle = "+A),PA[A].value),toHandle:A=>{switch(A){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:var g=vA.length?vA.pop():PA.length;return PA[g]={refcount:1,value:A},g}}};function _A(A){if(null===A)return"null";var g=typeof A;return"object"===g||"array"===g||"function"===g?A.toString():""+A}function $A(A,g){switch(g){case 2:return function(A){return this.fromWireType(n[A>>2])};case 3:return function(A){return this.fromWireType(L[A>>3])};default:throw new TypeError("Unknown float type: "+A)}}function Ag(A,g,I){switch(g){case 0:return I?function(A){return M[A]}:function(A){return r[A]};case 1:return I?function(A){return c[A>>1]}:function(A){return Y[A>>1]};case 2:return I?function(A){return S[A>>2]}:function(A){return h[A>>2]};default:throw new TypeError("Unknown integer type: "+A)}}var gg="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0;function Ig(A,g){R(A%2==0,"Pointer passed to UTF16ToString must be aligned to two bytes!");for(var I=A,B=I>>1,C=B+g/2;!(B>=C)&&Y[B];)++B;if((I=B<<1)-A>32&&gg)return gg.decode(r.subarray(A,I));for(var Q="",E=0;!(E>=g/2);++E){var i=c[A+2*E>>1];if(0==i)break;Q+=String.fromCharCode(i)}return Q}function Bg(A,g,I){if(R(g%2==0,"Pointer passed to stringToUTF16 must be aligned to two bytes!"),R("number"==typeof I,"stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"),void 0===I&&(I=2147483647),I<2)return 0;for(var B=g,C=(I-=2)<2*A.length?I/2:A.length,Q=0;Q<C;++Q){var E=A.charCodeAt(Q);c[g>>1]=E,g+=2}return c[g>>1]=0,g-B}function Cg(A){return 2*A.length}function Qg(A,g){R(A%4==0,"Pointer passed to UTF32ToString must be aligned to four bytes!");for(var I=0,B="";!(I>=g/4);){var C=S[A+4*I>>2];if(0==C)break;if(++I,C>=65536){var Q=C-65536;B+=String.fromCharCode(55296|Q>>10,56320|1023&Q)}else B+=String.fromCharCode(C)}return B}function Eg(A,g,I){if(R(g%4==0,"Pointer passed to stringToUTF32 must be aligned to four bytes!"),R("number"==typeof I,"stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"),void 0===I&&(I=2147483647),I<4)return 0;for(var B=g,C=B+I-4,Q=0;Q<A.length;++Q){var E=A.charCodeAt(Q);if(E>=55296&&E<=57343&&(E=65536+((1023&E)<<10)|1023&A.charCodeAt(++Q)),S[g>>2]=E,(g+=4)+4>C)break}return S[g>>2]=0,g-B}function ig(A){for(var g=0,I=0;I<A.length;++I){var B=A.charCodeAt(I);B>=55296&&B<=57343&&++I,g+=4}return g}function og(A){try{return t.grow(A-G.byteLength+65535>>>16),d(t.buffer),1}catch(g){F("emscripten_realloc_buffer: Attempted to grow heap from "+G.byteLength+" bytes to "+A+" bytes, but got error: "+g)}}var Dg={};function ag(){if(!ag.strings){var A={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:i||"./this.program"};for(var g in Dg)void 0===Dg[g]?delete A[g]:A[g]=Dg[g];var I=[];for(var g in A)I.push(g+"="+A[g]);ag.strings=I}return ag.strings}var wg=[null,[],[]];function tg(A,g){var I=wg[A];R(I),0===g||10===g?((1===A?s:F)(U(I,0)),I.length=0):I.push(g)}function sg(A){return A%4==0&&(A%100!=0||A%400==0)}var Fg=[31,29,31,30,31,30,31,31,30,31,30,31],yg=[31,28,31,30,31,30,31,31,30,31,30,31];function Ng(A,g,I,B){var C=S[B+40>>2],Q={tm_sec:S[B>>2],tm_min:S[B+4>>2],tm_hour:S[B+8>>2],tm_mday:S[B+12>>2],tm_mon:S[B+16>>2],tm_year:S[B+20>>2],tm_wday:S[B+24>>2],tm_yday:S[B+28>>2],tm_isdst:S[B+32>>2],tm_gmtoff:S[B+36>>2],tm_zone:C?k(C):""},E=k(I),i={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var o in i)E=E.replace(new RegExp(o,"g"),i[o]);var D=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],a=["January","February","March","April","May","June","July","August","September","October","November","December"];function w(A,g,I){for(var B="number"==typeof A?A.toString():A||"";B.length<g;)B=I[0]+B;return B}function t(A,g){return w(A,g,"0")}function s(A,g){function I(A){return A<0?-1:A>0?1:0}var B;return 0===(B=I(A.getFullYear()-g.getFullYear()))&&0===(B=I(A.getMonth()-g.getMonth()))&&(B=I(A.getDate()-g.getDate())),B}function F(A){switch(A.getDay()){case 0:return new Date(A.getFullYear()-1,11,29);case 1:return A;case 2:return new Date(A.getFullYear(),0,3);case 3:return new Date(A.getFullYear(),0,2);case 4:return new Date(A.getFullYear(),0,1);case 5:return new Date(A.getFullYear()-1,11,31);case 6:return new Date(A.getFullYear()-1,11,30)}}function y(A){var g=function(A,g){for(var I=new Date(A.getTime());g>0;){var B=sg(I.getFullYear()),C=I.getMonth(),Q=(B?Fg:yg)[C];if(!(g>Q-I.getDate()))return I.setDate(I.getDate()+g),I;g-=Q-I.getDate()+1,I.setDate(1),C<11?I.setMonth(C+1):(I.setMonth(0),I.setFullYear(I.getFullYear()+1))}return I}(new Date(A.tm_year+1900,0,1),A.tm_yday),I=new Date(g.getFullYear(),0,4),B=new Date(g.getFullYear()+1,0,4),C=F(I),Q=F(B);return s(C,g)<=0?s(Q,g)<=0?g.getFullYear()+1:g.getFullYear():g.getFullYear()-1}var N={"%a":function(A){return D[A.tm_wday].substring(0,3)},"%A":function(A){return D[A.tm_wday]},"%b":function(A){return a[A.tm_mon].substring(0,3)},"%B":function(A){return a[A.tm_mon]},"%C":function(A){return t((A.tm_year+1900)/100|0,2)},"%d":function(A){return t(A.tm_mday,2)},"%e":function(A){return w(A.tm_mday,2," ")},"%g":function(A){return y(A).toString().substring(2)},"%G":function(A){return y(A)},"%H":function(A){return t(A.tm_hour,2)},"%I":function(A){var g=A.tm_hour;return 0==g?g=12:g>12&&(g-=12),t(g,2)},"%j":function(A){return t(A.tm_mday+function(A,g){for(var I=0,B=0;B<=g;I+=A[B++]);return I}(sg(A.tm_year+1900)?Fg:yg,A.tm_mon-1),3)},"%m":function(A){return t(A.tm_mon+1,2)},"%M":function(A){return t(A.tm_min,2)},"%n":function(){return"\\n"},"%p":function(A){return A.tm_hour>=0&&A.tm_hour<12?"AM":"PM"},"%S":function(A){return t(A.tm_sec,2)},"%t":function(){return"\\t"},"%u":function(A){return A.tm_wday||7},"%U":function(A){var g=A.tm_yday+7-A.tm_wday;return t(Math.floor(g/7),2)},"%V":function(A){var g=Math.floor((A.tm_yday+7-(A.tm_wday+6)%7)/7);if((A.tm_wday+371-A.tm_yday-2)%7<=2&&g++,g){if(53==g){var I=(A.tm_wday+371-A.tm_yday)%7;4==I||3==I&&sg(A.tm_year)||(g=1)}}else{g=52;var B=(A.tm_wday+7-A.tm_yday-1)%7;(4==B||5==B&&sg(A.tm_year%400-1))&&g++}return t(g,2)},"%w":function(A){return A.tm_wday},"%W":function(A){var g=A.tm_yday+7-(A.tm_wday+6)%7;return t(Math.floor(g/7),2)},"%y":function(A){return(A.tm_year+1900).toString().substring(2)},"%Y":function(A){return A.tm_year+1900},"%z":function(A){var g=A.tm_gmtoff,I=g>=0;return g=(g=Math.abs(g)/60)/60*100+g%60,(I?"+":"-")+String("0000"+g).slice(-4)},"%Z":function(A){return A.tm_zone},"%%":function(){return"%"}};for(var o in E=E.replace(/%%/g,"\\0\\0"),N)E.includes(o)&&(E=E.replace(new RegExp(o,"g"),N[o](Q)));var e,G,r,c=(G=H(e=E=E.replace(/\\0\\0/g,"%"))+1,J(e,r=new Array(G),0,r.length),r);return c.length>g?0:(function(A,g){R(A.length>=0,"writeArrayToMemory array must have a length (should be an array or typed array)"),M.set(A,g)}(c,A),c.length-1)}!function(){for(var A=new Array(256),g=0;g<256;++g)A[g]=String.fromCharCode(g);QA=A}(),sA=C.BindingError=tA(Error,"BindingError"),yA=C.InternalError=tA(Error,"InternalError"),HA.prototype.isAliasOf=function(A){if(!(this instanceof HA))return!1;if(!(A instanceof HA))return!1;for(var g=this.$$.ptrType.registeredClass,I=this.$$.ptr,B=A.$$.ptrType.registeredClass,C=A.$$.ptr;g.baseClass;)I=g.upcast(I),g=g.baseClass;for(;B.baseClass;)C=B.upcast(C),B=B.baseClass;return g===B&&I===C},HA.prototype.clone=function(){if(this.$$.ptr||GA(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var A,g=JA(Object.create(Object.getPrototypeOf(this),{$$:{value:(A=this.$$,{count:A.count,deleteScheduled:A.deleteScheduled,preservePointerOnDelete:A.preservePointerOnDelete,ptr:A.ptr,ptrType:A.ptrType,smartPtr:A.smartPtr,smartPtrType:A.smartPtrType})}}));return g.$$.count.value+=1,g.$$.deleteScheduled=!1,g},HA.prototype.delete=function(){this.$$.ptr||GA(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&FA("Object already scheduled for deletion"),rA(this),cA(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)},HA.prototype.isDeleted=function(){return!this.$$.ptr},HA.prototype.deleteLater=function(){return this.$$.ptr||GA(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&FA("Object already scheduled for deletion"),hA.push(this),1===hA.length&&LA&&LA(nA),this.$$.deleteScheduled=!0,this},C.getInheritedInstanceCount=function(){return Object.keys(KA).length},C.getLiveInheritedInstances=function(){var A=[];for(var g in KA)KA.hasOwnProperty(g)&&A.push(KA[g]);return A},C.flushPendingDeletes=nA,C.setDelayFunction=function(A){LA=A,hA.length&&LA&&LA(nA)},TA.prototype.getPointee=function(A){return this.rawGetPointee&&(A=this.rawGetPointee(A)),A},TA.prototype.destructor=function(A){this.rawDestructor&&this.rawDestructor(A)},TA.prototype.argPackAdvance=8,TA.prototype.readValueFromPointer=mA,TA.prototype.deleteObject=function(A){null!==A&&A.delete()},TA.prototype.fromWireType=kA,WA=C.UnboundTypeError=tA(Error,"UnboundTypeError"),C.count_emval_handles=function(){for(var A=0,g=5;g<PA.length;++g)void 0!==PA[g]&&++A;return A},C.get_first_emval=function(){for(var A=5;A<PA.length;++A)if(void 0!==PA[A])return PA[A];return null};var eg,Rg={__cxa_allocate_exception:function(A){return Gg(A+24)+24},__cxa_throw:function(A,g,I){throw new BA(A).init(g,I),A+" - Exception catching is disabled, this exception cannot be caught. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch."},_embind_register_bigint:function(A,g,I,B,C){},_embind_register_bool:function(A,g,I,B,C){var Q=CA(I);RA(A,{name:g=EA(g),fromWireType:function(A){return!!A},toWireType:function(A,g){return g?B:C},argPackAdvance:8,readValueFromPointer:function(A){var B;if(1===I)B=M;else if(2===I)B=c;else{if(4!==I)throw new TypeError("Unknown boolean type size: "+g);B=S}return this.fromWireType(B[A>>Q])},destructorFunction:null})},_embind_register_class:function(A,g,I,B,Q,E,i,o,D,a,w,t,s){w=EA(w),E=bA(Q,E),o&&(o=bA(i,o)),a&&(a=bA(D,a)),s=bA(t,s);var F=aA(w);!function(A,g,I){C.hasOwnProperty(A)?(FA("Cannot register public name \'"+A+"\' twice"),dA(C,A,A),C.hasOwnProperty(I)&&FA("Cannot register multiple overloads of a function with the same number of arguments ("+I+")!"),C[A].overloadTable[void 0]=g):C[A]=g}(F,function(){XA("Cannot construct "+w+" due to unbound types",[B])}),eA([A,g,I],B?[B]:[],function(g){var I,Q;g=g[0],Q=B?(I=g.registeredClass).instancePrototype:HA.prototype;var i=wA(F,function(){if(Object.getPrototypeOf(this)!==D)throw new sA("Use \'new\' to construct "+w);if(void 0===t.constructor_body)throw new sA(w+" has no accessible constructor");var A=t.constructor_body[arguments.length];if(void 0===A)throw new sA("Tried to invoke ctor of "+w+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(t.constructor_body).toString()+") parameters instead!");return A.apply(this,arguments)}),D=Object.create(Q,{constructor:{value:i}});i.prototype=D;var t=new lA(w,i,D,s,I,E,o,a),y=new TA(w,t,!0,!1,!1),N=new TA(w+"*",t,!1,!1,!1),e=new TA(w+" const*",t,!1,!0,!1);return SA[A]={pointerType:N,constPointerType:e},function(A,g,I){C.hasOwnProperty(A)||NA("Replacing nonexistant public symbol"),C[A].overloadTable,C[A]=g,C[A].argCount=I}(F,i),[y,N,e]})},_embind_register_class_constructor:function(A,g,I,B,C,Q){R(g>0);var E=ZA(g,I);C=bA(B,C),eA([],[A],function(A){var I="constructor "+(A=A[0]).name;if(void 0===A.registeredClass.constructor_body&&(A.registeredClass.constructor_body=[]),void 0!==A.registeredClass.constructor_body[g-1])throw new sA("Cannot register multiple constructors with identical number of parameters ("+(g-1)+") for class \'"+A.name+"\'! Overload resolution is currently only performed using the parameter count, not actual type info!");return A.registeredClass.constructor_body[g-1]=()=>{XA("Cannot construct "+A.name+" due to unbound types",E)},eA([],E,function(B){return B.splice(1,0,null),A.registeredClass.constructor_body[g-1]=OA(I,B,null,C,Q),[]}),[]})},_embind_register_class_function:function(A,g,I,B,C,Q,E,i){var o=ZA(I,B);g=EA(g),Q=bA(C,Q),eA([],[A],function(A){var B=(A=A[0]).name+"."+g;function C(){XA("Cannot call "+B+" due to unbound types",o)}g.startsWith("@@")&&(g=Symbol[g.substring(2)]),i&&A.registeredClass.pureVirtualFunctions.push(g);var D=A.registeredClass.instancePrototype,a=D[g];return void 0===a||void 0===a.overloadTable&&a.className!==A.name&&a.argCount===I-2?(C.argCount=I-2,C.className=A.name,D[g]=C):(dA(D,g,B),D[g].overloadTable[I-2]=C),eA([],o,function(C){var i=OA(B,C,A,Q,E);return void 0===D[g].overloadTable?(i.argCount=I-2,D[g]=i):D[g].overloadTable[I-2]=i,[]}),[]})},_embind_register_emval:function(A,g){RA(A,{name:g=EA(g),fromWireType:function(A){var g=zA.toValue(A);return function(A){A>4&&0===--PA[A].refcount&&(PA[A]=void 0,vA.push(A))}(A),g},toWireType:function(A,g){return zA.toHandle(g)},argPackAdvance:8,readValueFromPointer:mA,destructorFunction:null})},_embind_register_float:function(A,g,I){var B=CA(I);RA(A,{name:g=EA(g),fromWireType:function(A){return A},toWireType:function(A,g){if("number"!=typeof g&&"boolean"!=typeof g)throw new TypeError(\'Cannot convert "\'+_A(g)+\'" to \'+this.name);return g},argPackAdvance:8,readValueFromPointer:$A(g,B),destructorFunction:null})},_embind_register_integer:function(A,g,I,B,C){g=EA(g),-1===C&&(C=4294967295);var Q=CA(I),E=A=>A;if(0===B){var i=32-8*I;E=A=>A<<i>>>i}var o=g.includes("unsigned"),D=(A,I)=>{if("number"!=typeof A&&"boolean"!=typeof A)throw new TypeError(\'Cannot convert "\'+_A(A)+\'" to \'+I);if(A<B||A>C)throw new TypeError(\'Passing a number "\'+_A(A)+\'" from JS side to C/C++ side to an argument of type "\'+g+\'", which is outside the valid range [\'+B+", "+C+"]!")};RA(A,{name:g,fromWireType:E,toWireType:o?function(A,g){return D(g,this.name),g>>>0}:function(A,g){return D(g,this.name),g},argPackAdvance:8,readValueFromPointer:Ag(g,Q,0!==B),destructorFunction:null})},_embind_register_memory_view:function(A,g,I){var B=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][g];function C(A){var g=h,I=g[A>>=2],C=g[A+1];return new B(G,C,I)}RA(A,{name:I=EA(I),fromWireType:C,argPackAdvance:8,readValueFromPointer:C},{ignoreDuplicateRegistrations:!0})},_embind_register_std_string:function(A,g){var I="std::string"===(g=EA(g));RA(A,{name:g,fromWireType:function(A){var g,B=h[A>>2],C=A+4;if(I)for(var Q=C,E=0;E<=B;++E){var i=C+E;if(E==B||0==r[i]){var o=k(Q,i-Q);void 0===g?g=o:(g+=String.fromCharCode(0),g+=o),Q=i+1}}else{var D=new Array(B);for(E=0;E<B;++E)D[E]=String.fromCharCode(r[C+E]);g=D.join("")}return Mg(A),g},toWireType:function(A,g){var B;g instanceof ArrayBuffer&&(g=new Uint8Array(g));var C="string"==typeof g;C||g instanceof Uint8Array||g instanceof Uint8ClampedArray||g instanceof Int8Array||FA("Cannot pass non-string to std::string"),B=I&&C?H(g):g.length;var Q,E,i,o=Gg(4+B+1),D=o+4;if(h[o>>2]=B,I&&C)Q=g,E=D,R("number"==typeof(i=B+1),"stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"),J(Q,r,E,i);else if(C)for(var a=0;a<B;++a){var w=g.charCodeAt(a);w>255&&(Mg(D),FA("String has UTF-16 code units that do not fit in 8 bits")),r[D+a]=w}else for(a=0;a<B;++a)r[D+a]=g[a];return null!==A&&A.push(Mg,o),o},argPackAdvance:8,readValueFromPointer:mA,destructorFunction:function(A){Mg(A)}})},_embind_register_std_wstring:function(A,g,I){var B,C,Q,E,i;I=EA(I),2===g?(B=Ig,C=Bg,E=Cg,Q=()=>Y,i=1):4===g&&(B=Qg,C=Eg,E=ig,Q=()=>h,i=2),RA(A,{name:I,fromWireType:function(A){for(var I,C=h[A>>2],E=Q(),o=A+4,D=0;D<=C;++D){var a=A+4+D*g;if(D==C||0==E[a>>i]){var w=B(o,a-o);void 0===I?I=w:(I+=String.fromCharCode(0),I+=w),o=a+g}}return Mg(A),I},toWireType:function(A,B){"string"!=typeof B&&FA("Cannot pass non-string to C++ string type "+I);var Q=E(B),o=Gg(4+Q+g);return h[o>>2]=Q>>i,C(B,o+4,Q+g),null!==A&&A.push(Mg,o),o},argPackAdvance:8,readValueFromPointer:mA,destructorFunction:function(A){Mg(A)}})},_embind_register_void:function(A,g){RA(A,{isVoid:!0,name:g=EA(g),argPackAdvance:0,fromWireType:function(){},toWireType:function(A,g){}})},abort:function(){O("native code called abort()")},emscripten_memcpy_big:function(A,g,I){r.copyWithin(A,g,g+I)},emscripten_resize_heap:function(A){var g=r.length;R((A>>>=0)>g);var I=2147483648;if(A>I)return F("Cannot enlarge memory, asked to go up to "+A+" bytes, but the limit is "+I+" bytes!"),!1;let B=(A,g)=>A+(g-A%g)%g;for(var C=1;C<=4;C*=2){var Q=g*(1+.2/C);Q=Math.min(Q,A+100663296);var E=Math.min(I,B(Math.max(A,Q),65536));if(og(E))return!0}return F("Failed to grow the heap from "+g+" bytes to "+E+" bytes, not enough memory!"),!1},environ_get:function(A,g){var I=0;return ag().forEach(function(B,C){var Q=g+I;h[A+4*C>>2]=Q,function(A,g){for(var I=0;I<A.length;++I)R(A.charCodeAt(I)===(255&A.charCodeAt(I))),M[0|g++]=A.charCodeAt(I);M[0|g]=0}(B,Q),I+=B.length+1}),0},environ_sizes_get:function(A,g){var I=ag();h[A>>2]=I.length;var B=0;return I.forEach(function(A){B+=A.length+1}),h[g>>2]=B,0},fd_close:function(A){O("fd_close called without SYSCALLS_REQUIRE_FILESYSTEM")},fd_seek:function(A,g,I,B,C){return 70},fd_write:function(A,g,I,B){for(var C=0,Q=0;Q<I;Q++){var E=h[g>>2],i=h[g+4>>2];g+=8;for(var o=0;o<i;o++)tg(A,r[E+o]);C+=i}return h[B>>2]=C,0},strftime_l:function(A,g,I,B){return Ng(A,g,I,B)}},Gg=(function(){var A,g={env:Rg,wasi_snapshot_preview1:Rg};function I(A,g){var I,B=A.exports;C.asm=B,R(t=C.asm.memory,"memory not found in wasm exports"),d(t.buffer),R(f=C.asm.__indirect_function_table,"table not found in wasm exports"),I=C.asm.__wasm_call_ctors,m.unshift(I),function(A){if(W--,C.monitorRunDependencies&&C.monitorRunDependencies(W),A?(R(Z[A]),delete Z[A]):F("warning: run dependency removed without ID"),0==W&&(null!==V&&(clearInterval(V),V=null),X)){var g=X;X=null,g()}}("wasm-instantiate")}A="wasm-instantiate",W++,C.monitorRunDependencies&&C.monitorRunDependencies(W),A?(R(!Z[A]),Z[A]=1,null===V&&"undefined"!=typeof setInterval&&(V=setInterval(function(){if(e)return clearInterval(V),void(V=null);var A=!1;for(var g in Z)A||(A=!0,F("still waiting on run dependencies:")),F("dependency: "+g);A&&F("(end of list)")},1e4))):F("warning: run dependency added without ID");var Q=C;function E(A){R(C===Q,"the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"),Q=null,I(A.instance)}function i(A){return(w||"function"!=typeof fetch?Promise.resolve().then(function(){return AA(v)}):fetch(v,{credentials:"same-origin"}).then(function(A){if(!A.ok)throw"failed to load wasm binary file at \'"+v+"\'";return A.arrayBuffer()}).catch(function(){return AA(v)})).then(function(A){return WebAssembly.instantiate(A,g)}).then(function(A){return A}).then(A,function(A){F("failed to asynchronously prepare wasm: "+A),v.startsWith("file://")&&F("warning: Loading from a file URI ("+v+") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing"),O(A)})}if(C.instantiateWasm)try{return C.instantiateWasm(g,I)}catch(A){return F("Module.instantiateWasm callback failed with error: "+A),!1}(w||"function"!=typeof WebAssembly.instantiateStreaming||_(v)||"function"!=typeof fetch?i(E):fetch(v,{credentials:"same-origin"}).then(function(A){return WebAssembly.instantiateStreaming(A,g).then(E,function(A){return F("wasm streaming compile failed: "+A),F("falling back to ArrayBuffer instantiation"),i(E)})})).catch(B)}(),C.___wasm_call_ctors=$("__wasm_call_ctors"),C._malloc=$("malloc")),Mg=C._free=$("free"),rg=C.___getTypeName=$("__getTypeName"),cg=(C.__embind_initialize_bindings=$("_embind_initialize_bindings"),C.___errno_location=$("__errno_location"),C._fflush=$("fflush"),C._emscripten_stack_init=function(){return(cg=C._emscripten_stack_init=C.asm.emscripten_stack_init).apply(null,arguments)}),Yg=(C._emscripten_stack_get_free=function(){return(C._emscripten_stack_get_free=C.asm.emscripten_stack_get_free).apply(null,arguments)},C._emscripten_stack_get_base=function(){return(C._emscripten_stack_get_base=C.asm.emscripten_stack_get_base).apply(null,arguments)},C._emscripten_stack_get_end=function(){return(Yg=C._emscripten_stack_get_end=C.asm.emscripten_stack_get_end).apply(null,arguments)}),Sg=(C.stackSave=$("stackSave"),C.stackRestore=$("stackRestore"),C.stackAlloc=$("stackAlloc"),C.___cxa_is_pointer_type=$("__cxa_is_pointer_type"));function hg(A){function g(){eg||(eg=!0,C.calledRun=!0,e||(R(!j),j=!0,p(),gA(m),I(C),C.onRuntimeInitialized&&C.onRuntimeInitialized(),R(!C._main,\'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]\'),function(){if(p(),C.postRun)for("function"==typeof C.postRun&&(C.postRun=[C.postRun]);C.postRun.length;)b(C.postRun.shift());gA(T)}()))}var B;A=A||E,W>0||(cg(),R(!(3&(B=Yg()))),h[B>>2]=34821223,h[B+4>>2]=2310721022,h[0]=1668509029,function(){if(C.preRun)for("function"==typeof C.preRun&&(C.preRun=[C.preRun]);C.preRun.length;)x(C.preRun.shift());gA(u)}(),W>0||(C.setStatus?(C.setStatus("Running..."),setTimeout(function(){setTimeout(function(){C.setStatus("")},1),g()},1)):g(),p()))}if(C.dynCall_viijii=$("dynCall_viijii"),C.dynCall_ji=$("dynCall_ji"),C.dynCall_jiji=$("dynCall_jiji"),C.dynCall_iiiiij=$("dynCall_iiiiij"),C.dynCall_iiiiijj=$("dynCall_iiiiijj"),C.dynCall_iiiiiijj=$("dynCall_iiiiiijj"),["run","UTF8ArrayToString","UTF8ToString","stringToUTF8Array","stringToUTF8","lengthBytesUTF8","addOnPreRun","addOnInit","addOnPreMain","addOnExit","addOnPostRun","addRunDependency","removeRunDependency","FS_createFolder","FS_createPath","FS_createDataFile","FS_createPreloadedFile","FS_createLazyFile","FS_createLink","FS_createDevice","FS_unlink","getLEB","getFunctionTables","alignFunctionTables","registerFunctions","prettyPrint","getCompilerSetting","print","printErr","callMain","abort","keepRuntimeAlive","wasmMemory","stackAlloc","stackSave","stackRestore","getTempRet0","setTempRet0","writeStackCookie","checkStackCookie","ptrToString","zeroMemory","stringToNewUTF8","exitJS","getHeapMax","emscripten_realloc_buffer","ENV","ERRNO_CODES","ERRNO_MESSAGES","setErrNo","inetPton4","inetNtop4","inetPton6","inetNtop6","readSockaddr","writeSockaddr","DNS","getHostByName","Protocols","Sockets","getRandomDevice","warnOnce","traverseStack","UNWIND_CACHE","convertPCtoSourceLocation","readAsmConstArgsArray","readAsmConstArgs","mainThreadEM_ASM","jstoi_q","jstoi_s","getExecutableName","listenOnce","autoResumeAudioContext","dynCallLegacy","getDynCaller","dynCall","handleException","runtimeKeepalivePush","runtimeKeepalivePop","callUserCallback","maybeExit","safeSetTimeout","asmjsMangle","asyncLoad","alignMemory","mmapAlloc","writeI53ToI64","writeI53ToI64Clamped","writeI53ToI64Signaling","writeI53ToU64Clamped","writeI53ToU64Signaling","readI53FromI64","readI53FromU64","convertI32PairToI53","convertI32PairToI53Checked","convertU32PairToI53","getCFunc","ccall","cwrap","uleb128Encode","sigToWasmTypes","convertJsFunctionToWasm","freeTableIndexes","functionsInTableMap","getEmptyTableSlot","updateTableMap","addFunction","removeFunction","reallyNegative","unSign","strLen","reSign","formatString","setValue","getValue","PATH","PATH_FS","intArrayFromString","intArrayToString","AsciiToString","stringToAscii","UTF16Decoder","UTF16ToString","stringToUTF16","lengthBytesUTF16","UTF32ToString","stringToUTF32","lengthBytesUTF32","allocateUTF8","allocateUTF8OnStack","writeStringToMemory","writeArrayToMemory","writeAsciiToMemory","SYSCALLS","getSocketFromFD","getSocketAddress","JSEvents","registerKeyEventCallback","specialHTMLTargets","maybeCStringToJsString","findEventTarget","findCanvasEventTarget","getBoundingClientRect","fillMouseEventData","registerMouseEventCallback","registerWheelEventCallback","registerUiEventCallback","registerFocusEventCallback","fillDeviceOrientationEventData","registerDeviceOrientationEventCallback","fillDeviceMotionEventData","registerDeviceMotionEventCallback","screenOrientation","fillOrientationChangeEventData","registerOrientationChangeEventCallback","fillFullscreenChangeEventData","registerFullscreenChangeEventCallback","JSEvents_requestFullscreen","JSEvents_resizeCanvasForFullscreen","registerRestoreOldStyle","hideEverythingExceptGivenElement","restoreHiddenElements","setLetterbox","currentFullscreenStrategy","restoreOldWindowedStyle","softFullscreenResizeWebGLRenderTarget","doRequestFullscreen","fillPointerlockChangeEventData","registerPointerlockChangeEventCallback","registerPointerlockErrorEventCallback","requestPointerLock","fillVisibilityChangeEventData","registerVisibilityChangeEventCallback","registerTouchEventCallback","fillGamepadEventData","registerGamepadEventCallback","registerBeforeUnloadEventCallback","fillBatteryEventData","battery","registerBatteryEventCallback","setCanvasElementSize","getCanvasElementSize","demangle","demangleAll","jsStackTrace","stackTrace","ExitStatus","getEnvStrings","checkWasiClock","flush_NO_FILESYSTEM","dlopenMissingError","setImmediateWrapped","clearImmediateWrapped","polyfillSetImmediate","uncaughtExceptionCount","exceptionLast","exceptionCaught","ExceptionInfo","exception_addRef","exception_decRef","Browser","setMainLoop","wget","FS","MEMFS","TTY","PIPEFS","SOCKFS","_setNetworkCallback","tempFixedLengthArray","miniTempWebGLFloatBuffers","heapObjectForWebGLType","heapAccessShiftForWebGLHeap","GL","emscriptenWebGLGet","computeUnpackAlignedImageSize","emscriptenWebGLGetTexPixelData","emscriptenWebGLGetUniform","webglGetUniformLocation","webglPrepareUniformLocationsBeforeFirstUse","webglGetLeftBracePos","emscriptenWebGLGetVertexAttrib","writeGLArray","AL","SDL_unicode","SDL_ttfContext","SDL_audio","SDL","SDL_gfx","GLUT","EGL","GLFW_Window","GLFW","GLEW","IDBStore","runAndAbortIfError","ALLOC_NORMAL","ALLOC_STACK","allocate","InternalError","BindingError","UnboundTypeError","PureVirtualError","init_embind","throwInternalError","throwBindingError","throwUnboundTypeError","ensureOverloadTable","exposePublicSymbol","replacePublicSymbol","extendError","createNamedFunction","embindRepr","registeredInstances","getBasestPointer","registerInheritedInstance","unregisterInheritedInstance","getInheritedInstance","getInheritedInstanceCount","getLiveInheritedInstances","registeredTypes","awaitingDependencies","typeDependencies","registeredPointers","registerType","whenDependentTypesAreResolved","embind_charCodes","embind_init_charCodes","readLatin1String","getTypeName","heap32VectorToArray","requireRegisteredType","getShiftFromSize","integerReadValueFromPointer","enumReadValueFromPointer","floatReadValueFromPointer","simpleReadValueFromPointer","runDestructors","new_","craftInvokerFunction","embind__requireFunction","tupleRegistrations","structRegistrations","genericPointerToWireType","constNoSmartPtrRawPointerToWireType","nonConstNoSmartPtrRawPointerToWireType","init_RegisteredPointer","RegisteredPointer","RegisteredPointer_getPointee","RegisteredPointer_destructor","RegisteredPointer_deleteObject","RegisteredPointer_fromWireType","runDestructor","releaseClassHandle","finalizationRegistry","detachFinalizer_deps","detachFinalizer","attachFinalizer","makeClassHandle","init_ClassHandle","ClassHandle","ClassHandle_isAliasOf","throwInstanceAlreadyDeleted","ClassHandle_clone","ClassHandle_delete","deletionQueue","ClassHandle_isDeleted","ClassHandle_deleteLater","flushPendingDeletes","delayFunction","setDelayFunction","RegisteredClass","shallowCopyInternalPointer","downcastPointer","upcastPointer","validateThis","char_0","char_9","makeLegalFunctionName","emval_handle_array","emval_free_list","emval_symbols","init_emval","count_emval_handles","get_first_emval","getStringOrSymbol","Emval","emval_newers","craftEmvalAllocator","emval_get_global","emval_lookupTypes","emval_allocateDestructors","emval_methodCallers","emval_addMethodCaller","emval_registeredMethods"].forEach(function(A){Object.getOwnPropertyDescriptor(C,A)||Object.defineProperty(C,A,{configurable:!0,get:function(){var g="\'"+A+"\' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";N(A)&&(g+=". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"),O(g)}})}),["ptrToString","zeroMemory","stringToNewUTF8","exitJS","setErrNo","inetPton4","inetNtop4","inetPton6","inetNtop6","readSockaddr","writeSockaddr","getHostByName","getRandomDevice","traverseStack","convertPCtoSourceLocation","readAsmConstArgs","mainThreadEM_ASM","jstoi_q","jstoi_s","listenOnce","autoResumeAudioContext","runtimeKeepalivePush","runtimeKeepalivePop","callUserCallback","maybeExit","safeSetTimeout","asmjsMangle","asyncLoad","alignMemory","mmapAlloc","writeI53ToI64","writeI53ToI64Clamped","writeI53ToI64Signaling","writeI53ToU64Clamped","writeI53ToU64Signaling","readI53FromI64","readI53FromU64","convertI32PairToI53","convertU32PairToI53","reallyNegative","unSign","strLen","reSign","formatString","getSocketFromFD","getSocketAddress","registerKeyEventCallback","maybeCStringToJsString","findEventTarget","findCanvasEventTarget","getBoundingClientRect","fillMouseEventData","registerMouseEventCallback","registerWheelEventCallback","registerUiEventCallback","registerFocusEventCallback","fillDeviceOrientationEventData","registerDeviceOrientationEventCallback","fillDeviceMotionEventData","registerDeviceMotionEventCallback","screenOrientation","fillOrientationChangeEventData","registerOrientationChangeEventCallback","fillFullscreenChangeEventData","registerFullscreenChangeEventCallback","JSEvents_requestFullscreen","JSEvents_resizeCanvasForFullscreen","registerRestoreOldStyle","hideEverythingExceptGivenElement","restoreHiddenElements","setLetterbox","softFullscreenResizeWebGLRenderTarget","doRequestFullscreen","fillPointerlockChangeEventData","registerPointerlockChangeEventCallback","registerPointerlockErrorEventCallback","requestPointerLock","fillVisibilityChangeEventData","registerVisibilityChangeEventCallback","registerTouchEventCallback","fillGamepadEventData","registerGamepadEventCallback","registerBeforeUnloadEventCallback","fillBatteryEventData","battery","registerBatteryEventCallback","setCanvasElementSize","getCanvasElementSize","checkWasiClock","setImmediateWrapped","clearImmediateWrapped","polyfillSetImmediate","exception_addRef","exception_decRef","setMainLoop","_setNetworkCallback","heapObjectForWebGLType","heapAccessShiftForWebGLHeap","emscriptenWebGLGet","computeUnpackAlignedImageSize","emscriptenWebGLGetTexPixelData","emscriptenWebGLGetUniform","webglGetUniformLocation","webglPrepareUniformLocationsBeforeFirstUse","webglGetLeftBracePos","emscriptenWebGLGetVertexAttrib","writeGLArray","SDL_unicode","SDL_ttfContext","SDL_audio","GLFW_Window","runAndAbortIfError","registerInheritedInstance","unregisterInheritedInstance","requireRegisteredType","enumReadValueFromPointer","validateThis","getStringOrSymbol","craftEmvalAllocator","emval_get_global","emval_lookupTypes","emval_allocateDestructors","emval_addMethodCaller"].forEach(function(A){"undefined"==typeof globalThis||Object.getOwnPropertyDescriptor(globalThis,A)||Object.defineProperty(globalThis,A,{configurable:!0,get:function(){var g="`"+A+"` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line";N(A)&&(g+=". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"),IA(g)}})}),X=function A(){eg||hg(),eg||(X=A)},C.preInit)for("function"==typeof C.preInit&&(C.preInit=[C.preInit]);C.preInit.length>0;)C.preInit.pop()();return hg(),A.ready});A.exports=I}},g={};function I(B){var C=g[B];if(void 0!==C)return C.exports;var Q=g[B]={exports:{}};return A[B](Q,Q.exports,I),Q.exports}I.n=A=>{var g=A&&A.__esModule?()=>A.default:()=>A;return I.d(g,{a:g}),g},I.d=(A,g)=>{for(var B in g)I.o(g,B)&&!I.o(A,B)&&Object.defineProperty(A,B,{enumerable:!0,get:g[B]})},I.o=(A,g)=>Object.prototype.hasOwnProperty.call(A,g),(()=>{"use strict";var A=I(962),g=I.n(A),B=null;function C(A){var g=A<=5?15:16,I=null;switch(A){case 2:I=20;break;case 3:case 5:I=28;break;case 7:case 8:case 10:I=30;break;default:I=null}return{intensity:12,classification:g,rgb:I}}onmessage=function(A){var I,Q,E=A.data||{};(I=E.buffer,Q=E.nodeMin||[0,0,0],function(){if(!B){var A=function(A){var g=A.indexOf(",");if(-1===g)throw new Error("Invalid laz-perf wasm data URL");for(var I=A.slice(g+1),B=atob(I),C=new Uint8Array(B.length),Q=0;Q<B.length;Q++)C[Q]=B.charCodeAt(Q);return C}("data:application/wasm;base64,AGFzbQEAAAABwgM2YAF/AX9gAX8AYAJ/fwBgAn9/AX9gA39/fwF/YAN/f38AYAZ/f39/f38Bf2AEf39/fwF/YAV/f39/fwF/YAR/f39/AGAFf39/f38AYAZ/f39/f38AYAAAYAh/f39/f39/fwF/YAd/f39/f39/AX9gAAF/YAF/AX5gBX9+fn5+AGAHf39/f39/fwBgBX9/fn9/AGAFf39/f34Bf2ADf35/AX5gCH9/f39/f39/AGAEf35+fwBgCn9/f39/f39/f38Bf2AGf39/f35+AX9gB39/f39/fn4Bf2ADf39+AX9gAn9+AGAEf39/fwF+YAx/f39/f39/f39/f38Bf2AFf39/f3wBf2ALf39/f39/f39/f38Bf2AKf39/f39/f39/fwBgD39/f39/f39/f39/f39/fwBgA39/fwF+YA1/f39/f39/f39/f39/AGAEf39/fgF/YAJ/fABgBH5+fn4Bf2ADfn5+AX9gAX8BfGACf38BfmACfn4BfWACfn4BfGADf39+AGACfH8BfGACfn8Bf2AGf3x/f39/AX9gBH9/f34BfmADf39/AX1gA39/fwF8YAl/f39/f39/f38Bf2AEf39+fgACwAUXA2VudhZfZW1iaW5kX3JlZ2lzdGVyX2NsYXNzACQDZW52Il9lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfY29uc3RydWN0b3IACwNlbnYfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19mdW5jdGlvbgAWA2VudhhfX2N4YV9hbGxvY2F0ZV9leGNlcHRpb24AAANlbnYLX19jeGFfdGhyb3cABQNlbnYVX2VtYmluZF9yZWdpc3Rlcl92b2lkAAIDZW52FV9lbWJpbmRfcmVnaXN0ZXJfYm9vbAAKA2VudhhfZW1iaW5kX3JlZ2lzdGVyX2ludGVnZXIACgNlbnYWX2VtYmluZF9yZWdpc3Rlcl9mbG9hdAAFA2VudhtfZW1iaW5kX3JlZ2lzdGVyX3N0ZF9zdHJpbmcAAgNlbnYcX2VtYmluZF9yZWdpc3Rlcl9zdGRfd3N0cmluZwAFA2VudhZfZW1iaW5kX3JlZ2lzdGVyX2VtdmFsAAIDZW52HF9lbWJpbmRfcmVnaXN0ZXJfbWVtb3J5X3ZpZXcABQNlbnYVZW1zY3JpcHRlbl9tZW1jcHlfYmlnAAUD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GkH0GkESIABBABACQQgQpAQiAEEANgIEIABBEzYCAEGQGkGpCUEDQZwdQfwZQRQgAEEAEAILBQBB9BYLQAECfyAABEACQCAAKAIEIgFFDQAgASABKAIEIgJBAWs2AgQgAg0AIAEgASgCACgCCBEBACABEKMECyAAEKMBCwsHACAAEQ8ACxIBAX9BCBCkBCIAQgA3AgAgAAv/NAIOfwJ+QQgQpAQhDiMAQSBrIgwkAEGIBBCkBCIEQQA2AgQgBCAEQRBqIgc2AgwgBCAHNgIIIAdCADcCBCAHQcyCzbIENgIAIAdBgQY7ARggB0IANwIMIAdBADYCFCAHQRpqQQBBzwAQngEaIAdBADsBggEgB0IANwF6IAdCADcBciAHQgA3AWogB0IANwOIASAHQgA3A5ABIAdCADcDmAEgB0IANwOgASAHQgA3A6gBIAdCADcDsAEgB0L/////////9/8ANwPgASAHQv////////93NwPYASAHQv/////////3/wA3A9ABIAdC/////////3c3A8gBIAdC//////////f/ADcDwAEgB0L/////////dzcDuAEgBEGQAmpBAEGAARCeARogBEEANgKIAiAEQgA3A4ACIARCADcD+AEgBEIANwKUAyAEQQA6AJADIARBBDoAKSAEQgA3A8gDIARBADYC0AMgBEHkwQA2AqADIARCADcC3AMgBEEANgLkAyAEQYDCADYC2AMgBEIANwPwAyAEQQA2AugDIARCADcD+AMgBEIANwOABCAOIAQ2AgBBkAEQpAQhBCAMQgA3AxggDEIANwMQIARB9MkANgIAIARBBGoQvQMgBEIANwIYIARCADcCECAEQgA3AgggBEIANwMgIARB4Dw2AgAgBEIANwMoIAwgDCkDGDcDCCAMIAwpAxA3AwAgBCAMKQMANwMgIAQgDCkDCDcDKCAEIAE2AjAgBCABNgIYIAQgASACaiICNgIQIAQgATYCDCAEIAE2AgggBCACNgIcIAQgATYCFCAEQUBrIgFBzMoANgIAIARBuMoANgI4IARBADYCPCABQQA2AhQgASAENgIYIAFBADYCDCABQoKggIDgADcCBCABIARFNgIQIAFBIGpBAEEoEJ4BGiABQRxqEL0DIARCgICAgHA3A4gBIA4gBDYCBCAOKAIAIgggBEE4aiIBNgIAQQQQpAQgARAv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CwJAAn8gBSgCsAEiCiAFQaABakYEQCAFQaABaiEKIAUoAqABQRBqDAELIApFDQEgCigCAEEUagshASAKIAEoAgARAQALIAcQMBoLIAVB8AFqJAAMAQtBCBADIAVBIGpBoxUQchBzQcw9QSAQBAALCyAIKAIAIgEgASgCAEEMaygCAGpBABDjASAIKAIAIQEgCSAIKAIINQJgIhFCCHwgESAILQCQAxsiETcDSCAJIBE3AwggCUIANwNAIAlCADcDACABIAkQzQECQAJ/IAgoAgQoAgAiCygCCCIBIAsoAgQiA2siB0H//z9NBEBBgIDAACAHayIPIAsoAgwiAiABa00EQCABQQAgDxCeASAPagwCCyACIANrIgRBAXQiAkGAgMAAIAJBgIDAAEsbQf////8HIARB/////wNJGyIEEKQEIg0gB2pBACAPEJ4BGiANQYCAQGshAiABIANHBEAgDSADIAcQnAEaCyALIAQgDWo2AgwgCyACNgIIIAsgDTYCBCADRQ0CIAMQowEgCygCCCECDAILIAEhAiAHQYCAwABGDQEgA0GAgEBrCyECIAsgAjYCCAsgCyACIAsoAgRrNgIQQQELIQEgEARAIBAQowELIAlBoAFqJAAgAQwCCxAzAAtBCBADIAlB8ABqQfITEHIQc0HMPUEgEAQAC0UEQEEIEAMgDEEQakH/DRByEHNBzD1BIBAEAAsgDEEgaiQAQRAQpAQiASAONgIMIAFB4Bc2AgAgAUIANwIEIAAgDjYCACAAKAIEIQIgACABNgIEAkAgAkUNACACIAIoAgQiAEEBazYCBCAADQAgAiACKAIAKAIIEQEAIAIQowQLCzkBAX8gASAAKAIEIgRBAXVqIQEgACgCACEAIAEgAiADIARBAXEEfyABKAIAIABqKAIABSAACxEFAAsQACAAKAIAKAIAQRBqLwFqCzUBAX8gASAAKAIEIgJBAXVqIQEgACgCACEAIAEgAkEBcQR/IAEoAgAgAGooAgAFIAALEQAACxAAIAAoAgAoAgBBEGotAGgL+QQCBH8BfgJAIAAoAgAoAgAhAyMAQUBqIgAkAAJAAkAgAy0AkANFBEAgACADKAIEKAIANgIsIABBADYCKCAAQR82AiQgAEH8HTYCICAAIABBIGo2AjAgAygCCC8BaiEDIAAgATYCPCAAIAM2AjggACgCMCIBRQ0CIAEgAEE8aiAAQThqIAEoAgAoAhgRBQACfyAAKAIwIgEgAEEgakYEQCAAQSBqIQEgACgCIEEQagwBCyABRQ0CIAEoAgBBFGoLIQMgASADKAIAEQEADAELAkAgAygClAMiAgRAIAMoAugDKQMAIAM1AuwDUg0BCyAAQQhqIgIgAygCBCgCADYCDCACQQA2AgggAkEfNgIEIAJB/B02AgAgAiACNgIQIABBIGogAiADKAIIIgItAGgCQCACLQBoQQ9xIgVBCEsNAEHPAyAFdkEBcUUNACAFQQJ0QdAdaigCACACLwFqaiEECyAEEGAgACkDICEGIABCADcDICADKAKYAyECIAMgBjcClAMCQCACRQ0AIAIgAigCBCIEQQFrNgIEIAQNACACIAIoAgAoAggRAQAgAhCjBAsCQCAAKAIkIgJFDQAgAiACKAIEIgRBAWs2AgQgBA0AIAIgAigCACgCCBEBACACEKMECwJAAn8gACgCGCICIABBCGpGBEAgAEEIaiECIAAoAghBEGoMAQsgAkUNASACKAIAQRRqCyEEIAIgBCgCABEBAAsgA0EANgLsAyADIAMoAugDIgJBEGogAygC8AMgAhs2AugDIAMoApQDIQILIAIgASACKAIAKAIAEQMAGiADIAMoAuwDQQFqNgLsAwsgAEFAayQADAELEHQACws3AQF/IAEgACgCBCIDQQF1aiEBIAAoAgAhACABIAIgA0EBcQR/IAEoAgAgAGooAgAFIAALEQIACzoBAX8CfgJAIAAoAgAoAgAiASgCCCIALQAYQQFNBEAgAC0AGUEESQ0BCyABKQOQAgwBCyAANQJsC6cLBQBBkBoLlQQCBH8BfiABQQ9xIgRBCE0EfyAEQQJ0QawdaigCAAVBAAshB0EEEKQEIQYjAEFAaiIEJABBDBCkBCIFQgA3AgAgBiAFNgIAIAUgAzYCCCAEQQA2AjAgBCAFNgI0IAQgBTYCFCAEQesANgIsIARB9D02AiggBEH0PTYCCCAEIAQpAiw3AgwgBCAEQShqNgI4IAQgBEEIaiIDNgIYIARBIGogAyABIAIgB2sQYCAGKAIAIQIgBCkDICEIIARCADcDICACKAIEIQEgAiAINwIAAkAgAUUNACABIAEoAgQiAkEBazYCBCACDQAgASABKAIAKAIIEQEAIAEQowQLAkAgBCgCJCIBRQ0AIAEgASgCBCICQQFrNgIEIAINACABIAEoAgAoAggRAQAgARCjBAsCQAJ/IAQoAhgiASAEQQhqRgRAIARBCGohASAEKAIIQRBqDAELIAFFDQEgASgCAEEUagshAiABIAIoAgARAQALAkACfyAEKAI4IgEgBEEoakYEQCAEQShqIQEgBCgCKEEQagwBCyABRQ0BIAEoAgBBFGoLIQIgASACKAIAEQEACyAEQUBrJAAgBiEBQRAQpAQiAiABNgIMIAJBhBs2AgAgAkIANwIEIAAgATYCACAAKAIEIQEgACACNgIEAkAgAUUNACABIAEoAgQiAEEBazYCBCAADQAgASABKAIAKAIIEQEAIAEQowQLCzsBAX8gASAAKAIEIgVBAXVqIQEgACgCACEAIAEgAiADIAQgBUEBcQR/IAEoAgAgAGooAgAFIAALEQkACx0AIAAoAgAoAgAoAgAiACABIAAoAgAoAgARAwAaCwcAIAAQowELvAIBBH8gACgCDCIEBEAgBCgCBCEAIARBADYCBCAABEAgAEE4ahC8ARogABCwARCjAQsgBCgCACEAIARBADYCACAABEAgACgC/AMiAgRAIAIhAyACIAAoAoAEIgFHBEADQCABQQ1rLAAAQQBIBEAgAUEYaygCABCjAQsgAUEwayEDIAFBJWssAABBAEgEQCADKAIAEKMBCyADIgEgAkcNAAsgACgC/AMhAwsgACACNgKABCADEKMBCyAAKALwAyIBBEAgACABNgL0AyABEKMBCyAAQdgDahCUARogAEGgA2oQjwEaAkAgACgCmAMiAUUNACABIAEoAgQiAkEBazYCBCACDQAgASABKAIAKAIIEQEAIAEQowQLIAAoAgQhASAAQQA2AgQgAQRAIAEQMBCjAQsgABCjAQsgBBCjAQsLEwAgAEEMakEAIAEoAgRBjBlGGwtdAQN/IAAoAgwiAQRAIAEoAgAhAiABQQA2AgAgAgRAAkAgAigCBCIARQ0AIAAgACgCBCIDQQFrNgIEIAMNACAAIAAoAgAoAggRAQAgABCjBAsgAhCjAQsgARCjAQsLEwAgAEEMakEAIAEoAgRBuBxGGwvUAwEBfyABQeMBEKQEQQBB4wEQngEiAUHjARDKASAAIAEoAAA2AgAgACABLwAEOwEEIAAgAS8ABjsBBiAAIAEpAAg3AAggACABKQAQNwAQIAAgAS0AGDoAGCAAIAEtABkiAjoAGQJAIAJBAUsNACAAQQA7AQYgAg0AIABBADsBBAsgACABKQAaNwAaIAAgASkAMjcAMiAAIAEpACo3ACogACABKQAiNwAiIAAgASkAOjcAOiAAIAEpAEI3AEIgACABKQBKNwBKIAAgASkAUjcAUiAAIAEvAFo7AVogACABLwBcOwFcIAAgAS8AXjsBXiAAIAEoAGA2AmAgACABKABkNgJkIAAgAS0AaDoAaCAAIAEvAGk7AWogACABKABrNgJsIAAgASkAbzcAcCAAIAEpAHc3AHggACABKAB/NgCAASAAIAEpAIMBNwOIASAAIAEpAIsBNwOQASAAIAEpAJMBNwOYASAAIAEpAJsBNwOgASAAIAEpAKMBNwOoASAAIAEpAKsBNwOwASAAIAEpALMBNwO4ASAAIAEpALsBNwPAASAAIAEpAMMBNwPIASAAIAEpAMsBNwPQASAAIAEpANMBNwPYASAAIAEpANsBNwPgASABEKMBC2EBAn9BFBCkBCICQgA3AgQgAiABNgIAIAJBADYCDEGAgMAAEKQEQQBBgIDAABCeASEBIAJBgIDAADYCECACIAFBgIBAayIDNgIMIAIgAzYCCCACIAE2AgQgACACNgIAIAALNAECfyAAKAIAIQEgAEEANgIAIAEEQCABKAIEIgIEQCABIAI2AgggAhCjAQsgARCjAQsgAAveAQEDfyACQQFGBEAgACgCECICIAAoAgggACgCBCIDa08EQCAAEDIaIAAoAgQhAyAAKAIQIQILIAAgAkEBajYCECABIAIgA2otAAA6AAAPCwJAIAIgACgCCCAAKAIQIgMgACgCBGoiBWsiBE0EQCAAIAIEfyABIAUgAhCdASAAKAIQBSADCyACajYCEAwBCwNAIAQgAiACIARLGyIDBEAgASAAKAIEIAAoAhBqIAMQnQELIAAgACgCECADajYCECACIARNDQEgASADaiEBIAIgA2shAiAAEDIhBAwACwALC6YCAQd/IwBBEGsiByQAIABBADYCECAAKAIAIAAoAgQiASAAKAIIIAFrEMoBAkAgACgCACgCBCIBBEACQCAAKAIIIgIgACgCBCIDayIEIAFJBEAgASAEayIGIAAoAgwiBSACa00EQCAAIAJBACAGEJ4BIAZqNgIIDAILIAFBAEgNAyAF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QQxqCyADNgIAIAdBADoAyAMMAQsgAigCBCEGIAMgBEoEQCACIAQ2AgQgAiAGNgIAIAIoAgwhBCADIAIoAhAiB0oEQCACIAM2AhAgAiAHNgIMIAIgBDYCCAwCCyADIARKBEAgAiADNgIMIAIgBDYCCAwCCyACIAM2AggMAQsgAyAGTAR/IAIFIAIgBjYCACACQQRqCyADNgIAIAdBAToAyAMLIAAgBUECdGoiBEG0BmooAgAhBSAAQdAhaiAAKAKMHyAAQfQhaigCACAAKAKAISAAKAKwIGoiAkEBdkH+////B3FBEiACQSRJGyAKckEsbGoQeiEDIAAgAEHoIWooAgAiAkEAQQAgAiACIAMgBWoiAksbayACQQBIGyACaiICNgIIIAQgAjYCtAYgASAAKAIANgAAIAEgACgCBDYABCABIAAoAgg2AAggASAALwEMOwAMIAEgAC0ADjoADiABIAAtAA86AA8gASAALQAQOgAQIAEgAC0AEToAESABIAAvARI7ABILIAlBEGokACABQRRqDwsQdAAL/A0CB38BfiMAQRBrIgckACAALQCoAUUEQCAAQawBahB5IABBAToAqAELAkACQCAALQAARQRAIABBAToAACAAKAKkASgCECEEIAcgATYCDCAHQQg2AgggBCgCECIERQ0CIAQgB0EMaiAHQQhqIAQoAgAoAhgRBQAgACABKQAANwJkDAELIAAoAqQBIQICQCAAQYQBaiIEIAAoAlxBAnRqKAIARQRAAkACQAJAIAIgAEEwahCGASICQQFrDgIAAQILIABBrAFqIAAoAqQBIAAoAtABEHohAiAEIAAoAlxBAnRqIAIgACgCxAEiA0EAQQAgAyACIANJG2sgAkEASBtqNgIAIAAgACgCXCICQQN0aiIDQeQAaiADKQJkIAQgAkECdCICajQCAHw3AgAgACACakEANgKUAQwDCyAAIAAoAmBBAWpBA3E2AmAgAEHkAGoiAiAAKAJcQQN0aigCBCEFIABBrAFqIAAoAqQBIAAoAtABQeACahB6IQYgAiAAKAJgQQN0aiAAKALEASIDQQBBACADIAMgBSAGaiIDSxtrIANBAEgbIANqrUIghjcCACAAKAKkARA8IQUgAiAAKAJgIgNBA3RqIgIgAikCACAFrYQ3AgAgACADNgJcIAQgA0ECdGpBADYCACAAIAAo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akEBdiIBNgJYIAAgATYCVCACQQ82AiBBACEDIAJBADoABCACQRA2AgAgAkEANgIQIAJCADcCJEGEARCiASIBQcQAakFAcSIEQQRrIAE2AgAgAiAENgIIQYQBEKIBIgFBxABqQUBxIgdBBGsgATYCACACQoCAgICAAjcCFCACIAc2AgwDQCAHIANBAnRqQQE2AgAgA0EBaiIDIAIoAgAiAUkNAAsgAiACKAIUIAIoAhhqIgQ2AhQCQAJAAkACQCAEQYGAAk8EQEEAIQMgAkEANgIUIAFFDQEDQCAHIANBAnRqIgEgASgCAEEBakEBdiIBNgIAIAIgAigCFCABaiIENgIUIANBAWoiAyACKAIAIgFJDQALC0GAgICAeCAEbiEKAkAgAigCJARAIAENAQwDCyABRQ0EQQAhAyACKAIIIQRBACEBA0AgBCADQQJ0IgVqIAEgCmxBEHY2AgAgBSAHaigCACABaiEBIANBAWoiAyACKAIASQ0ACwwECyACKAIQIQUgAigCCCELQQAhAQNAIAsgCEECdCIDaiAJIApsQRB2IgQ2AgAgAyAHaigCACEMIAEgBCACKAIodiIDSQRAIAhBAWshBiADIAFBf3NqIQ1BACEEIAMgAWtBB3EiDgRAA0AgBSABQQFqIgFBAnRqIAY2AgAgBEEBaiIEIA5HDQALCyANQQdPBEADQCABQQJ0IAVqIgQgBjYCHCAEIAY2AhggBCAGNgIUIAQgBjYCECAEIAY2AgwgBCAGNgIIIAQgBjYCBCAFIAFBCGoiAUECdGogBjYCACABIANHDQALCyADIQELIAkgDGohCSAIQQFqIgggAigCAEkNAAsgBUEANgIAIAEgAigCJEsNAwwCCyACKAIkRQ0CC0EAIQEgAigCECIFQQA2AgALA0AgBSABQQFqIgFBAnRqIAIoAgBBAWs2AgAgASACKAIkTQ0ACwsgAiACKAIAQQZqQQF2IgE2AhwgAiABNgIYIABBADYCcCAAQgA3A2ggAEHABRCkBCIBNgJoIAAgATYCbCAAIAFBwAVqIgM2AnAgASACEIMBIgFBLGogAhCDARogAUHYAGogAhCDARogAUGEAWogAhCDARogAUGwAWogAhCDARogAUHcAWogAhCDARogAUGIAmogAhCDARogAUG0AmogAhCDARogAUHgAmogAhCDARogAUGMA2og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hAYgAEEENgLwBSAAQoCAgID4/////wA3AtwFIABCIDcC1AUgAEKBgICAIDcCzAYgAEEANgK8BiAAQgA3ArQGIABCCDcCnAYgAEKggICAIDcClAYgAEEANgLEBSAAQYAgNgLIBiAAQQQ2AsQGIABBADYC3AYgAEIANwLUBiAAQQQ2AsAGIABCgICAgPj/////ADcCrAYgAEIgNwKkBiAAQoGAgIAgNwKcByAAQQA2AowHIABCADcChAcgAEIINwLsBiAAQqCAgIDgAjcC5AYgAEEANgKQBiAAQYAgNgKYByAAQQQ2ApQHIABBADYCrAcgAEIANwKkByAAQQQ2ApAHIABCgICAgPj/////ADcC/AYgAEIgNwL0BiAAQoGAgIAgNwLsByAAQQA2AtwHIABCADcC1AcgAEIINwK8ByAAQqCAgIDAAjcCtAcgAEEANgLgBiAAQYAgNgLoByAAQQQ2AuQHIABBADYC/AcgAEIANwL0ByAAQQQ2AuAHIABCgICAgPj/////ADcCzAcgAEIgNwLEByAAQbwIakKBgICAIDcCACAAQawIakEANgIAIABBpAhqQgA3AgAgAEGMCGpCCDcCACAAQYQIakKQgICAwAA3AgAgAEEANgKwByAAQbgIakGAIDYCACAAQbQIakEENgIAIABBzAhqQQA2AgAgAEHECGpCADcCACAAQbAIakEENgIAIABBnAhqQoCA/v///x83AgAgAEGUCGpCkICAgICAwAA3AgAgAEGMCWpCgYCAgCA3AgAgAEH8CGpBADYCACAAQfQIakIANwIAIABB3AhqQgg3AgAgAEHUCGpCkICAgCA3AgAgAEEANgKACCAAQYgJakGAIDYCACAAQYQJakEENgIAIABBnAlqQQA2AgAgAEGUCWpCADcCACAAQYAJakEENgIAIABB7AhqQoCA/v///x83AgAgAEHkCGpCkICAgICAwAA3AgAgAEHcCWpCgYCAgCA3AgAgAEHMCWpBADYCACAAQcQJakIANwIAIABBrAlqQgg3AgAgAEGkCWpCkICAgBA3AgAgAEEANgLQCCAAQdgJakGAIDYCACAAQdQJakEENgIAIABB7AlqQQA2AgAgAEHkCWpCADcCACAAQdAJakEENgIAIABBvAlqQoCA/v///x83AgAgAEG0CWpCkICAgICAwAA3AgAgAEGsCmpCgYCA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ADcDACAoQQE6AAAgK0IANwMAICpCADcDACApQQA2AgAgLEEBOgAAIC9CADcDACAuQgA3AwAgLUEANgIAIDBBAToAACAAQgA3A7ANIDJCADcDACAxQQA2AgAgM0EBOgAAIDRBADYCACA1QgA3AwAgNkIANwMAIDpCADcDACA3QQE6AAAgOUIANwMAIDhBADYCACA+QgA3AwAgO0EBOgAAID1CADcDACA8QQA2AgAgQkIANwMAID9BAToAACBBQgA3AwAgQEEANgIAIEZCADcDACBDQQE6AAAgRUIANwMAIERBADYCACBHQQE6AAAgSEEANgIAIElCADcDACBKQgA3AwAgS0EBOgAAIExBADYCACBNQgA3AwAgTkIANwMAIE9BAToAACBQQQA2AgAgUUIANwMAIFJCADcDACBTQQE6AAAgVEEANgIAIFVCADcDACBWQgA3AwAgV0EBOgAAIFhBADYCACBZQgA3AwAgWkIANwMAIFtBAToAACBcQQA2AgAgXUIANwMAIF5CADcDACBfQQE6AAAgAkEwaiQAIAALhxQBEX8jAEEQayIDJAAgA0EENgIIIAMgA0EEajYCDAJAAkACQCAAQZjBAGooAgAiAUUNACABIANBDGogA0EIaiABKAIAKAIYEQUAIAMoAgQhByADQQQ2AgggAyADQQRqNgIMIAAoAphBIgFFDQAgASADQQxqIANBCGogASgCACgCGBEFACADKAIEIQkgA0EENgIIIAMgA0EEajYCDCAAKAKYQSIBRQ0AIAEgA0EMaiADQQhqIAEoAgAoAhgRBQAgAygCBCEKIANBBDYCCCADIANBBGo2AgwgACgCmEEiAUUNACABIANBDGogA0EIaiABKAIAKAIYEQUAIAMoAgQhCyADQQQ2AgggAyADQQRqNgIMIAAoAphBIgFFDQAgASADQQxqIANBCGogASgCACgCGBEFACADKAIEIQwgA0EENgIIIAMgA0EEajYCDCAAKAKYQSIBRQ0AIAEgA0EMaiADQQhqIAEoAgAoAhgRBQAgAygCBCENIANBBDYCCCADIANBBGo2AgwgACgCmEEiAUUNACABIANBDGogA0EIaiABKAIAKAIYEQUAIAMoAgQhDiADQQQ2AgggAyADQQRqNgIMIAAoAphBIgFFDQAgASADQQxqIANBCGogASgCACgCGBEFACADKAIEIQ8gA0EENgIIIAMgA0EEajYCDCAAKAKYQSIBRQ0AIAEgA0EMaiADQQhqIAEoAgAoAhgRBQAgAygCBCEQIABB1MIAaiEIAkAgAEHYwgBqKAIAIgEgAEHcwgBqKAIAIgJHBEAgASAHNgIAIAAgAUEEaiIBNgLYQgwBCyABIAgoAgAiBmsiBUECdSICQQFqIgFBgICAgARPDQIgBUEBdSIEIAEgASAESRtB/////wMgBUH8////B0kbIgEEfyABQYCAgIAETw0EIAFBAnQQpAQFQQALIgQgAkECdGoiESAHNgIAIAQgAUECdGohAiARQQRqIQEgBUEASgRAIAQgBiAFEJwBGgsgACACNgLcQiAAIAE2AthCIAAgBDYC1EIgBkUNACAGEKMBIAAoAtxCIQIgACgC2EIhAQsCQCABIAJHBEAgASAJNgIAIAAgAUEEaiIBNgLYQgwBCyACIAgoAgAiBmsiBUECdSICQQFqIgFBgICAgARPDQIgBUEBdSIEIAEgASAESRtB/////wMgBUH8////B0kbIgEEfyABQYCAgIAETw0EIAFBAnQQpAQFQQALIgQgAkECdGoiByAJNgIAIAQgAUECdGohAiAHQQRqIQEgBUEASgRAIAQgBiAFEJwBGgsgACACNgLcQiAAIAE2AthCIAAgBDYC1EIgBkUNACAGEKMBIAAoAtxCIQIgACgC2EIhAQsCQCABIAJHBEAgASAKNgIAIAAgAUEEaiIBNgLYQgwBCyACIAgoAgAiBmsiBUECdSICQQFqIgFBgICAgARPDQIgBUEBdSIEIAEgASAESRtB/////wMgBUH8////B0kbIgEEfyABQYCAgIAETw0EIAFBAnQQpAQFQQALIgQgAkECdGoiByAKNgIAIAQgAUECdGohAiAHQQRqIQEgBUEASgRAIAQgBiAFEJwBGgsgACACNgLcQiAAIAE2AthCIAAgBDYC1EIgBkUNACAGEKMBIAAoAtxCIQIgACgC2EIhAQsCQCABIAJHBEAgASALNgIAIAAgAUEEaiIBNgLYQgwBCyACIAgoAgAiBmsiBUECdSICQQFqIgFBgICAgARPDQIgBUEBdSIEIAEgASAESRtB/////wMgBUH8////B0kbIgEEfyABQYCAgIAETw0EIAFBAnQQpAQFQQALIgQgAkECdGoiByALNgIAIAQgAUECdGohAiAHQQRqIQEgBUEASgRAIAQgBiAFEJwBGgsgACACNgLcQiAAIAE2AthCIAAgBDYC1EIgBkUNACAGEKMBIAAoAtxCIQIgACgC2EIhAQsCQCABIAJHBEAgASAMNgIAIAAgAUEEaiIBNgLYQgwBCyACIAgoAgAiBmsiBUECdSICQQFqIgFBgICAgARPDQIgBUEBdSIEIAEgASAESRtB/////wMgBUH8////B0kbIgEEfyABQYCAgIAETw0EIAFBAnQQpAQFQQALIgQgAkECdGoiByAMNgIAIAQgAUECdGohAiAHQQRqIQEgBUEASgRAIAQgBiAFEJwBGgsgACACNgLcQiAAIAE2AthCIAAgBDYC1EIgBkUNACAGEKMBIAAoAtxCIQIgACgC2EIhAQsCQCABIAJHBEAgASANNgIAIAAgAUEEaiIBNgLYQgwBCyACIAgoAgAiBmsiBUECdSICQQFqIgFBgICAgARPDQIgBUEBdSIEIAEgASAESRtB/////wMgBUH8////B0kbIgEEfyABQYCAgIAETw0EIAFBAnQQpAQFQQALIgQgAkECdGoiByANNgIAIAQgAUECdGohAiAHQQRqIQEgBUEASgRAIAQgBiAFEJwBGgsgACACNgLcQiAAIAE2AthCIAAgBDYC1EIgBkUNACAGEKMBIAAoAtxCIQIgACgC2EIhAQsCQCABIAJHBEAgASAONgIAIAAgAUEEaiIBNgLYQgwBCyACIAgoAgAiBmsiBUECdSICQQFqIgFBgICAgARPDQIgBUEBdSIEIAEgASAESRtB/////wMgBUH8////B0kbIgEEfyABQYCAgIAETw0EIAFBAnQQpAQFQQALIgQgAkECdGoiByAONgIAIAQgAUECdGohAiAHQQRqIQEgBUEASgRAIAQgBiAFEJwBGgsgACACNgLcQiAAIAE2AthCIAAgBDYC1EIgBkUNACAGEKMBIAAoAtxCIQIgACgC2EIhAQsCQCABIAJHBEAgASAPNgIAIAAgAUEEaiIBNgLYQgwBCyACIAgoAgAiBmsiBUECdSICQQFqIgFBgICAgARPDQIgBUEBdSIEIAEgASAESRtB/////wMgBUH8////B0kbIgEEfyABQYCAgIAETw0EIAFBAnQQpAQFQQALIgQgAkECdGoiByAPNgIAIAQgAUECdGohAiAHQQRqIQEgBUEA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AEE0akGAAhB+GiAAQeAAakGAAhB+GgubLgEUfyMAQSBrIg4kAAJAAkACQCABKAIQIgRFBEAgDkEANgIYDAELAkAgASAERgRAIA4gDkEIaiIENgIYIAEgBCABKAIAKAIMEQIAIA4oAhghAQwBCyAOIAQgBCgCACgCCBEAACIBNgIYCyABDQELIABBADYCEAwBCwJAIA5BCGogAUYEQCAAIAA2AhAgDkEIaiAAIA4oAggoAgwRAgAMAQsgACABIAEoAgAoAggRAAA2AhALAn8gDigCGCIBIA5BCGpGBEAgDkEIaiEBIA4oAghBEGoMAQsgAUUNASABKAIAQRRqCyEEIAEgBCgCABEBAAsgAEKAgICAcDcDGCAAIAA2AiggAEEANgIkIABBADoAICAAQRhqIRYgAEEsaiIDQgA3AgAgA0IANwI0IANBADYCECADQgA3AgggA0IANwI8IANBADYCRCADQgA3AkwgA0EBOgBIIANCADcCVCADQQA2AlwgA0IANwJkIANBAToAYCADQgA3AmwgA0EANgJ0IANBAToAeCADQgA3AnwgA0IANwKEASADQQA2AowBIANCADcClAEgA0EBOgCQASADQgA3ApwBIANBADYCpAEgA0EBOgCoASADQgA3AqwBIANCADcCtAEgA0EANgK8ASADQQE6AMABIANCADcCxAEgA0IANwLMASADQQA2AtQBIANBAToA2AEgA0IANwLcASADQgA3AuQBIANBADYC7AEgA0EBOgDwASADQQA2AoQCIANCADcC/AEgA0IANwL0ASADQgA3AowCIANBAToAiAIgA0IANwKUAiADQQA2ApwCIANCADcCpAIgA0EBOgCgAiADQgA3AqwCIANBADYCtAIgA0IANwK8AiADQQE6ALgCIANCADcCxAIgA0EANgLMAiADQgA3AtQCIANBAToA0AIgA0IANwLcAiADQQA2AuQCIANBAToA6AIgA0EANgL8AiADQgA3AvQCIANCADcC7AIgA0EBOgCAAyADQQA2ApQDIANCADcCjAMgA0IANwKEAyADQQE6AJgDIANBADYCrAMgA0IANwKkAyADQgA3ApwDIANBAToAsAMgA0EANgLEAyADQgA3ArwDIANCADcCtAMgA0EBOgDIAyADQQA2AtwDIANCADcC1AMgA0IANwLMAyADQQE6AOADIANBADYC9AMgA0IANwLsAyADQgA3AuQDIANBAToA+AMgA0EANgKMBCADQgA3AoQEIANCADcC/AMgA0EBOgCQBCADQQA2AqQEIANCADcCnAQgA0IANwKUBCADQQE6AKgEIANBADYCvAQgA0IANwK0BCADQgA3AqwEIANBAToAwAQgA0EANgLUBCADQgA3AswEIANCADcCxAQgA0EBOgDYBCADQQA2AuwEIANCADcC5AQgA0IANwLcBCADQQE6APAEIANBADYChAUgA0IANwL8BCADQgA3AvQEIANBAToAiAUgA0EANgKcBSADQgA3ApQFIANCADcCjAUgA0EBOgCgBSADQQA2ArQFIANCADcCrAUgA0IANwKkBSADQQE6ALgFIANBADYCzAUgA0IANwLEBSADQgA3ArwFIANBAToA0AUgA0EANgLkBSADQgA3AtwFIANCADcC1AUgA0EBOgDoBSADQQA2AvwFIANCADcC9AUgA0IANwLsBSADQQE6AIAGIANBADYClAYgA0IANwKMBiADQgA3AoQGIANBAToAmAYgA0EANgKsBiADQgA3AqQGIANCADcCnAYgA0EBOgCwBiADQdQGakHAABB+GiADQgA3AhQgA0EAOgCIHyADQgA3AhwgA0IANwIkIANCADcCLCADQSwQpARBgAIQfjYCgAdBLBCkBEGAAhB+IQEgA0IANwK0BiADIAE2AoQHIANCADcCvAYgA0IANwLEBiADQgA3AswGIANBiBdqIQUgA0GID2ohBCADQYgHaiEBA0AgASALQQJ0IgdqQSwQpARBgAIQfjYCACAEIAdqQSwQpARBgAIQfjYCACAFIAdqQSwQpARBgAIQfjYCACALQQFqIgtBgAJHDQALIAMgFjYCjB8gA0KAgICAgAI3ApAfIANB0B9qQQI2AgAgA0G8H2pBADYCACADQbQfakIANwIAIANBoB9qQQA2AgAgA0GYH2pChICAgIABNwIAIANByB9qQoCggIAQNwIAIANB3B9qQQA2AgAgA0HUH2pCADcCACADQcAfakKEgICAwAA3AgAgA0GsH2pCgID+////HzcCACADQaQfakKQgICAgIDAADcCACADQYwgakEANgIAIANB5B9qQpCAgIAQNwIAIANB7B9qQgg3AgAgA0GEIGpCADcCACADQZwgakKBgICAIDcCACADQZggakGAIDYCACADQZAgakKEgICAwAA3AgAgA0GsIGpBADYCACADQaQgakIANwIAIANB9B9qQpCAgICAgMAANwIAIANB/B9qQoCA/v///x83AgAgA0EANgLgHyADQdwgakEANgIAIANBtCBqQqCAgIAgNwIAIANBvCBqQgg3AgAgA0HUIGpCADcCACADQewgakKBgICAIDcCACADQeggakGAIDYCACADQeAgakKEgICAwAA3AgAgA0H8IGpBADYCACADQfQgakIANwIAIANBzCBqQoCAgID4/////wA3AgAgA0HEIGpCIDcCACADQbwhakKBgICAIDcCACADQawhakKAgICAwAA3AgAgA0GkIWpCADcCACADQYwhakIINwIAIANBhCFqQqCAgIDgAjcCACADQQA2ArAgIANBxCFqQgA3AgAgA0G0IWpChICAgICABDcCACADQcwhakEANgIAIANBnCFqQoCAgID4/////wA3AgAgA0GUIWpCIDcCACADQYwiakKBgICAIDcCACADQfQhakIANwIAIANB3CFqQgg3AgAgA0HUIWpCoICAgMACNwIAIANB/CFqQQA2AgAgA0EANgKAISADQYgiakGAIDYCACADQYQiakEENgIAIANBnCJqQQA2AgAgA0GUImpCADcCACADQYAiakEENgIAIANB7CFqQoCAgID4/////wA3AgAgA0HkIWpCIDcCACADQQA6AKAiIANBADYC0CFBACELIABB0CJqIgVBADoAACAFQQRqQYQEEH4aIAVBBTYCUCAFQQA6ADQgBUEGNgIwIAVBQGtBADYCACAFQgA3AlRB3AAQogEiBEHEAGpBQHEiAUEEayAENgIAIAUgATYCOEHcABCiASIBQcQAakFAcSIEQQRrIAE2AgAgBUKAgICA4AA3AkQgBSAENgI8IAVBMGohAQNAIAQgC0ECdGpBATYCACALQQFqIgsgASgCAEkNAAsgARCCASAFIAUoAjBBBmpBAXYiATYCTCAFIAE2AkggBUHcAGpBAEHIABCeARogBUEAOgCoASAFIBY2AqQBIAVCgICAgIAENwKsASAFQQI2AuwBIAVBADYC2AEgBUIANwLQASAFQQA2ArwBIAVCiYCAgIABNwK0ASAFQoCggIAQNwLkASAFQQA2AvgBIAVCADcC8AEgBUKEgICAwAA3AtwBIAVCgICAgPj/////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IAEQPiEBIAAoAgQiAi0AyCcEQCACQRhqEHggACgCBEEAOgDIJwsgAQuFEgEKfyMAQSBrIgUkAAJAAkACQCABKAIQIgNFBEAgBUEANgIYDAELAkAgASADRgRAIAUgBUEIaiIDNgIYIAEgAyABKAIAKAIMEQIAIAUoAhghAQwBCyAFIAMgAygCACgCCBEAACIBNgIYCyABDQELIABBADYCEAwBCwJAIAVBCGogAUYEQCAAIAA2AhAgBUEIaiAAIAUoAggoAgwRAgAMAQsgACABIAEoAgAoAggRAAA2AhALAn8gBSgCGCIBIAVBCGpGBEAgBUEIaiEBIAUoAghBEGoMAQsgAUUNASABKAIAQRRqCyEDIAEgAygCABEBAAsgAEEYahBIIgFBoBBqEEghAyABQcAgahBIIQQgAUHgMGoQSCEGIAFBADYCACABQX82AoBBIANBATYCACAEQQI2AgAgBkEDNgIAAkAgACgCECIDRQRAIAFBmMEAakEANgIADAELIAAgA0YEQCABQZjBAGogAUGIwQBqIgM2AgAgACgCECIEIAMgBCgCACgCDBECAAwBCyABQZjBAGogAyADKAIAKAIIEQAANgIAC0EQEKQEIgNCADcCACADQgA3AgggAUGwwQBqIAM2AgAgAUGswQBqIAM2AgAgAUGowQBqQQA6AAAgAUKAgICAcDcDoEFBEBCkBCIDQgA3AgAgA0IANwIIIAFBxMEAaiADNgIAIAFBwMEAaiADNgIAIAFBvMEAakEAOgAAIAFCgICAgHA3ArRBQRAQpAQiA0IANwIAIANCADcCCCABQdjBAGogAzYCACABQdTBAGogAzYCACABQdDBAGpBADoAACABQoCAgIBwNwPIQUEQEKQEIgNCADcCACADQgA3AgggAUHswQBqIAM2AgAgAUHowQBqIAM2AgAgAUHkwQBqQQA6AAAgAUKAgICAcDcC3EFBEBCkBCIDQgA3AgAgA0IANwIIIAFBgMIAaiADNgIAIAFB/MEAaiADNgIAIAFB+MEAakEAOgAAIAFCgICAgHA3A/BBQRAQpAQiA0IANwIAIANCADcCCCABQZTCAGogAzYCACABQZDCAGogAzYCACABQYzCAGpBADoAACABQoCAgIBwNwKEQkEQEKQEIgNCADcCACADQgA3AgggAUGowgBqIAM2AgAgAUGkwgBqIAM2AgAgAUGgwgBqQQA6AAAgAUKAgICAcDcDmEJBEBCkBCIDQgA3AgAgA0IANwIIIAFBvMIAaiADNgIAIAFBuMIAaiADNgIAIAFBtMIAakEAOgAAIAFCgICAgHA3AqxCQRAQpAQiA0IANwIAIANCADcCCCABQdDCAGogAzYCACABQczCAGogAzYCACABQcjCAGpBADoAACABQoCAgIBwNwPAQiABQdTCAGpBAEHsABCeARogAEHYwwBqIgFCADcCACABQQA7AQggAUEMakGAARB+GiABQThqQYACEH4aIAFB5ABqQYACEH4aIAFBkAFqQYACEH4aIAFBvAFqQYACEH4aIAFB6AFqQYACEH4aIAFBlAJqQYACEH4aIAFBADsByAIgAUIANwLAAiABQcwCakGAARB+GiABQfgCakGAAhB+GiABQaQDakGAAhB+GiABQdADakGAAhB+GiABQfwDakGAAhB+GiABQagEakGAAhB+GiABQdQEakGAAhB+GiABQQA7AYgFIAFCADcCgAUgAUGMBWpBgAEQfhogAUG4BWpBgAIQfhogAUHkBWpBgAIQfhogAUGQBmpBgAIQfhogAUG8BmpBgAIQfhogAUHoBmpBgAIQfhogAUGUB2pBgAIQfhogAUEAOwHIByABQgA3AsAHIAFBzAdqQYABEH4aIAFB+AdqQYACEH4aIAFBpAhqQYACEH4aIAFB0AhqQYACEH4aIAFB/AhqQYACEH4aIAFBqAlqQYACEH4aIAFB1AlqQYACEH4aIABB3M0AaiAANgIAIABB2M0AakF/NgIAQRAQpAQiAUIANwIAIAFCADcCCCAAQfTNAGogATYCACAAQfDNAGogATYCACAAQfjNAGpCADcDACAAQezNAGpBADoAACAAQeTNAGpCgICAgHA3AgAgAEGAzgBqEFEgAEGMzwBqEFEgAEGY0ABqEFEgAEGk0QBqEFEgAEG00gBqIAA2AgAgAEGw0gBqQX82AgBBEBCkBCIBQgA3AgAgAUIANwIIIABBzNIAaiABNgIAIABByNIAaiABNgIAIABB0NIAakIANwMAIABBxNIAakEAOgAAIABBvNIAakKAgICAcDcCACMAQSBrIgMkACAAQdjSAGoiAUF/NgIEIAEgAjYCACABQQhqIAIQQSABQSRqIAEoAgAQQSABQUBrIAEoAgAQQSABQdwAaiABKAIAEEEgASAANgKEASABQQA2AoABIAFCADcCeCABQQA2ApABIAFCADcCiAECQAJAIAEoAgAiAgRAIAJBgICAgARPDQEgASACQQJ0IgQQpAQiBjYCiAEgASAEIAZqIgc2ApABIAZBACAEEJ4BGiABIAc2AowBC0EQEKQEIgRCADcCACAEQgA3AgggAyAENgIYIAMgBDYCFCADQQA6ABAgA0KAgICAcDcDCCABQQA2ApwBIAFCADcClAECQAJAAkAgAgRAIAJBzZmz5gBPDQEgASACQRRsIgQQpAQiAjYClAEgASACNgKYASABIAIgBGoiCTYCnAEgAygCDCEKIAMoAgghCyADKAIUIQYDQEEQEKQEIgRBADYCCCAEQgA3AgAgBigCBCIHIAYoAgAiCEcEQCAHIAhrIghBAEgNBCAEIAgQpAQiBzYCACAEIAc2AgQgBCAHIAhqNgIIIAQgBigCBCAGKAIAIgxrIghBAEoEfyAHIAwgCBCcASAIagUgBws2AgQLIAQgBigCDDYCDCACIAQ2AhAgAiAENgIMIAIgCjYCBCACIAs2AgAgAkEUaiICIAlHDQALIAEgCTYCmAELDAILEDMACxAzAAsgAygCFCECIANBADYCFCACBEAgAigCACIEBEAgAiAENgIEIAQQowELIAIQowELIAFCADcCoAEgA0EgaiQADAELEDMACyAAQQE6AIRUIABBADYCgFQgBUEgaiQAIAAL0g8BBn8gAEGMJzYCACAAKAIEIQYgAEEANgIEIAYEQCAGQdjSAGoiAygClAEiAgRAIAMoApgBIgQgAiIBRwRAA0AgBEEUayIEKAIMIQEgBEEANgIMIAEEQCABKAIAIgUEQCABIAU2AgQgBRCjAQsgARCjAQsgAiAERw0ACyADKAKUASEBCyADIAI2ApgBIAEQowELIAMoAogBIgEEQCADIAE2AowBIAEQowELIAMoAngiAgRAIAMoAnwiBCACIgFHBEADQCAEQRRrIgQoAgwhASAEQQA2AgwgAQRAIAEoAgAiBQRAIAEgBTYCBCAFEKMBCyABEKMBCyACIARHDQALIAMoAnghAQsgAyACNgJ8IAEQowELIANBCGoiBCgCZCIDBEAgBCgCaCIBIAMiAkcEQANAIAFBLGsiAigCCCIFBEAgBUEEaygCABCjAQsgAUEgaygCACIFBEAgBUEEaygCABCjAQsgAUEcaygCACIBBEAgAUEEaygCABCjAQsgAiIBIANHDQALIAQoAmQhAgsgBCADNgJoIAIQowELIAQoAlgiAQRAIAQgATYCXCABEKMBCyAEKAJIIgMEQCAEKAJMIgEgAyICRwRAA0AgAUEsayICKAIIIgUEQCAFQQRrKAIAEKMBCyABQSBrKAIAIgUEQCAFQQRrKAIAEKMBCyABQRxrKAIAIgEEQCABQQRrKAIAEKMBCyACIgEgA0cNAAsgBCgCSCECCyAEIAM2AkwgAhCjAQsgBCgCPCIBBEAgBEFAayABNgIAIAEQowELIAQoAiwiAwRAIAQoAjAiASADIgJHBEADQCABQSxrIgIoAggiBQRAIAVBBGsoAgAQowELIAFBIGsoAgAiBQRAIAVBBGsoAgAQowELIAFBHGsoAgAiAQRAIAFBBGsoAgAQowELIAIiASADRw0ACyAEKAIsIQILIAQgAzYCMCACEKMBCyAEKAIgIgEEQCAEIAE2AiQgARCjAQsgBCgCECIDBEAgBCgCFCIBIAMiAkcEQANAIAFBLGsiAigCCCIFBEAgBUEEaygCABCjAQsgAUEgaygCACIFBEAgBUEEaygCABCjAQsgAUEcaygCACIBBEAgAUEEaygCABCjAQsgAiIBIANHDQALIAQoAhAhAgsgBCADNgIUIAIQowELIAQoAgQiAQRAIAQgATYCCCABEKMBCyAGQcjSAGoiAigCACEBIAJBADYCACABBEAgASgCACICBEAgASACNgIEIAIQowELIAEQowELIAZBpNEAahBjIAZBmNAAahBjIAZBjM8AahBjIAZBgM4AahBjIAZB8M0AaiICKAIAIQEgAkEANgIAIAEEQCABKAIAIgIEQCABIAI2AgQgAhCjAQsgARCjAQsgBkHYwwBqIgFB+AdqEGUgASgC1AciAgRAIAJBBGsoAgAQowELIAEoAtgHIgIEQCACQQRrKAIAEKMBCyABKALcByICBEAgAkEEaygCABCjAQsgAUG4BWoQZSABKAKUBSICBEAgAkEEaygCABCjAQsgASgCmAUiAgRAIAJBBGsoAgAQowELIAEoApwFIgIEQCACQQRrKAIAEKMBCyABQfgCahBlIAEoAtQCIgIEQCACQQRrKAIAEKMBCyABKALYAiICBEAgAkEEaygCABCjAQsgASgC3AIiAgRAIAJBBGsoAgAQowELIAFBOGoQZSABKAIUIgIEQCACQQRrKAIAEKMBCyABKAIYIgIEQCACQQRrKAIAEKMBCyABKAIcIgEEQCABQQRrKAIAEKMBCyAGQRhqIgMoAtRCIgEEQCADQdjCAGogATYCACABEKMBCyADQczCAGoiAigCACEBIAJBADYCACABBEAgASgCACICBEAgASACNgIEIAIQowELIAEQowELIANBuMIAaiICKAIAIQEgAkEANgIAIAEEQCABKAIAIgIEQCABIAI2AgQgAhCjAQsgARCjAQsgA0GkwgBqIgIoAgAhASACQQA2AgAgAQRAIAEoAgAiAgRAIAEgAjYCBCACEKMBCyABEKMBCyADQZDCAGoiAigCACEBIAJBADYCACABBEAgASgCACICBEAgASACNgIEIAIQowELIAEQowELIANB/MEAaiICKAIAIQEgAkEANgIAIAEEQCABKAIAIgIEQCABIAI2AgQgAhCjAQsgARCjAQsgA0HowQBqIgIoAgAhASACQQA2AgAgAQRAIAEoAgAiAgRAIAEgAjYCBCACEKMBCyABEKMBCyADQdTBAGoiAigCACEBIAJBADYCACABBEAgASgCACICBEAgASACNgIEIAIQowELIAEQowELIANBwMEAaiICKAIAIQEgAkEANgIAIAEEQCABKAIAIgIEQCABIAI2AgQgAhCjAQsgARCjAQsgA0GswQBqIgIoAgAhASACQQA2AgAgAQRAIAEoAgAiAgRAIAEgAjYCBCACEKMBCyABEKMBCwJAAn8gA0GYwQBqKAIAIgIgA0GIwQBqIgFGBEAgASgCAEEQagwBCyACRQ0BIAIiASgCAEEUagshAiABIAIoAgARAQALIANB4DBqEGQgA0HAIGoQZCADQaAQahBkIAMQZAJAAn8gBiAGKAIQIgFGBEAgBiIBKAIAQRBqDAELIAFFDQEgASgCAEEUagshAiABIAIoAgARAQALIAYQowELIAALDAAgABBbGiAAEKMBC/gBAQN/IwBBEGsiAiQAIAJBADYCACAAKAIEQRhqIAEgAhBLIQEgACgCBEHY0gBqKAIABEAgACgCBEHY0gBqIAEgAhBFIQELAkAgACgCBCIDLQCEVARAIAJBBDYCCCACIAJBBGo2AgwgAygCECIERQ0BIAQgAkEMaiACQQhqIAQoAgAo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IAIoAhAiAkUNACACIAFBDGogAUEIaiACKAIAKAIYEQUAIAEtAAchAyAAKAIQIQIgAUEBNgIIIAEgAUEHajYCDCACKAIQIgJFDQAgAiABQQxqIAFBCGogAigCACgCGBEFACABLQAHIQQgACgCECECIAFBATYCCCABIAFBB2o2AgwgAigCECICRQ0AIAIgAUEMaiABQQhqIAIoAgAoAhgRBQAgAS0AByEFIAAoAhAhAiABQQE2AgggASABQQdqNgIMIAIoAhAiAkUNACACIAFBDGogAUEIaiACKAIAKAIYEQUAIAAgAS0AByAEQRB0IANBGHRyIAVBCHRycjYCACABQRBqJAAPCxB0AAvfBAEGfyMAQTBrIgIkAAJAIAAoAiQgACgCKEcNACAAKAIIBEAgAEEkaiEGIAJBCGohBANAIAIgACgCFEEBahB+IQUCQCAAKAIoIgEgACgCLEkEQCABIAUoAgA2AgAgASACLQAEOgAEIAEgAigCCDYCCCABIAIoAgw2AgwgASACKAIQNgIQIAEgAigCFDYCFCABIAIoAhg2AhggASACKAIcNgIcIAEgAigCIDYCICABIAIoAiQ2AiQgASACKAIoNgIoIARBADYCCCAEQgA3AgAgACABQSxqNgIoDAELIAYgBRB/IAIoAggiAUUNACABQQRrKAIAEKMBCyACKAIMIgEEQCABQQRrKAIAEKMBCyACKAIQIgEEQCABQQRrKAIAEKMBCyADQQFqIgMgACgCCEkNAAsLIAAoAhRFDQAgAEHEAGohBiACQQhqIQRBASEDA0AgAkEBIAMgACgCDCIBIAEgA0sbdBB+IQUCQCAAKAJIIgEgACgCTEkEQCABIAUoAgA2AgAgASACLQAEOgAEIAEgAigCCDYCCCABIAIoAgw2AgwgASACKAIQNgIQIAEgAigCFDYCFCABIAIoAhg2AhggASACKAIcNgIcIAEgAigCIDYCICABIAIoAiQ2AiQgASACKAIoNgIoIARBADYCCCAEQgA3AgAgACABQSxqNgJIDAELIAYgBRB/IAIoAggiAUUNACABQQRrKAIAEKMBCyACKAIMIgEEQCABQQRrKAIAEKMBCyACKAIQIgEEQCABQQRrKAIAEKMBCyADQQFqIgMgACgCFE0NAAsLIAJBMGokAAusBAEEfyAAIAEgAhCGASICNgIAIAIEQCAC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IgJqIgMgASACai0AADoAACADQQNxDQALCyACQQNNDQADQCAAIAJBBGsiAmogASACaigCADYCACACQQNLDQALCyACRQ0CA0AgACACQQFrIgJqIAEgAmotAAA6AAAgAg0ACwwCCyACQQNNDQADQCAAIAEoAgA2AgAgAUEEaiEBIABBBGohACACQQRrIgJBA0sNAAsLIAJFDQADQCAAIAEtAAA6AAAgAEEBaiEAIAFBAWohASACQQFrIgINAAsLC/ICAgJ/AX4CQCACRQ0AIAAgAToAACAAIAJqIgNBAWsgAToAACACQQNJDQAgACABOgACIAAgAToAASADQQNrIAE6AAAgA0ECayABOgAAIAJBB0kNACAAIAE6AAMgA0EEayABOgAAIAJBCUkNACAAQQAgAGtBA3EiBGoiAyABQf8BcUGBgoQIbCIBNgIAIAMgAiAEa0F8cSIEaiICQQRrIAE2AgAgBEEJSQ0AIAMgATYCCCADIAE2AgQgAkEIayABNgIAIAJBDGsgATYCACAEQRlJDQAgAyABNgIYIAMgATYCFCADIAE2AhAgAyABNgIMIAJBEGsgATYCACACQRRrIAE2AgAgAkEYayABNgIAIAJBHGsgATYCACAEIANBBHFBGHIiBGsiAkEgSQ0AIAGtQoGAgIAQfiEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkEgayICQR9LDQALCyAAC4EBAQJ/AkACQCACQQRPBEAgACABckEDcQ0BA0AgACgCACABKAIARw0CIAFBBGohASAAQQRqIQAgAkEEayICQQNLDQALCyACRQ0BCwNAIAAtAAAiAyABLQAAIgRGBEAgAUEBaiEBIABBAWohACACQQFrIgINAQwCCwsgAyAEaw8LQQALaQEDfwJAIAAiAUEDcQRAA0AgAS0AAEUNAiABQQFqIgFBA3ENAAsLA0AgASICQQRqIQEgAigCACIDQX9zIANBgYKECGtxQYCBgoR4cUUNAAsDQCACIgFBAWohAiABLQAADQALCyABIABrCwYAQeSyAQv+LQELfyMAQRBrIgskAAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEH0AU0EQEHosgEoAgAiBUEQIABBC2pBeHEgAEELSRsiBkEDdiIAdiIBQQNxBEACQCABQX9zQQFx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CCADKAIAKAIQERMAIAAgAikDEDcDCCAAIAIpAwg3AwAgASABKAIAQQxrKAIAakEAEMcBCyACQSBqJAAL4QEBBX8jAEFAaiICJAAgACAAKAIAQQxrKAIAaiIDIAMoAhBBfXEiAxDLASACQThqIAAQwAEgAi0AOARAIAAgACgCAEEMaygCAGooAhghBCACIAEpAwg3AxAgAiABKQMANwMIIwBBEGsiASQAIAQoAgAoAhQhBSABIAIpAxA3AwggASACKQMINwMAIAJBKGoiBiAEIAFBCCAFEQkAIAFBEGokACACQRhqIgFCfzcDCCABQgA3AwAgACAAKAIAQQxrKAIAaiADQQRyIAMgBikDCCABKQMIURsQxwELIAJBQGskAAupAQEEfyMAQTBrIgMkACAAIAAoAgBBDGsoAgBqIgIgAigCEEF9cSIEEMsBIANBKGogABDAASADLQAoBEAgA0EYaiIFIAAgACgCAEEMaygCAGooAhgiAiABQQFBCCACKAIAKAIQERMAIANBCGoiAkJ/NwMIIAJCADcDACAFKQMIIAIpAwhRIQIgACAAKAIAQQxrKAIAaiAEQQRyIAQgAhsQxwELIANBMGokAAtcAQJ/AkAgACgCACICRQ0AAn8gAigCGCIDIAIoAhxGBEAgAiABQf8BcSACKAIAKAI0EQMADAELIAIgA0EBajYCGCADIAE6AAAgAUH/AXELQX9HDQAgAEEANgIACws2ACACBH8gAgRAA0AgACABKAIANgIAIABBBGohACABQQRqIQEgAkEBayICDQALC0EABSAACxoLCwAgAEGswgEQpAILDAAgACABENUBQQFzCw0AIAAoAgAQ1gEaIAALCQAgACABENUBCxAAIAAQ4AEgARDgAXNBAXMLMQEBfyAAKAIMIgEgACgCEEYEQCAAIAAoAgAoAigRAAAPCyAAIAFBBGo2AgwgASgCAAtUAQJ/AkAgACgCACICRQ0AAn8gAigCGCIDIAIoAhxGBEAgAiABIAIoAgAoAjQRAwAMAQsgAiADQQRqNgIYIAMgATYCACABC0F/Rw0AIABBADYCAAsLPwECfyMAQRBrIgIkACAAIQFBACEAA0AgAEEDRwRAIAEgAEECdGpBADYCACAAQQFqIQAMAQsLIAJBEGokACABC2EBAX8jAEEQayICJAAgAC0AC0EHdgRAIAAgACgCACAAKAIIQf////8HcRDdAQsgACABKAIINgIIIAAgASkCADcCACABQQA6AAsgAkEAOgAPIAEgAi0ADzoAACACQRBqJAALuwEBBH8jAEEQayIFJAAgAiABayIEQW9NBEACQCAEQQtJBEAgACAEOgALIAAhAwwBCyAAIAAgBEELTwR/IARBEGpBcHEiAyADQQFrIgMgA0ELRhsFQQoLQQFqIgYQ4QEiAzYCACAAIAZBgICAgHhyNgIIIAAgBDYCBAsDQCABIAJHBEAgAyABLQAAOgAAIANBAWohAyABQQFqIQEMAQsLIAVBADoADyADIAUtAA86AAAgBUEQaiQADwsQdQALCQAgACABELEECwUAEBEACwkAIAFBARDeAQsVACABQQhLBEAgABCjAQ8LIAAQowELSwECfyAAKAIAIgEEQAJ/IAEoAgwiAiABKAIQRgRAIAEgASgCACgCJBEAAAwBCyACLQAAC0F/RwRAIAAoAgBFDwsgAEEANgIAC0EBC0sBAn8gACgCACIBBEACfyABKAIMIgIgASgCEEYEQCABIAEoAgAoAiQRAAAMAQsgAigCAAtBf0cEQCAAKAIARQ8LIABBADYCAAtBAQsJACABQQEQ4gEL1QQBCH8gAUEISwRAIAFBBCABQQRLGyEEIABBASAAGyEGA0ACQCMAQRBrIgckACAHQQA2AgwCQAJ/IARBCEYEQCAGEKIBDAELIARBBEkNASAEQQNxDQEgBEECdiIAIABBAWtxDQFBQCAEayAGSQ0BAn9BECEDAkAgBEEQIARBEEsbIgBBECAAQRBLGyIBIAFBAWtxRQRAIAEhAAwBCwNAIAMiAEEBdCEDIAAgAUkNAAsLIAZBQCAAa08EQEHksgFBMDYCAEEADAELQQBBECAGQQtqQXhxIAZBC0kbIgMgAGpBDGoQogEiAkUNABogAkEIayEBAkAgAEEBayACcUUEQCABIQAMAQsgAkEEayIIKAIAIglBeHEgACACakEBa0EAIABrcUEIayICQQAgACACIAFrQQ9LG2oiACABayICayEFIAlBA3FFBEAgASgCACEBIAAgBTYCBCAAIAEgAmo2AgAMAQsgACAFIAAoAgRBAXFyQQJyNgIEIAAgBWoiBSAFKAIEQQFyNgIEIAggAiAIKAIAQQFxckECcjYCACABIAJqIgUgBSgCBEEBcjYCBCABIAIQpQELAkAgACgCBCIBQQNxRQ0AIAFBeHEiAiADQRBqTQ0AIAAgAyABQQFxckECcjYCBCAAIANqIgEgAiADayIDQQNyNgIEIAAgAmoiAiACKAIEQQFyNgIEIAEgAxClAQsgAEEIagsLIgBFDQAgByAANgIMCyAHKAIMIQAgB0EQaiQAIAANAEHo0AEoAgAiAUUNACABEQwADAELCyAADwsgABCkBAshACAAIAAoAhhFIAFyIgE2AhAgACgCFCABcQRAENwBAAsLkAEBAn8gAEGgzAA2AgAgACgCKCEBA0AgAQRAQQAgACABQQFrIgFBAnQiAiAAKAIkaigCACAAKAIgIAJqKAIAEQUADAELCyAAKAIcIgEgASgCBEEBayICNgIEIAJBf0YEQCABIAEoAgAoAggRAQALIAAoAiAQowEgACgCJBCjASAAKAIwEKMBIAAoAjwQowEgAAsNACAAEOQBGiAAEKMBCwQAQgALRwECfyAAIAE3A3AgACAAKAIsIAAoAgQiA2usNwN4IAAoAgghAgJAIAFQDQAgAiADa6wgAVcNACADIAGnaiECCyAAIAI2AmgLjAICA38CfgJAIAApA3AiBEIAUiAEIAApA3ggACgCBCIBIAAoAiwiAmusfCIFV3FFBEAjAEEQayICJABBfyEBAkAgABCuAQ0AIAAgAkEPakEBIAAoAiARBABBAUcNACACLQAPIQELIAJBEGokACABIgNBAE4NASAAKAIEIQEgACgCLCECCyAAQn83A3AgACABNgJoIAAgBSACIAFrrHw3A3hBfw8LIAVCAXwhBSAAKAIEIQEgACgCCCECAkAgACkDcCIEUA0AIAQgBX0iBCACIAFrrFkNACABIASnaiECCyAAIAI2AmggACAFIAAoAiwiACABa6x8NwN4IAAgAU8EQCABQQFrIAM6AAALIAMLUAEBfgJAIANBwABxBEAgASADQUBqrYYhAkIAIQEMAQsgA0UNACACIAOtIgSGIAFBwAAgA2utiIQhAiABIASGIQELIAAgATcDACAAIAI3AwgLfwICfwF+IwBBEGsiAyQAIAACfiABRQRAQgAMAQsgAyABIAFBH3UiAnMgAmsiAq1CACACZyICQdEAahDpASADKQMIQoCAgICAgMAAhUGegAEgAmutQjCGfCABQYCAgIB4ca1CIIaEIQQgAykDAAs3AwAgACAENwMIIANBEGokAAtQAQF+AkAgA0HAAHEEQCACIANBQGqtiCEBQgAhAgwBCyADRQ0AIAJBwAAgA2uthiABIAOtIgSIhCEBIAIgBIghAgsgACABNwMAIAAgAjcDCAvLCgIFfw9+IwBB4ABrIgUkACAEQv///////z+DIQwgAiAEhUKAgICAgICAgIB/gyEKIAJC////////P4MiDUIgiCEOIARCMIinQf//AXEhBwJAAkAgAkIwiKdB//8BcSIJQf//AWtBgoB+TwRAIAdB//8Ba0GBgH5LDQELIAFQIAJC////////////AIMiC0KAgICAgIDA//8AVCALQoCAgICAgMD//wBRG0UEQCACQoCAgICAgCCEIQoMAgsgA1AgBEL///////////8AgyICQoCAgICAgMD//wBUIAJCgICAgICAwP//AFEbRQRAIARCgICAgICAIIQhCiADIQEMAgsgASALQoCAgICAgMD//wCFhFAEQCACIAOEUARAQoCAgICAgOD//wAhCkIAIQEMAwsgCkKAgICAgIDA//8AhCEKQgAhAQwCCyADIAJCgICAgICAwP//AIWEUARAIAEgC4QhAkIAIQEgAlAEQEKAgICAgIDg//8AIQoMAwsgCkKAgICAgIDA//8AhCEKDAILIAEgC4RQBEBCACEBDAILIAIgA4RQBEBCACEBDAILIAtC////////P1gEQCAFQdAAaiABIA0gASANIA1QIgYbeSAGQQZ0rXynIgZBD2sQ6QFBECAGayEGIAUpA1giDUIgiCEOIAUpA1AhAQsgAkL///////8/Vg0AIAVBQGsgAyAMIAMgDCAMUCIIG3kgCEEGdK18pyIIQQ9rEOkBIAYgCGtBEGohBiAFKQNIIQwgBSkDQCEDCyADQg+GIgtCgID+/w+DIgIgAUIgiCIEfiIQIAtCIIgiEyABQv////8PgyIBfnwiD0IghiIRIAEgAn58IgsgEVStIAIgDUL/////D4MiDX4iFSAEIBN+fCIRIAxCD4YiEiADQjGIhEL/////D4MiAyABfnwiFCAPIBBUrUIghiAPQiCIhHwiDyACIA5CgIAEhCIMfiIWIA0gE358Ig4gEkIgiEKAgICACIQiAiABfnwiECADIAR+fCISQiCGfCIXfCEBIAcgCWogBmpB//8AayEGAkAgAiAEfiIYIAwgE358IgQgGFStIAQgBCADIA1+fCIEVq18IAIgDH58IAQgBCARIBVUrSARIBRWrXx8IgRWrXwgAyAMfiIDIAIgDX58IgIgA1StQiCGIAJCIIiEfCAEIAJCIIZ8IgIgBFStfCACIAIgECASVq0gDiAWVK0gDiAQVq18fEIghiASQiCIhHwiAlatfCACIAIgDyAUVK0gDyAXVq18fCICVq18IgRCgICAgICAwACDQgBSBEAgBkEBaiEGDAELIAtCP4ghAyAEQgGGIAJCP4iEIQQgAkIBhiABQj+IhCECIAtCAYYhCyADIAFCAYaEIQELIAZB//8BTgRAIApCgICAgICAwP//AIQhCkIAIQEMAQsCfiAGQQBMBEBBASAGayIHQYABTwRAQgAhAQwDCyAFQTBqIAsgASAGQf8AaiIGEOkBIAVBIGogAiAEIAYQ6QEgBUEQaiALIAEgBxDrASAFIAIgBCAHEOsBIAUpAzAgBSkDOIRCAFKtIAUpAyAgBSkDEISEIQsgBSkDKCAFKQMYhCEBIAUpAwAhAiAFKQMIDAELIARC////////P4MgBq1CMIaECyAKhCEKIAtQIAFCAFkgAUKAgICAgICAgIB/URtFBEAgCiACQgF8IgEgAlStfCEKDAELIAsgAUKAgICAgICAgIB/hYRCAFIEQCACIQEMAQsgCiACIAJCAYN8IgEgAlStfCEKCyAAIAE3AwAgACAKNwMIIAVB4ABqJAALzQkCBH4EfyMAQfAAayIKJAAgBEL///////////8AgyEFAkACQCABUCIJIAJC////////////AIMiBkKAgICAgIDA//8AfUKAgICAgIDAgIB/VCAGUBtFBEAgA0IAUiAFQoCAgICAgMD//wB9IghCgICAgICAwICAf1YgCEKAgICAgIDAgIB/URsNAQsgCSAGQoCAgICAgMD//wBUIAZCgICAgICAwP//AFEbRQRAIAJCgICAgICAIIQhBCABIQMMAgsgA1AgBUKAgICAgIDA//8AVCAFQoCAgICAgMD//wBRG0UEQCAEQoCAgICAgCCEIQQMAgsgASAGQoCAgICAgMD//wCFhFAEQEKAgICAgIDg//8AIAIgASADhSACIASFQoCAgICAgICAgH+FhFAiCRshBEIAIAEgCRshAwwCCyADIAVCgICAgICAwP//AIWEUA0BIAEgBoRQBEAgAyAFhEIAUg0CIAEgA4MhAyACIASDIQQMAgsgAyAFhEIAUg0AIAEhAyACIQQMAQsgAyABIAEgA1QgBSAGViAFIAZRGyIMGyEFIAQgAiAMGyIIQv///////z+DIQYgAiAEIAwbIgdCMIinQf//AXEhCyAIQjCIp0H//wFxIglFBEAgCkHgAGogBSAGIAUgBiAGUCIJG3kgCUEGdK18pyIJQQ9rEOkBIAopA2ghBiAKKQNgIQVBECAJayEJCyABIAMgDBshAyAHQv///////z+DIQQgC0UEQCAKQdAAaiADIAQgAyAEIARQIgsbeSALQQZ0rXynIgtBD2sQ6QFBECALayELIAopA1ghBCAKKQNQIQMLIARCA4YgA0I9iIRCgICAgICAgASEIQIgBkIDhiAFQj2IhCEEIANCA4YhASAHIAiFIQMCQCAJIAtGDQAgCSALayILQf8ASwRAQgAhAkIBIQEMAQsgCkFAayABIAJBgAEgC2sQ6QEgCkEwaiABIAIgCxDrASAKKQMwIAopA0AgCikDSIRCAFKthCEBIAopAzghAgsgBEKAgICAgICABIQhByAFQgOGIQYCQCADQgBTBEBCACEDQgAhBCABIAaFIAIgB4WEUA0CIAYgAX0hBSAHIAJ9IAEgBlatfSIEQv////////8DVg0BIApBIGogBSAEIAUgBCAEUCILG3kgC0EGdK18p0EMayILEOkBIAkgC2shCSAKKQMoIQQgCikDICEFDAELIAEgBnwiBSABVK0gAiAHfHwiBEKAgICAgICACINQDQAgBUIBgyAEQj+GIAVCAYiEhCEFIAlBAWohCSAEQgGIIQQLIAhCgICAgICAgICAf4MhASAJQf//AU4EQCABQoCAgICAgMD//wCEIQRCACEDDAELQQAhCwJAIAlBAEoEQCAJIQsMAQsgCkEQaiAFIAQgCUH/AGoQ6QEgCiAFIARBASAJaxDrASAKKQMAIAopAxAgCikDGIRCAFKthCEFIAopAwghBAsgBEI9hiAFQgOIhCICIAWnQQdxIglBBEutfCIDIAJUrSAEQgOIQv///////z+DIAutQjCGhCABhHwhBAJAIAlBBEYEQCAEIANCAYMiASADfCIDIAFUrXwhBAwBCyAJRQ0BCwsgACADNwMAIAAgBDcDCCAKQfAAaiQAC/oBAgN+An8jAEEQayIFJAACfiABvSIDQv///////////wCDIgJCgICAgICAgAh9Qv/////////v/wBYBEAgAkI8hiEEIAJCBIhCgICAgICAgIA8fAwBCyACQoCAgICAgID4/wBaBEAgA0I8hiEEIANCBIhCgICAgICAwP//AIQMAQsgAlAEQEIADAELIAUgAkIAIAOnZ0EgaiACQiCIp2cgAkKAgICAEFQbIgZBMWoQ6QEgBSkDACEEIAUpAwhCgICAgICAwACFQYz4ACAGa61CMIaECyECIAAgBDcDACAAIAIgA0KAgICAgICAgIB/g4Q3AwggBUEQaiQAC9sBAgF/An5BASEEAkAgAEIAUiABQv///////////wCDIgVCgICAgICAwP//AFYgBUKAgICAgIDA//8AURsNACACQgBSIANC////////////AIMiBkKAgICAgIDA//8AViAGQoCAgICAgMD//wBRGw0AIAAgAoQgBSAGhIRQBEBBAA8LIAEgA4NCAFkEQEF/IQQgACACVCABIANTIAEgA1EbDQEgACAChSABIAOFhEIAUg8LQX8hBCAAIAJWIAEgA1UgASADURsNACAAIAKFIAEgA4WEQgBSIQQLIAQLxAECAX8CfkF/IQMCQCAAQgBSIAFC////////////AIMiBEKAgICAgIDA//8AViAEQoCAgICAgMD//wBRGw0AQQAgAkL///////////8AgyIFQoCAgICAgMD//wBWIAVCgICAgICAwP//AFEbDQAgACAEIAWEhFAEQEEADwsgASACg0IAWQRAQQAgASACUyABIAJRGw0BIAAgASAChYRCAFIPCyAAQgBSIAEgAlUgASACURsNACAAIAEgAoWEQgBSIQMLIAMLqQEBAXxEAAAAAAAA8D8hAQJAIABBgAhOBEBEAAAAAAAA4H8hASAAQf8PSQRAIABB/wdrIQAMAgtEAAAAAAAA8H8hASAAQf0XIABB/RdIG0H+D2shAAwBCyAAQYF4Sg0ARAAAAAAAAGADIQEgAEG4cEsEQCAAQckHaiEADAELRAAAAAAAAAAAIQEgAEHwaCAAQfBoShtBkg9qIQALIAEgAEH/B2qtQjSGv6ILNQAgACABNwMAIAAgAkL///////8/gyAEQjCIp0GAgAJxIAJCMIinQf//AXFyrUIwhoQ3AwgLZAIBfwF+IwBBEGsiAiQAIAACfiABRQRAQgAMAQsgAiABrUIAIAFnIgFB0QBqEOkBIAIpAwhCgICAgICAwACFQZ6AASABa61CMIZ8IQMgAikDAAs3AwAgACADNwMIIAJBEGokAAtFAQF/IwBBEGsiBSQAIAUgASACIAMgBEKAgICAgICAgIB/hRDtASAFKQMAIQEgACAFKQMINwMIIAAgATcDACAFQRBqJAALxAIBAX8jAEHQAGsiBCQAAkAgA0GAgAFOBEAgBEEgaiABIAJCAEKAgICAgICA//8AEOwBIAQpAyghAiAEKQMgIQEgA0H//wFJBEAgA0H//wBrIQMMAgsgBEEQaiABIAJCAEKAgICAgICA//8AEOwBIANB/f8CIANB/f8CSBtB/v8BayEDIAQpAxghAiAEKQMQIQEMAQsgA0GBgH9KDQAgBEFAayABIAJCAEKAgICAgICAORDsASAEKQNIIQIgBCkDQCEBIANB9IB+SwRAIANBjf8AaiEDDAELIARBMGogASACQgBCgICAgICAgDkQ7AEgA0HogX0gA0HogX1KG0Ga/gFqIQMgBCkDOCECIAQpAzAhAQsgBCABIAJCACADQf//AGqtQjCGEOwBIAAgBCkDCDcDCCAAIAQpAwA3AwAgBEHQAGokAAt1AQF+IAAgASAEfiACIAN+fCADQiCIIgIgAUIgiCIEfnwgA0L/////D4MiAyABQv////8PgyIBfiIFQiCIIAMgBH58IgNCIIh8IAEgAn4gA0L/////D4N8IgFCIIh8NwMIIAAgBUL/////D4MgAUIghoQ3AwALvg8CBX8PfiMAQdACayIFJAAgBEL///////8/gyELIAJC////////P4MhCiACIASFQoCAgICAgICAgH+DIQ0gBEIwiKdB//8BcSEIAkACQCACQjCIp0H//wFxIglB//8Ba0GCgH5PBEAgCEH//wFrQYGAfksNAQsgAVAgAkL///////////8AgyIMQoCAgICAgMD//wBUIAxCgICAgICAwP//AFEbRQRAIAJCgICAgICAIIQhDQwCCyADUCAEQv///////////wCDIgJCgICAgICAwP//AFQgAkKAgICAgIDA//8AURtFBEAgBEKAgICAgIAghCENIAMhAQwCCyABIAxCgICAgICAwP//AIWEUARAIAMgAkKAgICAgIDA//8AhYRQBEBCACEBQoCAgICA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ASADIAAgBUGB/wAgBGsQ6wEgAykDCCIAQhmIpyECIAMpAwAgAykDECADKQMYhEIAUq2EIgVQIABC////D4MiAEKAgIAIVCAAQoCAgAhRG0UEQCACQQFqIQIMAQsgBSAAQoCAgAiFhEIAUg0AIAJBAXEgAmohAgsgA0EgaiQAIAIgAUIgiKdBgICAgHhxcr4L0wMCAn4CfyMAQSBrIgQkAAJAIAFC////////////AIMiA0KAgICAgIDAgDx9IANCgICAgICAwP/DAH1UBEAgAUIEhiAAQjyIhCEDIABC//////////8PgyIAQoGAgICAgICACFoEQCADQoGAgICAgICAwAB8IQIMAgsgA0KAgICAgICAgEB9IQIgAEKAgICAgICAgAhSDQEgAiADQgGDfCECDAELIABQIANCgICAgICAwP//AFQgA0KAgICAgIDA//8AURtFBEAgAUIEhiAAQjyIhEL/////////A4NCgICAgICAgPz/AIQhAgwBC0KAgICAgICA+P8AIQIgA0L///////+//8MAVg0AQgAhAiADQjCIpyIFQZH3AEkNACAEQRBqIAAgAUL///////8/g0KAgICAgIDAAIQiAiAFQYH3AGsQ6QEgBCAAIAJBgfgAIAVrEOsBIAQpAwhCBIYgBCkDACIAQjyIhCECIAQpAxAgBCkDGIRCAFKtIABC//////////8Pg4QiAEKBgICAgICAgAhaBEAgAkIBfCECDAELIABCgICAgICAgIAIUg0AIAJCAYMgAnwhAgsgBEEgaiQAIAIgAUKAgICAgICAgIB/g4S/C+UCAQZ/IwBBEGsiByQAIANBoMABIAMbIgUoAgAhAwJAAkACQCABRQRAIAMNAQwDC0F+IQQgAkUNAiAAIAdBDGogABshBgJAIAMEQCACIQAMAQsgAS0AACIAQRh0QRh1IgNBAE4EQCAGIAA2AgAgA0EARyEEDAQLIAEsAAAhAEGIwAEoAgAoAgBFBEAgBiAAQf+/A3E2AgBBASEEDAQLIABB/wFxQcIBayIAQTJLDQEgAEECdEGwzwBqKAIAIQMgAkEBayIARQ0CIAFBAWohAQsgAS0AACIIQQN2IglBEGsgA0EadSAJanJBB0sNAANAIABBAWshACAIQYABayADQQZ0ciIDQQBOBEAgBUEANgIAIAYgAzYCACACIABrIQQM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IQQMAQsgAkEENgIAIARCAFUEQEL///////////8AIQQMAQtCgICAgICAgICAfyEECyAFQRBqJAAgBAvJBAEBfyMAQZACayIAJAAgACACNgKAAiAAIAE2AogCIAMQpwIhBiAAQdABaiADIABB/wFqEKgCIABBwAFqENgBIgEgAS0AC0EHdgR/IAEoAghB/////wdxQQFrBUEKCxDbASAAAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsiAjYCvAEgACAAQRBqNgIMIABBADYCCANAAkAgAEGIAmogAEGAAmoQwwFFDQAgACgCvAECfyABLQALQQd2BEAgASgCBAwBCyABLQALCyACakYEQAJ/IAEtAAtBB3YEQCABKAIEDAELIAEtAAsLIQMgAQJ/IAEtAAtBB3YEQCABKAIEDAELIAEtAAsLQQF0ENsBIAEgAS0AC0EHdgR/IAEoAghB/////wdxQQFrBUEKCxDbASAAIAMCfyABLQALQQd2BEAgASgCAAwBCyABCyICajYCvAELIABBiAJqEMQBIAYgAiAAQbwBaiAAQQhqIAAsAP8BIABB0AFqIABBEGogAEEMakHA7gAQqQINACAAQYgCahDFARoMAQsLAkACfyAALQDbAUEHdgRAIAAoAtQBDAELIAAtANsBC0UNACAAKAIMIgMgAEEQamtBnwFKDQAgACADQQRqNgIMIAMgACgCCDYCAAsgBSACIAAoArwBIAQgBhCvAjsBACAAQdABaiAAQRBqIAAoAgwgBBCrAiAAQYgCaiAAQYACahDGAQRAIAQgBCgCAEECcjYCAAsgACgCiAIhAiABEKoEGiAAQdABahCqBBogAEGQAmokACACC94BAgN/AX4jAEEQayIEJAACfwJAAkACQCAAIAFHBEACQAJAIAAtAAAiBUEtRw0AIABBAWoiACABRw0ADAELQeSyASgCACEGQeSyAUEANgIAEL0CGiAAIARBDGogAxCiBCEHAkBB5LIBKAIAIgAEQCAEKAIMIAFHDQEgAEHEAEYNBQwEC0HksgEgBjYCACAEKAIMIAFGDQMLCwsgAkEENgIAQQAMAwsgB0L//wNYDQELIAJBBDYCAEH//wMMAQtBACAHpyIAayAAIAVBLUYbCyEAIARBEGokACAAQf//A3ELyQQBAX8jAEGQAmsiACQAIAAgAjYCgAIgACABNgKIAiADEKcCIQYgAEHQAWogAyAAQf8BahCoAiAAQcABahDYASIBIAEtAAtBB3YEfyABKAIIQf////8HcUEBawVBCgsQ2wEgAAJ/IAEtAAtBB3YEQCABKAIADAELIAELIgI2ArwBIAAgAEEQajYCDCAAQQA2AggDQAJAIABBiAJqIABBgAJqEMMBRQ0AIAAoArwBAn8gAS0AC0EHdgRAIAEoAgQMAQsgAS0ACwsgAmpGBEACfyABLQALQQd2BEAgASgCBAwBCyABLQALCyEDIAECfyABLQALQQd2BEAgASgCBAwBCyABLQALC0EBdBDbASABIAEtAAtBB3YEfyABKAIIQf////8HcUEBawVBCgsQ2wEgACADAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsiAmo2ArwBCyAAQYgCahDEASAGIAIgAEG8AWogAEEIaiAALAD/ASAAQdABaiAAQRBqIABBDGpBwO4AEKkCDQAgAEGIAmoQxQEaDAELCwJAAn8gAC0A2wFBB3YEQCAAKALUAQwBCyAALQDbAQtFDQAgACgCDCIDIABBEGprQZ8BSg0AIAAgA0EEajYCDCADIAAoAgg2AgALIAUgAiAAKAK8ASAEIAYQsQI2AgAgAEHQAWogAEEQaiAAKAIMIAQQqwIgAEGIAmogAEGAAmoQxgEEQCAEIAQoAgBBAnI2AgALIAAoAogCIQIgARCqBBogAEHQAWoQqgQaIABBkAJqJAAgAgvZAQIDfwF+IwBBEGsiBCQAAn8CQAJAAkAgACABRwRAAkACQCAALQAAIgVBLUcNACAAQQFqIgAgAUcNAAwBC0HksgEoAgAhBkHksgFBADYCABC9AhogACAEQQxqIAMQogQhBwJAQeSyASgCACIABEAgBCgCDCABRw0BIABBxABGDQUMBAtB5LIBIAY2AgAgBCgCDCABRg0DCwsLIAJBBDYCAEEADAMLIAdC/////w9YDQELIAJBBDYCAEF/DAELQQAgB6ciAGsgACAFQS1GGwshACAEQRBqJAAgAAvJBAEBfyMAQZACayIAJAAgACACNgKAAiAAIAE2AogCIAMQpwIhBiAAQdABaiADIABB/wFqEKgCIABBwAFqENgBIgEgAS0AC0EHdgR/IAEoAghB/////wdxQQFrBUEKCxDbASAAAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsiAjYCvAEgACAAQRBqNgIMIABBADYCCANAAkAgAEGIAmogAEGAAmoQwwFFDQAgACgCvAECfyABLQALQQd2BEAgASgCBAwBCyABLQALCyACakYEQAJ/IAEtAAtBB3YEQCABKAIEDAELIAEtAAsLIQMgAQJ/IAEtAAtBB3YEQCABKAIEDAELIAEtAAsLQQF0ENsBIAEgAS0AC0EHdgR/IAEoAghB/////wdxQQFrBUEKCxDbASAAIAMCfyABLQALQQd2BEAgASgCAAwBCyABCyICajYCvAELIABBiAJqEMQBIAYgAiAAQbwBaiAAQQhqIAAsAP8BIABB0AFqIABBEGogAEEMakHA7gAQqQINACAAQYgCahDFARoMAQsLAkACfyAALQDbAUEHdgRAIAAoAtQBDAELIAAtANsBC0UNACAAKAIMIgMgAEEQamtBnwFKDQAgACADQQRqNgIMIAMgACgCCDYCAAsgBSACIAAoArwBIAQgBhCzAjcDACAAQdABaiAAQRBqIAAoAgwgBBCrAiAAQYgCaiAAQYACahDGAQRAIAQgBCgCAEECcjYCAAsgACgCiAIhAiABEKoEGiAAQdABahCqBBogAEGQAmokACACC8gBAgN/AX4jAEEQayIEJAACfgJAAkAgACABRwRAAkACQCAALQAAIgVBLUcNACAAQQFqIgAgAUcNAAwBC0HksgEoAgAhBkHksgFBADYCABC9AhogACAEQQxqIAMQogQhBwJAQeSyASgCACIABEAgBCgCDCABRw0BIABBxABGDQQMBQtB5LIBIAY2AgAgBCgCDCABRg0ECwsLIAJBBDYCAEIADAILIAJBBDYCAEJ/DAELQgAgB30gByAFQS1GGwshByAEQRBqJAAgBwvxBAAjAEGQAmsiACQAIAAgAjYCgAIgACABNgKIAiAAQdABaiADIABB4AFqIABB3wFqIABB3gFqELUCIABBwAFqENgBIgEgAS0AC0EHdgR/IAEoAghB/////wdxQQFrBUEKCxDbASAAAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsiAjYCvAEgACAAQRBqNgIMIABBADYCCCAAQQE6AAcgAEHFADoABgNAAkAgAEGIAmogAEGAAmoQwwFFDQAgACgCvAECfyABLQALQQd2BEAgASgCBAwBCyABLQALCyACakYEQAJ/IAEtAAtBB3YE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IGogACgCHCAEEKsCIABBmAJqIABBkAJqEMYBBEAgBCAEKAIAQQJyNgIACyAAKAKYAiECIAEQqgQaIABB4AFqEKoEGiAAQaACaiQAIAILsgICBH4FfyMAQSBrIggkAAJAAkACQCABIAJHBEBB5LIBKAIAIQxB5LIBQQA2AgAjAEEQayIJJAAQvQIaIwBBEGsiCiQAIwBBEGsiCyQAIAsgASAIQRxqQQIQmAIgCykDACEEIAogCykDCDcDCCAKIAQ3AwAgC0EQaiQAIAopAwAhBCAJIAopAwg3AwggCSAENwMAIApBEGokACAJKQMAIQQgCCAJKQMINwMQIAggBDcDCCAJQRBqJAAgCCkDECEEIAgpAwghBUHksgEoAgAiAUUNASAIKAIcIAJHDQIgBSEGIAQhByABQcQARw0DDAILIANBBDYCAAwCC0HksgEgDDYCACAIKAIcIAJGDQELIANBBDYCACAGIQUgByEECyAAIAU3AwAgACAENwMIIAhBIGokAAvtBAECfyMAQZACayIAJAAgACACNgKAAiAAIAE2AogCIABB0AFqENgBIQcgAEEQaiIGIAMoAhwiATYCACABIAEoAgRBAWo2AgQgBhDCASIBQcDuAEHa7gAgAEHgAWogASgCACgCIBEHABogBigCACIBIAEoAgRBAWsiAjYCBCACQX9GBEAgASABKAIAKAIIEQEACyAAQcABahDYASICIAItAAtBB3YEfyACKAIIQf////8HcUEBawVBCgsQ2wEgAAJ/IAItAAtBB3YEQCACKAIADAELIAILIgE2ArwBIAAgBjYCDCAAQQA2AggDQAJAIABBiAJqIABBgAJqEMMBRQ0AIAAoArwBAn8gAi0AC0EHdgRAIAIoAgQMAQsgAi0ACwsgAWpGBEACfyACLQALQQd2BEAgAigCBAwBCyACLQALCyEDIAICfyACLQALQQd2BEAgAigCBAwBCyACLQALC0EBdBDbASACIAItAAtBB3YEfyACKAIIQf////8HcUEBawVBCgsQ2wEgACADAn8gAi0AC0EHdgRAIAIoAgAMAQsgAgsiAWo2ArwBCyAAQYgCahDEAUEQIAEgAEG8AWogAEEIakEAIAcgAEEQaiAAQQxqIABB4AFqEKkCDQAgAEGIAmoQxQEaDAELCyACIAAoArwBIAFrENsBAn8gAi0AC0EHdgRA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AWokACAIKAIMIQQjAEEQayIAJAAgACABNgIIA0AgAiAERwRAIABBCGogAigCABDXASACQQRqIQIMAQsLIAAoAgghASAAQRBqJAAgAyQAIAELBQBB/wALCAAgABDYARoLRQEBfyMAQRBrIgIkACMAQRBrIgEkACAAQQE6AAsgAEEBQS0QrAQgAUEAOgAPIAAgAS0ADzoAASABQRBqJAAgAkEQaiQACwwAIABBgoaAIDYAAAsIAEH/////BwsMACAAQQFBLRDyAhoLSAEBfyMAQRBrIgIkAAJAIAEtAAtBB3ZFBEAgACABKAIINgIIIAAgASkCADcCAAwBCyAAIAEoAgAgASgCBBCtBAsgAkEQaiQAC+IEAQJ/IwBBoAJrIgAkACAAIAI2ApACIAAgATYCmAIgAEGYATYCECAAQZgBaiAAQaABaiAAQRBqEKUCIQcgAEGQAWoiCCAEKAIcIgE2AgAgASABKAIEQQFqNgIEIAgQwgEhASAAQQA6AI8BAkAgAEGYAmogAiADIAggBCgCBCAFIABBjwFqIAEgByAAQZQBaiAAQYQCahCYA0UNACAAQeYTKAAANgCHASAAQd8TKQAANwOAASABIABBgAFqIABBigFqIABB9gBqIAEoAgAoAiARBwAaIABBlwE2AhAgAEEIakEAIABBEGoiBBClAiEBAkAgACgClAEgBygCAGtB4wBOBEAgACgClAEgBygCAGtBAmoQogEhAyABKAIAIQIgASADNgIAIAIEQCACIAEoAgQRAQALIAEoAgBFDQEgASgCACEECyAALQCPAQRAIARBLToAACAEQQFqIQQLIAcoAgAhAgNAIAAoApQBIAJNBEACQCAEQQA6AAAgACAGNgIAIABBEGogABCSAkEBRw0AIAEoAgAhAiABQQA2AgAgAgRAIAIgASgCBBEBAAsMBAsFIAQgAEH2AGoiAyADQQpqIAIQvwIgAGsgAGotAAo6AAAgBEEBaiEEIAJBAWohAgwBCwsQ3AEACxDcAQALIABBmAJqIABBkAJqEMYBBEAgBSAFKAIAQQJyNgIACyAAKAKYAiECIAAoApABIgEgASgCBEEBayIDNgIEIANBf0YEQCABIAEoAgAoAggRAQALIAcoAgAhASAHQQA2AgAgAQRAIAEgBygCBBEBAAsgAEGgAmokACACC6YVAQp/IwBBsARrIgskACALIAo2AqQEIAsgATYCqAQCQCAAIAtBqARqEMYBBEAgBSAFKAIAQQRyNgIAQQAhAAwBCyALQZgBNgJoIAsgC0GIAWogC0GQAWogC0HoAGoiARClAiIPKAIAIgo2AoQBIAsgCkGQA2o2AoABIAEQ2AEhESALQdgAahDYASEOIAtByABqENgBIQ0gC0E4ahDYASEMIAtBKGoQ2AEhECMAQRBrIgEkACALAn8gAgRAIAEgAxCdAyICIAIoAgAoAiwRAgAgCyABKAIANgB4IAEgAiACKAIAKAIgEQIAIAwgARDZASABEKoEGiABIAIgAigCACgCHBECACANIAEQ2QEgARCqBBogCyACIAIoAgAoAgwRAAA6AHcgCyACIAIoAgAoAhARAAA6AHYgASACIAIoAgAoAhQRAgAgESABENkBIAEQqgQaIAEgAiACKAIAKAIYEQIAIA4gARDZASABEKoEGiACIAIoAgAoAiQRAAAMAQsgASADEJ4DIgIgAigCACgCLBECACALIAEoAgA2AHggASACIAIoAgAoAiARAgAgDCABENkBIAEQqgQaIAEgAiACKAIAKAIcEQIAIA0gARDZASABEKoEGiALIAIgAigCACgCDBEAADoAdyALIAIgAigCACgCEBEAADoAdiABIAIgAigCACgCFBECACARIAEQ2QEgARCqBBogASACIAIoAgAoAhgRAgAgDiABENkBIAEQqgQaIAIgAigCACgCJBEAAAs2AiQgAUEQaiQAIAkgCCgCADYCACAEQYAEcSISQQl2IRNBACEDQQAhAQNAIAEhAgJAAkACQAJAIANBBEYNACAAIAtBqARqEMMBRQ0AQQAhCgJAAkACQAJAAkACQCALQfgAaiADaiwAAA4FAQAEAwUJCyADQQNGDQcgABDEASIBQQBOBH8gBygCCCABQf8BcUECdGooAgBBAXEFQQALBEAgC0EYaiAAEJkDIBAgCywAGBCvBAwCCyAFIAUoAgBBBHI2AgBBACEADAYLIANBA0YNBgsDQCAAIAtBqARqEMMBRQ0GIAAQxAEiAUEATgR/IAcoAgggAUH/AXFBAnRqKAIAQQFxBUEAC0UNBiALQRhqIAAQmQMgECALLAAYEK8EDAALAAsCQAJ/IA0tAAtBB3YEQCANKAIEDAELIA0tAAsLRQ0AIAAQxAFB/wFxAn8gDS0AC0EH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QQJqEKIBIQMgASgCACECIAEgAzYCACACBEAgAiABKAIEEQEACyABKAIARQ0BIAEoAgAhBAsgAC0AvwEEQCAEQS06AAAgBEEBaiEECyAHKAIAIQIDQCAAKALEASACTQRAAkAgBEEAOgAAIAAgBjYCACAAQRBqIAAQkgJBAUcNACABKAIAIQIgAUEANgIAIAIEQCACIAEoAgQRAQALDAQLBSAEIABBsAFqIABBgAFqIgMgA0EoaiACENICIANrQQJ1ai0AADoAACAEQQFqIQQgAkEEaiECDAELCxDcAQALENwBAAsgAEHoBGogAEHgBGoQ1AEEQCAFIAUoAgBBAnI2AgALIAAoAugEIQIgACgCwAEiASABKAIEQQFrIgM2AgQgA0F/RgRAIAEgASgCACgCCBEBAAsgBygCACEBIAdBADYCACABBEAgASAHKAIEEQEACyAAQfAEaiQAIAILxhcBCn8jAEGwBGsiCyQAIAsgCjYCpAQgCyABNgKoBAJAIAAgC0GoBGoQ1AEEQCAFIAUoAgBBBHI2AgBBACEADAELIAtBmAE2AmAgCyALQYgBaiALQZABaiALQeAAaiIBEKUCIg8oAgAiCjYChAEgCyAKQZADajYCgAEgARDYASERIAtB0ABqENgBIQ4gC0FAaxDYASENIAtBMGoQ2AEhDCALQSBqENgBIRAjAEEQayIBJAAgCwJ/IAIEQCABIAMQpQMiAiACKAIAKAIsEQIAIAsgASgCADYAeCABIAIgAigCACgCIBECACAMIAEQpgMgARCzBBogASACIAIoAgAoAhwRAgAgDSABEKYDIAEQswQaIAsgAiACKAIAKAIMEQAANgJ0IAsgAiACKAIAKAIQEQAANgJwIAEgAiACKAIAKAIUEQIAIBEgARDZASABEKoEGiABIAIgAigCACgCGBECACAOIAEQpgMgARCzBBogAiACKAIAKAIkEQAADAELIAEgAxCnAyICIAIoAgAoAiwRAgAgCyABKAIANgB4IAEgAiACKAIAKAIgEQIAIAwgARCmAyABELMEGiABIAIgAigCACgCHBECACANIAEQpgMgARCzBBogCyACIAIoAgAoAgwRAAA2AnQgCyACIAIoAgAoAhARAAA2AnAgASACIAIoAgAoAhQRAgAgESABENkBIAEQqgQaIAEgAiACKAIAKAIYEQIAIA4gARCm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ADYCACABBEAgASALKAIEEQEACyAIEKoEGiAHEKoEGiAQEKoEGiAAKALYASIBIAEoAgRBAWsiAzYCBCADQX9GBEAgASABKAIAKAIIEQEACyAKKAIAIQEgCkEANgIAIAEEQCABIAooAgQRAQALIA0oAgAhASANQQA2AgAgAQRAIAEgDSgCBBEBAAsgAEHQA2okACACDwsQ3AEAC9EDAQF/IwBBEGsiCiQAIAkCfyAABEAgAhCdAyEAAkAgAQRAIAogACAAKAIAKAIsEQIAIAMgCigCADYAACAKIAAgACgCACgCIBECAAwBCyAKIAAgACgCACgCKBECACADIAooAgA2AAAgCiAAIAAoAgAoAhwRAgALIAggChDZASAKEKoEGiAEIAAgACgCACgCDBEAADoAACAFIAAgACgCACgCEBEAADoAACAKIAAgACgCACgCFBECACAGIAoQ2QEgChCqBBogCiAAIAAoAgAoAhgRAgAgByAKENkBIAoQqgQaIAAgACgCACgCJBEAAAwBCyACEJ4DIQACQCABBEAgCiAAIAAoAgAoAiwRAgAgAyAKKAIANgAAIAogACAAKAIAKAIgEQIADAELIAogACAAKAIAKAIoEQIAIAMgCigCADYAACAKIAAgACgCACgCHBECAAsgCCAKENkBIAoQqgQaIAQgACAAKAIAKAIMEQAAOgAAIAUgACAAKAIAKAIQEQAAOgAAIAogACAAKAIAKAIUEQIAIAYgChDZASAKEKoEGiAKIAAgACgCACgCGBECACAHIAoQ2QEgChCqBBogACAAKAIAKAIkEQAACzYCACAKQRBqJAALzQcBCn8jAEEQayITJAAgAiAANgIAIANBgARxIRYDQCAUQQRGBEACfyANLQALQQd2BEAgDSgCBAwBCyANLQALC0EBSwRAIBMgDRDUAjYCCCACIBNBCGpBARCfAyANENUCIAIoAgAQrAM2AgALIANBsAFxIgNBEEcEQCABIANBIEYEfyACKAIABSAACzYCAAsgE0EQaiQADwsCQAJAAkACQAJAAkAgCCAUaiwAAA4FAAEDAgQFCyABIAIoAgA2AgAMBAsgASACKAIANgIAIAZBICAGKAIAKAIcEQMAIQ8gAiACKAIAIhBBAWo2AgAgECAPOgAADAMLAn8gDS0AC0EHdgRAIA0oAgQMAQsgDS0ACwtFDQICfyAN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AEkhCyABQRBqJAAgCSAFIAsbKAIAIQELIARBEGokACABDAELEDMACyEEIAAoAgQgACgCAGtBAnUhCUEAIQEjAEEQayIFJAAgBUEANgIMIANBADYCDCADIAg2AhAgBARAIAMoAhAgBBCaBCEBCyADIAE2AgAgAyABIAlBAnRqIgg2AgggAyAINgIEIAMgASAEQQJ0ajYCDCAFQRBqJAAjAEEQayIBJAAgASADKAIINgIAIAMoAgghBCABIANBCGo2AgggASAEIAdBAnRqNgIEIAEoAgAhBANAIAEoAgQgBEcEQCADKAIQGiABKAIAQQA2AgAgASABKAIAQQRqIgQ2AgAMAQsLIAEoAgggASgCADYCACABQRBqJAAgACgCACIEIgEgACgCCCABa0ECdUECdGoaIAMgAygCBCAAKAIEIARrIgFrIgc2AgQgAUEASgRAIAcgBCABEJwBGgsgACgCACEBIAAgAygCBDYCACADIAE2AgQgACgCBCEBIAAgAygCCDYCBCADIAE2AgggACgCCCEBIAAgAygCDDYCCCADIAE2AgwgAyADKAIENgIAIAAoAgQgACgCAGsaIAAoAgAiASAAKAIIIAFrQQJ1QQJ0ahogAygCBCEBA0AgASADKAIIRwRAIAMoAhAaIAMgAygCCEEEazYCCAwBCwsgAygCAARAIAMoAhAgAygCACIBIAMoAgwgAWtBAnUQuwMLCyAKQSBqJAAMAQsgASADSQRAIAAoAgQgACgCACIDaxogACABQQJ0IANqEJwEIAAoAgAiASAAKAIIIAFrQQJ1QQJ0ahogACgCBBoLCwsgACgCACACQQJ0aigCAARAIAAoAgAgAkECdGooAgAiASABKAIEQQFrIgM2AgQgA0F/RgRAIAEgASgCACgCCBEBAAsLIAYoAgghASAGQQA2AgggACgCACACQQJ0aiABNgIAIAYoAgghACAGQQA2AgggAARAIAAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAQALCyAGQRBqJAALxAEBBH8gAEG48AA2AgAgAEEIaiEBA0AgAiABKAIEIAEoAgBrQQJ1SQRAIAEoAgAgAkECdGooAgAEQCABKAIAIAJBAnRqKAIAIgMgAygCBEEBayIENgIEIARBf0YEQCADIAMoAgAoAggRAQALCyACQQFqIQIMAQsLIABB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CwkAIAFBBBDeAQtfAQR/IwBBEGsiACQAIABB/////wM2AgwgAEH/////BzYCCCMAQRBrIgEkACAAQQhqIgIoAgAgAEEMaiIDKAIASSEEIAFBEGokACACIAMgBBsoAgAhASAAQRBqJAAgAQs/AQF/IwBBEGsiAiQAAkACQCABQR5LDQAgAC0AeA0AIABBAToAeAwBCyACQQhqIAEQmwQhAAsgAkEQaiQAIAALHAAgAUH/////A0sEQBCEAQALIAFBAnRBBBDiAQsmAQF/IAAoAgQhAgNAIAEgAkcEQCACQQRrIQIMAQsLIAAgATYCBAsKACAAEL0CNgIACwcAIAAoAgQLCQAgACABEJsEC0YBAX8jAEEQayIDJAACQCAALQALQQd2BEAgACACNgIEDAELIAAgAjoACwsgA0EAOgAPIAEgAmogAy0ADzoAACADQRBqJAALFgAgACABIAJCgICAgICAgICAfxCXAgsNACAAIAEgAkJ/EJcCCzcBAX8CQCAAQQhqIgEoAgAEQCABIAEoAgBBAWsiATYCACABQX9HDQELIAAgACgCACgCEBEBAAsLNAEBfyAAQQEgABshAAJAA0AgABCiASIBDQFB6NABKAIAIgEEQCABEQwADAELCxARAAsgAQs6AQJ/IAEQoAEiAkENahCkBCIDQQA2AgggAyACNgIEIAMgAjYCACAAIANBDGogASACQQFqEJwBNgIACzEAIAFBCU0EQCAAIAFBMGo6AAAgAEEBag8LIAAgAUEBdEGQpQFqLwEAOwAAIABBAmoLPwEBfyAAIAFB5ABuIgJBAXRBkKUBai8BADsAACAAQQJqIgAgASACQeQAbGtBAXRBkKUBai8BADsAACAAQQJqC1kBAX8gAUHjAE0EQCAAIAEQpgQPCyABQecHTQRAIAAgAUHkAG4iAkEwajoAACAAQQFqIgAgASACQeQAbGtBAXRBkKUBai8BADsAACAAQQJqDwsgACABEKcEC9sCAQV/IwBBEGsiCCQAIAIgAUF/c0ERa00EQAJ/IAAtAAtBB3YEQCAAKAIADAELIAALIQkgAAJ/IAFB5////wdJBEAgCCABQQF0NgIIIAggASACajYCDCMAQRBrIgIkACAIQQxqIgooAgAgCEEIaiILKAIASSEMIAJBEGokACALIAogDBsoAgAiAkELTwR/IAJBEGpBcHEi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1y9sayIDQZDOAG4iAhCnBCADIAJBkM4AbGsQpwQLIQJBAAs2AgQgASACNgIAIAAgByAFKAIIEJsCIAYkAAsLACAAIAFBABC4BAstACACRQRAIAAoAgQgASgCBEYPCyAAIAFGBEBBAQ8LIAAoAgQgASgCBBCCAkULogEBAn8jAEFAaiIDJAACf0EBIAAgAUEAELgEDQAaQQAgAUUNABpBACABQdynARC6BCIBRQ0AGiADQQhqIgRBBHJBAEE0EJ4BGiADQQE2AjggA0F/NgIUIAMgADYCECADIAE2AgggASAEIAIoAgBBASABKAIAKAIcEQkAIAMoAiAiAEEBRgRAIAIgAygCGDYCAAsgAEEBRgshACADQUBrJAAgAAu7AgEDfyMAQUBqIgIkACAAKAIAIgNBBGsoAgAhBCADQQhrKAIAIQMgAkIANwMgIAJCADcDKCACQgA3AzAgAkIANwA3IAJCADcDGCACQQA2AhQgAkGspwE2AhAgAiAANgIMIAIgATYCCCAAIANqIQBBACEDAkAgBCABQQAQuAQEQCACQQE2AjggBCACQQhqIAAgAEEBQQAgBCgCACgCFBELACAAQQAgAigCIEEBRhshAwwBCyAEIAJBCGogAEEBQQAgBCgCACgCGBEKAAJAAkAgAigCLA4CAAECCyACKAIcQQAgAigCKEEBRhtBACACKAIkQQFGG0EAIAIoAjBBAUYbIQMMAQsgAigCIEEBRwRAIAIoAjANASACKAIkQQFHDQEgAigCKEEBRw0BCyACKAIYIQMLIAJBQGskACADC10BAX8gACgCECIDRQRAIABBATYCJCAAIAI2AhggACABNgIQDwsCQCABIANGBEAgACgCGEECRw0BIAAgAjYCGA8LIABBAToANiAAQQI2AhggACAAKAIkQQFqNgIkCwsaACAAIAEoAghBABC4BARAIAEgAiADELsECwszACAAIAEoAghBABC4BARAIAEgAiADELsEDwsgACgCCCIAIAEgAiADIAAoAgAoAhwRCQALUgEBfyAAKAIEIQQgACgCACIAIAECf0EAIAJFDQAaIARBCHUiASAEQQFxRQ0AGiABIAIoAgBqKAIACyACaiADQQIgBEECcRsgACgCACgCHBEJAAtsAQJ/IAAgASgCCEEAELgEBEAgASACIAMQuwQPCyAAKAIMIQQgAEEQaiIF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IG9mZnNldCA9PSAtMSBpcyBub3Qgc3VwcG9ydGVkIGF0IHRoaXMgdGltZQBkb3VibGUAdm9pZABsYXN6aXAgZW5jb2RlZABXZWQAc3RkOjpiYWRfYWxsb2MATEFTRl9TcGVjAERlYwBGZWIAQ291bGRuJ3Qgb3BlbiBtZW1fZmlsZSBhcyBMQVMvTEFaACVhICViICVkICVIOiVNOiVTICVZAFBPU0lYACVIOiVNOiVTAENvdWxkbid0IGZpbmQgTEFTWklQIFZMUgBOQU4AUE0AQU0ATENfQUxMAExBTkcATEFTRgBJTkYAQwBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaG9ydD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgc2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgaW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxmbG9hdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDhfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGNoYXI+AHN0ZDo6YmFzaWNfc3RyaW5nPHVuc2lnbmVkIGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxkb3VibGU+ADAxMjM0NTY3ODkAQy5VVEYtOABJbnZhbGlkIExBUyBmaWxlLiBJbmNvcnJlY3QgbWFnaWMgbnVtYmVyLgBIZWFkZXIgYml0cyBpbmRpY2F0ZSB1bnN1cHBvcnRlZCBvbGQtc3R5bGUgY29tcHJlc3Npb24uAEJhZCBjaHVuayB0YWJsZS4gSW52YWxpZCB2ZXJzaW9uLgBVbmV4cGVjdGVkIGVuZCBvZiBmaWxlLgBNaXNzaW5nIGNodW5rIHRhYmxlLgBFcnJvciByZWFkaW5nIGNodW5rIHRhYmxlLgBDb3VsZG4ndCByZWFkIGNodW5rIHRhYmxlLgBIZWFkZXIgaW5kaWNhdGVzIHRoZSBmaWxlIGlzIG5vdCBjb21wcmVzc2VkLgAobnVsbCkAUHVyZSB2aXJ0dWFsIGZ1bmN0aW9uIGNhbGxlZCEATWlzbWF0Y2ggYmV0d2VlbiBwb2ludCBmb3JtYXQgb2YgACBhbmQgY29tcHJlc3NvciB2ZXJzaW9uIG9mIAA2TEFTWmlwAAAAANBVAABpCwAAUDZMQVNaaXAAAAAAsFYAAHwLAAAAAAAAdAsAAFBLNkxBU1ppcAAAALBWAACYCwAAAQAAAHQLAABpaQB2AHZpAIgLAAAMVQAAiAsAAHhVAACQVQAAdmlpaWkAAAAAAAAAgAwAABYAAAAXAAAAGAAAABkAAAAaAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE43bGF6cGVyZjZyZWFkZXI4bWVtX2ZpbGVFTlNfMTBzaGFyZWRfcHRySVMzX0UyN19fc2hhcmVkX3B0cl9kZWZhdWx0X2RlbGV0ZUlTM19TM19FRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQAAAAD4VQAA9AsAAHhSAABOU3QzX18yMTBzaGFyZWRfcHRySU43bGF6cGVyZjZyZWFkZXI4bWVtX2ZpbGVFRTI3X19zaGFyZWRfcHRyX2RlZmF1bHRfZGVsZXRlSVMzX1MzX0VFAAAAeFUAAKQLAABpaWkADFUAAIgLAABsVQAAdmlpaQAxMkNodW5rRGVjb2RlcgDQVQAAAQ0AAFAxMkNodW5rRGVjb2RlcgCwVgAAGA0AAAAAAAAQDQAAUEsxMkNodW5rRGVjb2RlcgAAAACwVgAAOA0AAAEAAAAQDQAAKA0AAAxVAAAoDQAAbFUAAGxVAAB4VQAAdmlpaWlpAAAAAAAALA4AABYAAAAbAAAAHAAAAB0AAAAeAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE43bGF6cGVyZjZyZWFkZXIxOGNodW5rX2RlY29tcHJlc3NvckVOU18xMHNoYXJlZF9wdHJJUzNfRTI3X19zaGFyZWRfcHRyX2RlZmF1bHRfZGVsZXRlSVMzX1MzX0VFTlNfOWFsbG9jYXRvcklTM19FRUVFAPhVAACYDQAAeFIAAE5TdDNfXzIxMHNoYXJlZF9wdHJJTjdsYXpwZXJmNnJlYWRlcjE4Y2h1bmtfZGVjb21wcmVzc29yRUUyN19fc2hhcmVkX3B0cl9kZWZhdWx0X2RlbGV0ZUlTM19TM19FRQAAAAAMVQAAKA0AAHhVAAB3AQAAFAAAABwAAAAaAAAAIgBBxB0LzgMeAAAAJAAAACYAAADs////5P///+b////e////7P///+z////i////3P///9r///8AAAAAwA8AACEAAAAiAAAAIwAAACQAAAAlAAAAJgAAACcAAAAoAAAAKQAAAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSU5TXzZfX2JpbmRJTU43bGF6cGVyZjEySW5GaWxlU3RyZWFtN1ByaXZhdGVFRnZQaG1FSlBTNV9SS05TXzEycGxhY2Vob2xkZXJzNF9fcGhJTGkxRUVFUktOU0JfSUxpMkVFRUVFRU5TXzlhbGxvY2F0b3JJU0lfRUVGdlM2X21FRUUAAAD4VQAAIA8AAOgfAABOU3QzX18yNl9fYmluZElNTjdsYXpwZXJmMTJJbkZpbGVTdHJlYW03UHJpdmF0ZUVGdlBobUVKUFMzX1JLTlNfMTJwbGFjZWhvbGRlcnM0X19waElMaTFFRUVSS05TOV9JTGkyRUVFRUVFAE5TdDNfXzIxOF9fd2Vha19yZXN1bHRfdHlwZUlNTjdsYXpwZXJmMTJJbkZpbGVTdHJlYW03UHJpdmF0ZUVGdlBobUVFRQAAAADQVQAANxAAAPhVAADMDwAAgBAAQaAhC6IrDw4NDAsKCQgOAAEDBgoKCQ0BAgQHCwsKDAMEBQgMDAsLBgcICQ0NDAoKCwwNDg4NCQoLDA0ODw4ICQoLDA0ODwABAgMEBQYHAQABAgMEBQYCAQABAgMEBQMCAQABAgMEBAMCAQABAgMFBAMCAQABAgYFBAMCAQABBwYFBAMCAQAAAQIDBAUDBAQFBQUFBQUFAQABAwMDAwMDAwMDAwMDAwIBAgQEBAQEBAQEAwMDAwMDAwQFBAQEBAQEBAQEBAQEBAMEBAUEBAQEBAQEBAQEBAUDBAQEBQQEBAQEBAQEBAQDAwQEBAQFBAQEBAQEBAQEBAMEBAQEBAUEBAQEBAQEBAQDBAQEBAQEBQQEBAQEBAQFAwQEBAQEBAQFBAQEBAQEBQMEBAQEBAQEBAUEBAQEBAUDAwQEBAQEBAQEBQUEBAQFAwMEBAQEBAQEBAUFBQQEBQMDBAQEBAQEBAQEBQUFBAUDAwQEBAQEBAQEBAQFBQUFAwMEBAQEBAQEBAQEBAUFAAECAwQFBgcHBwcHBwcHBwEAAQIDBAUGBwcHBwcHBwcCAQABAgMEBQYHBwcHBwcHAwIBAAECAwQFBgcHBwcHBwQDAgEAAQIDBAUGBwcHBwcFBAMCAQABAgMEBQYHBwcHBgUEAwIBAAECAwQFBgcHBwcGBQQDAgEAAQIDBAUGBwcHBwYFBAMCAQABAgMEBQYHBwcHBgUEAwIBAAECAwQFBgcHBwcGBQQDAgEAAQIDBAUHBwcHBwYFBAMCAQABAgMEBwcHBwcHBgUEAwIBAAECAwcHBwcHBwcGBQQDAgEAAQIHBwcHBwcHBwYFBAMCAQABBwcHBwcHBwcHBgUEAwIBAAAAAAAkFAAAKgAAACsAAAAsAAAAAAAAAFQUAAAtAAAAKwAAAC4AAAAAAAAAhBQAAC8AAAArAAAAMAAAAAAAAAC0FAAAMQAAACsAAAAyAAAAAAAAAOQUAAAzAAAAKwAAADQAAAAAAAAAPBUAACoAAAA1AAAANgAAAAAAAABIFQAANwAAADgAAAA5AAAAAAAAAHgVAAA6AAAAOwAAADwAAAAAAAAAqBUAAD0AAAA+AAAAPwAAAE43bGF6cGVyZjE2bGFzX2RlY29tcHJlc3NvckUAAAAA0FUAANQTAABON2xhenBlcmYyN3BvaW50X2RlY29tcHJlc3Nvcl9iYXNlXzFfMkUA+FUAAPwTAAD0EwAATjdsYXpwZXJmMjBwb2ludF9kZWNvbXByZXNzb3JfMEUAAAAA+FUAADAUAAAkFAAATjdsYXpwZXJmMjBwb2ludF9kZWNvbXByZXNzb3JfMUUAAAAA+FUAAGAUAAAkFAAATjdsYXpwZXJmMjBwb2ludF9kZWNvbXByZXNzb3JfMkUAAAAA+FUAAJAUAAAkFAAATjdsYXpwZXJmMjBwb2ludF9kZWNvbXByZXNzb3JfM0UAAAAA+FUAAMAUAAAkFAAATjdsYXpwZXJmMjBwb2ludF9kZWNvbXByZXNzb3JfNkUATjdsYXpwZXJmMjdwb2ludF9kZWNvbXByZXNzb3JfYmFzZV8xXzRFAAAAAPhVAAARFQAA9BMAAPhVAADwFAAAPBUAAE43bGF6cGVyZjIwcG9pbnRfZGVjb21wcmVzc29yXzdFAAAAAPhVAABUFQAAPBUAAE43bGF6cGVyZjIwcG9pbnRfZGVjb21wcmVzc29yXzhFAAAAAPhVAACEFQAAPBUAAAAAAAB0FgAAFgAAAEAAAABBAAAAQgAAAEMAAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjdsYXpwZXJmMjBwb2ludF9kZWNvbXByZXNzb3JfMEVOU18xMHNoYXJlZF9wdHJJTlMxXzE2bGFzX2RlY29tcHJlc3NvckVFMjdfX3NoYXJlZF9wdHJfZGVmYXVsdF9kZWxldGVJUzVfUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUAAPhVAADQFQAAeFIAAE5TdDNfXzIxMHNoYXJlZF9wdHJJTjdsYXpwZXJmMTZsYXNfZGVjb21wcmVzc29yRUUyN19fc2hhcmVkX3B0cl9kZWZhdWx0X2RlbGV0ZUlTMl9OUzFfMjBwb2ludF9kZWNvbXByZXNzb3JfMEVFRQAAAAAAsBcAABYAAABEAAAARQAAAEYAAABHAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE43bGF6cGVyZjIwcG9pbnRfZGVjb21wcmVzc29yXzFFTlNfMTBzaGFyZWRfcHRySU5TMV8xNmxhc19kZWNvbXByZXNzb3JFRTI3X19zaGFyZWRfcHRyX2RlZmF1bHRfZGVsZXRlSVM1X1MyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAAD4VQAADBcAAHhSAABOU3QzX18yMTBzaGFyZWRfcHRySU43bGF6cGVyZjE2bGFzX2RlY29tcHJlc3NvckVFMjdfX3NoYXJlZF9wdHJfZGVmYXVsdF9kZWxldGVJUzJfTlMxXzIwcG9pbnRfZGVjb21wcmVzc29yXzFFRUUAAAAAAOwYAAAWAAAASAAAAEkAAABKAAAASwAAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBON2xhenBlcmYyMHBvaW50X2RlY29tcHJlc3Nvcl8yRU5TXzEwc2hhcmVkX3B0cklOUzFfMTZsYXNfZGVjb21wcmVzc29yRUUyN19fc2hhcmVkX3B0cl9kZWZhdWx0X2RlbGV0ZUlTNV9TMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQAA+FUAAEgYAAB4UgAATlN0M19fMjEwc2hhcmVkX3B0cklON2xhenBlcmYxNmxhc19kZWNvbXByZXNzb3JFRTI3X19zaGFyZWRfcHRyX2RlZmF1bHRfZGVsZXRlSVMyX05TMV8yMHBvaW50X2RlY29tcHJlc3Nvcl8yRUVFAAAAAAAoGgAAFgAAAEwAAABNAAAATgAAAE8AAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjdsYXpwZXJmMjBwb2ludF9kZWNvbXByZXNzb3JfM0VOU18xMHNoYXJlZF9wdHJJTlMxXzE2bGFzX2RlY29tcHJlc3NvckVFMjdfX3NoYXJlZF9wdHJfZGVmYXVsdF9kZWxldGVJUzVfUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUAAPhVAACEGQAAeFIAAE5TdDNfXzIxMHNoYXJlZF9wdHJJTjdsYXpwZXJmMTZsYXNfZGVjb21wcmVzc29yRUUyN19fc2hhcmVkX3B0cl9kZWZhdWx0X2RlbGV0ZUlTMl9OUzFfMjBwb2ludF9kZWNvbXByZXNzb3JfM0VFRQAAAAAAZBsAABYAAABQAAAAUQAAAFIAAABTAAAATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE43bGF6cGVyZjIwcG9pbnRfZGVjb21wcmVzc29yXzZFTlNfMTBzaGFyZWRfcHRySU5TMV8xNmxhc19kZWNvbXByZXNzb3JFRTI3X19zaGFyZWRfcHRyX2RlZmF1bHRfZGVsZXRlSVM1X1MyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAAD4VQAAwBoAAHhSAABOU3QzX18yMTBzaGFyZWRfcHRySU43bGF6cGVyZjE2bGFzX2RlY29tcHJlc3NvckVFMjdfX3NoYXJlZF9wdHJfZGVmYXVsdF9kZWxldGVJUzJfTlMxXzIwcG9pbnRfZGVjb21wcmVzc29yXzZFRUUAAAAAAKAcAAAWAAAAVAAAAFUAAABWAAAAVwAAAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBON2xhenBlcmYyMHBvaW50X2RlY29tcHJlc3Nvcl83RU5TXzEwc2hhcmVkX3B0cklOUzFfMTZsYXNfZGVjb21wcmVzc29yRUUyN19fc2hhcmVkX3B0cl9kZWZhdWx0X2RlbGV0ZUlTNV9TMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQAA+FUAAPwbAAB4UgAATlN0M19fMjEwc2hhcmVkX3B0cklON2xhenBlcmYxNmxhc19kZWNvbXByZXNzb3JFRTI3X19zaGFyZWRfcHRyX2RlZmF1bHRfZGVsZXRlSVMyX05TMV8yMHBvaW50X2RlY29tcHJlc3Nvcl83RUVFAAAAAADcHQAAFgAAAFgAAABZAAAAWgAAAFsAAABOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjdsYXpwZXJmMjBwb2ludF9kZWNvbXByZXNzb3JfOEVOU18xMHNoYXJlZF9wdHJJTlMxXzE2bGFzX2RlY29tcHJlc3NvckVFMjdfX3NoYXJlZF9wdHJfZGVmYXVsdF9kZWxldGVJUzVfUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUAAPhVAAA4HQAAeFIAAE5TdDNfXzIxMHNoYXJlZF9wdHJJTjdsYXpwZXJmMTZsYXNfZGVjb21wcmVzc29yRUUyN19fc2hhcmVkX3B0cl9kZWZhdWx0X2RlbGV0ZUlTMl9OUzFfMjBwb2ludF9kZWNvbXByZXNzb3JfOEVFRQAAAAAArB4AAFwAAABdAAAAXgAAAF8AAABgAAAAYQAAAGIAAABjAAAAZAAAAGUAAABmAAAAZwAAAGgAAABpAAAATjdsYXpwZXJmN2NoYXJidWZFAAD4VQAAmB4AAMglAABON2xhenBlcmY1ZXJyb3JFAAAAAPhVAAC4HgAA6FcAAAAAAADMHgAAIAAAAG4AAABvAAAAAAAAAPAfAAAhAAAAcAAAAHEAAAByAAAAcwAAAHQAAAB1AAAAdgAAAHcAAABOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0lOU182X19iaW5kSU1ON2xhenBlcmY2cmVhZGVyMThjaHVua19kZWNvbXByZXNzb3I3UHJpdmF0ZUVGdlBoaUVKUFM2X1JLTlNfMTJwbGFjZWhvbGRlcnM0X19waElMaTFFRUVSS05TQ19JTGkyRUVFRUVFTlNfOWFsbG9jYXRvcklTSl9FRUZ2UzdfbUVFRQBOU3QzX18yMTBfX2Z1bmN0aW9uNl9fYmFzZUlGdlBobUVFRQAA0FUAAMMfAAD4VQAAGB8AAOgfAABOU3QzX18yNl9fYmluZElNTjdsYXpwZXJmNnJlYWRlcjE4Y2h1bmtfZGVjb21wcmVzc29yN1ByaXZhdGVFRnZQaGlFSlBTNF9SS05TXzEycGxhY2Vob2xkZXJzNF9fcGhJTGkxRUVFUktOU0FfSUxpMkVFRUVFRQBOU3QzX18yMThfX3dlYWtfcmVzdWx0X3R5cGVJTU43bGF6cGVyZjZyZWFkZXIxOGNodW5rX2RlY29tcHJlc3NvcjdQcml2YXRlRUZ2UGhpRUVFAADQVQAAdCAAAPhVAAD8HwAAyCAAAAAAAABAIQAAeAAAAHkAAAB6AAAAewAAAHwAAAAAAAAAYCEAAH0AAAB+AAAAfwAAAIAAAACBAAAATjdsYXpwZXJmM3ZsckUAANBVAAAUIQAATjdsYXpwZXJmN2xhel92bHJFAAD4VQAALCEAACQhAABON2xhenBlcmY2ZWJfdmxyRQAAAPhVAABMIQAAJCEAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFAADQVQAAbCEAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0loTlNfMTFjaGFyX3RyYWl0c0loRUVOU185YWxsb2NhdG9ySWhFRUVFAADQVQAAtCEAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0l3TlNfMTFjaGFyX3RyYWl0c0l3RUVOU185YWxsb2NhdG9ySXdFRUVFAADQVQAA/CEAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0lEc05TXzExY2hhcl90cmFpdHNJRHNFRU5TXzlhbGxvY2F0b3JJRHNFRUVFAAAA0FUAAEQiAABOU3QzX18yMTJiYXNpY19zdHJpbmdJRGlOU18xMWNoYXJfdHJhaXRzSURpRUVOU185YWxsb2NhdG9ySURpRUVFRQAAANBVAACQIgAATjEwZW1zY3JpcHRlbjN2YWxFAADQVQAA3CIAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWNFRQAA0FUAAPgiAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lhRUUAANBVAAAgIwAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJaEVFAADQVQAASCMAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXNFRQAA0FUAAHAjAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0l0RUUAANBVAACYIwAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJaUVFAADQVQAAwCMAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWpFRQAA0FUAAOgjAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lsRUUAANBVAAAQJAAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJbUVFAADQVQAAOCQAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWZFRQAA0FUAAGAkAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lkRUUAANBVAACIJAAAAAAAAOAkAABqAAAAgwAAAIQAAABOU3QzX18yMTdiYWRfZnVuY3Rpb25fY2FsbEUA+FUAAMQkAAAQVwAAAAAAAMglAABcAAAAhQAAAF4AAABfAAAAhgAAAIcAAABiAAAAYwAAAGQAAABlAAAAZgAAAGcAAABoAAAAaQAAAAgAAAAAAAAAACYAAIgAAACJAAAA+P////j///8AJgAAigAAAIsAAAA4JQAATCUAAE5TdDNfXzI5YmFzaWNfaW9zSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFAAAA+FUAAFwlAAA8JgAATlN0M19fMjE1YmFzaWNfc3RyZWFtYnVmSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFAAAAANBVAACUJQAATlN0M19fMjEzYmFzaWNfaXN0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRQAAVFYAANAlAAAAAAAAAQAAAIglAAAD9P//AAAAADwmAACMAAAAjQAAAE5TdDNfXzI4aW9zX2Jhc2VFAAAA0FUAACgmAEHQzAAL0wTRdJ4AV529KoBwUg///z4nCgAAAGQAAADoAwAAECcAAKCGAQBAQg8AgJaYAADh9QUYAAAANQAAAHEAAABr////zvv//5K///8AAAAAAAAAAP////////////////////////////////////////////////////////////////8AAQIDBAUGBwgJ/////////woLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj////////CgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAECBAcDBgUAAAAAAAAAAgAAwAMAAMAEAADABQAAwAYAAMAHAADACAAAwAkAAMAKAADACwAAwAwAAMANAADADgAAwA8AAMAQAADAEQAAwBIAAMATAADAFAAAwBUAAMAWAADAFwAAwBgAAMAZAADAGgAAwBsAAMAcAADAHQAAwB4AAMAfAADAAAAAswEAAMMCAADDAwAAwwQAAMMFAADDBgAAwwcAAMMIAADDCQAAwwoAAMMLAADDDAAAww0AANMOAADDDwAAwwAADLsBAAzDAgAMwwMADMMEAAzbAAAAAN4SBJUAAAAA////////////////gCgAABQAAABDLlVURi04AEHQ0QALApQoAEHw0QALR0xDX0NUWVBFAAAAAExDX05VTUVSSUMAAExDX1RJTUUAAAAAAExDX0NPTExBVEUAAExDX01PTkVUQVJZAExDX01FU1NBR0VTAEHA0gALQRkACgAZGRkAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAGQARChkZGQMKBwABAAkLGAAACQYLAAALAAYZAAAAGRkZAEGR0wALIQ4AAAAAAAAAABkACg0ZGRkADQAAAgAJDgAAAAkADgAADgBBy9MACwEMAEHX0wALFRMAAAAAEwAAAAAJDAAAAAAADAAADABBhdQACwEQAEGR1AALFQ8AAAAEDwAAAAAJEAAAAAAAEAAAEABBv9QACwESAEHL1AALHhEAAAAAEQAAAAAJ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AABOU3QzX18yMTBtb25leXB1bmN0SWNMYjFFRUUAVFYAAOBJAAAAAAAAAgAAACQ+AAACAAAAgEkAAAIAAAAAAAAAcEoAAM0AAAByAQAAqwAAAHMBAAB0AQAAdQEAAHYBAAB3AQAAeAEAAHkBAAB6AQAAewEAAE5TdDNfXzIxMG1vbmV5cHVuY3RJd0xiMEVFRQBUVgAAVEoAAAAAAAACAAAAJD4AAAIAAACASQAAAgAAAAAAAADkSgAAzQAAAHwBAACrAAAAfQEAAH4BAAB/AQAAgAEAAIEBAACCAQAAgwEAAIQBAACFAQAATlN0M19fMjEwbW9uZXlwdW5jdEl3TGIxRUVFAFRWAADISgAAAAAAAAIAAAAkPgAAAgAAAIBJAAACAAAAAAAAAIhLAADNAAAAhgEAAKsAAACHAQAAiAEAAE5TdDNfXzI5bW9uZXlfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X2dldEljRUUAANBVAABmSwAAVFYAACBLAAAAAAAAAgAAACQ+AAACAAAAgEsAQayXAQuaASxMAADNAAAAiQEAAKsAAACKAQAAiwEAAE5TdDNfXzI5bW9uZXlfZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X2dldEl3RUUAANBVAAAKTAAAVFYAAMRLAAAAAAAAAgAAACQ+AAACAAAAJEwAQdCYAQuaAdBMAADNAAAAjAEAAKsAAACNAQAAjgEAAE5TdDNfXzI5bW9uZXlfcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X3B1dEljRUUAANBVAACuTAAAVFYAAGhMAAAAAAAAAgAAACQ+AAACAAAAyEwAQfSZAQuaAXRNAADNAAAAjwEAAKsAAACQAQAAkQEAAE5TdDNfXzI5bW9uZXlfcHV0SXdOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X3B1dEl3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");B=g()({wasmBinary:A})}return B}().then(function(A){var g,B={versionMajor:(g=new DataView(I)).getUint8(24),versionMinor:g.getUint8(25),pointFormat:63&g.getUint8(104),pointLength:g.getUint16(105,!0),scale:[g.getFloat64(131,!0),g.getFloat64(139,!0),g.getFloat64(147,!0)],offset:[g.getFloat64(155,!0),g.getFloat64(163,!0),g.getFloat64(171,!0)]},E=C(B.pointFormat),i=new Uint8Array(I),o=A._malloc(i.length);A.HEAPU8.set(i,o);var D=new A.LASZip;try{D.open(o,i.length);for(var a=D.getCount(),w=D.getPointLength(),t=D.getPointFormat(),s=w||B.pointLength,F=null==t?B.pointFormat:t,y=F===B.pointFormat?E:C(F),N=A._malloc(s),e=new Float32Array(3*a),R=new Float32Array(a),G=new Uint8Array(a),M=null!==y.rgb,r=M?new Uint8Array(3*a):null,c=B.scale[0],Y=B.scale[1],S=B.scale[2],h=B.offset[0],n=B.offset[1],L=B.offset[2],K=Q[0],U=Q[1],k=Q[2],J=Number.POSITIVE_INFINITY,H=Number.POSITIVE_INFINITY,d=Number.POSITIVE_INFINITY,l=Number.NEGATIVE_INFINITY,f=Number.NEGATIVE_INFINITY,q=Number.NEGATIVE_INFINITY,p=0,u=0,m=0,T=A.HEAPU8.buffer,j=new DataView(T,N,s),x=0;x<a;x++){D.getPoint(N);var b=j.getInt32(0,!0),W=j.getInt32(4,!0),V=j.getInt32(8,!0),X=b*c+h-K,Z=W*Y+n-U,O=V*S+L-k;e[3*x+0]=X,e[3*x+1]=Z,e[3*x+2]=O,p+=X,u+=Z,m+=O,X<J&&(J=X),Z<H&&(H=Z),O<d&&(d=O),X>l&&(l=X),Z>f&&(f=Z),O>q&&(q=O),R[x]=j.getUint16(y.intensity,!0);var v=j.getUint8(y.classification);if(G[x]=F<=5?31&v:v,M&&r){var P=j.getUint16(y.rgb,!0),z=j.getUint16(y.rgb+2,!0),_=j.getUint16(y.rgb+4,!0);r[3*x+0]=P>255?P>>8:P,r[3*x+1]=z>255?z>>8:z,r[3*x+2]=_>255?_>>8:_}}A._free(N);for(var $=a>0?[p/a,u/a,m/a]:[0,0,0],AA=a>0?{min:[J,H,d],max:[l,f,q]}:{min:[0,0,0],max:[0,0,0]},gA=new ArrayBuffer(4*a),IA=new Uint32Array(gA),BA=0;BA<a;BA++)IA[BA]=BA;var CA={};return CA[0]={buffer:e.buffer},CA[6]={buffer:R.buffer},CA[7]={buffer:G.buffer},r&&(CA[1]={buffer:r.buffer}),{numPoints:a,attributeBuffers:CA,indices:gA,tightBoundingBox:AA,mean:$}}finally{D.delete(),A._free(o)}})).then(function(A){var g=[A.indices],I=A.attributeBuffers;Object.keys(I).forEach(function(A){g.push(I[A].buffer)}),postMessage(A,g)}).catch(function(A){postMessage({error:A&&A.message?A.message:String(A)})})}})()})();\n',
              'Worker',
              void 0,
              void 0,
            );
          }
        },
        414: (A, g, I) => {
          I.r(g), I.d(g, { default: () => B });
          const B =
            'precision highp float;\nprecision highp int;\n\nuniform mat4 projectionMatrix;\n\nuniform float screenWidth;\nuniform float screenHeight;\n\nuniform sampler2D map;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n\tfloat dx = 1.0 / screenWidth;\n\tfloat dy = 1.0 / screenHeight;\n\n\tvec3 color = vec3(0.0, 0.0, 0.0);\n\tcolor += texture2D(map, vUv + vec2(-dx, -dy)).rgb;\n\tcolor += texture2D(map, vUv + vec2(  0, -dy)).rgb;\n\tcolor += texture2D(map, vUv + vec2(+dx, -dy)).rgb;\n\tcolor += texture2D(map, vUv + vec2(-dx,   0)).rgb;\n\tcolor += texture2D(map, vUv + vec2(  0,   0)).rgb;\n\tcolor += texture2D(map, vUv + vec2(+dx,   0)).rgb;\n\tcolor += texture2D(map, vUv + vec2(-dx,  dy)).rgb;\n\tcolor += texture2D(map, vUv + vec2(  0,  dy)).rgb;\n\tcolor += texture2D(map, vUv + vec2(+dx,  dy)).rgb;\n    \n\tcolor = color / 9.0;\n\t\n\tgl_FragColor = vec4(color, 1.0);\n\t\n\t\n}';
        },
        422: (A, g, I) => {
          I.d(g, { A: () => B });
          const B =
            'precision highp float;\nprecision highp int;\n\nuniform float opacity;\nuniform bool renderIds;\nuniform bool debugMode;\n\nuniform bool useClipping;\nuniform float screenWidth;\nuniform float screenHeight;\nuniform vec4 clipExtent;\n\nin vec3 vColor;\nin float vOpacity;\nin vec2 vPosition;\nin float backfaseCulling;\nin vec2 vID;\nin float vRenderScale;\n\nout vec4 color_data;\n\nuvec3 murmurHash31(uint src) {\n    const uint M = 0x5bd1e995u;\n    uvec3 h = uvec3(1190494759u, 2147483647u, 3559788179u);\n    src *= M; src ^= src>>24u; src *= M;\n    h *= M; h ^= src;\n    h ^= h>>13u; h *= M; h ^= h>>15u;\n    return h;\n}\n\n// 3 outputs, 1 input\nvec3 hash31(float src) {\n    uvec3 h = murmurHash31(floatBitsToUint(src));\n    return uintBitsToFloat(h & 0x007fffffu | 0x3f800000u) - 1.0;\n}\n\nvoid main() {\n\n\tif(useClipping) {\n\t\tvec2 ndc = vec2((gl_FragCoord.x / screenWidth), 1.0 - (gl_FragCoord.y / screenHeight));\n\n\t\tif(step(clipExtent.x, ndc.x) * step(ndc.x, clipExtent.z) < 1.0)\n\t\t{\n\t\t\tdiscard;\n\t\t}\n\n\t\tif(step(clipExtent.y, ndc.y) * step(ndc.y, clipExtent.w) < 1.0)\n\t\t{\n\t\t\tdiscard;\n\t\t}\n\t}\n\n\tfloat A = dot(vPosition, vPosition);\n\tif (A > 8.0) discard;\n\t\n\tfloat opacity = exp(-0.5 * A) * vOpacity;\n\tcolor_data = vec4(vColor, opacity);\n\t\n\tif(debugMode){\n\t\tif(opacity < 0.1) discard;\n\t\tcolor_data = vec4( hash31(vID.x), 1.);\t\n\t}\n\n\tif(renderIds) {\n\t\tif(opacity < 0.1) discard;\n\t\tcolor_data = vec4(vID, vRenderScale, 1.);\n\t} \n\n}\n';
        },
        512: (A) => {
          A.exports = function (A, g, I, B) {
            var C = self || window;
            try {
              try {
                var Q;
                try {
                  Q = new C.Blob([A]);
                } catch (g) {
                  (Q = new (C.BlobBuilder ||
                    C.WebKitBlobBuilder ||
                    C.MozBlobBuilder ||
                    C.MSBlobBuilder)()).append(A),
                    (Q = Q.getBlob());
                }
                var E = C.URL || C.webkitURL,
                  t = E.createObjectURL(Q),
                  e = new C[g](t, I);
                return E.revokeObjectURL(t), e;
              } catch (B) {
                return new C[g]('data:application/javascript,'.concat(encodeURIComponent(A)), I);
              }
            } catch (A) {
              if (!B) throw Error('Inline worker is not supported');
              return new C[g](B, I);
            }
          };
        },
        575: (A, g, I) => {
          I.r(g), I.d(g, { default: () => B });
          const B =
            'precision highp float;\nprecision highp int;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n\n    gl_Position =   projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}';
        },
        604: (g) => {
          g.exports = A;
        },
        741: (A, g, I) => {
          I.d(g, { A: () => Q });
          var B = I(512),
            C = I.n(B);
          function Q() {
            return C()(
              '(()=>{var e={17:(e,t,n)=>{var r=n(526);t.init=function(){return(0,n(206).BrotliDecompressBuffer)(r.toByteArray(n(611)))}},35:e=>{var t=4096,n=new Uint32Array([0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535,131071,262143,524287,1048575,2097151,4194303,8388607,16777215]);function r(e){this.buf_=new Uint8Array(8224),this.input_=e,this.reset()}r.READ_SIZE=t,r.IBUF_MASK=8191,r.prototype.reset=function(){this.buf_ptr_=0,this.val_=0,this.pos_=0,this.bit_pos_=0,this.bit_end_pos_=0,this.eos_=0,this.readMoreInput();for(var e=0;e<4;e++)this.val_|=this.buf_[this.pos_]<<8*e,++this.pos_;return this.bit_end_pos_>0},r.prototype.readMoreInput=function(){if(!(this.bit_end_pos_>256))if(this.eos_){if(this.bit_pos_>this.bit_end_pos_)throw new Error("Unexpected end of input "+this.bit_pos_+" "+this.bit_end_pos_)}else{var e=this.buf_ptr_,n=this.input_.read(this.buf_,e,t);if(n<0)throw new Error("Unexpected end of input");if(n<t){this.eos_=1;for(var r=0;r<32;r++)this.buf_[e+n+r]=0}if(0===e){for(r=0;r<32;r++)this.buf_[8192+r]=this.buf_[r];this.buf_ptr_=t}else this.buf_ptr_=0;this.bit_end_pos_+=n<<3}},r.prototype.fillBitWindow=function(){for(;this.bit_pos_>=8;)this.val_>>>=8,this.val_|=this.buf_[8191&this.pos_]<<24,++this.pos_,this.bit_pos_=this.bit_pos_-8>>>0,this.bit_end_pos_=this.bit_end_pos_-8>>>0},r.prototype.readBits=function(e){32-this.bit_pos_<e&&this.fillBitWindow();var t=this.val_>>>this.bit_pos_&n[e];return this.bit_pos_+=e,t},e.exports=r},171:(e,t)=>{function n(e,t){this.bits=e,this.value=t}t.z=n;function r(e,t){for(var n=1<<t-1;e&n;)n>>=1;return(e&n-1)+n}function i(e,t,r,i,o){do{e[t+(i-=r)]=new n(o.bits,o.value)}while(i>0)}function o(e,t,n){for(var r=1<<t-n;t<15&&!((r-=e[t])<=0);)++t,r<<=1;return t-n}t.u=function(e,t,a,s,f){var w,u,d,l,h,p,b,c,y,v,m=t,A=new Int32Array(16),E=new Int32Array(16);for(v=new Int32Array(f),u=0;u<f;u++)A[s[u]]++;for(E[1]=0,w=1;w<15;w++)E[w+1]=E[w]+A[w];for(u=0;u<f;u++)0!==s[u]&&(v[E[s[u]]++]=u);if(y=c=1<<(b=a),1===E[15]){for(d=0;d<y;++d)e[t+d]=new n(0,65535&v[0]);return y}for(d=0,u=0,w=1,l=2;w<=a;++w,l<<=1)for(;A[w]>0;--A[w])i(e,t+d,l,c,new n(255&w,65535&v[u++])),d=r(d,w);for(p=y-1,h=-1,w=a+1,l=2;w<=15;++w,l<<=1)for(;A[w]>0;--A[w])(d&p)!==h&&(t+=c,y+=c=1<<(b=o(A,w,a)),e[m+(h=d&p)]=new n(b+a&255,t-m-h&65535)),i(e,t+(d>>a),l,c,new n(w-a&255,65535&v[u++])),d=r(d,w);return y}},206:(e,t,n)=>{var r=n(927).z,i=n(927).y,o=n(35),a=n(712),s=n(171).z,f=n(171).u,w=n(805),u=n(708),d=n(270),l=1080,h=new Uint8Array([1,2,3,4,0,5,17,6,16,7,8,9,10,11,12,13,14,15]),p=new Uint8Array([3,2,1,0,3,3,3,3,3,3,2,2,2,2,2,2]),b=new Int8Array([0,0,0,0,-1,1,-2,2,-3,3,-1,1,-2,2,-3,3]),c=new Uint16Array([256,402,436,468,500,534,566,598,630,662,694,726,758,790,822,854,886,920,952,984,1016,1048,1080]);function y(e){var t;return 0===e.readBits(1)?16:(t=e.readBits(3))>0?17+t:(t=e.readBits(3))>0?8+t:17}function v(e){if(e.readBits(1)){var t=e.readBits(3);return 0===t?1:e.readBits(t)+(1<<t)}return 0}function m(){this.meta_block_length=0,this.input_end=0,this.is_uncompressed=0,this.is_metadata=!1}function A(e){var t,n,r,i=new m;if(i.input_end=e.readBits(1),i.input_end&&e.readBits(1))return i;if(7===(t=e.readBits(2)+4)){if(i.is_metadata=!0,0!==e.readBits(1))throw new Error("Invalid reserved bit");if(0===(n=e.readBits(2)))return i;for(r=0;r<n;r++){var o=e.readBits(8);if(r+1===n&&n>1&&0===o)throw new Error("Invalid size byte");i.meta_block_length|=o<<8*r}}else for(r=0;r<t;++r){var a=e.readBits(4);if(r+1===t&&t>4&&0===a)throw new Error("Invalid size nibble");i.meta_block_length|=a<<4*r}return++i.meta_block_length,i.input_end||i.is_metadata||(i.is_uncompressed=e.readBits(1)),i}function E(e,t,n){var r;return n.fillBitWindow(),(r=e[t+=n.val_>>>n.bit_pos_&255].bits-8)>0&&(n.bit_pos_+=8,t+=e[t].value,t+=n.val_>>>n.bit_pos_&(1<<r)-1),n.bit_pos_+=e[t].bits,e[t].value}function N(e,t,n,r){var i,o,a=new Uint8Array(e);if(r.readMoreInput(),1===(o=r.readBits(2))){for(var w=e-1,u=0,d=new Int32Array(4),l=r.readBits(2)+1;w;)w>>=1,++u;for(p=0;p<l;++p)d[p]=r.readBits(u)%e,a[d[p]]=2;switch(a[d[0]]=1,l){case 1:break;case 3:if(d[0]===d[1]||d[0]===d[2]||d[1]===d[2])throw new Error("[ReadHuffmanCode] invalid symbols");break;case 2:if(d[0]===d[1])throw new Error("[ReadHuffmanCode] invalid symbols");a[d[1]]=1;break;case 4:if(d[0]===d[1]||d[0]===d[2]||d[0]===d[3]||d[1]===d[2]||d[1]===d[3]||d[2]===d[3])throw new Error("[ReadHuffmanCode] invalid symbols");r.readBits(1)?(a[d[2]]=3,a[d[3]]=3):a[d[0]]=2}}else{var p,b=new Uint8Array(18),c=32,y=0,v=[new s(2,0),new s(2,4),new s(2,3),new s(3,2),new s(2,0),new s(2,4),new s(2,3),new s(4,1),new s(2,0),new s(2,4),new s(2,3),new s(3,2),new s(2,0),new s(2,4),new s(2,3),new s(4,5)];for(p=o;p<18&&c>0;++p){var m,A=h[p],E=0;r.fillBitWindow(),E+=r.val_>>>r.bit_pos_&15,r.bit_pos_+=v[E].bits,m=v[E].value,b[A]=m,0!==m&&(c-=32>>m,++y)}if(1!==y&&0!==c)throw new Error("[ReadHuffmanCode] invalid num_codes or space");!function(e,t,n,r){for(var i=0,o=8,a=0,w=0,u=32768,d=[],l=0;l<32;l++)d.push(new s(0,0));for(f(d,0,5,e,18);i<t&&u>0;){var h,p=0;if(r.readMoreInput(),r.fillBitWindow(),p+=r.val_>>>r.bit_pos_&31,r.bit_pos_+=d[p].bits,(h=255&d[p].value)<16)a=0,n[i++]=h,0!==h&&(o=h,u-=32768>>h);else{var b,c,y=h-14,v=0;if(16===h&&(v=o),w!==v&&(a=0,w=v),b=a,a>0&&(a-=2,a<<=y),i+(c=(a+=r.readBits(y)+3)-b)>t)throw new Error("[ReadHuffmanCodeLengths] symbol + repeat_delta > num_symbols");for(var m=0;m<c;m++)n[i+m]=w;i+=c,0!==w&&(u-=c<<15-w)}}if(0!==u)throw new Error("[ReadHuffmanCodeLengths] space = "+u);for(;i<t;i++)n[i]=0}(b,e,a,r)}if(0===(i=f(t,n,8,a,e)))throw new Error("[ReadHuffmanCode] BuildHuffmanTable failed: ");return i}function U(e,t,n){var r,i;return r=E(e,t,n),i=u.kBlockLengthPrefixCode[r].nbits,u.kBlockLengthPrefixCode[r].offset+n.readBits(i)}function T(e,t,n){var r;return e<16?(n+=p[e],r=t[n&=3]+b[e]):r=e-16+1,r}function W(e,t){for(var n=e[t],r=t;r;--r)e[r]=e[r-1];e[0]=n}function O(e,t){this.alphabet_size=e,this.num_htrees=t,this.codes=new Array(t+t*c[e+31>>>5]),this.htrees=new Uint32Array(t)}function x(e,t){var n,r,i={num_htrees:null,context_map:null},o=0;t.readMoreInput();var a=i.num_htrees=v(t)+1,f=i.context_map=new Uint8Array(e);if(a<=1)return i;for(t.readBits(1)&&(o=t.readBits(4)+1),n=[],r=0;r<l;r++)n[r]=new s(0,0);for(N(a+o,n,0,t),r=0;r<e;){var w;if(t.readMoreInput(),0===(w=E(n,0,t)))f[r]=0,++r;else if(w<=o)for(var u=1+(1<<w)+t.readBits(w);--u;){if(r>=e)throw new Error("[DecodeContextMap] i >= context_map_size");f[r]=0,++r}else f[r]=w-o,++r}return t.readBits(1)&&function(e,t){var n,r=new Uint8Array(256);for(n=0;n<256;++n)r[n]=n;for(n=0;n<t;++n){var i=e[n];e[n]=r[i],i&&W(r,i)}}(f,e),i}function Y(e,t,n,r,i,o,a){var s,f=2*n,w=n,u=E(t,n*l,a);(s=0===u?i[f+(1&o[w])]:1===u?i[f+(o[w]-1&1)]+1:u-2)>=e&&(s-=e),r[n]=s,i[f+(1&o[w])]=s,++o[w]}function I(e,t,n,r,i,a){var s,f=i+1,w=n&i,u=a.pos_&o.IBUF_MASK;if(t<8||a.bit_pos_+(t<<3)<a.bit_end_pos_)for(;t-- >0;)a.readMoreInput(),r[w++]=a.readBits(8),w===f&&(e.write(r,f),w=0);else{if(a.bit_end_pos_<32)throw new Error("[CopyUncompressedBlockToOutput] br.bit_end_pos_ < 32");for(;a.bit_pos_<32;)r[w]=a.val_>>>a.bit_pos_,a.bit_pos_+=8,++w,--t;if(u+(s=a.bit_end_pos_-a.bit_pos_>>3)>o.IBUF_MASK){for(var d=o.IBUF_MASK+1-u,l=0;l<d;l++)r[w+l]=a.buf_[u+l];s-=d,w+=d,t-=d,u=0}for(l=0;l<s;l++)r[w+l]=a.buf_[u+l];if(t-=s,(w+=s)>=f)for(e.write(r,f),w-=f,l=0;l<w;l++)r[l]=r[f+l];for(;w+t>=f;){if(s=f-w,a.input_.read(r,w,s)<s)throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");e.write(r,f),t-=s,w=0}if(a.input_.read(r,w,t)<t)throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");a.reset()}}function V(e){var t=e.bit_pos_+7&-8;return 0==e.readBits(t-e.bit_pos_)}O.prototype.decode=function(e){var t,n=0;for(t=0;t<this.num_htrees;++t)this.htrees[t]=n,n+=N(this.alphabet_size,this.codes,n,e)},t.BrotliDecompressBuffer=function(e,t){var n=new r(e);null==t&&(t=function(e){var t=new r(e),n=new o(t);return y(n),A(n).meta_block_length}(e));var f=new Uint8Array(t),h=new i(f);return function(e,t){var n,r,i,f,h,p,b,c,m,W,P=0,R=0,M=0,g=[16,15,11,4],B=0,F=0,q=0,H=[new O(0,0),new O(0,0),new O(0,0)],D=128+o.READ_SIZE;i=(1<<(r=y(W=new o(e))))-16,h=(f=1<<r)-1,p=new Uint8Array(f+D+a.maxDictionaryWordLength),b=f,c=[],m=[];for(var Z=0;Z<3240;Z++)c[Z]=new s(0,0),m[Z]=new s(0,0);for(;!R;){var L,K,z,k,G,X,J,S,j,C,Q,_=0,$=[1<<28,1<<28,1<<28],ee=[0],te=[1,1,1],ne=[0,1,0,1,0,1],re=[0],ie=null,oe=null,ae=0,se=null,fe=0,we=0,ue=0;for(n=0;n<3;++n)H[n].codes=null,H[n].htrees=null;W.readMoreInput();var de=A(W);if(P+(_=de.meta_block_length)>t.buffer.length){var le=new Uint8Array(P+_);le.set(t.buffer),t.buffer=le}if(R=de.input_end,L=de.is_uncompressed,de.is_metadata)for(V(W);_>0;--_)W.readMoreInput(),W.readBits(8);else if(0!==_)if(L)W.bit_pos_=W.bit_pos_+7&-8,I(t,_,P,p,h,W),P+=_;else{for(n=0;n<3;++n)te[n]=v(W)+1,te[n]>=2&&(N(te[n]+2,c,n*l,W),N(26,m,n*l,W),$[n]=U(m,n*l,W),re[n]=1);for(W.readMoreInput(),k=(1<<(K=W.readBits(2)))-1,G=(z=16+(W.readBits(4)<<K))+(48<<K),ie=new Uint8Array(te[0]),n=0;n<te[0];++n)W.readMoreInput(),ie[n]=W.readBits(2)<<1;var he=x(te[0]<<6,W);J=he.num_htrees,X=he.context_map;var pe=x(te[2]<<2,W);for(j=pe.num_htrees,S=pe.context_map,H[0]=new O(256,J),H[1]=new O(704,te[1]),H[2]=new O(G,j),n=0;n<3;++n)H[n].decode(W);for(oe=0,se=0,C=ie[ee[0]],we=w.lookupOffsets[C],ue=w.lookupOffsets[C+1],Q=H[1].htrees[0];_>0;){var be,ce,ye,ve,me,Ae,Ee,Ne,Ue,Te,We,Oe;for(W.readMoreInput(),0===$[1]&&(Y(te[1],c,1,ee,ne,re,W),$[1]=U(m,l,W),Q=H[1].htrees[ee[1]]),--$[1],(ce=(be=E(H[1].codes,Q,W))>>6)>=2?(ce-=2,Ee=-1):Ee=0,ye=u.kInsertRangeLut[ce]+(be>>3&7),ve=u.kCopyRangeLut[ce]+(7&be),me=u.kInsertLengthPrefixCode[ye].offset+W.readBits(u.kInsertLengthPrefixCode[ye].nbits),Ae=u.kCopyLengthPrefixCode[ve].offset+W.readBits(u.kCopyLengthPrefixCode[ve].nbits),F=p[P-1&h],q=p[P-2&h],Ue=0;Ue<me;++Ue)W.readMoreInput(),0===$[0]&&(Y(te[0],c,0,ee,ne,re,W),$[0]=U(m,0,W),oe=ee[0]<<6,C=ie[ee[0]],we=w.lookupOffsets[C],ue=w.lookupOffsets[C+1]),ae=X[oe+(w.lookup[we+F]|w.lookup[ue+q])],--$[0],q=F,F=E(H[0].codes,H[0].htrees[ae],W),p[P&h]=F,(P&h)===h&&t.write(p,f),++P;if((_-=me)<=0)break;if(Ee<0&&(W.readMoreInput(),0===$[2]&&(Y(te[2],c,2,ee,ne,re,W),$[2]=U(m,2160,W),se=ee[2]<<2),--$[2],fe=S[se+(255&(Ae>4?3:Ae-2))],(Ee=E(H[2].codes,H[2].htrees[fe],W))>=z&&(Oe=(Ee-=z)&k,Ee=z+((xe=(2+(1&(Ee>>=K))<<(We=1+(Ee>>1)))-4)+W.readBits(We)<<K)+Oe)),(Ne=T(Ee,g,B))<0)throw new Error("[BrotliDecompress] invalid distance");if(Te=P&h,Ne>(M=P<i&&M!==i?P:i)){if(!(Ae>=a.minDictionaryWordLength&&Ae<=a.maxDictionaryWordLength))throw new Error("Invalid backward reference. pos: "+P+" distance: "+Ne+" len: "+Ae+" bytes left: "+_);var xe=a.offsetsByLength[Ae],Ye=Ne-M-1,Ie=a.sizeBitsByLength[Ae],Ve=Ye>>Ie;if(xe+=(Ye&(1<<Ie)-1)*Ae,!(Ve<d.kNumTransforms))throw new Error("Invalid backward reference. pos: "+P+" distance: "+Ne+" len: "+Ae+" bytes left: "+_);var Pe=d.transformDictionaryWord(p,Te,xe,Ae,Ve);if(P+=Pe,_-=Pe,(Te+=Pe)>=b){t.write(p,f);for(var Re=0;Re<Te-b;Re++)p[Re]=p[b+Re]}}else{if(Ee>0&&(g[3&B]=Ne,++B),Ae>_)throw new Error("Invalid backward reference. pos: "+P+" distance: "+Ne+" len: "+Ae+" bytes left: "+_);for(Ue=0;Ue<Ae;++Ue)p[P&h]=p[P-Ne&h],(P&h)===h&&t.write(p,f),++P,--_}F=p[P-1&h],q=p[P-2&h]}P&=1073741823}}t.write(p,P&h)}(n,h),h.pos<h.buffer.length&&(h.buffer=h.buffer.subarray(0,h.pos)),h.buffer},a.init()},270:(e,t,n)=>{var r=n(712),i=10,o=11;function a(e,t,n){this.prefix=new Uint8Array(e.length),this.transform=t,this.suffix=new Uint8Array(n.length);for(var r=0;r<e.length;r++)this.prefix[r]=e.charCodeAt(r);for(r=0;r<n.length;r++)this.suffix[r]=n.charCodeAt(r)}var s=[new a("",0,""),new a("",0," "),new a(" ",0," "),new a("",12,""),new a("",i," "),new a("",0," the "),new a(" ",0,""),new a("s ",0," "),new a("",0," of "),new a("",i,""),new a("",0," and "),new a("",13,""),new a("",1,""),new a(", ",0," "),new a("",0,", "),new a(" ",i," "),new a("",0," in "),new a("",0," to "),new a("e ",0," "),new a("",0,\'"\'),new a("",0,"."),new a("",0,\'">\'),new a("",0,"\\n"),new a("",3,""),new a("",0,"]"),new a("",0," for "),new a("",14,""),new a("",2,""),new a("",0," a "),new a("",0," that "),new a(" ",i,""),new a("",0,". "),new a(".",0,""),new a(" ",0,", "),new a("",15,""),new a("",0," with "),new a("",0,"\'"),new a("",0," from "),new a("",0," by "),new a("",16,""),new a("",17,""),new a(" the ",0,""),new a("",4,""),new a("",0,". The "),new a("",o,""),new a("",0," on "),new a("",0," as "),new a("",0," is "),new a("",7,""),new a("",1,"ing "),new a("",0,"\\n\\t"),new a("",0,":"),new a(" ",0,". "),new a("",0,"ed "),new a("",20,""),new a("",18,""),new a("",6,""),new a("",0,"("),new a("",i,", "),new a("",8,""),new a("",0," at "),new a("",0,"ly "),new a(" the ",0," of "),new a("",5,""),new a("",9,""),new a(" ",i,", "),new a("",i,\'"\'),new a(".",0,"("),new a("",o," "),new a("",i,\'">\'),new a("",0,\'="\'),new a(" ",0,"."),new a(".com/",0,""),new a(" the ",0," of the "),new a("",i,"\'"),new a("",0,". This "),new a("",0,","),new a(".",0," "),new a("",i,"("),new a("",i,"."),new a("",0," not "),new a(" ",0,\'="\'),new a("",0,"er "),new a(" ",o," "),new a("",0,"al "),new a(" ",o,""),new a("",0,"=\'"),new a("",o,\'"\'),new a("",i,". "),new a(" ",0,"("),new a("",0,"ful "),new a(" ",i,". "),new a("",0,"ive "),new a("",0,"less "),new a("",o,"\'"),new a("",0,"est "),new a(" ",i,"."),new a("",o,\'">\'),new a(" ",0,"=\'"),new a("",i,","),new a("",0,"ize "),new a("",o,"."),new a("Â ",0,""),new a(" ",0,","),new a("",i,\'="\'),new a("",o,\'="\'),new a("",0,"ous "),new a("",o,", "),new a("",i,"=\'"),new a(" ",i,","),new a(" ",o,\'="\'),new a(" ",o,", "),new a("",o,","),new a("",o,"("),new a("",o,". "),new a(" ",o,"."),new a("",o,"=\'"),new a(" ",o,". "),new a(" ",i,\'="\'),new a(" ",o,"=\'"),new a(" ",i,"=\'")];function f(e,t){return e[t]<192?(e[t]>=97&&e[t]<=122&&(e[t]^=32),1):e[t]<224?(e[t+1]^=32,2):(e[t+2]^=5,3)}t.kTransforms=s,t.kNumTransforms=s.length,t.transformDictionaryWord=function(e,t,n,a,w){var u,d=s[w].prefix,l=s[w].suffix,h=s[w].transform,p=h<12?0:h-11,b=0,c=t;p>a&&(p=a);for(var y=0;y<d.length;)e[t++]=d[y++];for(n+=p,a-=p,h<=9&&(a-=h),b=0;b<a;b++)e[t++]=r.dictionary[n+b];if(u=t-a,h===i)f(e,u);else if(h===o)for(;a>0;){var v=f(e,u);u+=v,a-=v}for(var m=0;m<l.length;)e[t++]=l[m++];return t-c}},526:(e,t)=>{"use strict";t.byteLength=function(e){var t=s(e),n=t[0],r=t[1];return 3*(n+r)/4-r},t.toByteArray=function(e){var t,n,o=s(e),a=o[0],f=o[1],w=new i(function(e,t,n){return 3*(t+n)/4-n}(0,a,f)),u=0,d=f>0?a-4:a;for(n=0;n<d;n+=4)t=r[e.charCodeAt(n)]<<18|r[e.charCodeAt(n+1)]<<12|r[e.charCodeAt(n+2)]<<6|r[e.charCodeAt(n+3)],w[u++]=t>>16&255,w[u++]=t>>8&255,w[u++]=255&t;return 2===f&&(t=r[e.charCodeAt(n)]<<2|r[e.charCodeAt(n+1)]>>4,w[u++]=255&t),1===f&&(t=r[e.charCodeAt(n)]<<10|r[e.charCodeAt(n+1)]<<4|r[e.charCodeAt(n+2)]>>2,w[u++]=t>>8&255,w[u++]=255&t),w},t.fromByteArray=function(e){for(var t,r=e.length,i=r%3,o=[],a=16383,s=0,f=r-i;s<f;s+=a)o.push(w(e,s,s+a>f?f:s+a));return 1===i?(t=e[r-1],o.push(n[t>>2]+n[t<<4&63]+"==")):2===i&&(t=(e[r-2]<<8)+e[r-1],o.push(n[t>>10]+n[t>>4&63]+n[t<<2&63]+"=")),o.join("")};for(var n=[],r=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0;a<64;++a)n[a]=o[a],r[o.charCodeAt(a)]=a;function s(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");return-1===n&&(n=t),[n,n===t?0:4-n%4]}function f(e){return n[e>>18&63]+n[e>>12&63]+n[e>>6&63]+n[63&e]}function w(e,t,n){for(var r,i=[],o=t;o<n;o+=3)r=(e[o]<<16&16711680)+(e[o+1]<<8&65280)+(255&e[o+2]),i.push(f(r));return i.join("")}r["-".charCodeAt(0)]=62,r["_".charCodeAt(0)]=63},611:e=>{e.exports="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"},698:(e,t,n)=>{e.exports=n(206).BrotliDecompressBuffer},708:(e,t)=>{function n(e,t){this.offset=e,this.nbits=t}t.kBlockLengthPrefixCode=[new n(1,2),new n(5,2),new n(9,2),new n(13,2),new n(17,3),new n(25,3),new n(33,3),new n(41,3),new n(49,4),new n(65,4),new n(81,4),new n(97,4),new n(113,5),new n(145,5),new n(177,5),new n(209,5),new n(241,6),new n(305,6),new n(369,7),new n(497,8),new n(753,9),new n(1265,10),new n(2289,11),new n(4337,12),new n(8433,13),new n(16625,24)],t.kInsertLengthPrefixCode=[new n(0,0),new n(1,0),new n(2,0),new n(3,0),new n(4,0),new n(5,0),new n(6,1),new n(8,1),new n(10,2),new n(14,2),new n(18,3),new n(26,3),new n(34,4),new n(50,4),new n(66,5),new n(98,5),new n(130,6),new n(194,7),new n(322,8),new n(578,9),new n(1090,10),new n(2114,12),new n(6210,14),new n(22594,24)],t.kCopyLengthPrefixCode=[new n(2,0),new n(3,0),new n(4,0),new n(5,0),new n(6,0),new n(7,0),new n(8,0),new n(9,0),new n(10,1),new n(12,1),new n(14,2),new n(18,2),new n(22,3),new n(30,3),new n(38,4),new n(54,4),new n(70,5),new n(102,5),new n(134,6),new n(198,7),new n(326,8),new n(582,9),new n(1094,10),new n(2118,24)],t.kInsertRangeLut=[0,0,8,8,0,16,8,16,16],t.kCopyRangeLut=[0,8,0,8,16,0,16,8,16]},712:(e,t,n)=>{var r=n(17);t.init=function(){t.dictionary=r.init()},t.offsetsByLength=new Uint32Array([0,0,0,0,0,4096,9216,21504,35840,44032,53248,63488,74752,87040,93696,100864,104704,106752,108928,113536,115968,118528,119872,121280,122016]),t.sizeBitsByLength=new Uint8Array([0,0,0,0,10,10,11,11,10,10,10,10,10,9,9,8,7,7,8,7,7,6,6,5,5]),t.minDictionaryWordLength=4,t.maxDictionaryWordLength=24},805:(e,t)=>{t.lookup=new Uint8Array([0,0,0,0,0,0,0,0,0,4,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,12,16,12,12,20,12,16,24,28,12,12,32,12,36,12,44,44,44,44,44,44,44,44,44,44,32,32,24,40,28,12,12,48,52,52,52,48,52,52,52,48,52,52,52,52,52,48,52,52,52,52,52,48,52,52,52,52,52,24,12,28,12,12,12,56,60,60,60,56,60,60,60,56,60,60,60,60,60,56,60,60,60,60,60,56,60,60,60,60,60,24,12,28,12,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,56,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,24,25,25,25,25,26,26,26,26,27,27,27,27,28,28,28,28,29,29,29,29,30,30,30,30,31,31,31,31,32,32,32,32,33,33,33,33,34,34,34,34,35,35,35,35,36,36,36,36,37,37,37,37,38,38,38,38,39,39,39,39,40,40,40,40,41,41,41,41,42,42,42,42,43,43,43,43,44,44,44,44,45,45,45,45,46,46,46,46,47,47,47,47,48,48,48,48,49,49,49,49,50,50,50,50,51,51,51,51,52,52,52,52,53,53,53,53,54,54,54,54,55,55,55,55,56,56,56,56,57,57,57,57,58,58,58,58,59,59,59,59,60,60,60,60,61,61,61,61,62,62,62,62,63,63,63,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),t.lookupOffsets=new Uint16Array([1024,1536,1280,1536,0,256,768,512])},927:(e,t)=>{function n(e){this.buffer=e,this.pos=0}function r(e){this.buffer=e,this.pos=0}n.prototype.read=function(e,t,n){this.pos+n>this.buffer.length&&(n=this.buffer.length-this.pos);for(var r=0;r<n;r++)e[t+r]=this.buffer[this.pos+r];return this.pos+=n,n},t.z=n,r.prototype.write=function(e,t){if(this.pos+t>this.buffer.length)throw new Error("Output buffer is not large enough");return this.buffer.set(e.subarray(0,t),this.pos),this.pos+=t,t},t.y=r}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}(()=>{"use strict";const e={DATA_TYPE_DOUBLE:{ordinal:0,name:"double",size:8},DATA_TYPE_FLOAT:{ordinal:1,name:"float",size:4},DATA_TYPE_INT8:{ordinal:2,name:"int8",size:1},DATA_TYPE_UINT8:{ordinal:3,name:"uint8",size:1},DATA_TYPE_INT16:{ordinal:4,name:"int16",size:2},DATA_TYPE_UINT16:{ordinal:5,name:"uint16",size:2},DATA_TYPE_INT32:{ordinal:6,name:"int32",size:4},DATA_TYPE_UINT32:{ordinal:7,name:"uint32",size:4},DATA_TYPE_INT64:{ordinal:8,name:"int64",size:8},DATA_TYPE_UINT64:{ordinal:9,name:"uint64",size:8}};let t=0;for(const n in e)e[t]=e[n],t++;class r{constructor(e,t,n,r=[1/0,-1/0],i=void 0){this.name=e,this.type=t,this.numElements=n,this.range=r,this.uri=i,this.byteSize=this.numElements*this.type.size,this.description=""}}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,o,a,s=[],f=!0,w=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;f=!1}else for(;!(f=(r=o.call(n)).done)&&(s.push(r.value),s.length!==t);f=!0);}catch(e){w=!0,i=e}finally{try{if(!f&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(w)throw i}}return s}}(e,t)||a(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=a(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,f=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){f=!0,o=e},f:function(){try{s||null==n.return||n.return()}finally{if(f)throw o}}}}function a(e,t){if(e){if("string"==typeof e)return s(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}new r("POSITION_CARTESIAN",e.DATA_TYPE_FLOAT,3),new r("COLOR_PACKED",e.DATA_TYPE_INT8,4),new r("COLOR_PACKED",e.DATA_TYPE_INT8,4),new r("COLOR_PACKED",e.DATA_TYPE_INT8,3),new r("NORMAL_FLOATS",e.DATA_TYPE_FLOAT,3),new r("INTENSITY",e.DATA_TYPE_UINT16,1),new r("CLASSIFICATION",e.DATA_TYPE_UINT8,1),new r("NORMAL_SPHEREMAPPED",e.DATA_TYPE_UINT8,2),new r("NORMAL_OCT16",e.DATA_TYPE_UINT8,2),new r("NORMAL",e.DATA_TYPE_FLOAT,3),new r("RETURN_NUMBER",e.DATA_TYPE_UINT8,1),new r("NUMBER_OF_RETURNS",e.DATA_TYPE_UINT8,1),new r("SOURCE_ID",e.DATA_TYPE_UINT16,1),new r("INDICES",e.DATA_TYPE_UINT32,1),new r("SPACING",e.DATA_TYPE_FLOAT,1),new r("GPS_TIME",e.DATA_TYPE_DOUBLE,1);var f=n(698),w={int8:Int8Array,int16:Int16Array,int32:Int32Array,int64:Float64Array,uint8:Uint8Array,uint16:Uint16Array,uint32:Uint32Array,uint64:Float64Array,float:Float32Array,double:Float64Array};function u(e){var t=e;return(0&(t=(61440&(t=(786624&(t=(2130440&t)>>2|266305&t))>>4|12291&t))>>8|15&t))>>16|255&t}onmessage=function(t){var n,a=t.data,s=a.pointAttributes,d=a.scale,l=a.min,h=a.size,p=a.offset,b=a.numPoints,c=f(new Uint8Array(t.data.buffer),t.data.buffer.byteLength),y=new DataView(c.buffer),v={},m=32,A=new Uint32Array(Math.pow(m,3)),E=function(e,t,n){var r=m*e/h.x,i=m*t/h.y,o=m*n/h.z,a=Math.min(parseInt(r),31),s=Math.min(parseInt(i),31),f=Math.min(parseInt(o),31);return a+s*m+f*m*m},N=0,U=0,T=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],W=[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],O=o(s.attributes);try{for(O.s();!(n=O.n()).done;){var x=n.value;if(["POSITION_CARTESIAN","position"].includes(x.name)){for(var Y=new ArrayBuffer(4*b*3),I=new Float32Array(Y),V=0;V<b;V++){var P=y.getUint32(U+4,!0),R=y.getUint32(U+0,!0),M=y.getUint32(U+12,!0),g=y.getUint32(U+8,!0);U+=16;var B=u((16777215&g)>>>0)|u((g>>>24|M<<8)>>>0)<<8,F=u((16777215&g)>>>1)|u((g>>>24|M<<8)>>>1)<<8,q=u((16777215&g)>>>2)|u((g>>>24|M<<8)>>>2)<<8;0==R&&0==M||(B=B|u((16777215&R)>>>0)<<16|u((R>>>24|P<<8)>>>0)<<24,F=F|u((16777215&R)>>>1)<<16|u((R>>>24|P<<8)>>>1)<<24,q=q|u((16777215&R)>>>2)<<16|u((R>>>24|P<<8)>>>2)<<24);var H=parseInt(B)*d[0]+p[0]-l.x,D=parseInt(F)*d[1]+p[1]-l.y,Z=parseInt(q)*d[2]+p[2]-l.z;T[0]=Math.min(T[0],H),T[1]=Math.min(T[1],D),T[2]=Math.min(T[2],Z),W[0]=Math.max(W[0],H),W[1]=Math.max(W[1],D),W[2]=Math.max(W[2],Z),0===A[E(H,D,Z)]++&&N++,I[3*V+0]=H,I[3*V+1]=D,I[3*V+2]=Z}v[x.name]={buffer:Y,attribute:x}}else if(["RGBA","rgba"].includes(x.name)){for(var L=new ArrayBuffer(4*b),K=new Uint8Array(L),z=0;z<b;z++){var k=y.getUint32(U+4,!0),G=y.getUint32(U+0,!0);U+=8;var X=u((16777215&G)>>>0)|u((G>>>24|k<<8)>>>0)<<8,J=u((16777215&G)>>>1)|u((G>>>24|k<<8)>>>1)<<8,S=u((16777215&G)>>>2)|u((G>>>24|k<<8)>>>2)<<8;K[4*z+0]=X>255?X/256:X,K[4*z+1]=J>255?J/256:J,K[4*z+2]=S>255?S/256:S}v[x.name]={buffer:L,attribute:x}}else{var j=new ArrayBuffer(4*b),C=new Float32Array(j),Q=new(0,w[x.type.name])(b),_=0,$=1,ee={int8:y.getInt8,int16:y.getInt16,int32:y.getInt32,uint8:y.getUint8,uint16:y.getUint16,uint32:y.getUint32,float:y.getFloat32,double:y.getFloat64}[x.type.name].bind(y);if(x.type.size>4){var te=i(x.range,2),ne=te[0],re=te[1];_=ne,$=1/(re-ne)}for(var ie=0;ie<b;ie++){var oe=ee(U,!0);U+=x.byteSize,C[ie]=(oe-_)*$,Q[ie]=oe}v[x.name]={buffer:j,preciseBuffer:Q,attribute:x,offset:_,scale:$}}}}catch(e){O.e(e)}finally{O.f()}for(var ae=parseInt(b/N),se=new ArrayBuffer(4*b),fe=new Uint32Array(se),we=0;we<b;we++)fe[we]=we;v.INDICES={buffer:se,attribute:r.INDICES};var ue,de=o(s.vectors);try{for(de.s();!(ue=de.n()).done;){var le,he=ue.value,pe=he.name,be=he.attributes,ce=be.length,ye=new ArrayBuffer(ce*b*4),ve=new Float32Array(ye),me=0,Ae=o(be);try{for(Ae.s();!(le=Ae.n()).done;){for(var Ee=v[le.value],Ne=Ee.offset,Ue=Ee.scale,Te=new DataView(Ee.buffer),We=Te.getFloat32.bind(Te),Oe=0;Oe<b;Oe++){var xe=We(4*Oe,!0);ve[Oe*ce+me]=xe/Ue+Ne}me++}}catch(e){Ae.e(e)}finally{Ae.f()}var Ye=new r(pe,e.DATA_TYPE_FLOAT,3);v[pe]={buffer:ye,attribute:Ye}}}catch(e){de.e(e)}finally{de.f()}var Ie={buffer:c,attributeBuffers:v,density:ae,tightBoundingBox:{min:T,max:W}},Ve=[];for(var Pe in Ie.attributeBuffers)Ve.push(Ie.attributeBuffers[Pe].buffer);postMessage(Ie,Ve)}})()})();\n',
              'Worker',
              void 0,
              void 0,
            );
          }
        },
        852: (A, g, I) => {
          I.d(g, { A: () => Q });
          var B = I(512),
            C = I.n(B);
          function Q() {
            return C()(
              '(()=>{"use strict";const r={DATA_TYPE_DOUBLE:{ordinal:0,name:"double",size:8},DATA_TYPE_FLOAT:{ordinal:1,name:"float",size:4},DATA_TYPE_INT8:{ordinal:2,name:"int8",size:1},DATA_TYPE_UINT8:{ordinal:3,name:"uint8",size:1},DATA_TYPE_INT16:{ordinal:4,name:"int16",size:2},DATA_TYPE_UINT16:{ordinal:5,name:"uint16",size:2},DATA_TYPE_INT32:{ordinal:6,name:"int32",size:4},DATA_TYPE_UINT32:{ordinal:7,name:"uint32",size:4},DATA_TYPE_INT64:{ordinal:8,name:"int64",size:8},DATA_TYPE_UINT64:{ordinal:9,name:"uint64",size:8}};let t=0;for(const e in r)r[t]=r[e],t++;class e{constructor(r,t,e,a=[1/0,-1/0],n=void 0){this.name=r,this.type=t,this.numElements=e,this.range=a,this.uri=n,this.byteSize=this.numElements*this.type.size,this.description=""}}function a(r){throw new TypeError(\'"\'+r+\'" is read-only\')}function n(r,t){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!e){if(Array.isArray(r)||(e=function(r,t){if(r){if("string"==typeof r)return i(r,t);var e={}.toString.call(r).slice(8,-1);return"Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e?Array.from(r):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?i(r,t):void 0}}(r))||t&&r&&"number"==typeof r.length){e&&(r=e);var a=0,n=function(){};return{s:n,n:function(){return a>=r.length?{done:!0}:{done:!1,value:r[a++]}},e:function(r){throw r},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,f=!0,A=!1;return{s:function(){e=e.call(r)},n:function(){var r=e.next();return f=r.done,r},e:function(r){A=!0,o=r},f:function(){try{f||null==e.return||e.return()}finally{if(A)throw o}}}}function i(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,a=Array(t);e<t;e++)a[e]=r[e];return a}new e("POSITION_CARTESIAN",r.DATA_TYPE_FLOAT,3),new e("COLOR_PACKED",r.DATA_TYPE_INT8,4),new e("COLOR_PACKED",r.DATA_TYPE_INT8,4),new e("COLOR_PACKED",r.DATA_TYPE_INT8,3),new e("NORMAL_FLOATS",r.DATA_TYPE_FLOAT,3),new e("INTENSITY",r.DATA_TYPE_UINT16,1),new e("CLASSIFICATION",r.DATA_TYPE_UINT8,1),new e("NORMAL_SPHEREMAPPED",r.DATA_TYPE_UINT8,2),new e("NORMAL_OCT16",r.DATA_TYPE_UINT8,2),new e("NORMAL",r.DATA_TYPE_FLOAT,3),new e("RETURN_NUMBER",r.DATA_TYPE_UINT8,1),new e("NUMBER_OF_RETURNS",r.DATA_TYPE_UINT8,1),new e("SOURCE_ID",r.DATA_TYPE_UINT16,1),new e("INDICES",r.DATA_TYPE_UINT32,1),new e("SPACING",r.DATA_TYPE_FLOAT,1),new e("GPS_TIME",r.DATA_TYPE_DOUBLE,1),Int8Array,Int16Array,Int32Array,Float64Array,Uint8Array,Uint16Array,Uint32Array,Float64Array,Float32Array,Float64Array,onmessage=function(t){var i,o,f,A=t.data,_=A.buffer,u=A.pointAttributes,l=(A.scale,A.name,A.min),s=(A.max,A.size),T=A.offset,y=A.numPoints,I=A.harmonicsEnabled,h=new DataView(_),w={},b=32,m=new Uint32Array(Math.pow(b,3)),N=function(r,t,e){var a=b*r/s.x,n=b*t/s.y,i=b*e/s.z,o=Math.min(parseInt(a),31),f=Math.min(parseInt(n),31),A=Math.min(parseInt(i),31);return o+f*b+A*b*b},E=function(r,t,e){return Math.max(Math.min(r,e),t)},d=0,c=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],v=[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],M=new ArrayBuffer(4*y*3),p=new Float32Array(M),O=new ArrayBuffer(4*y*4),F=new Float32Array(O),P=new ArrayBuffer(4*y*4),x=new Float32Array(P),D=new ArrayBuffer(4*y*4),z=new Float32Array(D),Y=new ArrayBuffer(4*y*4),C=new Float32Array(Y),S=new ArrayBuffer(4*y*45),g=new Float32Array(S),R=["sh_band_1_triplet_0","sh_band_1_triplet_1","sh_band_1_triplet_2","sh_band_2_triplet_0","sh_band_2_triplet_1","sh_band_2_triplet_2","sh_band_2_triplet_3","sh_band_2_triplet_4","sh_band_3_triplet_0","sh_band_3_triplet_1","sh_band_3_triplet_2","sh_band_3_triplet_3","sh_band_3_triplet_4","sh_band_3_triplet_5","sh_band_3_triplet_6"],U=n(u.attributes);try{for(U.s();!(i=U.n()).done;){var B=i.value;if(["POSITION_CARTESIAN","position"].includes(B.name)){for(var L=0;L<y;L++){var V=12*L,H=h.getFloat32(V+0,!0),G=h.getFloat32(V+4,!0),K=h.getFloat32(V+8,!0),j=H+T[0]-l.x,q=G+T[1]-l.y,$=K+T[2]-l.z;c[0]=Math.min(c[0],j),c[1]=Math.min(c[1],q),c[2]=Math.min(c[2],$),v[0]=Math.max(v[0],j),v[1]=Math.max(v[1],q),v[2]=Math.max(v[2],$),0===m[N(j,q,$)]++&&d++,x[4*L+0]=j,x[4*L+1]=q,x[4*L+2]=$,C[4*L+0]=H,C[4*L+1]=G,C[4*L+2]=K}w.raw_position={buffer:Y,attribute:"raw_position"},w.position={buffer:P,attribute:"position"}}else if(["sh_band_0"].includes(B.name))for(var k=.28209479177387814,J=0;J<y;J++){var Q=4*J+0,W=4*J+1,X=4*J+2,Z=4*J+3,rr=12*J+12*y,tr=4*J+24*y,er=h.getFloat32(rr+0,!0),ar=h.getFloat32(rr+4,!0),nr=h.getFloat32(rr+8,!0);z[Q]=255*(.5+k*er),z[W]=255*(.5+k*ar),z[X]=255*(.5+k*nr),z[Q]=E(Math.floor(z[Q]),0,255),z[W]=E(Math.floor(z[W]),0,255),z[X]=E(Math.floor(z[X]),0,255);var ir=h.getFloat32(tr,!0);ir=1/(1+Math.exp(-ir))*255,ir=E(Math.floor(ir),0,255),z[Z]=ir}else if(["scale"].includes(B.name)){for(var or=0,fr=0;fr<y;fr++){var Ar=12*fr+28*y,_r=h.getFloat32(Ar+0,!0),ur=h.getFloat32(Ar+4,!0),lr=h.getFloat32(Ar+8,!0);p[3*fr+0]=Math.exp(_r),p[3*fr+1]=Math.exp(ur),p[3*fr+2]=Math.exp(lr);var sr=Math.max(Math.exp(_r),Math.exp(ur));sr>or&&(or=sr)}w.scale={buffer:M,attribute:"scale"}}else if(["rotation"].includes(B.name)){for(var Tr={x:0,y:0,z:0,w:0},yr=0;yr<y;yr++){var Ir=16*yr+40*y,hr=h.getFloat32(Ir+0,!0),wr=h.getFloat32(Ir+4,!0),br=h.getFloat32(Ir+8,!0),mr=h.getFloat32(Ir+12,!0);Tr.x=hr,Tr.y=wr,Tr.z=br,Tr.w=mr;var Nr=Math.sqrt(hr*hr+wr*wr+br*br+mr*mr);0==Nr?(Tr.x=0,Tr.y=0,Tr.z=0,Tr.w=1):(Tr.x=hr/Nr,Tr.y=wr/Nr,Tr.z=br/Nr,Tr.w=mr/Nr),F[4*yr+0]=Tr.x,F[4*yr+1]=Tr.y,F[4*yr+2]=Tr.z,F[4*yr+3]=Tr.w}w.orientation={buffer:O,attribute:"orientation"}}else if(B.name.indexOf("triplet")>-1&&I)for(var Er=0;Er<y;Er++){var dr=R.indexOf(B.name),cr=12*Er+y*(56+12*dr),vr=h.getFloat32(cr+0,!0),Mr=h.getFloat32(cr+4,!0),pr=h.getFloat32(cr+8,!0);g[45*Er+3*dr+0]=vr,g[45*Er+3*dr+1]=Mr,g[45*Er+3*dr+2]=pr}}}catch(r){U.e(r)}finally{U.f()}for(var Or=function(r,t,e){var a=function(r,t){var e=new Array(16),a=r.x,n=r.y,i=r.z,o=r.w,f=a+a,A=n+n,_=i+i,u=a*f,l=a*A,s=a*_,T=n*A,y=n*_,I=i*_,h=o*f,w=o*A,b=o*_,m=t.x,N=t.y,E=t.z;e[0]=(1-(T+I))*m,e[1]=(l+b)*m,e[2]=(s-w)*m,e[3]=(l-b)*N,e[4]=(1-(u+I))*N,e[5]=(y+h)*N,e[6]=(s+w)*E,e[7]=(y-h)*E,e[8]=(1-(u+T))*E;var d,c,v,M,p,O,F,P,x,D,z,Y,C,S,g,R,U,B,L,V,H,G,K=e.map(function(r){return r}),j=K;return d=j[1],j[1]=j[3],j[3]=d,d=j[2],j[2]=j[6],j[6]=d,d=j[5],j[5]=j[7],j[7]=d,c=e,v=K,M=new Array(9),p=c[0],O=c[3],F=c[6],P=c[1],x=c[4],D=c[7],z=c[2],Y=c[5],C=c[8],S=v[0],g=v[3],R=v[6],U=v[1],B=v[4],L=v[7],V=v[2],H=v[5],G=v[8],M[0]=p*S+O*U+F*V,M[3]=p*g+O*B+F*H,M[6]=p*R+O*L+F*G,M[1]=P*S+x*U+D*V,M[4]=P*g+x*B+D*H,M[7]=P*R+x*L+D*G,M[2]=z*S+Y*U+C*V,M[5]=z*g+Y*B+C*H,M[8]=z*R+Y*L+C*G,M}(t,r);Pr[4*e+0]=a[0],Pr[4*e+1]=a[3],Pr[4*e+2]=a[6],Pr[4*e+3]=a[4],Dr[2*e+0]=a[7],Dr[2*e+1]=a[8]},Fr=new ArrayBuffer(4*y*4),Pr=new Float32Array(Fr),xr=new ArrayBuffer(4*y*2),Dr=new Float32Array(xr),zr=0;zr<y;zr++){var Yr={x:0,y:0,z:0,w:0},Cr={x:0,y:0,z:0};Yr.w=F[4*zr+0],Yr.x=F[4*zr+1],Yr.y=F[4*zr+2],Yr.z=F[4*zr+3],Cr.x=p[3*zr+0],Cr.y=p[3*zr+1],Cr.z=p[3*zr+2],Or(Cr,Yr,zr)}w.COVARIANCE0={buffer:Fr,attribute:e.COVARIANCE0},w.COVARIANCE1={buffer:xr,attribute:e.COVARIANCE1};for(var Sr=function(r){return r[0]+(r[1]<<8)+(r[2]<<16)+(r[3]<<24)},gr=Math.floor(255*Math.random()),Rr=Math.floor(255*Math.random()),Ur=Math.floor(255*Math.random()),Br=(o=new Float32Array(1),f=new Int32Array(o.buffer),function(r){return o[0]=r,f[0]}),Lr=new ArrayBuffer(4*y*4),Vr=new Int32Array(Lr),Hr=0;Hr<y;Hr++){var Gr={x:0,y:0,z:0,w:0},Kr={x:0,y:0,z:0};Gr.x=z[4*Hr+0],Gr.y=z[4*Hr+1],Gr.z=z[4*Hr+2],Gr.w=z[4*Hr+3],Kr.x=C[4*Hr+0],Kr.y=C[4*Hr+1],Kr.z=C[4*Hr+2];var jr=Sr([0*gr+1*Gr.x,0*Rr+1*Gr.y,0*Ur+1*Gr.z,Gr.w]);Kr.x=Br(Kr.x),Kr.y=Br(Kr.y),Kr.z=Br(Kr.z),Vr[4*Hr+0]=jr,Vr[4*Hr+1]=Kr.x,Vr[4*Hr+2]=Kr.y,Vr[4*Hr+3]=Kr.z}w.POS_COLOR={buffer:Lr,attribute:e.POS_COLOR};var qr=new ArrayBuffer(4*y*3),$r=new Uint32Array(qr),kr=new ArrayBuffer(4*y*5),Jr=new Uint32Array(kr),Qr=new ArrayBuffer(4*y*7),Wr=new Uint32Array(Qr);g=g.map(function(r,t){r=.5*(r=Math.min(Math.max(r,-1),1))+.5;var e=t%3==1?1023:2047;return Math.min(Math.max(Math.floor(r*e),0),e)});for(var Xr=0;Xr<y;Xr++)for(var Zr=0;Zr<15;Zr++){var rt=g[45*Xr+3*Zr+0],tt=g[45*Xr+3*Zr+1],et=g[45*Xr+3*Zr+2];Zr<3&&($r[3*Xr+Zr-0]=rt<<21|tt<<11|et),Zr>=3&&Zr<8&&(Jr[5*Xr+Zr-3]=rt<<21|tt<<11|et),Zr>=8&&(Wr[7*Xr+Zr-8]=rt<<21|tt<<11|et)}w.HARMONICS1={buffer:qr,attribute:"HARMONICS1"},w.HARMONICS2={buffer:kr,attribute:"HARMONICS2"},w.HARMONICS3={buffer:Qr,attribute:"HARMONICS3"};for(var at=parseInt(y/d),nt=new ArrayBuffer(4*y),it=new Uint32Array(nt),ot=0;ot<y;ot++)it[ot]=ot;w.INDICES={buffer:nt,attribute:e.INDICES};var ft,At=n(u.vectors);try{for(At.s();!(ft=At.n()).done;){var _t,ut=ft.value,lt=ut.name,st=ut.attributes,Tt=st.length,yt=new ArrayBuffer(Tt*y*4),It=new Float32Array(yt),ht=n(st);try{for(ht.s();!(_t=ht.n()).done;){for(var wt=w[_t.value],bt=wt.offset,mt=wt.scale,Nt=new DataView(wt.buffer),Et=Nt.getFloat32.bind(Nt),dt=0;dt<y;dt++){var ct=Et(4*dt,!0);It[dt*Tt+0]=ct/mt+bt}a("iElement")}}catch(r){ht.e(r)}finally{ht.f()}var vt=new e(lt,r.DATA_TYPE_FLOAT,3);w[lt]={buffer:yt,attribute:vt}}}catch(r){At.e(r)}finally{At.f()}var Mt={buffer:_,attributeBuffers:w,density:at,tightBoundingBox:{min:c,max:v}},pt=[];for(var Ot in Mt.attributeBuffers)pt.push(Mt.attributeBuffers[Ot].buffer);pt.push(_),postMessage(Mt,pt)}})();\n',
              'Worker',
              void 0,
              void 0,
            );
          }
        },
        935: (A, g, I) => {
          I.d(g, { A: () => B });
          const B =
            'precision highp float;\nprecision highp int;\n\nuniform vec2 focal;\nuniform float inverseFocalAdjustment;\nuniform float splatScale;\nuniform float initialSplatScale;\nuniform vec2 basisViewport;\nuniform float harmonicsDegree;\nuniform bool renderIds;\nuniform bool adaptiveSize;\nuniform bool renderLoD;\nuniform vec3 globalOffset;\n\nuniform sampler2D covarianceTexture0;\nuniform sampler2D covarianceTexture1;\nuniform sampler2D nodeTexture;\nuniform sampler2D nodeTexture2;\n\n\nuniform highp usampler2D sortedTexture;\nuniform highp usampler2D posColorTexture;\nuniform highp usampler2D nodeIndicesTexture;\nuniform highp usampler2D harmonicsTexture1;\nuniform highp usampler2D harmonicsTexture2;\nuniform highp usampler2D harmonicsTexture3;\n\nuniform float fov;\nuniform float spacing;\nuniform float screenHeight;\nuniform float maxSplatScale;\n\nuniform float maxDepth;\n\n\nuniform bool renderOnlyHarmonics;\nuniform float harmonicsScale;\n\n//To read the LOD for each point\nuniform sampler2D visibleNodes;\nuniform float octreeSize;\n\nout vec3 vColor;\nout float vOpacity;\nout vec2 vPosition;\nout float vZ;\nout float backfaseCulling;\nout vec2 vID;\nout float vRenderScale;\n\nconst float sqrt8 = sqrt(8.0);\nconst float minAlpha = 1.0 / 255.0;\n\n\nconst vec4 encodeNorm4 = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);\nconst uvec4 mask4 = uvec4(uint(0x000000FF), uint(0x0000FF00), uint(0x00FF0000), uint(0xFF000000));\nconst uvec4 shift4 = uvec4(0, 8, 16, 24);\nvec4 uintToRGBAVec (uint u) {\n    uvec4 urgba = mask4 & u;\n    urgba = urgba >> shift4;\n    vec4 rgba = vec4(urgba) * encodeNorm4;\n    return rgba;\n}\nvec3 unpack111011s(uint bits) { \n    vec3 result = vec3((uvec3(bits) >> uvec3(21u, 11u, 0u)) & uvec3(0x7ffu, 0x3ffu, 0x7ffu)) / vec3(2047.0, 1023.0, 2047.0); \n    return result * 2. - 1.;\n}       \nivec2 getDataUVSplat(in int stride, in int offset, in vec2 dimensions, in int index) {\n    ivec2 samplerUV = ivec2(0, 0);\n    float d = float(uint(index) * uint(stride) + uint(offset));\n    samplerUV.y = int(floor(d / dimensions.x));\n    samplerUV.x = int(mod(d, dimensions.x));\n    return samplerUV;\n}\n\nconst float SH_C1 = 0.4886025119029199f;\nconst float[5] SH_C2 = float[](1.0925484, -1.0925484, 0.3153916, -1.0925484, 0.5462742);\nconst float[7] SH_C3 = float[](-0.5900435899266435, \n                                2.890611442640554, \n                                -0.4570457994644658, \n                                0.3731763325901154, \n                                -0.4570457994644658, \n                                1.445305721320277, \n                                -0.5900435899266435);\n\n/**\n * Rounds the specified number to the closest integer.\n */\nfloat safeRound(float number){\n\treturn floor(number + 0.5);\n}\n\n\n/**\n * Gets the number of 1-bits up to inclusive index position.\n *\n * number is treated as if it were an integer in the range 0-255\n */\nint numberOfOnes(int number, int index) {\n\tint numOnes = 0;\n\tint tmp = 128;\n\tfor (int i = 7; i >= 0; i--) {\n\n\t\tif (number >= tmp) {\n\t\t\tnumber = number - tmp;\n\n\t\t\tif (i <= index) {\n\t\t\t\tnumOnes++;\n\t\t\t}\n\t\t}\n\n\t\ttmp = tmp / 2;\n\t}\n\n\treturn numOnes;\n}\n\n/**\n * Checks whether the bit at index is 1.0\n *\n * number is treated as if it were an integer in the range 0-255\n */\nbool isBitSet(int number, int index){\n\n\t// weird multi else if due to lack of proper array, int and bitwise support in WebGL 1.0\n\tint powi = 1;\n\tif (index == 0) {\n\t\tpowi = 1;\n\t} else if (index == 1) {\n\t\tpowi = 2;\n\t} else if (index == 2) {\n\t\tpowi = 4;\n\t} else if (index == 3) {\n\t\tpowi = 8;\n\t} else if (index == 4) {\n\t\tpowi = 16;\n\t} else if (index == 5) {\n\t\tpowi = 32;\n\t} else if (index == 6) {\n\t\tpowi = 64;\n\t} else if (index == 7) {\n\t\tpowi = 128;\n\t}\n\n\tint ndp = number / powi;\n\n\treturn mod(float(ndp), 2.0) != 0.0;\n}\n\n/**\n * Gets the the LOD at the point position.\n */\nfloat getLOD(vec3 pos, int vnStart, float level) {\n\tvec3 offset = vec3(0.0, 0.0, 0.0);\n\tint iOffset = vnStart;\n\tfloat depth = level;\n\n\tfor (float i = 0.0; i <= 30.0; i++) {\n\t\tfloat nodeSizeAtLevel = octreeSize  / pow(2.0, i + level + 0.0);\n\n\t\tvec3 index3d = (pos-offset) / nodeSizeAtLevel;\n\t\tindex3d = floor(index3d + 0.5);\n\t\tint index = int(safeRound(4.0 * index3d.x + 2.0 * index3d.y + index3d.z));\n\n\t\tvec4 value = texture2D(visibleNodes, vec2(float(iOffset) / 2048.0, 0.0));\n\t\tint mask = int(safeRound(value.r * 255.0));\n\n\t\tif (isBitSet(mask, index)) {\n\t\t\t// there are more visible child nodes at this position\n\t\t\tint advanceG = int(safeRound(value.g * 255.0)) * 256;\n\t\t\tint advanceB = int(safeRound(value.b * 255.0));\n\t\t\tint advanceChild = numberOfOnes(mask, index - 1);\n\t\t\tint advance = advanceG + advanceB + advanceChild;\n\n\t\t\tiOffset = iOffset + advance;\n\n\t\t\tdepth++;\n\t\t} else {\n\t\t\treturn value.a * 255.0; // no more visible child nodes at this position\n\t\t}\n\n\t\toffset = offset + (vec3(1.0, 1.0, 1.0) * nodeSizeAtLevel * 0.5) * index3d;\n\t}\n\n\treturn depth;\n}\n\n\nvoid main() {\n\n    ivec2 samplerUV = ivec2(0, 0);\n    vec2 dim = vec2(textureSize(covarianceTexture0, 0).xy);\n\n    float dd = float(gl_InstanceID);\n    samplerUV.y = int(floor(dd / dim.x));\n    samplerUV.x = int(mod(dd, dim.x));\n\n    int indexes_sorted = int(texelFetch(sortedTexture, samplerUV, 0));\n\n    dd = float(indexes_sorted);\n    samplerUV.y = int(floor(dd / dim.x));\n    samplerUV.x = int(mod(dd, dim.x));\n\n    vec4 cov3D_4 = texelFetch(covarianceTexture0, samplerUV, 0);\n    vec2 cov3D_2 = texelFetch(covarianceTexture1, samplerUV, 0).rg;\n\n\n    uvec4 sampledCenterColor = texelFetch(posColorTexture, samplerUV, 0);\n    vec3 instancePosition = uintBitsToFloat(uvec3(sampledCenterColor.gba));\n    \n    vec3 nodePosition = instancePosition;\n    instancePosition += globalOffset;\n\n    uint nodeIndex = texelFetch(nodeIndicesTexture, samplerUV, 0).r;\n\n\n    vID = vec2(indexes_sorted, nodeIndex);\n\n    samplerUV = ivec2(0, 0);\n    dd = float(nodeIndex);\n    samplerUV.y = int(floor(dd / 100.));\n    samplerUV.x = int(mod(dd, 100.));\n\n    vec4 nodeData = texelFetch(nodeTexture, samplerUV, 0);\n    vec4 nodeData2 = texelFetch(nodeTexture2, samplerUV, 0);\n\n    nodePosition += vec3(nodeData.a, nodeData2.ba);\n\n    ivec2 levelAndVnStart =  ivec2(nodeData2.rg);\n    int vnStart = levelAndVnStart.r;\n    int level = levelAndVnStart.g;\n\n    vec4 viewCenter = modelViewMatrix * vec4(instancePosition, 1.0);\n    vec4 clipCenter = projectionMatrix * viewCenter;\n    vec3 ndcCenter = clipCenter.xyz / clipCenter.w;\n\n    mat3 Vrk = mat3(\n        cov3D_4.x, cov3D_4.y, cov3D_4.z,\n        cov3D_4.y, cov3D_4.w, cov3D_2.x,\n        cov3D_4.z, cov3D_2.x, cov3D_2.y\n    );\n\n    mat3 J;\n    float s = 1.0 / (viewCenter.z * viewCenter.z);\n    J = mat3(\n        focal.x / viewCenter.z, 0., -(focal.x * viewCenter.x) * s,\n        0., focal.y / viewCenter.z, -(focal.y * viewCenter.y) * s,\n        0., 0., 0.\n    );\n\n    mat3 W = transpose(mat3(modelViewMatrix));\n    mat3 T = W * J;\n\n    mat3 cov2Dm = transpose(T) * Vrk * T;\n    cov2Dm[0][0] += 0.3;\n    cov2Dm[1][1] += 0.3;\n\n    vec3 cov2Dv = vec3(cov2Dm[0][0], cov2Dm[0][1], cov2Dm[1][1]);\n\n    float a = cov2Dv.x;\n    float d = cov2Dv.z;\n    float b = cov2Dv.y;\n    float D = a * d - b * b;\n    float trace = a + d;\n    float traceOver2 = 0.5 * trace;\n    float term2 = sqrt(max(0.1f, traceOver2 * traceOver2 - D));\n    float eigenValue1 = traceOver2 + term2;\n    float eigenValue2 = traceOver2 - term2;\n\n    if (eigenValue2 <= 0.0) return;\n\n    vec2 eigenVector1 = normalize(vec2(b, eigenValue1 - a));\n    // since the eigen vectors are orthogonal, we derive the second one from the first\n    vec2 eigenVector2 = vec2(eigenVector1.y, -eigenVector1.x);\n\n    //Get the adaptive size\n    float renderScale = 1.;\n\n    if(adaptiveSize) {\n        float lodSplatScale = clamp(getLOD( nodePosition, int(vnStart), float(level) ) / maxDepth, 0., 1.);\n        float currentSplatScale = lodSplatScale < 2. ? initialSplatScale : splatScale;\n        renderScale = mix(maxSplatScale * currentSplatScale, 1., lodSplatScale);\n    }\n\n    vRenderScale = renderScale;\n\n    float cameraDistance = length(cameraPosition - instancePosition);\n\n    // We use sqrt(8) standard deviations instead of 3 to eliminate more of the splat with a very low opacity.\n    vec2 basisVector1 = eigenVector1 * renderScale * min(sqrt8 * sqrt(eigenValue1), 1024.);\n    vec2 basisVector2 = eigenVector2 * renderScale * min(sqrt8 * sqrt(eigenValue2), 1024.);\n\n    vec2 ndcOffset = vec2(position.x * basisVector1 + position.y * basisVector2) *\n                        basisViewport * 2.0 * inverseFocalAdjustment;\n\n    vec4 quadPos = vec4(ndcCenter.xy + ndcOffset, ndcCenter.z, 1.0);\n    vZ = ndcCenter.z;\n    gl_Position = quadPos;\n\n    vPosition = position.xy;\n    vPosition *= sqrt8;\n\n    vec4 colorData = uintToRGBAVec(sampledCenterColor.r);\n\n    vColor = colorData.rgb;\n\n    vec4 worldCenter = modelMatrix * vec4(instancePosition, 1.0);\n\n    vec3 worldViewDir = normalize(worldCenter.xyz - cameraPosition);\n\n    //Harmonics\n    vec3 harmonics = vec3(0.);\n    vec3 sh1 = vec3(0.);\n    vec3 sh2 = vec3(0.);\n    vec3 sh3 = vec3(0.);\n\n    vec3 sh4 = vec3(0.);\n    vec3 sh5 = vec3(0.);\n    vec3 sh6 = vec3(0.);\n    vec3 sh7 = vec3(0.);\n    vec3 sh8 = vec3(0.);\n\n    vec3 sh9 = vec3(0.);\n    vec3 sh10 = vec3(0.);\n    vec3 sh11 = vec3(0.);\n    vec3 sh12 = vec3(0.);\n    vec3 sh13 = vec3(0.);\n    vec3 sh14 = vec3(0.);\n    vec3 sh15 = vec3(0.);\n\n    if(harmonicsDegree > 0. && !renderIds) {\n\n        vec2 degree1TextureSize = vec2(textureSize(harmonicsTexture1, 0));\n\n        uint d1 = texelFetch(harmonicsTexture1, getDataUVSplat(3, 0, degree1TextureSize, indexes_sorted), 0).r;\n        uint d2 = texelFetch(harmonicsTexture1, getDataUVSplat(3, 1, degree1TextureSize, indexes_sorted), 0).r;\n        uint d3 = texelFetch(harmonicsTexture1, getDataUVSplat(3, 2, degree1TextureSize, indexes_sorted), 0).r;\n\n        sh1 = unpack111011s(d1);\n        sh2 = unpack111011s(d2);\n        sh3 = unpack111011s(d3);\n\n        float x = worldViewDir.x;\n        float y = worldViewDir.y;\n        float z = worldViewDir.z;\n\n        float xx = 1.;\n        float yy = 1.;\n        float zz = 1.;\n        float xy = 1.;\n        float yz = 1.;\n        float xz = 1.;\n\n        harmonics = SH_C1 * (-sh1 * y + sh2 * z - sh3 * x);\n\n        if(harmonicsDegree > 1.) {\n\n            vec2 degree2TextureSize = vec2(textureSize(harmonicsTexture2, 0));\n\n            uint d4 = texelFetch(harmonicsTexture2, getDataUVSplat(5, 0, degree2TextureSize, indexes_sorted), 0).r;\n            uint d5 = texelFetch(harmonicsTexture2, getDataUVSplat(5, 1, degree2TextureSize, indexes_sorted), 0).r;\n            uint d6 = texelFetch(harmonicsTexture2, getDataUVSplat(5, 2, degree2TextureSize, indexes_sorted), 0).r;\n            uint d7 = texelFetch(harmonicsTexture2, getDataUVSplat(5, 3, degree2TextureSize, indexes_sorted), 0).r;\n            uint d8 = texelFetch(harmonicsTexture2, getDataUVSplat(5, 4, degree2TextureSize, indexes_sorted), 0).r;\n\n\n            sh4 = unpack111011s(d4);\n            sh5 = unpack111011s(d5);\n            sh6 = unpack111011s(d6);\n            sh7 = unpack111011s(d7);\n            sh8 = unpack111011s(d8);\n\n\n            xx = x * x;\n            yy = y * y;\n            zz = z * z;\n            xy = x * y;\n            yz = y * z;\n            xz = x * z;\n\n            harmonics += \n                (SH_C2[0] * xy) * sh4 +\n                (SH_C2[1] * yz) * sh5 +\n                (SH_C2[2] * (2.0 * zz - xx - yy)) * sh6 +\n                (SH_C2[3] * xz) * sh7 +\n                (SH_C2[4] * (xx - yy)) * sh8;\n\n            if(harmonicsDegree > 2.) {\n\n                vec2 degree3TextureSize = vec2(textureSize(harmonicsTexture3, 0));\n\n                uint d9 =  texelFetch(harmonicsTexture3, getDataUVSplat(7, 0, degree3TextureSize, indexes_sorted), 0).r;\n                uint d10 = texelFetch(harmonicsTexture3, getDataUVSplat(7, 1, degree3TextureSize, indexes_sorted), 0).r;\n                uint d11 = texelFetch(harmonicsTexture3, getDataUVSplat(7, 2, degree3TextureSize, indexes_sorted), 0).r;\n                uint d12 = texelFetch(harmonicsTexture3, getDataUVSplat(7, 3, degree3TextureSize, indexes_sorted), 0).r;\n                uint d13 = texelFetch(harmonicsTexture3, getDataUVSplat(7, 4, degree3TextureSize, indexes_sorted), 0).r;\n                uint d14 = texelFetch(harmonicsTexture3, getDataUVSplat(7, 5, degree3TextureSize, indexes_sorted), 0).r;\n                uint d15 = texelFetch(harmonicsTexture3, getDataUVSplat(7, 6, degree3TextureSize, indexes_sorted), 0).r;\n\n                sh9 =  unpack111011s(d9);\n                sh10 = unpack111011s(d10);\n                sh11 = unpack111011s(d11);\n                sh12 = unpack111011s(d12);\n                sh13 = unpack111011s(d13);\n                sh14 = unpack111011s(d14);\n\n                harmonics +=\n                    SH_C3[0] * y * (3.0 * xx - yy) * sh9 +\n                    SH_C3[1] * xy * z * sh10 +\n                    SH_C3[2] * y * (4.0 * zz - xx - yy) * sh11 +\n                    SH_C3[3] * z * (2.0 * zz - 3.0 * xx - 3.0 * yy) * sh12 +\n                    SH_C3[4] * x * (4.0 * zz - xx - yy) * sh13 +\n                    SH_C3[5] * z * (xx - yy) * sh14 +\n                    SH_C3[6] * x * (xx - 3.0 * yy) * sh15;\n            }\n        }\n    }\n\n    if(renderOnlyHarmonics) {\n        vColor = harmonicsScale * harmonics;\n    } else {\n        vColor += harmonics;\n    }\n    \n    vColor.rgb = clamp(vColor.rgb, vec3(0.), vec3(1.));\n\n    if(renderLoD) {\n        //Test the LOD\n        int LOD = int(getLOD( nodePosition, int(vnStart), float(level) ));\n        switch ( LOD ) {\n            case 0:\n                vColor.rgb = vec3(1., 0., 0.);\n            break;\n            case 1:\n                vColor.rgb = vec3(0., 1., 0.);\n            break;\n            case 2:\n                vColor.rgb = vec3(0., 0., 1.);\n            break;\n            case 3:\n                vColor.rgb = vec3(1., 0., 1.);\n            break;\n            case 4:\n                vColor.rgb = vec3(1., 1., 0.);\n            break;\n            case 5:\n                vColor.rgb = vec3(0., 1., 1.);\n            break;\n            case 6:\n                vColor.rgb = vec3(0.5, 0., 0.);\n            break;\n            case 7:\n                vColor.rgb = vec3(0., 0.5, 0.);\n            break;\n            case 8:\n                vColor.rgb = vec3(0.0, 0., 0.5);\n            break;\n            case 9:\n                vColor.rgb = vec3(0.5, 0., 0.5);\n            break;\n            case 10:\n                vColor.rgb = vec3(0.5, 0.5, 0.0);\n            break;\n            case 11:\n                vColor.rgb = vec3(0.0, 0.5, 0.5);\n            break;\n            case 12:\n                vColor.rgb = vec3(1., 1., 1.);\n            break;\n        }\n    }\n\n\tvOpacity = colorData.a;\n}\n';
        },
      },
      I = {};
    function B(A) {
      var C = I[A];
      if (void 0 !== C) return C.exports;
      var Q = (I[A] = { exports: {} });
      return g[A](Q, Q.exports, B), Q.exports;
    }
    (B.n = (A) => {
      var g = A && A.__esModule ? () => A.default : () => A;
      return B.d(g, { a: g }), g;
    }),
      (B.d = (A, g) => {
        for (var I in g)
          B.o(g, I) && !B.o(A, I) && Object.defineProperty(A, I, { enumerable: !0, get: g[I] });
      }),
      (B.o = (A, g) => Object.prototype.hasOwnProperty.call(A, g)),
      (B.r = (A) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(A, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(A, '__esModule', { value: !0 });
      });
    var C = {};
    B.r(C),
      B.d(C, {
        BinaryLoader: () => dA,
        BlurMaterial: () => s,
        ClipMode: () => Q,
        GRAYSCALE: () => N,
        INFERNO: () => u,
        LazNodeLoader: () => fA,
        NormalFilteringMode: () => n,
        PLASMA: () => F,
        POINT_ATTRIBUTES: () => z,
        POINT_ATTRIBUTE_TYPES: () => V,
        PointAttributeName: () => P,
        PointAttributes: () => _,
        PointCloudMaterial: () => T,
        PointCloudMixingMode: () => r,
        PointCloudOctree: () => rA,
        PointCloudOctreeGeometry: () => CA,
        PointCloudOctreeGeometryNode: () => BA,
        PointCloudOctreeNode: () => QA,
        PointCloudOctreePicker: () => tA,
        PointCloudTree: () => iA,
        PointColorType: () => o,
        PointOpacityType: () => i,
        PointShape: () => t,
        PointSizeType: () => E,
        Potree: () => $A,
        QueueItem: () => ZA,
        RAINBOW: () => R,
        SPECTRAL: () => M,
        SplatsMesh: () => nA,
        TreeType: () => e,
        V1_LOADER: () => NA,
        V2_LOADER: () => OA,
        VIRIDIS: () => S,
        Version: () => yA,
        YELLOW_GREEN: () => G,
        generateClassificationTexture: () => U,
        generateDataTexture: () => L,
        generateGradientTexture: () => p,
        isLazAttributes: () => Z,
      });
    var Q,
      E,
      t,
      e,
      i,
      o,
      n,
      r,
      a = B(604);
    class s extends a.ShaderMaterial {
      constructor() {
        super(...arguments),
          (this.vertexShader = B(575)),
          (this.fragmentShader = B(414)),
          (this.uniforms = {
            screenWidth: { type: 'f', value: 0 },
            screenHeight: { type: 'f', value: 0 },
            map: { type: 't', value: null },
          });
      }
    }
    !(function (A) {
      (A[(A.DISABLED = 0)] = 'DISABLED'),
        (A[(A.CLIP_OUTSIDE = 1)] = 'CLIP_OUTSIDE'),
        (A[(A.HIGHLIGHT_INSIDE = 2)] = 'HIGHLIGHT_INSIDE'),
        (A[(A.CLIP_HORIZONTALLY = 3)] = 'CLIP_HORIZONTALLY'),
        (A[(A.CLIP_VERTICALLY = 4)] = 'CLIP_VERTICALLY'),
        (A[(A.CLIP_INSIDE = 5)] = 'CLIP_INSIDE');
    })(Q || (Q = {})),
      (function (A) {
        (A[(A.FIXED = 0)] = 'FIXED'),
          (A[(A.ATTENUATED = 1)] = 'ATTENUATED'),
          (A[(A.ADAPTIVE = 2)] = 'ADAPTIVE');
      })(E || (E = {})),
      (function (A) {
        (A[(A.SQUARE = 0)] = 'SQUARE'),
          (A[(A.CIRCLE = 1)] = 'CIRCLE'),
          (A[(A.PARABOLOID = 2)] = 'PARABOLOID');
      })(t || (t = {})),
      (function (A) {
        (A[(A.OCTREE = 0)] = 'OCTREE'), (A[(A.KDTREE = 1)] = 'KDTREE');
      })(e || (e = {})),
      (function (A) {
        (A[(A.FIXED = 0)] = 'FIXED'), (A[(A.ATTENUATED = 1)] = 'ATTENUATED');
      })(i || (i = {})),
      (function (A) {
        (A[(A.RGB = 0)] = 'RGB'),
          (A[(A.COLOR = 1)] = 'COLOR'),
          (A[(A.DEPTH = 2)] = 'DEPTH'),
          (A[(A.HEIGHT = 3)] = 'HEIGHT'),
          (A[(A.ELEVATION = 3)] = 'ELEVATION'),
          (A[(A.INTENSITY = 4)] = 'INTENSITY'),
          (A[(A.INTENSITY_GRADIENT = 5)] = 'INTENSITY_GRADIENT'),
          (A[(A.LOD = 6)] = 'LOD'),
          (A[(A.LEVEL_OF_DETAIL = 6)] = 'LEVEL_OF_DETAIL'),
          (A[(A.POINT_INDEX = 7)] = 'POINT_INDEX'),
          (A[(A.CLASSIFICATION = 8)] = 'CLASSIFICATION'),
          (A[(A.RETURN_NUMBER = 9)] = 'RETURN_NUMBER'),
          (A[(A.SOURCE = 10)] = 'SOURCE'),
          (A[(A.NORMAL = 11)] = 'NORMAL'),
          (A[(A.PHONG = 12)] = 'PHONG'),
          (A[(A.RGB_HEIGHT = 13)] = 'RGB_HEIGHT'),
          (A[(A.COMPOSITE = 50)] = 'COMPOSITE'),
          (A[(A.CUSTOM_SCALAR = 51)] = 'CUSTOM_SCALAR');
      })(o || (o = {})),
      (function (A) {
        (A[(A.ABSOLUTE_NORMAL_FILTERING_MODE = 1)] = 'ABSOLUTE_NORMAL_FILTERING_MODE'),
          (A[(A.LESS_EQUAL_NORMAL_FILTERING_MODE = 2)] = 'LESS_EQUAL_NORMAL_FILTERING_MODE'),
          (A[(A.GREATER_NORMAL_FILTERING_MODE = 3)] = 'GREATER_NORMAL_FILTERING_MODE');
      })(n || (n = {})),
      (function (A) {
        (A[(A.CHECKBOARD = 1)] = 'CHECKBOARD'), (A[(A.STRIPES = 2)] = 'STRIPES');
      })(r || (r = {}));
    const D = 'PerspectiveCamera',
      c = new a.Color(0, 0, 0),
      h = new a.Vector4(1, 0, 0, 1);
    function w(A) {
      return parseInt(A.charAt(A.length - 1), 10);
    }
    function l(A, g) {
      const I = A.name,
        B = g.name;
      return I.length !== B.length ? I.length - B.length : I < B ? -1 : I > B ? 1 : 0;
    }
    function y(A) {
      if (200 !== A.status) throw Error('Response error');
      return A;
    }
    function d(A) {
      if (!A || 0 === A.byteLength) throw Error('Empty buffer');
      return A;
    }
    const f = {
        0: new a.Vector4(0.5, 0.5, 0.5, 1),
        1: new a.Vector4(0.5, 0.5, 0.5, 1),
        2: new a.Vector4(0.63, 0.32, 0.18, 1),
        3: new a.Vector4(0, 1, 0, 1),
        4: new a.Vector4(0, 0.8, 0, 1),
        5: new a.Vector4(0, 0.6, 0, 1),
        6: new a.Vector4(1, 0.66, 0, 1),
        7: new a.Vector4(1, 0, 1, 1),
        8: new a.Vector4(1, 0, 0, 1),
        9: new a.Vector4(0, 0, 1, 1),
        12: new a.Vector4(1, 1, 0, 1),
        DEFAULT: new a.Vector4(0.3, 0.6, 0.6, 0.5),
      },
      N = [
        [0, new a.Color(0, 0, 0)],
        [1, new a.Color(1, 1, 1)],
      ],
      u = [
        [0, new a.Color(0.077, 0.042, 0.206)],
        [0.1, new a.Color(0.225, 0.036, 0.388)],
        [0.2, new a.Color(0.373, 0.074, 0.432)],
        [0.3, new a.Color(0.522, 0.128, 0.42)],
        [0.4, new a.Color(0.665, 0.182, 0.37)],
        [0.5, new a.Color(0.797, 0.255, 0.287)],
        [0.6, new a.Color(0.902, 0.364, 0.184)],
        [0.7, new a.Color(0.969, 0.516, 0.063)],
        [0.8, new a.Color(0.988, 0.683, 0.072)],
        [0.9, new a.Color(0.961, 0.859, 0.298)],
        [1, new a.Color(0.988, 0.998, 0.645)],
      ],
      F = [
        [0, new a.Color(0.241, 0.015, 0.61)],
        [0.1, new a.Color(0.387, 0.001, 0.654)],
        [0.2, new a.Color(0.524, 0.025, 0.653)],
        [0.3, new a.Color(0.651, 0.125, 0.596)],
        [0.4, new a.Color(0.752, 0.227, 0.513)],
        [0.5, new a.Color(0.837, 0.329, 0.431)],
        [0.6, new a.Color(0.907, 0.435, 0.353)],
        [0.7, new a.Color(0.963, 0.554, 0.272)],
        [0.8, new a.Color(0.992, 0.681, 0.195)],
        [0.9, new a.Color(0.987, 0.822, 0.144)],
        [1, new a.Color(0.94, 0.975, 0.131)],
      ],
      R = [
        [0, new a.Color(0.278, 0, 0.714)],
        [1 / 6, new a.Color(0, 0, 1)],
        [2 / 6, new a.Color(0, 1, 1)],
        [0.5, new a.Color(0, 1, 0)],
        [4 / 6, new a.Color(1, 1, 0)],
        [5 / 6, new a.Color(1, 0.64, 0)],
        [1, new a.Color(1, 0, 0)],
      ],
      M = [
        [0, new a.Color(0.3686, 0.3098, 0.6353)],
        [0.1, new a.Color(0.1961, 0.5333, 0.7412)],
        [0.2, new a.Color(0.4, 0.7608, 0.6471)],
        [0.3, new a.Color(0.6706, 0.8667, 0.6431)],
        [0.4, new a.Color(0.902, 0.9608, 0.5961)],
        [0.5, new a.Color(1, 1, 0.749)],
        [0.6, new a.Color(0.9961, 0.8784, 0.5451)],
        [0.7, new a.Color(0.9922, 0.6824, 0.3804)],
        [0.8, new a.Color(0.9569, 0.4275, 0.2627)],
        [0.9, new a.Color(0.8353, 0.2431, 0.3098)],
        [1, new a.Color(0.6196, 0.0039, 0.2588)],
      ],
      S = [
        [0, new a.Color(0.267, 0.005, 0.329)],
        [0.1, new a.Color(0.283, 0.141, 0.458)],
        [0.2, new a.Color(0.254, 0.265, 0.53)],
        [0.3, new a.Color(0.207, 0.372, 0.553)],
        [0.4, new a.Color(0.164, 0.471, 0.558)],
        [0.5, new a.Color(0.128, 0.567, 0.551)],
        [0.6, new a.Color(0.135, 0.659, 0.518)],
        [0.7, new a.Color(0.267, 0.749, 0.441)],
        [0.8, new a.Color(0.478, 0.821, 0.318)],
        [0.9, new a.Color(0.741, 0.873, 0.15)],
        [1, new a.Color(0.993, 0.906, 0.144)],
      ],
      G = [
        [0, new a.Color(0.1647, 0.2824, 0.3451)],
        [0.1, new a.Color(0.1338, 0.3555, 0.4227)],
        [0.2, new a.Color(0.061, 0.4319, 0.4864)],
        [0.3, new a.Color(0, 0.5099, 0.5319)],
        [0.4, new a.Color(0, 0.5881, 0.5569)],
        [0.5, new a.Color(0.137, 0.665, 0.5614)],
        [0.6, new a.Color(0.2906, 0.7395, 0.5477)],
        [0.7, new a.Color(0.4453, 0.8099, 0.5201)],
        [0.8, new a.Color(0.6102, 0.8748, 0.485)],
        [0.9, new a.Color(0.7883, 0.9323, 0.4514)],
        [1, new a.Color(0.9804, 0.9804, 0.4314)],
      ];
    function L(A, g, I) {
      const B = A * g,
        C = new Uint8Array(4 * B),
        Q = Math.floor(255 * I.r),
        E = Math.floor(255 * I.g),
        t = Math.floor(255 * I.b);
      for (let A = 0; A < B; A++) (C[3 * A] = Q), (C[3 * A + 1] = E), (C[3 * A + 2] = t);
      const e = new a.DataTexture(C, A, g, a.RGBAFormat);
      return (e.needsUpdate = !0), (e.magFilter = a.NearestFilter), e;
    }
    function p(A) {
      const g = 64,
        I = document.createElement('canvas');
      (I.width = g), (I.height = g);
      const B = I.getContext('2d');
      B.rect(0, 0, g, g);
      const C = B.createLinearGradient(0, 0, g, g);
      for (let g = 0; g < A.length; g++) {
        const I = A[g];
        C.addColorStop(I[0], `#${I[1].getHexString()}`);
      }
      (B.fillStyle = C), B.fill();
      const Q = new a.CanvasTexture(I);
      return (Q.needsUpdate = !0), (Q.minFilter = a.LinearFilter), Q;
    }
    function U(A) {
      const g = new Uint8Array(262144);
      for (let I = 0; I < 256; I++)
        for (let B = 0; B < 256; B++) {
          const C = I + 256 * B;
          let Q;
          (Q = A[I] ? A[I] : A[I % 32] ? A[I % 32] : A.DEFAULT),
            (g[4 * C + 0] = 255 * Q.x),
            (g[4 * C + 1] = 255 * Q.y),
            (g[4 * C + 2] = 255 * Q.z),
            (g[4 * C + 3] = 255 * Q.w);
        }
      const I = new a.DataTexture(g, 256, 256, a.RGBAFormat);
      return (I.magFilter = a.NearestFilter), (I.needsUpdate = !0), I;
    }
    var Y = function (A, g, I, B) {
      var C,
        Q = arguments.length,
        E = Q < 3 ? g : null === B ? (B = Object.getOwnPropertyDescriptor(g, I)) : B;
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        E = Reflect.decorate(A, g, I, B);
      else
        for (var t = A.length - 1; t >= 0; t--)
          (C = A[t]) && (E = (Q < 3 ? C(E) : Q > 3 ? C(g, I, E) : C(g, I)) || E);
      return Q > 3 && E && Object.defineProperty(g, I, E), E;
    };
    const m = { [e.OCTREE]: 'tree_type_octree', [e.KDTREE]: 'tree_type_kdtree' },
      K = {
        [E.FIXED]: 'fixed_point_size',
        [E.ATTENUATED]: 'attenuated_point_size',
        [E.ADAPTIVE]: 'adaptive_point_size',
      },
      k = { [i.ATTENUATED]: 'attenuated_opacity', [i.FIXED]: 'fixed_opacity' },
      H = {
        [t.SQUARE]: 'square_point_shape',
        [t.CIRCLE]: 'circle_point_shape',
        [t.PARABOLOID]: 'paraboloid_point_shape',
      },
      J = {
        [o.RGB]: 'color_type_rgb',
        [o.COLOR]: 'color_type_color',
        [o.DEPTH]: 'color_type_depth',
        [o.HEIGHT]: 'color_type_height',
        [o.INTENSITY]: 'color_type_intensity',
        [o.INTENSITY_GRADIENT]: 'color_type_intensity_gradient',
        [o.LOD]: 'color_type_lod',
        [o.POINT_INDEX]: 'color_type_point_index',
        [o.CLASSIFICATION]: 'color_type_classification',
        [o.RETURN_NUMBER]: 'color_type_return_number',
        [o.SOURCE]: 'color_type_source',
        [o.NORMAL]: 'color_type_normal',
        [o.PHONG]: 'color_type_phong',
        [o.RGB_HEIGHT]: 'color_type_rgb_height',
        [o.COMPOSITE]: 'color_type_composite',
        [o.CUSTOM_SCALAR]: 'color_type_custom_scalar',
      },
      b = {
        [Q.DISABLED]: 'clip_disabled',
        [Q.CLIP_OUTSIDE]: 'clip_outside',
        [Q.HIGHLIGHT_INSIDE]: 'clip_highlight_inside',
        [Q.CLIP_HORIZONTALLY]: 'clip_horizontally',
        [Q.CLIP_VERTICALLY]: 'clip_vertically',
        [Q.CLIP_INSIDE]: 'clip_inside',
      };
    class T extends a.RawShaderMaterial {
      constructor(A = {}) {
        super(),
          (this.useDrawingBufferSize = !1),
          (this.lights = !1),
          (this.fog = !1),
          (this.colorRgba = !1),
          (this.numClipBoxes = 0),
          (this.clipBoxes = []),
          (this.visibleNodeTextureOffsets = new Map()),
          (this._gradient = M),
          (this.gradientTexture = p(this._gradient)),
          (this._classification = f),
          (this.classificationTexture = U(this._classification)),
          (this.uniforms = {
            bbSize: x('fv', [0, 0, 0]),
            blendDepthSupplement: x('f', 0),
            blendHardness: x('f', 2),
            classificationLUT: x('t', this.classificationTexture || new a.Texture()),
            clipBoxCount: x('f', 0),
            clipBoxes: x('Matrix4fv', []),
            clipExtent: x('fv', [0, 0, 1, 1]),
            depthMap: x('t', null),
            diffuse: x('fv', [1, 1, 1]),
            fov: x('f', 1),
            gradient: x('t', this.gradientTexture || new a.Texture()),
            heightMax: x('f', 1),
            heightMin: x('f', 0),
            intensityBrightness: x('f', 0),
            intensityContrast: x('f', 0),
            intensityGamma: x('f', 1),
            intensityRange: x('fv', [0, 65e3]),
            isLeafNode: x('b', 0),
            level: x('f', 0),
            maxSize: x('f', 50),
            minSize: x('f', 1),
            octreeSize: x('f', 0),
            opacity: x('f', 1),
            pcIndex: x('f', 0),
            rgbBrightness: x('f', 0),
            rgbContrast: x('f', 0),
            rgbGamma: x('f', 1),
            screenHeight: x('f', 1),
            screenWidth: x('f', 1),
            size: x('f', 1),
            spacing: x('f', 1),
            toModel: x('Matrix4f', []),
            transition: x('f', 0.5),
            uColor: x('c', new a.Color(16777215)),
            visibleNodes: x('t', this.visibleNodesTexture || new a.Texture()),
            vnStart: x('f', 0),
            wClassification: x('f', 0),
            wElevation: x('f', 0),
            wIntensity: x('f', 0),
            wReturnNumber: x('f', 0),
            wRGB: x('f', 1),
            wSourceID: x('f', 0),
            opacityAttenuation: x('f', 1),
            filterByNormalThreshold: x('f', 0),
            classificationFilter: x('iv', new Array(256).fill(!1)),
            highlightedPointCoordinate: x('fv', new a.Vector3()),
            highlightedPointColor: x('fv', h.clone()),
            enablePointHighlighting: x('b', !0),
            highlightedPointScale: x('f', 2),
            backgroundMap: x('t', null),
            normalFilteringMode: x('i', n.ABSOLUTE_NORMAL_FILTERING_MODE),
            pointCloudID: x('f', 2),
            pointCloudMixingMode: x('i', r.CHECKBOARD),
            stripeDistanceX: x('f', 5),
            stripeDistanceY: x('f', 5),
            stripeDivisorX: x('f', 2),
            stripeDivisorY: x('f', 2),
            pointCloudMixAngle: x('f', 31),
            renderDepth: x('bool', !1),
            customScalarRange: x('fv', [0, 1]),
          }),
          (this.useClipBox = !1),
          (this.weighted = !1),
          (this.pointColorType = o.RGB),
          (this.pointSizeType = E.ADAPTIVE),
          (this.clipMode = Q.DISABLED),
          (this.useEDL = !1),
          (this.shape = t.SQUARE),
          (this.treeType = e.OCTREE),
          (this.pointOpacityType = i.FIXED),
          (this.useFilterByNormal = !1),
          (this.useFilterByClassification = !1),
          (this.useTextureBlending = !1),
          (this.usePointCloudMixing = !1),
          (this.highlightPoint = !1),
          (this.customAttributeName = 'Deviation'),
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
          (this.glslVersion = a.GLSL3);
        const g = (this.visibleNodesTexture = L(2048, 1, new a.Color(16777215)));
        (g.minFilter = a.NearestFilter),
          (g.magFilter = a.NearestFilter),
          this.setUniform('visibleNodes', g),
          (this.treeType = v(A.treeType, e.OCTREE)),
          (this.size = v(A.size, 1)),
          (this.minSize = v(A.minSize, 2)),
          (this.maxSize = v(A.maxSize, 50)),
          (this.colorRgba = Boolean(A.colorRgba)),
          (this.classification = f),
          (this.defaultAttributeValues.normal = [0, 0, 0]),
          (this.defaultAttributeValues.classification = [0, 0, 0]),
          (this.defaultAttributeValues.indices = [0, 0, 0, 0]),
          (this.vertexColors = !0),
          this.updateShaderSource();
      }
      dispose() {
        super.dispose(),
          this.gradientTexture && (this.gradientTexture.dispose(), (this.gradientTexture = void 0)),
          this.visibleNodesTexture &&
            (this.visibleNodesTexture.dispose(), (this.visibleNodesTexture = void 0)),
          this.clearVisibleNodeTextureOffsets(),
          this.classificationTexture &&
            (this.classificationTexture.dispose(), (this.classificationTexture = void 0)),
          this.depthMap && (this.depthMap.dispose(), (this.depthMap = void 0)),
          this.backgroundMap && (this.backgroundMap.dispose(), (this.backgroundMap = void 0));
      }
      clearVisibleNodeTextureOffsets() {
        this.visibleNodeTextureOffsets.clear();
      }
      updateShaderSource() {
        (this.vertexShader = this.applyDefines(B(245).A)),
          (this.fragmentShader = this.applyDefines(B(168).A)),
          1 === this.opacity
            ? ((this.blending = a.NoBlending),
              (this.transparent = !1),
              (this.depthTest = !0),
              (this.depthWrite = !0),
              (this.depthFunc = a.LessEqualDepth))
            : this.opacity < 1 &&
              !this.useEDL &&
              ((this.blending = a.AdditiveBlending),
              (this.transparent = !0),
              (this.depthTest = !1),
              (this.depthWrite = !0)),
          this.weighted &&
            ((this.blending = a.AdditiveBlending),
            (this.transparent = !0),
            (this.depthTest = !0),
            (this.depthWrite = !1),
            (this.depthFunc = a.LessEqualDepth)),
          (this.needsUpdate = !0);
      }
      applyDefines(A) {
        const g = [];
        function I(A) {
          A && g.push(`#define ${A}`);
        }
        return (
          I(m[this.treeType]),
          I(K[this.pointSizeType]),
          I(H[this.shape]),
          I(J[this.pointColorType]),
          this.pointColorType === o.CUSTOM_SCALAR &&
            g.push(`#define CUSTOM_ATTRIBUTE_NAME ${this.customAttributeName}`),
          I(b[this.clipMode]),
          I(k[this.pointOpacityType]),
          (1 === this.rgbGamma && 0 === this.rgbBrightness && 0 === this.rgbContrast) ||
            I('use_rgb_gamma_contrast_brightness'),
          this.useFilterByNormal && I('use_filter_by_normal'),
          this.useFilterByClassification && I('use_filter_by_classification'),
          this.useEDL && I('use_edl'),
          this.weighted && I('weighted_splats'),
          this.numClipBoxes > 0 && I('use_clip_box'),
          this.highlightPoint && I('highlight_point'),
          this.useTextureBlending && I('use_texture_blending'),
          this.usePointCloudMixing && I('use_point_cloud_mixing'),
          this.colorRgba && I('color_rgba'),
          I('MAX_POINT_LIGHTS 0'),
          I('MAX_DIR_LIGHTS 0'),
          g.push(A),
          g.join('\n')
        );
      }
      setPointCloudMixingMode(A) {
        this.pointCloudMixingMode = A;
      }
      getPointCloudMixingMode() {
        return this.pointCloudMixingMode === r.STRIPES ? r.STRIPES : r.CHECKBOARD;
      }
      setClipBoxes(A) {
        if (!A) return;
        this.clipBoxes = A;
        const g = this.numClipBoxes !== A.length && (0 === A.length || 0 === this.numClipBoxes);
        (this.numClipBoxes = A.length),
          this.setUniform('clipBoxCount', this.numClipBoxes),
          g && this.updateShaderSource();
        const I = 16 * this.numClipBoxes,
          B = new Float32Array(I);
        for (let g = 0; g < this.numClipBoxes; g++) B.set(A[g].inverse.elements, 16 * g);
        for (let A = 0; A < I; A++) isNaN(B[A]) && (B[A] = 1 / 0);
        this.setUniform('clipBoxes', B);
      }
      get gradient() {
        return this._gradient;
      }
      set gradient(A) {
        this._gradient !== A &&
          ((this._gradient = A),
          (this.gradientTexture = p(this._gradient)),
          this.setUniform('gradient', this.gradientTexture));
      }
      get classification() {
        return this._classification;
      }
      set classification(A) {
        const g = {};
        for (const I of Object.keys(A)) g[I] = A[I].clone();
        let I = !1;
        if (void 0 === this._classification) I = !1;
        else {
          I = Object.keys(g).length === Object.keys(this._classification).length;
          for (const A of Object.keys(g))
            (I = I && void 0 !== this._classification[A]),
              (I = I && g[A].equals(this._classification[A]));
        }
        I || ((this._classification = g), this.recomputeClassification());
      }
      recomputeClassification() {
        (this.classificationTexture = U(this._classification)),
          this.setUniform('classificationLUT', this.classificationTexture);
      }
      get elevationRange() {
        return [this.heightMin, this.heightMax];
      }
      set elevationRange(A) {
        (this.heightMin = A[0]), (this.heightMax = A[1]);
      }
      getUniform(A) {
        return void 0 === this.uniforms ? void 0 : this.uniforms[A].value;
      }
      setUniform(A, g) {
        if (void 0 === this.uniforms) return;
        const I = this.uniforms[A];
        'c' === I.type ? I.value.copy(g) : g !== I.value && (I.value = g);
      }
      updateMaterial(A, g, I, B) {
        const C = B.getPixelRatio();
        I.type === D
          ? (this.fov = I.getEffectiveFOV() * (Math.PI / 180))
          : (this.fov = Math.PI / 2);
        const Q = B.getRenderTarget();
        null !== Q
          ? ((this.screenWidth = Q.width), (this.screenHeight = Q.height))
          : ((this.screenWidth = B.domElement.clientWidth * C),
            (this.screenHeight = B.domElement.clientHeight * C)),
          this.useDrawingBufferSize &&
            (B.getDrawingBufferSize(T.helperVec2),
            (this.screenWidth = T.helperVec2.width),
            (this.screenHeight = T.helperVec2.height));
        const t = Math.max(A.scale.x, A.scale.y, A.scale.z);
        (this.spacing = A.pcoGeometry.spacing * t),
          (this.octreeSize = A.pcoGeometry.boundingBox.getSize(T.helperVec3).x),
          (this.pointSizeType !== E.ADAPTIVE && this.pointColorType !== o.LOD) ||
            this.updateVisibilityTextureData(g);
      }
      updateVisibilityTextureData(A) {
        A.sort(l);
        const g = new Uint8Array(4 * A.length),
          I = new Array(A.length).fill(1 / 0);
        this.visibleNodeTextureOffsets.clear();
        for (let B = 0; B < A.length; B++) {
          const C = A[B];
          if ((this.visibleNodeTextureOffsets.set(C.name, B), B > 0)) {
            const A = C.name.slice(0, -1),
              Q = this.visibleNodeTextureOffsets.get(A),
              E = B - Q;
            I[Q] = Math.min(I[Q], E);
            const t = 4 * Q;
            (g[t] = g[t] | (1 << C.index)), (g[t + 1] = I[Q] >> 8), (g[t + 2] = I[Q] % 256);
          }
          g[4 * B + 3] = C.name.length;
        }
        const B = this.visibleNodesTexture;
        B && (B.image.data.set(g), (B.needsUpdate = !0));
      }
      static makeOnBeforeRender(A, g, I) {
        return (B, C, Q, E, t) => {
          const e = t,
            i = e.uniforms;
          (i.level.value = g.level), (i.isLeafNode.value = g.isLeafNode);
          const o = e.visibleNodeTextureOffsets.get(g.name);
          void 0 !== o && (i.vnStart.value = o),
            (i.pcIndex.value = void 0 !== I ? I : A.visibleNodes.indexOf(g)),
            (t.uniformsNeedUpdate = !0);
        };
      }
    }
    function x(A, g) {
      return { type: A, value: g };
    }
    function v(A, g) {
      return void 0 === A ? g : A;
    }
    function q(A, g = !1) {
      return (I, B) => {
        Object.defineProperty(I, B, {
          get() {
            return this.getUniform(A);
          },
          set(I) {
            I !== this.getUniform(A) && (this.setUniform(A, I), g && this.updateShaderSource());
          },
        });
      };
    }
    function O() {
      return (A, g) => {
        const I = `_${g.toString()}`;
        Object.defineProperty(A, g, {
          get() {
            return this[I];
          },
          set(A) {
            A !== this[I] && ((this[I] = A), this.updateShaderSource());
          },
        });
      };
    }
    var P;
    (T.helperVec3 = new a.Vector3()),
      (T.helperVec2 = new a.Vector2()),
      Y([q('bbSize')], T.prototype, 'bbSize', void 0),
      Y([q('clipExtent')], T.prototype, 'clipExtent', void 0),
      Y([q('depthMap')], T.prototype, 'depthMap', void 0),
      Y([q('fov')], T.prototype, 'fov', void 0),
      Y([q('heightMax')], T.prototype, 'heightMax', void 0),
      Y([q('heightMin')], T.prototype, 'heightMin', void 0),
      Y([q('intensityBrightness')], T.prototype, 'intensityBrightness', void 0),
      Y([q('intensityContrast')], T.prototype, 'intensityContrast', void 0),
      Y([q('intensityGamma')], T.prototype, 'intensityGamma', void 0),
      Y([q('intensityRange')], T.prototype, 'intensityRange', void 0),
      Y([q('maxSize')], T.prototype, 'maxSize', void 0),
      Y([q('minSize')], T.prototype, 'minSize', void 0),
      Y([q('octreeSize')], T.prototype, 'octreeSize', void 0),
      Y([q('opacity', !0)], T.prototype, 'opacity', void 0),
      Y([q('rgbBrightness', !0)], T.prototype, 'rgbBrightness', void 0),
      Y([q('rgbContrast', !0)], T.prototype, 'rgbContrast', void 0),
      Y([q('rgbGamma', !0)], T.prototype, 'rgbGamma', void 0),
      Y([q('screenHeight')], T.prototype, 'screenHeight', void 0),
      Y([q('screenWidth')], T.prototype, 'screenWidth', void 0),
      Y([q('size')], T.prototype, 'size', void 0),
      Y([q('spacing')], T.prototype, 'spacing', void 0),
      Y([q('transition')], T.prototype, 'transition', void 0),
      Y([q('uColor')], T.prototype, 'color', void 0),
      Y([q('wClassification')], T.prototype, 'weightClassification', void 0),
      Y([q('wElevation')], T.prototype, 'weightElevation', void 0),
      Y([q('wIntensity')], T.prototype, 'weightIntensity', void 0),
      Y([q('wReturnNumber')], T.prototype, 'weightReturnNumber', void 0),
      Y([q('wRGB')], T.prototype, 'weightRGB', void 0),
      Y([q('wSourceID')], T.prototype, 'weightSourceID', void 0),
      Y([q('opacityAttenuation')], T.prototype, 'opacityAttenuation', void 0),
      Y([q('filterByNormalThreshold')], T.prototype, 'filterByNormalThreshold', void 0),
      Y([q('classificationFilter')], T.prototype, 'classificationFilter', void 0),
      Y([q('highlightedPointCoordinate')], T.prototype, 'highlightedPointCoordinate', void 0),
      Y([q('highlightedPointColor')], T.prototype, 'highlightedPointColor', void 0),
      Y([q('enablePointHighlighting')], T.prototype, 'enablePointHighlighting', void 0),
      Y([q('highlightedPointScale')], T.prototype, 'highlightedPointScale', void 0),
      Y([q('normalFilteringMode')], T.prototype, 'normalFilteringMode', void 0),
      Y([q('backgroundMap')], T.prototype, 'backgroundMap', void 0),
      Y([q('pointCloudID')], T.prototype, 'pointCloudID', void 0),
      Y([q('pointCloudMixingMode')], T.prototype, 'pointCloudMixingMode', void 0),
      Y([q('stripeDistanceX')], T.prototype, 'stripeDistanceX', void 0),
      Y([q('stripeDistanceY')], T.prototype, 'stripeDistanceY', void 0),
      Y([q('stripeDivisorX')], T.prototype, 'stripeDivisorX', void 0),
      Y([q('stripeDivisorY')], T.prototype, 'stripeDivisorY', void 0),
      Y([q('pointCloudMixAngle')], T.prototype, 'pointCloudMixAngle', void 0),
      Y([q('renderDepth')], T.prototype, 'renderDepth', void 0),
      Y([q('customScalarRange')], T.prototype, 'customScalarRange', void 0),
      Y([O()], T.prototype, 'useClipBox', void 0),
      Y([O()], T.prototype, 'weighted', void 0),
      Y([O()], T.prototype, 'pointColorType', void 0),
      Y([O()], T.prototype, 'pointSizeType', void 0),
      Y([O()], T.prototype, 'clipMode', void 0),
      Y([O()], T.prototype, 'useEDL', void 0),
      Y([O()], T.prototype, 'shape', void 0),
      Y([O()], T.prototype, 'treeType', void 0),
      Y([O()], T.prototype, 'pointOpacityType', void 0),
      Y([O()], T.prototype, 'useFilterByNormal', void 0),
      Y([O()], T.prototype, 'useFilterByClassification', void 0),
      Y([O()], T.prototype, 'useTextureBlending', void 0),
      Y([O()], T.prototype, 'usePointCloudMixing', void 0),
      Y([O()], T.prototype, 'highlightPoint', void 0),
      Y([O()], T.prototype, 'customAttributeName', void 0),
      (function (A) {
        (A[(A.POSITION_CARTESIAN = 0)] = 'POSITION_CARTESIAN'),
          (A[(A.COLOR_PACKED = 1)] = 'COLOR_PACKED'),
          (A[(A.COLOR_FLOATS_1 = 2)] = 'COLOR_FLOATS_1'),
          (A[(A.COLOR_FLOATS_255 = 3)] = 'COLOR_FLOATS_255'),
          (A[(A.NORMAL_FLOATS = 4)] = 'NORMAL_FLOATS'),
          (A[(A.FILLER = 5)] = 'FILLER'),
          (A[(A.INTENSITY = 6)] = 'INTENSITY'),
          (A[(A.CLASSIFICATION = 7)] = 'CLASSIFICATION'),
          (A[(A.NORMAL_SPHEREMAPPED = 8)] = 'NORMAL_SPHEREMAPPED'),
          (A[(A.NORMAL_OCT16 = 9)] = 'NORMAL_OCT16'),
          (A[(A.NORMAL = 10)] = 'NORMAL');
      })(P || (P = {}));
    const V = {
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
    function W(A, g, I) {
      return { name: A, type: g, numElements: I, byteSize: I * g.size };
    }
    const j = W(P.COLOR_PACKED, V.DATA_TYPE_INT8, 4),
      z = {
        POSITION_CARTESIAN: W(P.POSITION_CARTESIAN, V.DATA_TYPE_FLOAT, 3),
        RGBA_PACKED: j,
        COLOR_PACKED: j,
        RGB_PACKED: W(P.COLOR_PACKED, V.DATA_TYPE_INT8, 3),
        NORMAL_FLOATS: W(P.NORMAL_FLOATS, V.DATA_TYPE_FLOAT, 3),
        FILLER_1B: W(P.FILLER, V.DATA_TYPE_UINT8, 1),
        INTENSITY: W(P.INTENSITY, V.DATA_TYPE_UINT16, 1),
        CLASSIFICATION: W(P.CLASSIFICATION, V.DATA_TYPE_UINT8, 1),
        NORMAL_SPHEREMAPPED: W(P.NORMAL_SPHEREMAPPED, V.DATA_TYPE_UINT8, 2),
        NORMAL_OCT16: W(P.NORMAL_OCT16, V.DATA_TYPE_UINT8, 2),
        NORMAL: W(P.NORMAL, V.DATA_TYPE_FLOAT, 3),
      },
      X = ['LAZ', 'LAS'];
    function Z(A) {
      return 'LAZ' === A;
    }
    class _ {
      constructor(A = []) {
        if (
          ((this.attributes = []),
          (this.byteSize = 0),
          (this.size = 0),
          (this.compressedFormat = null),
          'string' != typeof (g = A) || -1 === X.indexOf(g))
        ) {
          var g;
          if ('string' == typeof A)
            throw new Error(
              `Unknown pointAttributes value: "${A}". Expected an array of attribute names or one of: ${X.join(', ')}.`,
            );
          for (let g = 0; g < A.length; g++) {
            const I = A[g],
              B = z[I];
            if (void 0 === B)
              throw new Error(
                `Unknown point attribute: "${I}". Known attributes: ${Object.keys(z).join(', ')}.`,
              );
            this.attributes.push(B), (this.byteSize += B.byteSize), this.size++;
          }
        } else this.compressedFormat = A;
      }
      add(A) {
        this.attributes.push(A), (this.byteSize += A.byteSize), this.size++;
      }
      hasColors() {
        return null !== this.compressedFormat || void 0 !== this.attributes.find($);
      }
      hasNormals() {
        return void 0 !== this.attributes.find(AA);
      }
    }
    function $({ name: A }) {
      return A === P.COLOR_PACKED;
    }
    function AA({ name: A }) {
      return (
        A === P.NORMAL_SPHEREMAPPED ||
        A === P.NORMAL_FLOATS ||
        A === P.NORMAL ||
        A === P.NORMAL_OCT16
      );
    }
    function gA(A, g) {
      return new a.Box3().setFromPoints([
        new a.Vector3(A.min.x, A.min.y, A.min.z).applyMatrix4(g),
        new a.Vector3(A.min.x, A.min.y, A.min.z).applyMatrix4(g),
        new a.Vector3(A.max.x, A.min.y, A.min.z).applyMatrix4(g),
        new a.Vector3(A.min.x, A.max.y, A.min.z).applyMatrix4(g),
        new a.Vector3(A.min.x, A.min.y, A.max.z).applyMatrix4(g),
        new a.Vector3(A.min.x, A.max.y, A.max.z).applyMatrix4(g),
        new a.Vector3(A.max.x, A.max.y, A.min.z).applyMatrix4(g),
        new a.Vector3(A.max.x, A.min.y, A.max.z).applyMatrix4(g),
        new a.Vector3(A.max.x, A.max.y, A.max.z).applyMatrix4(g),
      ]);
    }
    function IA(A, g) {
      const I = A.min.clone(),
        B = A.max.clone(),
        C = new a.Vector3().subVectors(B, I);
      return (
        (1 & g) > 0 ? (I.z += C.z / 2) : (B.z -= C.z / 2),
        (2 & g) > 0 ? (I.y += C.y / 2) : (B.y -= C.y / 2),
        (4 & g) > 0 ? (I.x += C.x / 2) : (B.x -= C.x / 2),
        new a.Box3(I, B)
      );
    }
    class BA extends a.EventDispatcher {
      constructor(A, g, I) {
        super(),
          (this.id = BA.idCount++),
          (this.level = 0),
          (this.spacing = 0),
          (this.hasChildren = !1),
          (this.children = [null, null, null, null, null, null, null, null]),
          (this.mean = new a.Vector3()),
          (this.numPoints = 0),
          (this.loaded = !1),
          (this.loading = !1),
          (this.failed = !1),
          (this.parent = null),
          (this.oneTimeDisposeHandlers = []),
          (this.isLeafNode = !0),
          (this.isTreeNode = !1),
          (this.isGeometryNode = !0),
          (this.name = A),
          (this.index = w(A)),
          (this.pcoGeometry = g),
          (this.boundingBox = I),
          (this.tightBoundingBox = I.clone()),
          (this.boundingSphere = I.getBoundingSphere(new a.Sphere()));
      }
      dispose() {
        this.geometry &&
          this.parent &&
          (this.geometry.dispose(),
          (this.geometry = void 0),
          (this.loaded = !1),
          this.oneTimeDisposeHandlers.forEach((A) => A()),
          (this.oneTimeDisposeHandlers = []));
      }
      getUrl() {
        const A = this.pcoGeometry,
          g = A.loader.version,
          I = [A.octreeDir];
        return (
          A.loader && g.equalOrHigher('1.5')
            ? (I.push(this.getHierarchyBaseUrl()), I.push(this.name))
            : (g.equalOrHigher('1.4') || g.upTo('1.3')) && I.push(this.name),
          I.join('/')
        );
      }
      getHierarchyUrl() {
        return `${this.pcoGeometry.octreeDir}/${this.getHierarchyBaseUrl()}/${this.name}.hrc`;
      }
      addChild(A) {
        (this.children[A.index] = A), (this.isLeafNode = !1), (A.parent = this);
      }
      traverse(A, g = !0) {
        const I = g ? [this] : [];
        let B;
        for (; void 0 !== (B = I.pop()); ) {
          A(B);
          for (const A of B.children) null !== A && I.push(A);
        }
      }
      load() {
        if (!this.canLoad()) return Promise.resolve();
        let A;
        return (
          (this.loading = !0),
          this.pcoGeometry.numNodesLoading++,
          (this.pcoGeometry.needsUpdate = !0),
          (A =
            this.pcoGeometry.loader.version.equalOrHigher('1.5') &&
            this.level % this.pcoGeometry.hierarchyStepSize === 0 &&
            this.hasChildren
              ? this.loadHierachyThenPoints()
              : this.loadPoints()),
          A.catch((A) => {
            throw ((this.loading = !1), (this.failed = !0), this.pcoGeometry.numNodesLoading--, A);
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
        return (this.pcoGeometry.needsUpdate = !0), this.pcoGeometry.loader.load(this);
      }
      loadHierachyThenPoints() {
        return this.level % this.pcoGeometry.hierarchyStepSize !== 0
          ? Promise.resolve()
          : Promise.resolve(this.pcoGeometry.loader.getUrl(this.getHierarchyUrl()))
              .then((A) => this.pcoGeometry.xhrRequest(A, { mode: 'cors' }))
              .then((A) => y(A))
              .then((A) => A.arrayBuffer())
              .then((A) => d(A))
              .then((A) => this.loadHierarchy(this, A));
      }
      getHierarchyBaseUrl() {
        const A = this.pcoGeometry.hierarchyStepSize,
          g = this.name.substr(1),
          I = Math.floor(g.length / A);
        let B = 'r/';
        for (let C = 0; C < I; C++) B += `${g.substr(C * A, A)}/`;
        return B.slice(0, -1);
      }
      loadHierarchy(A, g) {
        const I = new DataView(g),
          B = this.getNodeData(A.name, 0, I);
        A.numPoints = B.numPoints;
        const C = [B],
          Q = [];
        let E = 5;
        for (; C.length > 0; ) {
          const A = C.shift();
          let B = 1;
          for (let t = 0; t < 8 && E + 1 < g.byteLength; t++) {
            if (0 !== (A.children & B)) {
              const g = this.getNodeData(A.name + t, E, I);
              Q.push(g), C.push(g), (E += 5);
            }
            B *= 2;
          }
        }
        A.pcoGeometry.needsUpdate = !0;
        const t = new Map();
        t.set(A.name, A), Q.forEach((g) => this.addNode(g, A.pcoGeometry, t)), A.loadPoints();
      }
      getNodeData(A, g, I) {
        return { children: I.getUint8(g), numPoints: I.getUint32(g + 1, !0), name: A };
      }
      addNode({ name: A, numPoints: g, children: I }, B, C) {
        const Q = w(A),
          E = A.substring(0, A.length - 1),
          t = C.get(E),
          e = A.length - 1,
          i = IA(t.boundingBox, Q),
          o = new BA(A, B, i);
        (o.level = e),
          (o.numPoints = g),
          (o.hasChildren = I > 0),
          (o.spacing = B.spacing / Math.pow(2, e)),
          t.addChild(o),
          C.set(A, o);
      }
    }
    BA.idCount = 0;
    class CA {
      constructor(A, g, I, B, C) {
        (this.loader = A),
          (this.boundingBox = g),
          (this.tightBoundingBox = I),
          (this.offset = B),
          (this.xhrRequest = C),
          (this.disposed = !1),
          (this.needsUpdate = !0),
          (this.octreeDir = ''),
          (this.hierarchyStepSize = -1),
          (this.nodes = {}),
          (this.numNodesLoading = 0),
          (this.maxNumNodesLoading = 3),
          (this.spacing = 0),
          (this.pointAttributes = new _([])),
          (this.projection = null),
          (this.url = null);
      }
      dispose() {
        this.loader.dispose(), this.root.traverse((A) => A.dispose()), (this.disposed = !0);
      }
      addNodeLoadedCallback(A) {
        this.loader.callbacks.push(A);
      }
      clearNodeLoadedCallbacks() {
        this.loader.callbacks = [];
      }
    }
    class QA extends a.EventDispatcher {
      constructor(A, g) {
        super(),
          (this.pcIndex = void 0),
          (this.boundingBoxNode = null),
          (this.loaded = !0),
          (this.isTreeNode = !0),
          (this.isGeometryNode = !1),
          (this.geometryNode = A),
          (this.sceneNode = g),
          (this.children = A.children.slice());
      }
      dispose() {
        this.geometryNode.dispose();
      }
      disposeSceneNode() {
        const A = this.sceneNode;
        if (A.geometry instanceof a.BufferGeometry) {
          const g = A.geometry.attributes;
          for (const A in g) delete g[A].array, delete g[A];
          A.geometry.dispose(), (A.geometry = void 0);
        }
      }
      traverse(A, g) {
        this.geometryNode.traverse(A, g);
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
    function EA(A, g, I) {
      return Math.min(Math.max(g, A), I);
    }
    class tA {
      dispose() {
        this.pickState &&
          (this.pickState.material.dispose(), this.pickState.renderTarget.dispose());
      }
      pick(A, g, I, B, C = {}) {
        if (0 === B.length) return null;
        const Q = this.pickState ? this.pickState : (this.pickState = tA.getPickState()),
          E = Q.material,
          t = A.getPixelRatio(),
          e = Math.ceil(A.domElement.clientWidth * t),
          i = Math.ceil(A.domElement.clientHeight * t);
        tA.updatePickRenderTarget(this.pickState, e, i);
        const o = tA.helperVec3;
        C.pixelPosition
          ? o.copy(C.pixelPosition)
          : (o.addVectors(I.origin, I.direction).project(g),
            (o.x = (o.x + 1) * e * 0.5),
            (o.y = (o.y + 1) * i * 0.5));
        const n = Math.floor((C.pickWindowSize || 15) * t),
          r = (n - 1) / 2,
          a = Math.floor(EA(o.x - r, 0, e)),
          s = Math.floor(EA(o.y - r, 0, i));
        tA.prepareRender(A, a, s, n, E, Q);
        const D = tA.render(A, g, E, B, I, Q, C);
        E.clearVisibleNodeTextureOffsets();
        const c = tA.readPixels(A, a, s, n),
          h = tA.findHit(c, n);
        return tA.getPickPoint(h, D);
      }
      static prepareRender(A, g, I, B, C, Q) {
        A.setScissor(g, I, B, B),
          A.setScissorTest(!0),
          A.state.buffers.depth.setTest(C.depthTest),
          A.state.buffers.depth.setMask(C.depthWrite),
          A.state.setBlending(a.NoBlending),
          A.setRenderTarget(Q.renderTarget),
          A.getClearColor(this.clearColor);
        const E = A.getClearAlpha();
        A.setClearColor(c, 0), A.clear(!0, !0, !0), A.setClearColor(this.clearColor, E);
      }
      static render(A, g, I, B, C, Q, E) {
        const t = [];
        for (const e of B) {
          const B = tA.nodesOnRay(e, C);
          B.length &&
            (tA.updatePickMaterial(I, e.material, E),
            I.updateMaterial(e, B, g, A),
            E.onBeforePickRender && E.onBeforePickRender(I, Q.renderTarget),
            (Q.scene.children = tA.createTempNodes(e, B, I, t.length)),
            A.render(Q.scene, g),
            B.forEach((A) => t.push({ node: A, octree: e })));
        }
        return t;
      }
      static nodesOnRay(A, g) {
        const I = [],
          B = g.clone();
        for (const g of A.visibleNodes) {
          const C = tA.helperSphere.copy(g.boundingSphere).applyMatrix4(A.matrixWorld);
          B.intersectsSphere(C) && I.push(g);
        }
        return I;
      }
      static readPixels(A, g, I, B) {
        const C = new Uint8Array(4 * B * B);
        return (
          A.readRenderTargetPixels(A.getRenderTarget(), g, I, B, B, C),
          A.setScissorTest(!1),
          A.setRenderTarget(null),
          C
        );
      }
      static createTempNodes(A, g, I, B) {
        const C = [];
        for (let Q = 0; Q < g.length; Q++) {
          const E = g[Q],
            t = E.sceneNode,
            e = new a.Points(t.geometry, I);
          (e.matrix = t.matrix),
            (e.matrixWorld = t.matrixWorld),
            (e.matrixAutoUpdate = !1),
            (e.frustumCulled = !1);
          const i = B + Q + 1;
          i > 255 && console.error('More than 255 nodes for pick are not supported.'),
            (e.onBeforeRender = T.makeOnBeforeRender(A, E, i)),
            C.push(e);
        }
        return C;
      }
      static updatePickMaterial(A, g, I) {
        (A.pointSizeType = g.pointSizeType),
          (A.shape = g.shape),
          (A.size = g.size),
          (A.minSize = g.minSize),
          (A.maxSize = g.maxSize),
          (A.classification = g.classification),
          (A.useFilterByNormal = g.useFilterByNormal),
          (A.classificationFilter = g.classificationFilter),
          (A.useFilterByClassification = g.useFilterByClassification),
          (A.filterByNormalThreshold = g.filterByNormalThreshold),
          I.pickOutsideClipRegion
            ? (A.clipMode = Q.DISABLED)
            : ((A.clipMode = g.clipMode),
              (A.clipExtent = g.clipExtent),
              A.setClipBoxes(g.clipMode === Q.CLIP_OUTSIDE ? g.clipBoxes : []));
      }
      static updatePickRenderTarget(A, g, I) {
        (A.renderTarget.width === g && A.renderTarget.height === I) ||
          (A.renderTarget.dispose(),
          (A.renderTarget = tA.makePickRenderTarget()),
          A.renderTarget.setSize(g, I));
      }
      static makePickRenderTarget() {
        return new a.WebGLRenderTarget(1, 1, {
          minFilter: a.LinearFilter,
          magFilter: a.NearestFilter,
          format: a.RGBAFormat,
        });
      }
      static findHit(A, g) {
        const I = new Uint32Array(A.buffer);
        let B = Number.MAX_VALUE,
          C = null;
        for (let Q = 0; Q < g; Q++)
          for (let E = 0; E < g; E++) {
            const t = Q + E * g,
              e = Math.pow(Q - (g - 1) / 2, 2) + Math.pow(E - (g - 1) / 2, 2),
              i = A[4 * t + 3];
            A[4 * t + 3] = 0;
            const o = I[t];
            i > 0 && e < B && ((C = { pIndex: o, pcIndex: i - 1 }), (B = e));
          }
        return C;
      }
      static getPickPoint(A, g) {
        if (!A) return null;
        const I = {},
          B = g[A.pcIndex] && g[A.pcIndex].node.sceneNode;
        if (!B) return null;
        I.pointCloud = g[A.pcIndex].octree;
        const C = B.geometry.attributes;
        for (const g in C) {
          if (!C.hasOwnProperty(g)) continue;
          const Q = C[g];
          if ('position' === g) tA.addPositionToPickPoint(I, A, Q, B);
          else if ('normal' === g) tA.addNormalToPickPoint(I, A, Q, B);
          else if ('indices' === g);
          else if (1 === Q.itemSize) I[g] = Q.array[A.pIndex];
          else {
            const B = [];
            for (let g = 0; g < Q.itemSize; g++) B.push(Q.array[Q.itemSize * A.pIndex + g]);
            I[g] = B;
          }
        }
        return I;
      }
      static addPositionToPickPoint(A, g, I, B) {
        A.position = new a.Vector3().fromBufferAttribute(I, g.pIndex).applyMatrix4(B.matrixWorld);
      }
      static addNormalToPickPoint(A, g, I, B) {
        const C = new a.Vector3().fromBufferAttribute(I, g.pIndex),
          Q = new a.Vector4(C.x, C.y, C.z, 0).applyMatrix4(B.matrixWorld);
        C.set(Q.x, Q.y, Q.z), (A.normal = C);
      }
      static getPickState() {
        const A = new a.Scene();
        A.matrixAutoUpdate = !1;
        const g = new T();
        return (
          (g.pointColorType = o.POINT_INDEX),
          { renderTarget: tA.makePickRenderTarget(), material: g, scene: A }
        );
      }
    }
    (tA.helperVec3 = new a.Vector3()),
      (tA.helperSphere = new a.Sphere()),
      (tA.clearColor = new a.Color());
    class eA {
      constructor(A, g) {
        (this.loader = A),
          (this.boundingBox = g),
          (this.maxNumNodesLoading = 3),
          (this.numNodesLoading = 0),
          (this.needsUpdate = !0),
          (this.disposed = !1),
          (this.pointAttributes = null),
          (this.spacing = 0),
          (this.url = null),
          (this.tightBoundingBox = this.boundingBox.clone()),
          (this.boundingSphere = this.boundingBox.getBoundingSphere(new a.Sphere())),
          (this.tightBoundingSphere = this.boundingSphere.clone());
      }
      dispose() {
        this.root.traverse((A) => A.dispose()), (this.disposed = !0);
      }
    }
    class iA extends a.Object3D {
      constructor() {
        super(...arguments), (this.root = null);
      }
      initialized() {
        return null !== this.root;
      }
    }
    function oA(A) {
      function g(A) {
        return A.charCodeAt(0);
      }
      let I,
        B,
        C,
        Q,
        E,
        t,
        e,
        i,
        o,
        n,
        r,
        a = 65536;
      A.onmessage = (s) => {
        s.data.init &&
          (function (n) {
            C = n;
            const a = 4 * C,
              s = 16 * C,
              D = 4 * C,
              c = 524288,
              h = a + s + 64 + D + c + 4 * C + 2097152,
              w = Math.floor(h / 65536) + 1,
              l = {
                module: {},
                env: { memory: new WebAssembly.Memory({ initial: w, maximum: w }) },
              },
              y = new Uint8Array(
                atob(
                  'AGFzbQEAAAAADwhkeWxpbmsuMAEEAAAAAAEPAmAAAGAIf39/f39/f38AAg8BA2VudgZtZW1vcnkCAAADAwIAAQcjAhFfX3dhc21fY2FsbF9jdG9ycwAAC3NvcnRJbmRleGVzAAEKhgMCAwABC/8CAgN/A30gBwRAIAQqAighCyAEKgIYIQwgBCoCCCENQfj///8HIQlBiICAgHghBANAIAIgCkECdCIIaiALIAEgACAIaigCAEEEdGoiCCoCCJQgDSAIKgIAlCAMIAgqAgSUkpJDAACARZT8ACIINgIAIAkgCCAIIAlKGyEJIAQgCCAEIAhKGyEEIApBAWoiCiAHRw0ACyAGQQFrsyAEsiAJspOVIQtBACEEA0AgAiAEQQJ0aiIBIAsgASgCACAJa7KU/AAiATYCACADIAFBAnRqIgEgASgCAEEBajYCACAEQQFqIgQgB0cNAAsLIAZBAk8EQCADKAIAIQlBASEEA0AgAyAEQQJ0aiIBIAEoAgAgCWoiCTYCACAEQQFqIgQgBkcNAAsLIAdBAEoEQCAHIQQDQCAFIAcgAyACIARBAWsiAUECdCIGaigCAEECdGoiCSgCACIIa0ECdGogACAGaigCADYCACAJIAhBAWs2AgAgBEEBSyEGIAEhBCAGDQALCws=',
                )
                  .split('')
                  .map(g),
              );
            WebAssembly.instantiate(y, l).then((g) => {
              (I = g.instance), (B = l.env.memory.buffer), (r = new Int32Array(C));
              for (let A = 0; A < C; A++) r[A] = A;
              (Q = 0),
                (i = Q + a),
                (o = i + s),
                (t = o + 64),
                (e = t + D),
                (E = e + c),
                A.postMessage({ sorterReady: !0 });
            });
          })(s.data.splatCount),
          s.data.sort &&
            (function (g) {
              let C = g.data.sort.centers,
                r = g.data.sort.totalSplats,
                s = g.data.sort.modelViewProj;
              new Float32Array(B, i, C.byteLength / 4).set(new Float32Array(C)),
                new Int32Array(B, 0, g.data.sort.indices.byteLength / 4).set(g.data.sort.indices),
                n || (n = new Uint32Array(a)),
                new Float32Array(B, o, 16).set(s),
                new Uint32Array(B, e, a).set(n),
                I.exports.sortIndexes(Q, i, t, e, o, E, a, r);
              const D = new Int32Array(B, E, r);
              A.postMessage({ dataSorted: D });
            })(s);
      };
    }
    class nA extends a.Object3D {
      constructor(A = !1, g, I = !1) {
        super(),
          (this.material = null),
          (this.forceSorting = !0),
          (this.continuousSorting = !0),
          (this.totalSplats = 5e5),
          (this.textures = new Array()),
          (this.nodesAsString = ''),
          (this.lastSortViewDir = new a.Vector3(0, 0, -1)),
          (this.sortViewDir = new a.Vector3(0, 0, -1)),
          (this.lastSortViewPos = new a.Vector3()),
          (this.sortViewOffset = new a.Vector3()),
          (this.enableSorting = !0),
          (this.enabled = !1),
          (this.instanceCount = 0),
          (this.debugMode = !1),
          (this.rendererSize = new a.Vector2()),
          (this.harmonicsEnabled = !1),
          (this.maxPointBudget = 0),
          (this.debugMode = A),
          (this.harmonicsEnabled = I),
          (this.maxPointBudget = g),
          (this.indexesBuffer = new Int32Array(g));
        let B = new Int32Array(g);
        for (let A = 0; A < g; A++) (this.indexesBuffer[A] = A), (B[A] = A);
        let C = Math.ceil(Math.sqrt(g)),
          Q = I ? Math.ceil(Math.sqrt(3 * g)) : 1,
          E = I ? Math.ceil(Math.sqrt(5 * g)) : 1,
          t = I ? Math.ceil(Math.sqrt(7 * g)) : 1;
        (this.bufferCenters = new Float32Array(C * C * 4)),
          (this.bufferPositions = new Float32Array(C * C * 4)),
          (this.bufferScale = new Float32Array(C * C * 3)),
          (this.bufferOrientation = new Float32Array(C * C * 4)),
          (this.bufferSorted = new Uint32Array(g)),
          (this.bufferOrientation = new Float32Array(C * C * 4)),
          (this.bufferPosColor = new Uint32Array(C * C * 4)),
          (this.bufferCovariance0 = new Float32Array(C * C * 4)),
          (this.bufferCovariance1 = new Float32Array(C * C * 2)),
          (this.bufferNodes = new Float32Array(4e4)),
          (this.bufferNodes2 = new Float32Array(4e4)),
          (this.bufferNodesIndices = new Uint32Array(C * C)),
          (this.bufferVisibilityNodes = new Uint8Array(8192)),
          (this.bufferHarmonics1 = new Uint32Array(Q * Q)),
          (this.bufferHarmonics2 = new Uint32Array(E * E)),
          (this.bufferHarmonics3 = new Uint32Array(t * t)),
          (this.textureNode = new a.DataTexture(
            this.bufferNodes,
            100,
            100,
            a.RGBAFormat,
            a.FloatType,
          )),
          (this.textureNode2 = new a.DataTexture(
            this.bufferNodes2,
            100,
            100,
            a.RGBAFormat,
            a.FloatType,
          )),
          (this.textureSorted = new a.DataTexture(
            this.bufferSorted,
            C,
            C,
            a.RedIntegerFormat,
            a.UnsignedIntType,
          )),
          (this.textureSorted.internalFormat = 'R32UI'),
          (this.textureNodeIndices = new a.DataTexture(
            this.bufferNodesIndices,
            C,
            C,
            a.RedIntegerFormat,
            a.UnsignedIntType,
          )),
          (this.textureNodeIndices.internalFormat = 'R32UI'),
          (this.textureCovariance0 = new a.DataTexture(
            this.bufferCovariance0,
            C,
            C,
            a.RGBAFormat,
            a.FloatType,
          )),
          (this.textureCovariance1 = new a.DataTexture(
            this.bufferCovariance1,
            C,
            C,
            a.RGFormat,
            a.FloatType,
          )),
          (this.texturePosColor = new a.DataTexture(
            this.bufferPosColor,
            C,
            C,
            a.RGBAIntegerFormat,
            a.UnsignedIntType,
          )),
          (this.texturePosColor.internalFormat = 'RGBA32UI'),
          (this.textureHarmonics1 = new a.DataTexture(
            this.bufferHarmonics1,
            Q,
            Q,
            a.RedIntegerFormat,
            a.UnsignedIntType,
          )),
          (this.textureHarmonics1.internalFormat = 'R32UI'),
          (this.textureHarmonics2 = new a.DataTexture(
            this.bufferHarmonics2,
            E,
            E,
            a.RedIntegerFormat,
            a.UnsignedIntType,
          )),
          (this.textureHarmonics2.internalFormat = 'R32UI'),
          (this.textureHarmonics3 = new a.DataTexture(
            this.bufferHarmonics3,
            t,
            t,
            a.RedIntegerFormat,
            a.UnsignedIntType,
          )),
          (this.textureHarmonics3.internalFormat = 'R32UI'),
          (this.textureVisibilityNodes = new a.DataTexture(
            this.bufferVisibilityNodes,
            2048,
            1,
            a.RGBAFormat,
          )),
          (this.textureVisibilityNodes.magFilter = a.NearestFilter),
          (this.textureVisibilityNodes.minFilter = a.NearestFilter),
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
          this.textures.forEach((A) => (A.needsUpdate = !0)),
          this.initialize();
      }
      initialize() {
        return ((A = this.maxPointBudget),
        new Promise((g) => {
          const I = new Worker(
            URL.createObjectURL(
              new Blob(['(', oA.toString(), ')(self)'], { type: 'application/javascript' }),
            ),
          );
          I.postMessage({ init: !0, splatCount: A }),
            (I.onmessage = (A) => {
              A.data.sorterReady && g(I);
            });
        })).then((A) => {
          this.sorter = A;
          const g = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]),
            I = new Uint16Array([0, 1, 2, 2, 1, 3]);
          let C = new a.ShaderMaterial({
            glslVersion: a.GLSL3,
            vertexShader: B(935).A,
            fragmentShader: B(422).A,
            transparent: !0,
            depthTest: !0,
            depthWrite: !1,
            side: a.DoubleSide,
            uniforms: {
              focal: { value: new a.Vector2(0, 0) },
              inverseFocalAdjustment: { value: 1 },
              splatScale: { value: 1 },
              initialSplatScale: { value: 1 },
              basisViewport: { value: new a.Vector2(0, 0) },
              globalOffset: { value: new a.Vector3(0, 0, 0) },
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
              cameraPosition: { value: new a.Vector3(0, 0, 0) },
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
              clipExtent: { value: new a.Vector4(0, 0, 1, 1) },
              maxDepth: { value: 1 },
            },
          });
          (this.material = C),
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
              (this.material.uniforms.visibleNodes.value = this.textureVisibilityNodes));
          let Q = new a.InstancedBufferGeometry();
          Q.setAttribute('position', new a.BufferAttribute(g, 3)),
            Q.setIndex(new a.BufferAttribute(I, 1)),
            (this.mesh = new a.Mesh(Q, C)),
            (this.mesh.frustumCulled = !1),
            this.add(this.mesh),
            (this.enabled = !0);
        });
        var A;
      }
      renderSplatsIDs(A) {
        null != this.material &&
          ((this.material.uniforms.renderIds.value = A), (this.material.transparent = !A));
      }
      update(A, g, I, B = () => {}) {
        if (null == this.material) return;
        this.material.uniforms.cameraPosition.value = g.position;
        let C = A.material;
        (C.visible = !1),
          (this.material.uniforms.octreeSize.value = C.uniforms.octreeSize.value),
          (this.material.uniforms.fov.value = C.uniforms.fov.value),
          (this.material.uniforms.spacing.value = C.uniforms.spacing.value),
          (this.material.uniforms.screenHeight.value = C.uniforms.screenHeight.value),
          (this.material.uniforms.screenWidth.value = C.uniforms.screenWidth.value);
        let Q = this.material;
        Q.uniforms.basisViewport.value.set(1 / I.x, 1 / I.y);
        const E = 0.5 * g.projectionMatrix.elements[0] * I.x,
          t = 0.5 * g.projectionMatrix.elements[5] * I.y;
        Q.uniforms.focal.value.set(E, t);
        let e = 0,
          i = 0,
          o = '',
          n = 0,
          r = 0;
        return (
          A.traverse((A) => {
            let g = A.geometry;
            e += g.drawRange.count;
          }),
          (n = e * (this.harmonicsEnabled ? 236 : 56)),
          A.traverseVisible((A) => {
            o += A.name;
          }),
          (this.forceSorting = !1),
          o === this.nodesAsString ||
            !this.enableSorting ||
            ((this.nodesAsString = o),
            (e = 0),
            (i = 0),
            this.bufferVisibilityNodes.set(C.uniforms.visibleNodes.value.image.data),
            A.traverseVisible((g) => {
              let I = g,
                B = I.geometry;
              this.material &&
                ('r' === I.name &&
                  this.material?.uniforms.globalOffset.value.copy(B.userData.offset),
                (this.material.uniforms.maxDepth.value = B.userData.maxDepth),
                (this.material.uniforms.maxSplatScale.value = B.userData.maxDepth),
                (this.totalSplats = B.userData.totalSplats));
              const C = A.material.visibleNodeTextureOffsets.get(g.name),
                Q = I.name.length - 1;
              let E = B.userData.offset,
                t = [I.position.x, I.position.y, I.position.z, E.x],
                o = [C, Q, E.y, E.z];
              this.bufferNodes.set(t, 4 * i),
                this.bufferNodes2.set(o, 4 * i),
                this.bufferNodesIndices.set(new Uint32Array(B.drawRange.count).fill(i), e),
                this.bufferCenters.set(B.getAttribute('raw_position').array, 4 * e),
                this.bufferPositions.set(B.getAttribute('centers').array, 4 * e),
                this.bufferScale.set(B.getAttribute('scale').array, 3 * e),
                this.bufferOrientation.set(B.getAttribute('orientation').array, 4 * e),
                this.bufferCovariance0.set(B.getAttribute('COVARIANCE0').array, 4 * e),
                this.bufferCovariance1.set(B.getAttribute('COVARIANCE1').array, 2 * e),
                this.bufferPosColor.set(B.getAttribute('POS_COLOR').array, 4 * e),
                this.harmonicsEnabled &&
                  (this.bufferHarmonics1.set(B.getAttribute('HARMONICS1').array, 3 * e),
                  this.bufferHarmonics2.set(B.getAttribute('HARMONICS2').array, 5 * e),
                  this.bufferHarmonics3.set(B.getAttribute('HARMONICS3').array, 7 * e)),
                (e += B.drawRange.count),
                i++;
            }),
            (r = e * (this.harmonicsEnabled ? 236 : 56)),
            this.debugMode &&
              (console.log('total memory in usage: ' + Math.ceil(n / 1e6) + ' MB'),
              console.log('total memory displayed: ' + Math.ceil(r / 1e6) + ' MB'),
              console.log('levels displayed: ' + o)),
            (this.instanceCount = e),
            (this.forceSorting = !0),
            this.sortSplats(g, B),
            !1)
        );
      }
      defer() {
        return new Promise((A) => {
          let g = 0,
            I = () => {
              let B = requestAnimationFrame(I);
              2 == g && (A('true'), cancelAnimationFrame(B)), g++;
            };
          I();
        });
      }
      sortSplats(A, g = () => {}) {
        if (null == this.mesh || 0 == this.instanceCount) return;
        let I = new a.Matrix4();
        A.updateMatrixWorld(),
          I.copy(A.matrixWorld).invert(),
          I.premultiply(A.projectionMatrix),
          I.multiply(this.mesh.matrixWorld);
        let B = 0,
          C = 0;
        if (
          (this.sortViewDir.set(0, 0, -1).applyQuaternion(A.quaternion),
          (B = this.sortViewDir.dot(this.lastSortViewDir)),
          (C = this.sortViewOffset.copy(A.position).sub(this.lastSortViewPos).length()),
          (this.continuousSorting || this.forceSorting || B <= 0.99 || C >= 1) &&
            this.enableSorting)
        ) {
          let B = {
            indices: this.indexesBuffer,
            centers: this.bufferCenters,
            modelViewProj: I.elements,
            totalSplats: this.instanceCount,
          };
          this.sorter.postMessage({ sort: B }),
            (this.enableSorting = !1),
            (this.forceSorting = !1),
            (this.sorter.onmessage = async (A) => {
              A.data.dataSorted &&
                (null != A.data.dataSorted
                  ? (this.bufferSorted.set(new Uint32Array(A.data.dataSorted), 0),
                    this.textures.forEach((A) => (A.needsUpdate = !0)),
                    (this.mesh.geometry.instanceCount = this.instanceCount),
                    this.defer().then((A) => {
                      g(), (this.enableSorting = !0);
                    }))
                  : (this.enableSorting = !0));
            }),
            this.lastSortViewPos.copy(A.position),
            this.lastSortViewDir.copy(this.sortViewDir);
        }
      }
      getSplatData(A, g) {
        if (null == this.mesh) return null;
        let I = new a.Vector3(),
          B = new a.Vector3(),
          C = new a.Vector3(),
          Q = new a.Quaternion();
        return (
          (I.x = this.bufferPositions[4 * A + 0]),
          (I.y = this.bufferPositions[4 * A + 1]),
          (I.z = this.bufferPositions[4 * A + 2]),
          (C.x = this.bufferScale[3 * A + 0]),
          (C.y = this.bufferScale[3 * A + 1]),
          (C.z = this.bufferScale[3 * A + 2]),
          (Q.w = this.bufferOrientation[4 * A + 0]),
          (Q.x = this.bufferOrientation[4 * A + 1]),
          (Q.y = this.bufferOrientation[4 * A + 2]),
          (Q.z = this.bufferOrientation[4 * A + 3]),
          (B.x = this.bufferNodes[4 * g + 0]),
          (B.y = this.bufferNodes[4 * g + 1]),
          (B.z = this.bufferNodes[4 * g + 2]),
          I.add(B),
          { position: this.mesh.localToWorld(I), scale: C, orientation: Q }
        );
      }
      dispose() {
        this.enabled &&
          (this.sorter.terminate(),
          (this.sorter = null),
          this.mesh.geometry.dispose(),
          this.material?.dispose(),
          this.textures.forEach((A) => {
            A.dispose(), (A = null);
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
    class rA extends iA {
      constructor(A, g, I, B = !1, C = 529e4) {
        super(),
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
          (this.visibleBounds = new a.Box3()),
          (this.renderAsSplats = null),
          (this.loadHarmonics = !1),
          (this.maxAmountOfSplats = 529e4),
          (this.name = ''),
          (this.potree = A),
          (this.root = g.root),
          (this.pcoGeometry = g),
          (this.boundingBox = g.boundingBox),
          (this.boundingSphere = this.boundingBox.getBoundingSphere(new a.Sphere())),
          (this.loadHarmonics = B),
          (this.maxAmountOfSplats = C),
          this.position.copy(g.offset),
          this.updateMatrix(),
          (this.material = I || g instanceof eA ? new T({ colorRgba: !0 }) : new T()),
          this.initMaterial(this.material);
      }
      initMaterial(A) {
        this.updateMatrixWorld(!0);
        const { min: g, max: I } = gA(
            this.pcoGeometry.tightBoundingBox || this.getBoundingBoxWorld(),
            this.matrixWorld,
          ),
          B = I.z - g.z;
        (A.heightMin = g.z - 0.2 * B), (A.heightMax = I.z + 0.2 * B);
      }
      dispose() {
        this.root && this.root.dispose(),
          this.pcoGeometry.root.traverse((A) => this.potree.lru.remove(A)),
          this.pcoGeometry.dispose(),
          this.material.dispose(),
          (this.visibleNodes = []),
          (this.visibleGeometry = []),
          this.picker && (this.picker.dispose(), (this.picker = void 0)),
          null !== this.splatsMesh && (this.splatsMesh.dispose(), (this.splatsMesh = null)),
          (this.disposed = !0);
      }
      get pointSizeType() {
        return this.material.pointSizeType;
      }
      set pointSizeType(A) {
        this.material.pointSizeType = A;
      }
      toTreeNode(A, g) {
        const I = new a.Points(A.geometry, this.material),
          B = new QA(A, I);
        return (
          (I.name = A.name),
          I.position.copy(A.boundingBox.min),
          (I.frustumCulled = !1),
          (I.onBeforeRender = T.makeOnBeforeRender(this, B)),
          g
            ? (g.sceneNode.add(I),
              (g.children[A.index] = B),
              A.oneTimeDisposeHandlers.push(() => {
                B.disposeSceneNode(), g.sceneNode.remove(B.sceneNode), (g.children[A.index] = A);
              }))
            : ((this.root = B), this.add(I)),
          B
        );
      }
      updateSplats(A, g, I = () => {}) {
        let B = this.children[0];
        if (
          B &&
          ((null !== this.renderAsSplats && this.renderAsSplats) ||
            ((this.renderAsSplats = !1),
            B.traverse((A) => {
              A.geometry.hasAttribute('COVARIANCE0') && (this.renderAsSplats = !0);
            }),
            this.renderAsSplats &&
              null === this.splatsMesh &&
              ((this.splatsMesh = new nA(!1, this.maxAmountOfSplats, this.loadHarmonics)),
              this.add(this.splatsMesh))),
          null !== this.splatsMesh && this.renderAsSplats && this.splatsMesh.splatsEnabled)
        ) {
          let C = this.splatsMesh.update(B, A, g, I);
          this.splatsMesh.splatsEnabled &&
            this.progress > 0.99 &&
            C &&
            this.splatsMesh.sortSplats(A, I);
        }
      }
      updateVisibleBounds() {
        const A = this.visibleBounds;
        A.min.set(1 / 0, 1 / 0, 1 / 0), A.max.set(-1 / 0, -1 / 0, -1 / 0);
        for (const g of this.visibleNodes)
          g.isLeafNode && (A.expandByPoint(g.boundingBox.min), A.expandByPoint(g.boundingBox.max));
      }
      updateBoundingBoxes() {
        if (!this.showBoundingBox || !this.parent) return;
        let A = this.parent.getObjectByName('bbroot');
        A || ((A = new a.Object3D()), (A.name = 'bbroot'), this.parent.add(A));
        const g = [];
        for (const A of this.visibleNodes)
          void 0 !== A.boundingBoxNode && A.isLeafNode && g.push(A.boundingBoxNode);
        A.children = g;
      }
      updateMatrixWorld(A) {
        !0 === this.matrixAutoUpdate && this.updateMatrix(),
          (!0 !== this.matrixWorldNeedsUpdate && !0 !== A) ||
            (this.parent
              ? this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)
              : this.matrixWorld.copy(this.matrix),
            (this.matrixWorldNeedsUpdate = !1),
            (A = !0));
      }
      hideDescendants(A) {
        const g = [];
        for (I(A); g.length > 0; ) {
          const A = g.shift();
          (A.visible = !1), I(A);
        }
        function I(A) {
          for (const I of A.children) I.visible && g.push(I);
        }
      }
      moveToOrigin() {
        this.position.set(0, 0, 0),
          this.position.set(0, 0, 0).sub(this.getBoundingBoxWorld().getCenter(new a.Vector3()));
      }
      moveToGroundPlane() {
        this.position.y += -this.getBoundingBoxWorld().min.y;
      }
      getBoundingBoxWorld() {
        return this.updateMatrixWorld(!0), gA(this.boundingBox, this.matrixWorld);
      }
      getVisibleExtent() {
        return this.visibleBounds.applyMatrix4(this.matrixWorld);
      }
      pick(A, g, I, B = {}) {
        return (this.picker = this.picker || new tA()), this.picker.pick(A, g, I, [this], B);
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
    const aA = document.createElement('canvas').getContext('webgl'),
      sA = {
        SHADER_INTERPOLATION: DA('EXT_frag_depth') && cA(8),
        SHADER_SPLATS: DA('EXT_frag_depth') && DA('OES_texture_float') && cA(8),
        SHADER_EDL: DA('OES_texture_float') && cA(8),
        precision: (function () {
          if (null === aA) return '';
          const A = aA.getShaderPrecisionFormat(aA.VERTEX_SHADER, aA.HIGH_FLOAT),
            g = aA.getShaderPrecisionFormat(aA.VERTEX_SHADER, aA.MEDIUM_FLOAT),
            I = aA.getShaderPrecisionFormat(aA.FRAGMENT_SHADER, aA.HIGH_FLOAT),
            B = aA.getShaderPrecisionFormat(aA.FRAGMENT_SHADER, aA.MEDIUM_FLOAT),
            C = A && I && A.precision > 0 && I.precision > 0,
            Q = g && B && g.precision > 0 && B.precision > 0;
          return C ? 'highp' : Q ? 'mediump' : 'lowp';
        })(),
      };
    function DA(A) {
      return null !== aA && Boolean(aA.getExtension(A));
    }
    function cA(A) {
      return null !== aA && aA.getParameter(aA.MAX_VARYING_VECTORS) >= A;
    }
    class hA {
      constructor() {
        (this.resolvers = []), (this.promises = []);
      }
      enqueue(A) {
        this.resolvers.length || this.add(), this.resolvers.shift()(A);
      }
      dequeue() {
        return this.promises.length || this.add(), this.promises.shift();
      }
      add() {
        this.promises.push(
          new Promise((A) => {
            this.resolvers.push(A);
          }),
        );
      }
    }
    class wA {
      constructor(A, g) {
        (this.wrappedWorker = A),
          (this.maxIdle = g),
          (this.timeoutId = void 0),
          (this.terminated = !1);
      }
      get worker() {
        return this.wrappedWorker;
      }
      get isTerminated() {
        return this.terminated;
      }
      markIdle() {
        this.timeoutId = window.setTimeout(() => {
          (this.terminated = !0), this.wrappedWorker.terminate();
        }, this.maxIdle);
      }
      markInUse() {
        this.timeoutId && window.clearTimeout(this.timeoutId);
      }
    }
    class lA {
      constructor(A, g) {
        (this.maxWorkers = A), (this.workerType = g), (this.pool = new hA()), (this.poolSize = 0);
      }
      getWorker() {
        return this.poolSize < this.maxWorkers
          ? (this.poolSize++, Promise.resolve(new wA(new this.workerType(), lA.POOL_MAX_IDLE)))
          : this.pool
              .dequeue()
              .then(
                (A) => (A.markInUse(), A.isTerminated ? (this.poolSize--, this.getWorker()) : A),
              );
      }
      releaseWorker(A) {
        A.markIdle(), this.pool.enqueue(A);
      }
    }
    lA.POOL_MAX_IDLE = 7e3;
    class yA {
      constructor(A) {
        (this.versionMinor = 0), (this.version = A);
        const g = -1 === A.indexOf('.') ? A.length : A.indexOf('.');
        (this.versionMajor = parseInt(A.substr(0, g), 10)),
          (this.versionMinor = parseInt(A.substr(g + 1), 10)),
          isNaN(this.versionMinor) && (this.versionMinor = 0);
      }
      newerThan(A) {
        const g = new yA(A);
        return (
          this.versionMajor > g.versionMajor ||
          (this.versionMajor === g.versionMajor && this.versionMinor > g.versionMinor)
        );
      }
      equalOrHigher(A) {
        const g = new yA(A);
        return (
          this.versionMajor > g.versionMajor ||
          (this.versionMajor === g.versionMajor && this.versionMinor >= g.versionMinor)
        );
      }
      upTo(A) {
        return !this.newerThan(A);
      }
    }
    class dA {
      constructor({
        getUrl: A = (A) => Promise.resolve(A),
        version: g,
        boundingBox: I,
        scale: B,
        xhrRequest: C,
      }) {
        (this.disposed = !1),
          (this.version = 'string' == typeof g ? new yA(g) : g),
          (this.xhrRequest = C),
          (this.getUrl = A),
          (this.boundingBox = I),
          (this.scale = B),
          (this.callbacks = []);
      }
      dispose() {
        this.disposed = !0;
      }
      load(A) {
        return A.loaded || this.disposed
          ? Promise.resolve()
          : Promise.resolve(this.getUrl(this.getNodeUrl(A)))
              .then((A) => this.xhrRequest(A, { mode: 'cors' }))
              .then((A) => y(A))
              .then((A) => A.arrayBuffer())
              .then((A) => d(A))
              .then((g) => new Promise((I) => this.parse(A, g, I)));
      }
      getNodeUrl(A) {
        let g = A.getUrl();
        return this.version.equalOrHigher('1.4') && (g += '.bin'), g;
      }
      parse(A, g, I) {
        this.disposed
          ? I()
          : dA.WORKER_POOL.getWorker().then((B) => {
              const C = A.pcoGeometry.pointAttributes,
                Q = g.byteLength / C.byteSize;
              this.version.upTo('1.5') && (A.numPoints = Q),
                (B.worker.onmessage = (g) => {
                  if (this.disposed) return I(), void dA.WORKER_POOL.releaseWorker(B);
                  const C = g.data,
                    E = (A.geometry = A.geometry || new a.BufferGeometry());
                  (E.boundingBox = A.boundingBox),
                    this.addBufferAttributes(E, C.attributeBuffers),
                    this.addIndices(E, C.indices),
                    this.addNormalAttribute(E, Q),
                    (A.mean = new a.Vector3().fromArray(C.mean)),
                    (A.tightBoundingBox = this.getTightBoundingBox(C.tightBoundingBox)),
                    (A.loaded = !0),
                    (A.loading = !1),
                    (A.failed = !1),
                    A.pcoGeometry.numNodesLoading--,
                    (A.pcoGeometry.needsUpdate = !0),
                    this.callbacks.forEach((g) => g(A)),
                    I(),
                    dA.WORKER_POOL.releaseWorker(B);
                });
              const E = {
                buffer: g,
                pointAttributes: C,
                version: this.version.version,
                min: A.boundingBox.min.toArray(),
                offset: A.pcoGeometry.offset.toArray(),
                scale: this.scale,
                spacing: A.spacing,
                hasChildren: A.hasChildren,
              };
              B.worker.postMessage(E, [E.buffer]);
            });
      }
      getTightBoundingBox({ min: A, max: g }) {
        const I = new a.Box3(new a.Vector3().fromArray(A), new a.Vector3().fromArray(g));
        return I.max.sub(I.min), I.min.set(0, 0, 0), I;
      }
      addBufferAttributes(A, g) {
        Object.keys(g).forEach((I) => {
          const B = g[I].buffer;
          this.isAttribute(I, P.POSITION_CARTESIAN)
            ? A.setAttribute('position', new a.BufferAttribute(new Float32Array(B), 3))
            : this.isAttribute(I, P.COLOR_PACKED)
              ? A.setAttribute('color', new a.BufferAttribute(new Uint8Array(B), 3, !0))
              : this.isAttribute(I, P.INTENSITY)
                ? A.setAttribute('intensity', new a.BufferAttribute(new Float32Array(B), 1))
                : this.isAttribute(I, P.CLASSIFICATION)
                  ? A.setAttribute('classification', new a.BufferAttribute(new Uint8Array(B), 1))
                  : (this.isAttribute(I, P.NORMAL_SPHEREMAPPED) ||
                      this.isAttribute(I, P.NORMAL_OCT16) ||
                      this.isAttribute(I, P.NORMAL)) &&
                    A.setAttribute('normal', new a.BufferAttribute(new Float32Array(B), 3));
        });
      }
      addIndices(A, g) {
        const I = new a.Uint8BufferAttribute(g, 4);
        (I.normalized = !0), A.setAttribute('indices', I);
      }
      addNormalAttribute(A, g) {
        if (!A.getAttribute('normal')) {
          const I = new Float32Array(3 * g);
          A.setAttribute('normal', new a.BufferAttribute(new Float32Array(I), 3));
        }
      }
      isAttribute(A, g) {
        return parseInt(A, 10) === g;
      }
    }
    dA.WORKER_POOL = new lA(32, B(91).A);
    class fA {
      constructor({
        getUrl: A = (A) => Promise.resolve(A),
        version: g,
        boundingBox: I,
        xhrRequest: B,
      }) {
        (this.disposed = !1),
          (this.version = 'string' == typeof g ? new yA(g) : g),
          (this.boundingBox = I),
          (this.getUrl = A),
          (this.xhrRequest = B),
          (this.callbacks = []);
      }
      dispose() {
        this.disposed = !0;
      }
      load(A) {
        return A.loaded || this.disposed
          ? Promise.resolve()
          : Promise.resolve(this.getUrl(this.getNodeUrl(A)))
              .then((A) => this.xhrRequest(A, { mode: 'cors' }))
              .then((A) => y(A))
              .then((A) => A.arrayBuffer())
              .then((A) => d(A))
              .then((g) => {
                if (!this.disposed) return new Promise((I, B) => this.parse(A, g, I, B));
              });
      }
      getNodeUrl(A) {
        return A.getUrl() + '.laz';
      }
      parse(A, g, I, B) {
        this.disposed
          ? I()
          : fA.WORKER_POOL.getWorker().then((C) => {
              C.worker.onmessage = (g) => {
                if (this.disposed) return I(), void fA.WORKER_POOL.releaseWorker(C);
                const Q = g.data;
                if (Q.error)
                  return (
                    fA.WORKER_POOL.releaseWorker(C),
                    void B(new Error(`LAZ decode failed for node "${A.name}": ${Q.error}`))
                  );
                const E = (A.geometry = A.geometry || new a.BufferGeometry());
                (E.boundingBox = A.boundingBox),
                  this.addBufferAttributes(E, Q.attributeBuffers),
                  this.addIndices(E, Q.indices),
                  this.addNormalAttribute(E, Q.numPoints),
                  (A.numPoints = Q.numPoints),
                  (A.mean = new a.Vector3().fromArray(Q.mean)),
                  (A.tightBoundingBox = this.getTightBoundingBox(Q.tightBoundingBox)),
                  (A.loaded = !0),
                  (A.loading = !1),
                  (A.failed = !1),
                  A.pcoGeometry.numNodesLoading--,
                  (A.pcoGeometry.needsUpdate = !0),
                  this.callbacks.forEach((g) => g(A)),
                  I(),
                  fA.WORKER_POOL.releaseWorker(C);
              };
              const Q = { buffer: g, nodeMin: A.boundingBox.min.toArray() };
              C.worker.postMessage(Q, [Q.buffer]);
            });
      }
      getTightBoundingBox({ min: A, max: g }) {
        const I = new a.Box3(new a.Vector3().fromArray(A), new a.Vector3().fromArray(g));
        return I.max.sub(I.min), I.min.set(0, 0, 0), I;
      }
      addBufferAttributes(A, g) {
        const I = g[0];
        I && A.setAttribute('position', new a.BufferAttribute(new Float32Array(I.buffer), 3));
        const B = g[1];
        B && A.setAttribute('color', new a.BufferAttribute(new Uint8Array(B.buffer), 3, !0));
        const C = g[6];
        C && A.setAttribute('intensity', new a.BufferAttribute(new Float32Array(C.buffer), 1));
        const Q = g[7];
        Q && A.setAttribute('classification', new a.BufferAttribute(new Uint8Array(Q.buffer), 1));
      }
      addIndices(A, g) {
        const I = new a.Uint8BufferAttribute(g, 4);
        (I.normalized = !0), A.setAttribute('indices', I);
      }
      addNormalAttribute(A, g) {
        A.getAttribute('normal') ||
          A.setAttribute('normal', new a.BufferAttribute(new Float32Array(3 * g), 3));
      }
    }
    function NA(A, g, I) {
      return Promise.resolve(g(A)).then((A) =>
        I(A, { mode: 'cors' })
          .then((A) => y(A))
          .then((A) => A.json())
          .then(
            (function (A, g, I) {
              return (B) => {
                const {
                  offset: C,
                  boundingBox: Q,
                  tightBoundingBox: E,
                } = (function (A) {
                  const g = new a.Vector3(A.boundingBox.lx, A.boundingBox.ly, A.boundingBox.lz),
                    I = new a.Vector3(A.boundingBox.ux, A.boundingBox.uy, A.boundingBox.uz),
                    B = new a.Box3(g, I),
                    C = B.clone(),
                    Q = g.clone();
                  if (A.tightBoundingBox) {
                    const { lx: g, ly: I, lz: B, ux: Q, uy: E, uz: t } = A.tightBoundingBox;
                    C.min.set(g, I, B), C.max.set(Q, E, t);
                  }
                  return (
                    B.min.sub(Q),
                    B.max.sub(Q),
                    C.min.sub(Q),
                    C.max.sub(Q),
                    { offset: Q, boundingBox: B, tightBoundingBox: C }
                  );
                })(B);
                let t;
                if (Z(B.pointAttributes)) {
                  if (new yA(B.version).upTo('1.6'))
                    throw new Error(
                      `Potree v1 LAZ-per-node clouds require version >= 1.7 (cloud.js advertises ${B.version}).`,
                    );
                  t = new fA({ getUrl: g, version: B.version, boundingBox: Q, xhrRequest: I });
                } else {
                  if ('LAS' === B.pointAttributes)
                    throw new Error(
                      'Potree v1 clouds with `pointAttributes: "LAS"` (uncompressed per-node LAS) are not supported.',
                    );
                  t = new dA({
                    getUrl: g,
                    version: B.version,
                    boundingBox: Q,
                    scale: B.scale,
                    xhrRequest: I,
                  });
                }
                const e = new CA(t, Q, E, C, I);
                (e.url = A),
                  (e.octreeDir = B.octreeDir),
                  (e.needsUpdate = !0),
                  (e.spacing = B.spacing),
                  (e.hierarchyStepSize = B.hierarchyStepSize),
                  (e.projection = B.projection),
                  (e.offset = C),
                  (e.pointAttributes = new _(B.pointAttributes));
                const i = {},
                  o = new yA(B.version);
                return (function (A, g, I, B) {
                  const C = new BA('r', A, A.boundingBox);
                  return (
                    (C.hasChildren = !0),
                    (C.spacing = A.spacing),
                    B.upTo('1.5') ? (C.numPoints = g.hierarchy[0][1]) : (C.numPoints = 0),
                    (A.root = C),
                    (I.r = C),
                    A.root.load()
                  );
                })(e, B, i, o).then(
                  () => (
                    o.upTo('1.4') &&
                      (function (A, g, I) {
                        for (let B = 1; B < g.hierarchy.length; B++) {
                          const [C, Q] = g.hierarchy[B],
                            { index: E, parentName: t, level: e } = uA(C),
                            i = I[t],
                            o = IA(i.boundingBox, E),
                            n = new BA(C, A, o);
                          (n.level = e),
                            (n.numPoints = Q),
                            (n.spacing = A.spacing / Math.pow(2, n.level)),
                            (I[C] = n),
                            i.addChild(n);
                        }
                      })(e, B, i),
                    (e.nodes = i),
                    e
                  ),
                );
              };
            })(A, g, I),
          ),
      );
    }
    function uA(A) {
      return { index: w(A), parentName: A.substring(0, A.length - 1), level: A.length - 1 };
    }
    var FA;
    (fA.WORKER_POOL = new lA(4, B(361).A)),
      (function (A) {
        (A.DECODER_WORKER = 'DECODER_WORKER'),
          (A.DECODER_WORKER_GLTF = 'DECODER_WORKER_GLTF'),
          (A.DECODER_WORKER_BROTLI = 'DECODER_WORKER_BROTLI'),
          (A.DECODER_WORKER_SPLATS = 'DECODER_WORKER_SPLATS');
      })(FA || (FA = {}));
    class RA {
      constructor() {
        this.workers = {
          DECODER_WORKER: [],
          DECODER_WORKER_GLTF: [],
          DECODER_WORKER_BROTLI: [],
          DECODER_WORKER_SPLATS: [],
        };
      }
      getWorker(A) {
        if (void 0 === this.workers[A]) throw new Error('Unknown worker type');
        if (0 === this.workers[A].length) {
          const g = (function (A) {
            switch (A) {
              case FA.DECODER_WORKER:
                return new (0, B(300).A)();
              case FA.DECODER_WORKER_GLTF:
                return new (0, B(218).A)();
              case FA.DECODER_WORKER_BROTLI:
                return new (0, B(741).A)();
              case FA.DECODER_WORKER_SPLATS:
                return new (0, B(852).A)();
              default:
                throw new Error('Unknown worker type');
            }
          })(A);
          this.workers[A].push(g);
        }
        const g = this.workers[A].pop();
        if (void 0 === g) throw new Error('No workers available');
        return g;
      }
      returnWorker(A, g) {
        this.workers[A].push(g);
      }
    }
    class MA {
      constructor(A, g) {
        (this.metadata = A),
          (this.context = g),
          (this.workerType = FA.DECODER_WORKER_BROTLI),
          (this._metadata = A);
      }
      async decode(A, g) {
        const { byteOffset: I, byteSize: B } = A;
        if (void 0 === I || void 0 === B) throw new Error('byteOffset and byteSize are required');
        if (B === BigInt(0))
          return {
            buffer: new ArrayBuffer(0),
            geometry: new a.BufferGeometry(),
            data: { tightBoundingBox: { min: [0, 0, 0], max: [0, 0, 0] } },
          };
        const C = await this.getUrl(this.octreePath),
          Q = { Range: `bytes=${I}-${I + B - BigInt(1)}` },
          E = await this.xhrRequest(C, { headers: Q }),
          t = await E.arrayBuffer(),
          e = A.octreeGeometry.pointAttributes,
          i = A.octreeGeometry.scale,
          o = A.boundingBox,
          n = A.octreeGeometry.offset.clone().add(o.min),
          r = o.max.clone().sub(o.min),
          s = n.clone().add(r),
          D = A.numPoints,
          c = this._metadata.offset,
          h = {
            name: A.name,
            buffer: t,
            pointAttributes: e,
            scale: i,
            min: n,
            max: s,
            size: r,
            offset: c,
            numPoints: D,
          };
        g.postMessage(h, [h.buffer]);
        const w = await new Promise((A) => {
          g.onmessage = A;
        });
        return this.readSuccessMessage(w, t);
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
      readSuccessMessage(A, g) {
        const I = A.data,
          B = I.attributeBuffers,
          C = new a.BufferGeometry();
        for (const A in B) {
          const g = B[A].buffer;
          if ('position' === A)
            C.setAttribute('position', new a.BufferAttribute(new Float32Array(g), 3));
          else if ('rgba' === A)
            C.setAttribute('rgba', new a.BufferAttribute(new Uint8Array(g), 4, !0));
          else if ('NORMAL' === A)
            C.setAttribute('normal', new a.BufferAttribute(new Float32Array(g), 3));
          else if ('INDICES' === A) {
            const A = new a.BufferAttribute(new Uint8Array(g), 4);
            (A.normalized = !0), C.setAttribute('indices', A);
          } else {
            const I = new a.BufferAttribute(new Float32Array(g), 1),
              Q = B[A].attribute;
            (I.potree = {
              offset: B[A].offset,
              scale: B[A].scale,
              preciseBuffer: B[A].preciseBuffer,
              range: Q.range,
            }),
              C.setAttribute(A, I);
          }
        }
        return { data: I, buffer: g, geometry: C };
      }
    }
    class SA {
      constructor(A, g) {
        (this.metadata = A),
          (this.context = g),
          (this.workerType = FA.DECODER_WORKER),
          (this._metadata = A);
      }
      async decode(A, g) {
        const { byteOffset: I, byteSize: B } = A;
        if (void 0 === I || void 0 === B) throw new Error('byteOffset and byteSize are required');
        let C;
        const Q = await this.getUrl(this.octreePath),
          E = I,
          t = I + B - BigInt(1);
        if (B === BigInt(0))
          (C = new ArrayBuffer(0)), console.warn(`loaded node with 0 bytes: ${A.name}`);
        else {
          const A = { Range: `bytes=${E}-${t}` },
            g = await this.xhrRequest(Q, { headers: A });
          C = await g.arrayBuffer();
        }
        const e = A.octreeGeometry.pointAttributes,
          i = A.octreeGeometry.scale,
          o = A.boundingBox,
          n = A.octreeGeometry.offset.clone().add(o.min),
          r = o.max.clone().sub(o.min),
          a = n.clone().add(r),
          s = A.numPoints,
          D = this._metadata.offset,
          c = {
            name: A.name,
            buffer: C,
            pointAttributes: e,
            scale: i,
            min: n,
            max: a,
            size: r,
            offset: D,
            numPoints: s,
          };
        g.postMessage(c, [c.buffer]);
        const h = await new Promise((A) => {
          g.onmessage = A;
        });
        return this.readSuccessMessage(h, C);
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
      readSuccessMessage(A, g) {
        const I = A.data,
          B = I.attributeBuffers,
          C = new a.BufferGeometry();
        for (const A in B) {
          const g = B[A].buffer;
          if ('position' === A)
            C.setAttribute('position', new a.BufferAttribute(new Float32Array(g), 3));
          else if ('rgba' === A)
            C.setAttribute('rgba', new a.BufferAttribute(new Uint8Array(g), 4, !0));
          else if ('NORMAL' === A)
            C.setAttribute('normal', new a.BufferAttribute(new Float32Array(g), 3));
          else if ('INDICES' === A) {
            const A = new a.BufferAttribute(new Uint8Array(g), 4);
            (A.normalized = !0), C.setAttribute('indices', A);
          } else {
            const I = new a.BufferAttribute(new Float32Array(g), 1),
              Q = B[A].attribute;
            (I.potree = {
              offset: B[A].offset,
              scale: B[A].scale,
              preciseBuffer: B[A].preciseBuffer,
              range: Q.range,
            }),
              C.setAttribute(A, I);
          }
        }
        return { data: I, buffer: g, geometry: C };
      }
    }
    function GA(A, g) {
      return `${A}${g}`;
    }
    function LA(A, g) {
      var I = new Uint8Array(A.byteLength + g.byteLength);
      return I.set(new Uint8Array(A), 0), I.set(new Uint8Array(g), A.byteLength), I.buffer;
    }
    class pA {
      constructor(A, g) {
        (this.metadata = A),
          (this.context = g),
          (this.workerType = FA.DECODER_WORKER_GLTF),
          (this._metadata = A);
      }
      async decode(A, g) {
        const { byteOffset: I, byteSize: B } = A;
        if (void 0 === I || void 0 === B) throw new Error('byteOffset and byteSize are required');
        let C;
        const Q = await this.getUrl(this.gltfColorsPath),
          E = await this.getUrl(this.gltfPositionsPath);
        if (B === BigInt(0))
          (C = new ArrayBuffer(0)), console.warn(`loaded node with 0 bytes: ${A.name}`);
        else {
          const A = { Range: `bytes=${4n * I * 3n}-${4n * I * 3n + 4n * B * 3n - 1n}` },
            g = await this.xhrRequest(E, { headers: A }),
            t = await g.arrayBuffer(),
            e = { Range: `bytes=${4n * I}-${4n * I + 4n * B - 1n}` },
            i = await this.xhrRequest(Q, { headers: e });
          C = LA(t, await i.arrayBuffer());
        }
        const t = A.octreeGeometry.pointAttributes,
          e = A.octreeGeometry.scale,
          i = A.boundingBox,
          o = A.octreeGeometry.offset.clone().add(i.min),
          n = i.max.clone().sub(i.min),
          r = o.clone().add(n),
          s = A.numPoints,
          D = this._metadata.offset,
          c = {
            name: A.name,
            buffer: C,
            pointAttributes: t,
            scale: e,
            min: o,
            max: r,
            size: n,
            offset: D,
            numPoints: s,
          };
        g.postMessage(c, [c.buffer]);
        const h = (await new Promise((A) => (g.onmessage = A))).data,
          w = h.attributeBuffers,
          l = new a.BufferGeometry();
        for (const A in w) {
          const g = w[A].buffer;
          if ('position' === A)
            l.setAttribute('position', new a.BufferAttribute(new Float32Array(g), 3));
          else if ('rgba' === A)
            l.setAttribute('rgba', new a.BufferAttribute(new Uint8Array(g), 4, !0));
          else if ('NORMAL' === A)
            l.setAttribute('normal', new a.BufferAttribute(new Float32Array(g), 3));
          else if ('INDICES' === A) {
            const A = new a.BufferAttribute(new Uint8Array(g), 4);
            (A.normalized = !0), l.setAttribute('indices', A);
          } else {
            const I = new a.BufferAttribute(new Float32Array(g), 1),
              B = w[A].attribute;
            (I.potree = {
              offset: w[A].offset,
              scale: w[A].scale,
              preciseBuffer: w[A].preciseBuffer,
              range: B.range,
            }),
              l.setAttribute(A, I);
          }
        }
        return { buffer: C, geometry: l, data: h };
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
    class UA {
      constructor(A, g) {
        (this.metadata = A),
          (this.context = g),
          (this.workerType = FA.DECODER_WORKER_SPLATS),
          (this._metadata = A);
      }
      async decode(A, g) {
        const { byteOffset: I, byteSize: B } = A;
        if (void 0 === I || void 0 === B) throw new Error('byteOffset and byteSize are required');
        let C,
          Q,
          E = this.metadata,
          t = function (A) {
            return E.attributes.filter((g) => g.name === A)[0].bufferView.uri;
          };
        (C = {
          positions: await this.getUrl(t('position')),
          colors: await this.getUrl(t('sh_band_0')),
          opacities: await this.getUrl(t('opacity')),
          scales: await this.getUrl(t('scale')),
          rotations: await this.getUrl(t('rotation')),
        }),
          this.harmonicsEnabled &&
            (C = {
              positions: await this.getUrl(t('position')),
              colors: await this.getUrl(t('sh_band_0')),
              opacities: await this.getUrl(t('opacity')),
              scales: await this.getUrl(t('scale')),
              rotations: await this.getUrl(t('rotation')),
              shBand1_0: await this.getUrl(t('sh_band_1_triplet_0')),
              shBand1_1: await this.getUrl(t('sh_band_1_triplet_1')),
              shBand1_2: await this.getUrl(t('sh_band_1_triplet_2')),
              shBand2_0: await this.getUrl(t('sh_band_2_triplet_0')),
              shBand2_1: await this.getUrl(t('sh_band_2_triplet_1')),
              shBand2_2: await this.getUrl(t('sh_band_2_triplet_2')),
              shBand2_3: await this.getUrl(t('sh_band_2_triplet_3')),
              shBand2_4: await this.getUrl(t('sh_band_2_triplet_4')),
              shBand3_0: await this.getUrl(t('sh_band_3_triplet_0')),
              shBand3_1: await this.getUrl(t('sh_band_3_triplet_1')),
              shBand3_2: await this.getUrl(t('sh_band_3_triplet_2')),
              shBand3_3: await this.getUrl(t('sh_band_3_triplet_3')),
              shBand3_4: await this.getUrl(t('sh_band_3_triplet_4')),
              shBand3_5: await this.getUrl(t('sh_band_3_triplet_5')),
              shBand3_6: await this.getUrl(t('sh_band_3_triplet_6')),
            });
        const e = {
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
        if (B === BigInt(0)) return void console.warn(`Loaded node with 0 bytes: ${A.name}`);
        {
          const A = async (A, g) => {
              const C = 4n * I * g,
                Q = {
                  Range: `bytes=${C}-${C + 4n * B * g - 1n}`,
                  'Transfer-Encoding': 'compress',
                  'Accept-Encoding': 'compress',
                };
              return (await this.xhrRequest(A, { headers: Q })).arrayBuffer();
            },
            g = Object.entries(C).map(([g, I]) => A(I, e[g])),
            [E, t, i, o, n, r, a, s, D, c, h, w, l, y, d, f, N, u, F, R] = await Promise.all(g);
          (Q = LA(E, t)),
            (Q = LA(Q, i)),
            (Q = LA(Q, o)),
            (Q = LA(Q, n)),
            this.harmonicsEnabled &&
              ((Q = LA(Q, r)),
              (Q = LA(Q, a)),
              (Q = LA(Q, s)),
              (Q = LA(Q, D)),
              (Q = LA(Q, c)),
              (Q = LA(Q, h)),
              (Q = LA(Q, w)),
              (Q = LA(Q, l)),
              (Q = LA(Q, y)),
              (Q = LA(Q, d)),
              (Q = LA(Q, f)),
              (Q = LA(Q, N)),
              (Q = LA(Q, u)),
              (Q = LA(Q, F)),
              (Q = LA(Q, R)));
        }
        const i = A.octreeGeometry.pointAttributes,
          o = A.octreeGeometry.scale,
          n = A.boundingBox,
          r = A.octreeGeometry.offset.clone().add(n.min),
          s = n.max.clone().sub(n.min),
          D = r.clone().add(s),
          c = A.numPoints,
          h = this._metadata.offset,
          w = {
            name: A.name,
            buffer: Q,
            pointAttributes: i,
            scale: o,
            min: r,
            max: D,
            size: s,
            offset: h,
            numPoints: c,
            harmonicsEnabled: this.harmonicsEnabled,
          };
        g.postMessage(w, [w.buffer]);
        const l = (await new Promise((A) => (g.onmessage = A))).data,
          y = l.attributeBuffers,
          d = new a.BufferGeometry();
        d.drawRange.count = A.numPoints;
        for (const A in y) {
          const g = y[A].buffer;
          'position' === A &&
            d.setAttribute('centers', new a.BufferAttribute(new Float32Array(g), 4)),
            'scale' === A && d.setAttribute('scale', new a.BufferAttribute(new Float32Array(g), 3)),
            'orientation' === A &&
              d.setAttribute('orientation', new a.BufferAttribute(new Float32Array(g), 4)),
            'raw_position' === A
              ? d.setAttribute('raw_position', new a.BufferAttribute(new Float32Array(g), 4))
              : 'COVARIANCE0' === A
                ? d.setAttribute('COVARIANCE0', new a.BufferAttribute(new Float32Array(g), 4))
                : 'COVARIANCE1' === A
                  ? d.setAttribute('COVARIANCE1', new a.BufferAttribute(new Float32Array(g), 2))
                  : 'POS_COLOR' === A &&
                    d.setAttribute('POS_COLOR', new a.BufferAttribute(new Uint32Array(g), 4)),
            this.harmonicsEnabled &&
              ('HARMONICS1' === A
                ? d.setAttribute('HARMONICS1', new a.BufferAttribute(new Uint32Array(g), 3))
                : 'HARMONICS2' === A
                  ? d.setAttribute('HARMONICS2', new a.BufferAttribute(new Uint32Array(g), 5))
                  : 'HARMONICS3' === A &&
                    d.setAttribute('HARMONICS3', new a.BufferAttribute(new Uint32Array(g), 7)));
        }
        return (
          (d.userData.maxDepth = this._metadata.hierarchy.depth + 1),
          (d.userData.totalSplats = this._metadata.points),
          (d.userData.offset = new a.Vector3(...h).sub(r)),
          { data: l, buffer: Q, geometry: d }
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
    class YA {
      constructor(A, g, I) {
        (this.name = A),
          (this.octreeGeometry = g),
          (this.boundingBox = I),
          (this.loaded = !1),
          (this.loading = !1),
          (this.failed = !1),
          (this.parent = null),
          (this.hasChildren = !1),
          (this.isLeafNode = !0),
          (this.isTreeNode = !1),
          (this.isGeometryNode = !0),
          (this.children = [null, null, null, null, null, null, null, null]),
          (this.id = YA.IDCount++),
          (this.index = parseInt(A.charAt(A.length - 1))),
          (this.boundingSphere = I.getBoundingSphere(new a.Sphere())),
          (this.tightBoundingBox = I.clone()),
          (this.numPoints = 0),
          (this.oneTimeDisposeHandlers = []);
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
          this.geometry.dispose(), (this.geometry = void 0), (this.loaded = !1);
          for (let A = 0; A < this.oneTimeDisposeHandlers.length; A++)
            (0, this.oneTimeDisposeHandlers[A])();
          this.oneTimeDisposeHandlers = [];
        }
      }
      traverse(A, g = !0) {
        const I = g ? [this] : [];
        let B;
        for (; void 0 !== (B = I.pop()); ) {
          A(B);
          for (const A of B.children) null !== A && I.push(A);
        }
      }
    }
    (YA.IDCount = 0), (YA.IDCount = 0);
    const mA = {
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
    let KA = 0;
    for (const A in mA) (mA[KA] = mA[A]), KA++;
    class kA {
      constructor(A, g, I, B = [1 / 0, -1 / 0], C = void 0) {
        (this.name = A),
          (this.type = g),
          (this.numElements = I),
          (this.range = B),
          (this.uri = C),
          (this.byteSize = this.numElements * this.type.size),
          (this.description = '');
      }
    }
    const HA = {
      POSITION_CARTESIAN: new kA('POSITION_CARTESIAN', mA.DATA_TYPE_FLOAT, 3),
      RGBA_PACKED: new kA('COLOR_PACKED', mA.DATA_TYPE_INT8, 4),
      COLOR_PACKED: new kA('COLOR_PACKED', mA.DATA_TYPE_INT8, 4),
      RGB_PACKED: new kA('COLOR_PACKED', mA.DATA_TYPE_INT8, 3),
      NORMAL_FLOATS: new kA('NORMAL_FLOATS', mA.DATA_TYPE_FLOAT, 3),
      INTENSITY: new kA('INTENSITY', mA.DATA_TYPE_UINT16, 1),
      CLASSIFICATION: new kA('CLASSIFICATION', mA.DATA_TYPE_UINT8, 1),
      NORMAL_SPHEREMAPPED: new kA('NORMAL_SPHEREMAPPED', mA.DATA_TYPE_UINT8, 2),
      NORMAL_OCT16: new kA('NORMAL_OCT16', mA.DATA_TYPE_UINT8, 2),
      NORMAL: new kA('NORMAL', mA.DATA_TYPE_FLOAT, 3),
      RETURN_NUMBER: new kA('RETURN_NUMBER', mA.DATA_TYPE_UINT8, 1),
      NUMBER_OF_RETURNS: new kA('NUMBER_OF_RETURNS', mA.DATA_TYPE_UINT8, 1),
      SOURCE_ID: new kA('SOURCE_ID', mA.DATA_TYPE_UINT16, 1),
      INDICES: new kA('INDICES', mA.DATA_TYPE_UINT32, 1),
      SPACING: new kA('SPACING', mA.DATA_TYPE_FLOAT, 1),
      GPS_TIME: new kA('GPS_TIME', mA.DATA_TYPE_DOUBLE, 1),
    };
    class JA {
      constructor(A, g = [], I = 0, B = 0, C = []) {
        if (
          ((this.attributes = g),
          (this.byteSize = I),
          (this.size = B),
          (this.vectors = C),
          null != A)
        )
          for (let g = 0; g < A.length; g++) {
            const I = A[g],
              B = HA[I];
            this.attributes.push(B), (this.byteSize += B.byteSize), this.size++;
          }
      }
      add(A) {
        this.attributes.push(A), (this.byteSize += A.byteSize), this.size++;
      }
      addVector(A) {
        this.vectors.push(A);
      }
      hasNormals() {
        for (const A in this.attributes) {
          const g = this.attributes[A];
          if (
            g === HA.NORMAL_SPHEREMAPPED ||
            g === HA.NORMAL_FLOATS ||
            g === HA.NORMAL ||
            g === HA.NORMAL_OCT16
          )
            return !0;
        }
        return !1;
      }
      getAttribute(A) {
        return this.attributes.find((g) => g.name === A);
      }
    }
    class bA {
      constructor(A, g, I) {
        (this.url = A),
          (this.metadata = g),
          (this.loadingContext = I),
          'GLTF' === this.metadata.encoding
            ? g.attributes.some((A) => 'sh_band_0' === A.name)
              ? (this.decoder = new UA(g, I))
              : (this.decoder = new pA(g, I))
            : 'BROTLI' === this.metadata.encoding
              ? (this.decoder = new MA(g, I))
              : (this.decoder = new SA(g, I));
      }
      async load(A) {
        if (A.loaded || A.loading) return;
        let g;
        (A.loading = !0), A.octreeGeometry.numNodesLoading++;
        try {
          2 === A.nodeType && (await this.loadHierarchy(A));
          const { byteOffset: I, byteSize: B } = A;
          if (void 0 === I || void 0 === B) throw new Error('byteOffset and byteSize are required');
          g = this.workerPool.getWorker(this.workerType);
          const C = await this.decoder.decode(A, g);
          if (!C) return;
          const { geometry: Q, data: E } = C;
          (A.density = E.density),
            (A.geometry = Q),
            (A.loaded = !0),
            (A.octreeGeometry.needsUpdate = !0),
            (A.tightBoundingBox = this.getTightBoundingBox(E.tightBoundingBox));
        } catch (g) {
          A.loaded = !1;
        } finally {
          (A.loading = !1),
            A.octreeGeometry.numNodesLoading--,
            g && this.workerPool.returnWorker(this.workerType, g);
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
      parseHierarchy(A, g) {
        const I = new DataView(g),
          B = 22,
          C = g.byteLength / B,
          Q = A.octreeGeometry,
          E = new Array(C);
        E[0] = A;
        let t = 1;
        for (let A = 0; A < C; A++) {
          const g = E[A],
            C = I.getUint8(A * B + 0),
            e = I.getUint8(A * B + 1),
            i = I.getUint32(A * B + 2, !0),
            o = I.getBigInt64(A * B + 6, !0),
            n = I.getBigInt64(A * B + 14, !0);
          if (
            (2 === g.nodeType
              ? ((g.byteOffset = o), (g.byteSize = n), (g.numPoints = i))
              : 2 === C
                ? ((g.hierarchyByteOffset = o), (g.hierarchyByteSize = n), (g.numPoints = i))
                : ((g.byteOffset = o), (g.byteSize = n), (g.numPoints = i)),
            (g.nodeType = C),
            2 !== g.nodeType)
          )
            for (let A = 0; A < 8; A++) {
              if (!((1 << A) & e)) continue;
              const I = g.name + A,
                B = xA(g.boundingBox, A),
                C = new YA(I, Q, B);
              (C.name = I),
                (C.spacing = g.spacing / 2),
                (C.level = g.level + 1),
                (g.children[A] = C),
                (C.parent = g),
                (E[t] = C),
                t++;
            }
        }
      }
      async loadHierarchy(A) {
        const { hierarchyByteOffset: g, hierarchyByteSize: I } = A;
        if (void 0 === g || void 0 === I)
          throw new Error(
            `hierarchyByteOffset and hierarchyByteSize are undefined for node ${A.name}`,
          );
        const B = await this.getUrl(this.hierarchyPath),
          C = { Range: `bytes=${g}-${g + I - BigInt(1)}` },
          Q = await this.xhrRequest(B, { headers: C }),
          E = await Q.arrayBuffer();
        this.parseHierarchy(A, E);
      }
      getTightBoundingBox({ min: A, max: g }) {
        const I = new a.Box3(new a.Vector3().fromArray(A), new a.Vector3().fromArray(g));
        return I.max.sub(I.min), I.min.set(0, 0, 0), I;
      }
    }
    const TA = new a.Vector3();
    function xA(A, g) {
      const I = A.min.clone(),
        B = A.max.clone(),
        C = TA.subVectors(B, I);
      return (
        (1 & g) > 0 ? (I.z += C.z / 2) : (B.z -= C.z / 2),
        (2 & g) > 0 ? (I.y += C.y / 2) : (B.y -= C.y / 2),
        (4 & g) > 0 ? (I.x += C.x / 2) : (B.x -= C.x / 2),
        new a.Box3(I, B)
      );
    }
    const vA = {
      double: mA.DATA_TYPE_DOUBLE,
      float: mA.DATA_TYPE_FLOAT,
      int8: mA.DATA_TYPE_INT8,
      uint8: mA.DATA_TYPE_UINT8,
      int16: mA.DATA_TYPE_INT16,
      uint16: mA.DATA_TYPE_UINT16,
      int32: mA.DATA_TYPE_INT32,
      uint32: mA.DATA_TYPE_UINT32,
      int64: mA.DATA_TYPE_INT64,
      uint64: mA.DATA_TYPE_UINT64,
    };
    class qA {
      constructor(A, g, I, B = !1) {
        (this.workerPool = new RA()),
          (this.basePath = ''),
          (this.hierarchyPath = ''),
          (this.octreePath = ''),
          (this.gltfColorsPath = ''),
          (this.gltfPositionsPath = ''),
          (this.harmonicsEnabled = !1),
          (this.getUrl = A),
          (this.xhrRequest = I),
          (this.basePath = (function (A) {
            return A.substring(0, A.lastIndexOf('/') + 1);
          })(g)),
          (this.hierarchyPath = GA(this.basePath, 'hierarchy.bin')),
          (this.octreePath = GA(this.basePath, 'octree.bin')),
          (this.harmonicsEnabled = B),
          (this.gltfColorsPath = GA(this.basePath, 'colors.glbin')),
          (this.gltfPositionsPath = GA(this.basePath, 'positions.glbin'));
      }
      static parseAttributes(A) {
        const g = new JA(),
          I = { rgb: 'rgba' };
        for (const B of A) {
          const { name: A, numElements: C, min: Q, max: E, bufferView: t } = B,
            e = vA[B.type],
            i = new kA(I[A] ? I[A] : A, e, C);
          t && (i.uri = t.uri),
            (i.range = 1 === C && Q && E ? [Q[0], E[0]] : [Q, E]),
            'gps-time' === A &&
              'number' == typeof i.range[0] &&
              i.range[0] === i.range[1] &&
              (i.range[1] += 1),
            (i.initialRange = i.range),
            g.add(i);
        }
        if (
          void 0 !== g.attributes.find((A) => 'NormalX' === A.name) &&
          void 0 !== g.attributes.find((A) => 'NormalY' === A.name) &&
          void 0 !== g.attributes.find((A) => 'NormalZ' === A.name)
        ) {
          const A = { name: 'NORMAL', attributes: ['NormalX', 'NormalY', 'NormalZ'] };
          g.addVector(A);
        }
        return g;
      }
      async load(A) {
        const g = await this.fetchMetadata(A),
          I = qA.parseAttributes(g.attributes);
        this.applyCustomBufferURI(g.encoding, I);
        const B = this.createLoader(A, g),
          C = this.createBoundingBox(g),
          Q = this.getOffset(C),
          E = this.initializeOctree(B, A, g, C, Q, I),
          t = this.initializeRootNode(E, C, g);
        return (E.root = t), B.load(t), { geometry: E };
      }
      async fetchMetadata(A) {
        return (await this.xhrRequest(A)).json();
      }
      applyCustomBufferURI(A, g) {
        'GLTF' === A &&
          ((this.gltfPositionsPath = g.getAttribute('position')?.uri ?? this.gltfPositionsPath),
          (this.gltfColorsPath = g.getAttribute('rgba')?.uri ?? this.gltfColorsPath));
      }
      createLoader(A, g) {
        return new bA(A, g, this);
      }
      createBoundingBox(A) {
        const g = new a.Vector3(...A.boundingBox.min),
          I = new a.Vector3(...A.boundingBox.max);
        return new a.Box3(g, I);
      }
      getOffset(A) {
        const g = A.min.clone();
        return A.min.sub(g), A.max.sub(g), g;
      }
      initializeOctree(A, g, I, B, C, Q) {
        const E = new eA(A, B);
        return (
          (E.url = g),
          (E.spacing = I.spacing),
          (E.scale = I.scale),
          (E.projection = I.projection),
          (E.boundingBox = B),
          (E.boundingSphere = B.getBoundingSphere(new a.Sphere())),
          (E.tightBoundingSphere = B.getBoundingSphere(new a.Sphere())),
          (E.tightBoundingBox = this.getTightBoundingBox(I)),
          (E.offset = C),
          (E.pointAttributes = Q),
          E
        );
      }
      initializeRootNode(A, g, I) {
        const B = new YA('r', A, g);
        return (
          (B.level = 0),
          (B.nodeType = 2),
          (B.hierarchyByteOffset = BigInt(0)),
          (B.hierarchyByteSize = BigInt(I.hierarchy.firstChunkSize)),
          (B.spacing = A.spacing),
          (B.byteOffset = BigInt(0)),
          B
        );
      }
      getTightBoundingBox(A) {
        const g = A.attributes.find((A) => 'position' === A.name);
        if (!g || !g.min || !g.max)
          return (
            console.warn(
              'Position attribute (min, max) not found. Falling back to boundingBox for tightBoundingBox',
            ),
            new a.Box3(new a.Vector3(...A.boundingBox.min), new a.Vector3(...A.boundingBox.max))
          );
        const I = A.boundingBox.min;
        return new a.Box3(
          new a.Vector3(g.min[0] - I[0], g.min[1] - I[1], g.min[2] - I[2]),
          new a.Vector3(g.max[0] - I[0], g.max[1] - I[1], g.max[2] - I[2]),
        );
      }
    }
    async function OA(A, g, I, B = !1) {
      const C = await g(A),
        Q = new qA(g, A, I, B),
        { geometry: E } = await Q.load(C);
      return E;
    }
    function PA(A) {
      return null != A && A.isGeometryNode;
    }
    function VA(A) {
      return null != A && A.isTreeNode;
    }
    function WA(A) {
      (this.content = []), (this.scoreFunction = A);
    }
    WA.prototype = {
      push: function (A) {
        this.content.push(A), this.bubbleUp(this.content.length - 1);
      },
      pop: function () {
        var A = this.content[0],
          g = this.content.pop();
        return this.content.length > 0 && ((this.content[0] = g), this.sinkDown(0)), A;
      },
      remove: function (A) {
        for (var g = this.content.length, I = 0; I < g; I++)
          if (this.content[I] == A) {
            var B = this.content.pop();
            if (I == g - 1) break;
            (this.content[I] = B), this.bubbleUp(I), this.sinkDown(I);
            break;
          }
      },
      size: function () {
        return this.content.length;
      },
      bubbleUp: function (A) {
        for (var g = this.content[A], I = this.scoreFunction(g); A > 0; ) {
          var B = Math.floor((A + 1) / 2) - 1,
            C = this.content[B];
          if (I >= this.scoreFunction(C)) break;
          (this.content[B] = g), (this.content[A] = C), (A = B);
        }
      },
      sinkDown: function (A) {
        for (var g = this.content.length, I = this.content[A], B = this.scoreFunction(I); ; ) {
          var C = 2 * (A + 1),
            Q = C - 1,
            E = null;
          if (Q < g) {
            var t = this.content[Q],
              e = this.scoreFunction(t);
            e < B && (E = Q);
          }
          if (C < g) {
            var i = this.content[C];
            this.scoreFunction(i) < (null == E ? B : e) && (E = C);
          }
          if (null == E) break;
          (this.content[A] = this.content[E]), (this.content[E] = I), (A = E);
        }
      },
    };
    class jA extends a.LineSegments {
      constructor(A, g = new a.Color(16776960)) {
        const I = new Uint16Array([
            0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7,
          ]),
          B = new Float32Array([
            A.min.x,
            A.min.y,
            A.min.z,
            A.max.x,
            A.min.y,
            A.min.z,
            A.max.x,
            A.min.y,
            A.max.z,
            A.min.x,
            A.min.y,
            A.max.z,
            A.min.x,
            A.max.y,
            A.min.z,
            A.max.x,
            A.max.y,
            A.min.z,
            A.max.x,
            A.max.y,
            A.max.z,
            A.min.x,
            A.max.y,
            A.max.z,
          ]),
          C = new a.BufferGeometry();
        C.setIndex(new a.BufferAttribute(I, 1)),
          C.setAttribute('position', new a.BufferAttribute(B, 3)),
          super(C, new a.LineBasicMaterial({ color: g }));
      }
    }
    class zA {
      constructor(A) {
        (this.node = A), (this.next = null), (this.previous = null);
      }
    }
    class XA {
      constructor(A = 1e6) {
        (this.pointBudget = A),
          (this.first = null),
          (this.last = null),
          (this.numPoints = 0),
          (this.items = new Map());
      }
      get size() {
        return this.items.size;
      }
      has(A) {
        return this.items.has(A.id);
      }
      touch(A) {
        if (!A.loaded) return;
        const g = this.items.get(A.id);
        g ? this.touchExisting(g) : this.addNew(A);
      }
      addNew(A) {
        const g = new zA(A);
        (g.previous = this.last),
          (this.last = g),
          g.previous && (g.previous.next = g),
          this.first || (this.first = g),
          this.items.set(A.id, g),
          (this.numPoints += A.numPoints);
      }
      touchExisting(A) {
        A.previous
          ? A.next &&
            ((A.previous.next = A.next),
            (A.next.previous = A.previous),
            (A.previous = this.last),
            (A.next = null),
            (this.last = A),
            A.previous && (A.previous.next = A))
          : A.next &&
            ((this.first = A.next),
            (this.first.previous = null),
            (A.previous = this.last),
            (A.next = null),
            (this.last = A),
            A.previous && (A.previous.next = A));
      }
      remove(A) {
        const g = this.items.get(A.id);
        g &&
          (1 === this.items.size
            ? ((this.first = null), (this.last = null))
            : (g.previous || ((this.first = g.next), (this.first.previous = null)),
              g.next || ((this.last = g.previous), (this.last.next = null)),
              g.previous && g.next && ((g.previous.next = g.next), (g.next.previous = g.previous))),
          this.items.delete(A.id),
          (this.numPoints -= A.numPoints));
      }
      getLRUItem() {
        return this.first ? this.first.node : void 0;
      }
      freeMemory(A = 2) {
        if (!(this.items.size <= 1))
          for (; this.numPoints > this.pointBudget * A; ) {
            const A = this.getLRUItem();
            A && this.disposeSubtree(A);
          }
      }
      disposeSubtree(A) {
        const g = [A];
        A.traverse((A) => {
          A.loaded && g.push(A);
        });
        for (const A of g) A.dispose(), this.remove(A);
      }
    }
    class ZA {
      constructor(A, g, I, B) {
        (this.pointCloudIndex = A), (this.weight = g), (this.node = I), (this.parent = B);
      }
    }
    const _A = { v1: NA, v2: OA };
    class $A {
      constructor(A = 'v1') {
        (this._pointBudget = 1e6),
          (this._rendererSize = new a.Vector2()),
          (this.maxNumNodesLoading = 10),
          (this.memoryScale = 2),
          (this.features = sA),
          (this.lru = new XA(this._pointBudget)),
          (this.updateVisibilityStructures = (() => {
            const A = new a.Matrix4(),
              g = new a.Matrix4(),
              I = new a.Matrix4();
            return (B, C) => {
              const Q = [],
                E = [],
                t = new WA((A) => 1 / A.weight);
              for (let e = 0; e < B.length; e++) {
                const i = B[e];
                if (!i.initialized()) continue;
                (i.numVisiblePoints = 0),
                  (i.visibleNodes = []),
                  (i.visibleGeometry = []),
                  C.updateMatrixWorld(!1);
                const o = C.matrixWorldInverse,
                  n = i.matrixWorld;
                if (
                  (A.identity().multiply(C.projectionMatrix).multiply(o).multiply(n),
                  Q.push(new a.Frustum().setFromProjectionMatrix(A)),
                  g.copy(n).invert(),
                  I.identity().multiply(g).multiply(C.matrixWorld),
                  E.push(new a.Vector3().setFromMatrixPosition(I)),
                  i.visible && null !== i.root)
                ) {
                  const A = Number.MAX_VALUE;
                  t.push(new ZA(e, A, i.root));
                }
                VA(i.root) && i.hideDescendants(i.root.sceneNode);
                for (const A of i.boundingBoxNodes) A.visible = !1;
              }
              return { frustums: Q, cameraPositions: E, priorityQueue: t };
            };
          })()),
          (this.loadGeometry = _A[A]);
      }
      loadPointCloud(A, g, I = (A, g) => fetch(A, g), B = !1, C = 529e4) {
        return this.loadGeometry(A, g, I, B).then((A) => new rA(this, A, void 0, B, C));
      }
      updatePointClouds(A, g, I, B = () => {}) {
        const C = this.updateVisibility(A, g, I);
        for (let C = 0; C < A.length; C++) {
          const Q = A[C];
          Q.disposed ||
            (Q.material.updateMaterial(Q, Q.visibleNodes, g, I),
            Q.updateVisibleBounds(),
            Q.updateBoundingBoxes(),
            I.getSize(this._rendererSize),
            Q.updateSplats(g, this._rendererSize, B));
        }
        return this.lru.freeMemory(this.memoryScale), C;
      }
      static pick(A, g, I, B, C = {}) {
        return ($A.picker = $A.picker || new tA()), $A.picker.pick(g, I, B, A, C);
      }
      get pointBudget() {
        return this._pointBudget;
      }
      set pointBudget(A) {
        A !== this._pointBudget &&
          ((this._pointBudget = A),
          (this.lru.pointBudget = A),
          this.lru.freeMemory(this.memoryScale));
      }
      static set maxLoaderWorkers(A) {
        dA.WORKER_POOL.maxWorkers = A;
      }
      static get maxLoaderWorkers() {
        return dA.WORKER_POOL.maxWorkers;
      }
      updateVisibility(A, g, I) {
        let B = 0;
        const C = [],
          Q = [],
          {
            frustums: E,
            cameraPositions: t,
            priorityQueue: e,
          } = this.updateVisibilityStructures(A, g);
        let i,
          o = 0,
          n = !1,
          r = !1;
        for (; void 0 !== (i = e.pop()); ) {
          let a = i.node;
          if (B + a.numPoints > this.pointBudget) break;
          const s = i.pointCloudIndex,
            D = A[s],
            c = void 0 !== D.maxLevel ? D.maxLevel : 1 / 0;
          if (
            a.level > c ||
            !E[s].intersectsBox(a.boundingBox) ||
            this.shouldClip(D, a.boundingBox)
          )
            continue;
          (B += a.numPoints), (D.numVisiblePoints += a.numPoints);
          const h = i.parent;
          if (PA(a) && (!h || VA(h)))
            if (a.loaded && o < 10) (a = D.toTreeNode(a, h)), o++;
            else {
              if (a.failed) {
                r = !0;
                continue;
              }
              a.loaded && o >= 10 && (n = !0), Q.push(a), D.visibleGeometry.push(a);
            }
          VA(a) && (this.updateTreeNodeVisibility(D, a, C), D.visibleGeometry.push(a.geometryNode));
          const w = 0.5 * I.getSize(this._rendererSize).height * I.getPixelRatio();
          this.updateChildVisibility(i, e, D, a, t[s], g, w);
        }
        const a = Math.min(this.maxNumNodesLoading, Q.length),
          s = [];
        for (let A = 0; A < a; A++) s.push(Q[A].load());
        return {
          visibleNodes: C,
          numVisiblePoints: B,
          exceededMaxLoadsToGPU: n,
          nodeLoadFailed: r,
          nodeLoadPromises: s,
        };
      }
      updateTreeNodeVisibility(A, g, I) {
        this.lru.touch(g.geometryNode);
        const B = g.sceneNode;
        (B.visible = !0),
          (B.material = A.material),
          B.updateMatrix(),
          B.matrixWorld.multiplyMatrices(A.matrixWorld, B.matrix),
          I.push(g),
          A.visibleNodes.push(g),
          this.updateBoundingBoxVisibility(A, g);
      }
      updateChildVisibility(A, g, I, B, C, Q, E) {
        const t = B.children;
        for (let e = 0; e < t.length; e++) {
          const i = t[e];
          if (null === i) continue;
          const o = i.boundingSphere,
            n = o.center.distanceTo(C),
            r = o.radius;
          let a = 0;
          if (Q.type === D) {
            const A = (Q.getEffectiveFOV() * Math.PI) / 180;
            a = E / (Math.tan(A / 2) * n);
          } else {
            const A = Q;
            a = (2 * E * A.zoom) / (A.top - A.bottom);
          }
          const s = r * a;
          if (s < I.minNodePixelSize) continue;
          const c = n < r ? Number.MAX_VALUE : s + 1 / n;
          g.push(new ZA(A.pointCloudIndex, c, i, B));
        }
      }
      updateBoundingBoxVisibility(A, g) {
        if (A.showBoundingBox && !g.boundingBoxNode) {
          const I = new jA(g.boundingBox);
          (I.matrixAutoUpdate = !1),
            A.boundingBoxNodes.push(I),
            (g.boundingBoxNode = I),
            g.boundingBoxNode.matrix.copy(A.matrixWorld);
        } else
          A.showBoundingBox && g.boundingBoxNode
            ? ((g.boundingBoxNode.visible = !0), g.boundingBoxNode.matrix.copy(A.matrixWorld))
            : !A.showBoundingBox && g.boundingBoxNode && (g.boundingBoxNode.visible = !1);
      }
      shouldClip(A, g) {
        const I = A.material;
        if (0 === I.numClipBoxes || I.clipMode !== Q.CLIP_OUTSIDE) return !1;
        const B = g.clone();
        A.updateMatrixWorld(!0), B.applyMatrix4(A.matrixWorld);
        const C = I.clipBoxes;
        for (let A = 0; A < C.length; A++) {
          const g = C[A].matrix,
            I = new a.Box3(
              new a.Vector3(-0.5, -0.5, -0.5),
              new a.Vector3(0.5, 0.5, 0.5),
            ).applyMatrix4(g);
          if (B.intersectsBox(I)) return !1;
        }
        return !0;
      }
    }
    return C;
  })(),
);
//# sourceMappingURL=potree.js.map
