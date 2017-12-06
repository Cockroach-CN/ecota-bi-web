var path = require("url");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
        }, {
            test: /\.(jpe?g|png|gif)$/,
            loader: "file-loader?name=images/[name].[ext]?[hash]"
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
                from: 'static/index.html',
                to: 'index.html'
            },
            {
                from: 'static/settings.js',
                to: 'settings.js'
            },
        ])
    ],
    devServer: {
        contentBase: __dirname + '/dist',
        historyApiFallback: true,
        inline: true,
        host: '0.0.0.0',
        port: 8001,
    }
}