const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const __PRO__ = 'PRODUCTION';
const PORT = 3159;
const ENTRY_PATH = path.join(__dirname, './src/main.js');

const config = {
    entry: {
        app: ENTRY_PATH,
        vendor: ['vue-router', 'vue-multiselect', 'vue-awesome']
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js'
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
                    use: ['css-loader', 'stylus-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name (file) {
                                return '[name].[ext]?[hash]'
                            },
                            // publicPath: '/',
                            outputPath: 'images/'

                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['common', 'vendor'],
            minChunks: 2
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
    config.devtool = 'eval-source-map';
}

module.exports = config;
