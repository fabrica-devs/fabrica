const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: './js/index.js',
    devtool: 'source-map',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyPlugin([
            { from: 'media', to: 'media' },
            { from: '3rdparty', to: '3rdparty'},
            { from: 'index.html', to: 'index.html' },
            { from: 'css/*.css', to: '' }
        ]),
        new CleanPlugin(['dist'])
    ]
}