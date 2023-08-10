const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = (...paths) => path.resolve(__dirname, ...paths);

const config = {
  context: resolve('src'),
  entry: {
    main: resolve('src', 'index'),
  },
  output: {
    assetModuleFilename: 'assets/[name].[contenthash][ext]',
    clean: true,
    filename: 'js/[name].[contenthash].js',
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' }),
    new HTMLWebpackPlugin({
      template: resolve('src', 'template'),
      title: 'Shop&Comp: Your Source for Premium PC Parts',
      chunks: ['main'],
      inject: true,
      hash: false,
      favicon: resolve('public', 'shop-n-comp-favicon.png'),
    }),
  ],
  module: {
    rules: [
      { test: /\.(tsx?)$/i, loader: 'ts-loader' },
      { test: /\.scss$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
      { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource' }
    ],
  },
  resolve: { extensions: ['.ts', '.json', '.scss', '.html', '...'] },
  target: 'web',
};

module.exports = { resolve, config };
