const path = require('path')

// const publicPath = path.join(__dirname, 'public');
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: 'env.test' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: 'env.development' })
}

module.exports = {
  entry: './src/app.js',
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: `${__dirname}/public`,
    historyApiFallback: true,
  },
}
