const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, options) => {
  const isProd = options.mode === 'production'

  const config = {
    mode: isProd ? 'production' : 'development',
    entry: ['./client/index.js'],
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '',
      filename: '[name].bundle.js',
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      hot: true,
      port: 8080,
      proxy: {
        '/': 'http://localhost:3000',
      },
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(scss|css)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(woff|woff2|ttf)$/,
          use: {
            loader: 'url-loader',
          },
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'CyberPizza',
        template: path.resolve(__dirname, './client/index.html'),
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'main.css',
        chunkFilename: '[id].css',
      }),
    ],
  }
  return config
}
