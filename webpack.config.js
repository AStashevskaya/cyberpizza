const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const dotenv = require('dotenv')

// this will update the process.env with environment variables in .env file
dotenv.config()

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
      // historyApiFallback: {
      //   index: 'index.html',
      // },
      contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      hot: true,
      port: 8080,
      proxy: {
        '/': 'http://localhost:4000',
      },
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, './client/components'),
      },
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
      // new webpack.ProvidePlugin({
      //   process: 'process/browser',
      // }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'CyberPizza',
        template: path.resolve(__dirname, './client/index.html'),
        filename: 'index.html',
        publicPath: '/',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
        chunkFilename: '[id].css',
      }),
    ],
  }
  return config
}
