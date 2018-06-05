const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: `${__dirname}/public/`,
    historyApiFallback: true,
    publicPath: '/dist/',
  },
});
