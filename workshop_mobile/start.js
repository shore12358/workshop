const Koa =  require('koa');
const static = require('koa-static');
const proxy = require('koa-proxy');
const webpack = require('webpack');
const webpackConf = require('./webpack.config');
const path = require('path');

const app = new Koa();
const complier = webpack(webpackConf);
const API_SITE = 'https://s.tuhu.cn';

app.use(require('koa-webpack-dev-middleware')(complier, {
    watchDelay: 1000,
    publicPath: webpackConf.output.publicPath,
    stats: {
        colors: true
    }
}));
app.use(require('koa-webpack-hot-middleware')(complier, {
    // log: false,
    reload: true
}));

app.use(static(path.join(__dirname, '/dist'))) ;
app.use(proxy({
    host: API_SITE,
    match: /^\/api\//i
}));

app.listen(3159, () => {
    console.log('listening at port: 3159');
});