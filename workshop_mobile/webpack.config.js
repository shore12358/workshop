const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const __PRO__ = 'PRODUCTION';
const PORT = 3159;
const ENTRY_PATH = path.join(__dirname, './src/main.js');

const config = {
    entry: {
        app: ENTRY_PATH
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash]js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'stylus-loader']
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ],
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
        }),
        new ExtractTextPlugin('[name].css')
    ]
};
if (process.env.NODE_ENV === __PRO__) {

    // TODO
} else {
    config.entry.app = [`webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr&reload=true`, ENTRY_PATH];
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
}
module.exports = config;