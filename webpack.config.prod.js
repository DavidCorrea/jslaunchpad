const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        title: 'JSMidi | Davejco',
        filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
        filename: "index.css"
    }),
    new FaviconsWebpackPlugin({
      logo: './src/laptop.png',
      icons: {
        android: false, 
        appleIcon: false,
        appleStartup: false,
        coast: false,       
        favicons: true,    
        firefox: false,     
        windows: false,     
        yandex: false 
      }
    })
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
  }
};