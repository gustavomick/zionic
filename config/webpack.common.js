var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
// var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// var root = path.resolve('.') 
var root = helpers.root('.')

module.exports = {
  entry: {
    'vendor': './vendor.ts',
    'app': './app/app.ts'
  },
  context: root + '/src',
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [{
      test: /\.ts$/,
      include: root + '/src',
      exclude: root + '/www',
      loaders: ['ng-annotate','awesome-typescript-loader'] // , 'angular2-template-loader']
    }
    // , {
    //   test: /\.html$/,
    //   loader: 'html'
    // }, {
    //   test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
    //   loader: 'file?name=assets/[name].[hash].[ext]'
    // }, {
    //   test: /\.css$/,
    //   exclude: helpers.root('src', 'app'),
    //   loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
    // }, {
    //   test: /\.css$/,
    //   include: helpers.root('src', 'app'),
    //   loader: 'raw'
    // }//,
    // {test: /\.js$/, loaders: ['ng-annotate']}
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    
    // new ngAnnotatePlugin({
    //   add: true,
    //   // other ng-annotate options here
    // })


    // ,
    // new HtmlWebpackPlugin({
    //   template: './Scripts/index.html'
    // })
  ]
};