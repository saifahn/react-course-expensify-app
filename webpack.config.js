
// const path = require('path');

// const publicPath = path.join(__dirname, 'public');

module.exports = {
  entry: './src/app.js',
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/,
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    }],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: `${__dirname}/public`,
    historyApiFallback: true,
  },
};
