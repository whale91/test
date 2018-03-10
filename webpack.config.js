'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry: ["babel-polyfill", "./src/js/app.js"],

    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/assets/js/"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader?presets[]=es2015'
            }
        ]
    },

    resolve: {
        modulesDirectories: ['./src/js']
    },

    devtool: "source-map",

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
                unsafe: true
            }
        })
    ]
};
