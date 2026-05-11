const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'potree.js',
    library: 'potree',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  devtool: 'eval-cheap-source-map',
  stats: 'errors-only',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: ['three'],
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        loader: 'worker-loader',
        options: { inline: 'no-fallback' },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },

      { test: /\.(vs|fs|glsl|vert|frag)$/, loader: 'raw-loader' },

      // Inline the laz-perf wasm into the worker bundle as a base64 data URL
      // so the consuming app does not have to host the wasm at a known URL.
      {
        test: /laz-perf[\\/].*\.wasm$/,
        type: 'asset/inline',
        generator: {
          dataUrl: (content) =>
            'data:application/wasm;base64,' + Buffer.from(content).toString('base64'),
        },
      },
    ],
  },
  plugins: [],
};
