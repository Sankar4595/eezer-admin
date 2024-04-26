const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/index.js",
    polyfills: "./src/polyfills.js", // Assuming you have a separate polyfills file
  },
  resolve: {
    extensions: [".js", ".jsx"], // Include JSX extension
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/, path.resolve(__dirname, "src", "style.scss")],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "assets/[name].[hash].[ext]",
          },
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles/[name].bundle.css",
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CopyWebpackPlugin([
      {
        from: "node_modules/froala-editor/css/",
        to: "assets/froala-editor/css/",
      },
      {
        from: "node_modules/font-awesome/css/font-awesome.min.css",
        to: "assets/font-awesome/css/font-awesome.min.css",
      },
      {
        from: "node_modules/font-awesome/fonts",
        to: "assets/font-awesome/fonts",
      },
    ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
};
