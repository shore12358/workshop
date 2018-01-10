module.exports = {
    plugins: [
        require('autoprefixer')({
            sourceMap: true,
            browsers: ['android 4.3', 'ios 8.0']
        }),
    ]
}