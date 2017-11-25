var utils = require('./utils')
var config = require('../config')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // loaders: utils.cssLoaders({
  //   sourceMap: isProduction
  //     ? config.build.productionSourceMap
  //     : config.dev.cssSourceMap,
  //   extract: isProduction
  // }),
  loaders:{
    css: ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader'}),
    sass: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})
  },
  // transformToRequire: {
  //   video: 'src',
  //   source: 'src',
  //   img: 'src',
  //   image: 'xlink:href'
  // }
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS 8']
    })
  ]
}
