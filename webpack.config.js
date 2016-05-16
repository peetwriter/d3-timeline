require('es6-promise').polyfill();
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackPluginConfig = new  HtmlWebpackPlugin({
    template: __dirname + '/example/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: [
        './example/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: "index.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
}
