// This assumes an app directory with an index.template.html (which will be 
// used to generate the index.html) and an app/js directory containing the app.js
// file. That fill will include all of the other code either directly or indirectly.
//
// npm install --save-dev webpack
// And, if you want to use the webpack dev server: npm install --save-dev webpack-dev-server
//
// Development build: "npx webpack"
// Alternative to "Development build" if you want to use the dev server: npx webpack-dev-server --open
// Production build (w/ minification, etc.): "npx webpack --mode=production"

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
 
module.exports = {
  mode: 'development',
  entry: './app/js/app.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './app'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.template.html',
      hash: true
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app')
  }
};