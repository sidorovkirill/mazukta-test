// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const initConfig = require('./webpack.init.config');

module.exports = merge(initConfig, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    './src/main' // the entry point of our app
  ],
  devServer: {
    hot: true, // enable HMR on the server
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
});
