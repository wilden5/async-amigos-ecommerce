const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { config } = require('./webpack.base');

module.exports = merge(config, {
  mode: 'production',
  devtool: false,
  optimization: { minimize: true, minimizer: [new TerserPlugin()], splitChunks: { chunks: 'all' } },
  performance: { maxEntrypointSize: 512000, maxAssetSize: 512000 },
});
