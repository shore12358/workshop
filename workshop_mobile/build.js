process.env.NODE_ENV = 'PRODUCTION';
const webpack = require('webpack');
const config = require('./webpack.config.js');

webpack(config, function (err, stat) {
    if (err) {
        throw err;
    }
    console.log('Build complete.\n');
    process.exit(0)
});
