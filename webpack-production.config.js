const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const config = {
        entry: {
            login: [
                './src/app/login.js'],
            register: [
                './src/app/register.js'],
            home: [
                './src/app/home.js'],
            manage: [
                './src/app/manage.js'],
            collect:[
                './src/app/collect.js'],
            picture:[
                './src/app/picture.js'],
            react: ['react', 'react-dom', 'material-ui'],
        },
        // Render source-map file for final build
        devtool: 'source-map',
        // output config
        output: {
            path: path.resolve(__dirname, 'build'), // Path of output file
            filename: 'assets/react/[name].js', // Name of output file
        },
        plugins: [
            // Define production build to allow React to strip out unnecessary checks


            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            // Minify the bundle
            new UglifyJsPlugin({
                sourceMap: false,
                warnings: false,
            }),
            new CommonsChunkPlugin({
                    name: ['react'],
                    filename: 'assets/react/react.js',
                    minChunks: Infinity
                }
            ),
            // Transfer Files
            new TransferWebpackPlugin([
                {from: 'www'},
            ], path.resolve(__dirname, 'src')),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                    },
                },
            ],
        }
        ,
    }
    ;

module.exports = config;
