const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

const config = {
    // Entry points to the project
    entry: {
        login: [
            // only- means to only hot reload for successful updates
            'webpack/hot/only-dev-server',
            './src/app/app.js',],
        register: [
            './src/app/register.js'],
        home: [
            './src/app/home.js'],
        manage: [
            './src/app/manage.js'],
        picture:[
            './src/app/picture.js'],
        react: [
            'react', 'react-dom', 'material-ui'],
    },
    // Server Configuration options
    devServer: {
        contentBase: 'src/www', // Relative directory for base of server
        hot: true, // Live-reload
        inline: true,
        port: 7777, // Port Number
        host: '192.168.2.77', // Change to '0.0.0.0' for external facing server
    },
    devtool: 'eval',
    output: {
        path: path.resolve(__dirname, 'build'), // Path of output file
        filename: 'assets/react/[name].js',
    },
    plugins: [
        // Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        new CommonsChunkPlugin({
                name: ['react'],
                filename: 'assets/react/react.js',
                minChunks: Infinity
            }
        ),
        // Moves files
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
    },
};

module.exports = config;
