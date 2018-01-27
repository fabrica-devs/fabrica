const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/media', to: 'media' },
            { from: 'src/3rdparty', to: '3rdparty'},
            { from: 'src/index.html', to: 'index.html' },
            { from: 'src/css/*.css', to: 'css', flatten: true }
        ]),
        new CleanPlugin(['dist'])
    ]
}