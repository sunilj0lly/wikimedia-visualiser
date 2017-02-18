var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  watch: true,
  devtool: 'source-map',
  entry: {
    app: './src/app.js',
    // test: './test/tests.js'
  },
  output: {
    path: path.join(__dirname, "static"),
    filename: "[name]-bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ],
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ],
  },
  plugins: [
    new LiveReloadPlugin()
  ]
};
