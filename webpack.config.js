const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: './src/splash.js',
  output: {
    path: path.resolve('./wwwroot/assets'),
    filename: 'splash.[chunkhash:12].bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new CleanPlugin('wwwroot', { verbose: false }),
    new HtmlPlugin({
      // output html into wwwroot
      filename: '../index.html',
      minify: {
        collapseWhitespace: true
      },
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'splash.[contenthash:12].bundle.css',
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true
          }
        }
      }),
      new TerserPlugin({ sourceMap: true })
    ]
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
    }]
  }
}
