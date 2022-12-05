const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const {
  NODE_ENV = 'production'
} = process.env;

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.ts', '.js']
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  watch: NODE_ENV === 'development',
  plugins: [
    new WebpackShellPlugin({
      onBuildStart: {
        scripts: ['echo "[Webpack] Build started"'],
        blocking: true,
        parallel: false
      },
      onBuildEnd: {
        scripts: NODE_ENV === 'development' ? ['yarn serve'] : ['echo "[Webpack] Build finished"'],
        blocking: false,
        parallel: true
      }
    })
  ],
  externals: [
    'aws4',
    'aws-crt',
    'aws-sdk',
    'snappy'
  ]
};
