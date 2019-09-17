const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    outputDir: './docs',
    assetsDir: './asset',
    indexPath: 'index.html',
    configureWebpack: config => {
        config.plugins.push(
            new CopyWebpackPlugin([{ from: './CNAME', to: './' }])
        )
    }
}