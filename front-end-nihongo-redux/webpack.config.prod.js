const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBundleAnalyser = require("webpack-bundle-analyzer");
const CopyWebpackPlugin = require("copy-webpack-plugin");

process.env.NODE_ENV = "production";

module.exports = {
  mode: "production",
  target: "web",
  devtool: "source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    // Display bundle stats
    new webpackBundleAnalyser.BundleAnalyzerPlugin({ analyzerMode: "static" }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),

    new webpack.DefinePlugin({
      //this global makes sure React is built in prod mod
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.REACT_APP_API_BASE_URL": JSON.stringify(
        "http://HOST_NAME:9090"
      ),
      "process.env.KEYCLOAK_URL": JSON.stringify(
        "http://HOST_NAME:9999/auth/realms/Nihongo"
      ),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/images", to: "src/images" },
        { from: path.resolve(__dirname, "keycloak.json") },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /(\.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("cssnano")],
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};











