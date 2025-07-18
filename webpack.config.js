const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

week="week2";

module.exports = {
  entry: `./${week}/src/index.js`,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, `./${week}/dist`),
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: `./${week}/src/index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
      // filename: 'index.[contenthash].css'
    }),
  ],
};