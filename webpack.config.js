const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/app/index.tsx",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"]},
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  watch: true,
  resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "[name].bundle.js",
  },
  devServer: {
    hot:true,
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      'process.env.MQTT_HOST': 'mqtt://localhost',
      'process.env.WS_MQTT_HOST': 'ws://localhost:1884',
    }),
  ],
};