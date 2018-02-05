
const Koa =  require('koa');
const static = require('koa-static');
const proxy = require('koa-proxy');
const webpack = require('webpack');
const webpackConf = require('./webpack.config');
const path = require('path');

const app = new Koa();
const complier = webpack(webpackConf);
const __PRO__ = 'PRODUCTION';
// const API_SITE = 'http://172.16.21.105/';

if (process.env.NODE_ENV === __PRO__) {
    app.use(static(path.join(__dirname, '/dist'))) ;

} else {
    app.use(require('koa-webpack-dev-middleware')(complier, {
        watchDelay: 1000,
        publicPath: webpackConf.output.publicPath,
        stats: {
            colors: true
        }
    }));
    app.use(require('koa-webpack-hot-middleware')(complier, {
        log: false,
        reload: true
    }));
}

// app.use(proxy({
//     host: API_SITE,
//     match: /^\/rest\//i
// }));
// app.use(proxy({
//     host: 'http://172.16.25.132:50259/',
//     match: /^\/api\//i
// }));

app.listen(5626, () => {
    console.log('listening at port: 5626');
});