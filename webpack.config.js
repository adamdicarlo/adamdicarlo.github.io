const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: './src/splash.js',
  output: {
    path: 'dist',
    filename: 'splash.bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?cacheDirectory',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css?sourceMap')
    }]
  },
  plugins: [
    new ExtractTextPlugin('splash.bundle.css', {allChunks: true})
  ]
}
