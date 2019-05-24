const path = require("path");
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports =  {
    target: 'node',
    entry: {
        app: ["./src/devices/index.ts"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'devices.tsconfig.json'
                },
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "devices.js"
      },
    externals: [nodeExternals()],
    watch: true,
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: ['npm run run:devices']
        }),
        new webpack.EnvironmentPlugin(['MQTT_HOST']),
    ]
};