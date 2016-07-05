const ClosureCompilerPlugin = require('closure-compiler-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    path: 'dist',
    filename: 'Main.elm.js'
  },
  module: {
    loaders: [{
      test: /\.elm$/,
      exclude: [/elm-stuff/, /node_modules/],
      loader: 'elm-webpack'
    }, {
      test: /\.css$/,
      loaders: ['style', 'css']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      mobile: true,

      inject: false,
      template: require('html-webpack-template'),
      title: 'Adam DiCarlo’s homepage',
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true
      }
    }),
    // new ClosureCompilerPlugin({
    //   compilation_level: 'ADVANCED',
    //   create_source_map: false,
    //   language_out: 'ECMASCRIPT5'
    // })
  ]
}
