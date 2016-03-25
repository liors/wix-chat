var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
    config.set({
        basePath: "",
        //browsers: [ 'PhantomJS' ],
        browsers: [ 'Chrome' ],
        singleRun: false,
        frameworks: [ 'jasmine' ],
        files: [
            'testPolyfill.js',
            'node_modules/lodash/lodash.js',
            { pattern: '**/__tests__/*Spec.js', watched: false }
        ],
        preprocessors: {
            '**/__tests__/*Spec.js': ['webpack', 'sourcemap' ]
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
                    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
                ]
            },
            resolve: {
                root: path.resolve('./client'),
                extensions: ['', '.js']
            },
            externals: {
                lodash: '_',
                React: 'react',
                ReactDOM: 'react-dom'
            }
        },
        reporters: ['progress'],
        webpackMiddleware: {
            noInfo: true
        },
        port: 9876,
        colors: true,
        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-sourcemap-loader')
        ]
    });
};