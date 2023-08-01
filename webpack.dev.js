const { merge } = require('webpack-merge');
const { config, resolve } = require('./webpack.base');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  optimization: { removeAvailableModules: false, removeEmptyChunks: false },
  devServer: {
    allowedHosts: 'auto',
    client: { overlay: true },
    compress: true,
    host: 'localhost',
    hot: false,
    open: false,
    port: 4200,
    static: { directory: resolve('dist'), publicPath: '/', watch: true },
  },
  watchOptions: { aggregateTimeout: 300, ignored: '**/node_modules', poll: 300 },
});
