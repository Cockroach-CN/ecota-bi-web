var path = require("url");
const webpack = require("webpack");

module.exports = {
    devtool: 'source-map',
    entry: ['webpack/hot/dev-server', __dirname + '/src/App.jsx'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: __dirname + '/dist',
        historyApiFallback: true,
        inline: true,
        port: 8080,
    }
}