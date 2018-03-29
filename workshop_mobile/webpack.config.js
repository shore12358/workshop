const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CF = require('./src/config/config.js');

const __PRO__ = 'PRODUCTION';
const ENTRY_PATH = path.join(__dirname, './src/main.js');

const config = {
    entry: {
        app: ENTRY_PATH,
        vendor: ['vue-router', 'vue-multiselect', 'socket.io-client', 'isomorphic-fetch', 'moment', 'vue', 'vuex'],
    },
    output: {
        publicPath: '/WorkShopH5/',
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // split css from .vue
                // options: {
                //     loaders: {
                //         css: ExtractTextPlugin.extract({
                //             use: 'css-loader',
                //             fallback: 'vue-style-loader'
                //         }),
                //         stylus: ExtractTextPlugin.extract({
                //             fallback: 'vue-style-loader',
                //             use: ['css-loader', 'postcss-loader', 'stylus-loader']
                //         }),
                //     }
                // },
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: ['css-loader', 'postcss-loader', 'stylus-loader']
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
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
                            outputPath: 'imgs/'

                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },
    // externals: {
    //     vue: 'Vue',
    //     vuex: 'Vuex',
    //
    // },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
        }),
    ]
};
if (process.env.NODE_ENV === CF.__PRO__) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
} else {
    config.output.publicPath = '/';
    config.entry.app = [`webpack-hot-middleware/client?path=http://localhost:${CF.PORT}/__webpack_hmr&reload=true`, ENTRY_PATH];
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
    config.devtool = 'eval-source-map';
}

module.exports = config;
