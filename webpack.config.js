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
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: __dirname + '/dist',
        historyApiFallback: true,
        inline: true,
        host: '0.0.0.0',
        port: 8080,
    }
}