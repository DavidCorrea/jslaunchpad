const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
        title: 'JSLaunchpad',
        filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
        filename: "index.css"
    }),
  ],

  module: {
    rules: [
        {
            test: /\.scss$/,
            loader: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader'
            ]
        },
        {
          test: /\.html$/,
          loader: [
            'html-loader'
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      ]
  },

  devServer: {
    compress: true,
    port: 9000,
    stats: 'minimal'
  }
};