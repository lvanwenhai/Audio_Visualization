var path = require('path');
module.exports = {
  cache: true,

  watch: true,

  entry: './app/main',

  output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader!transform/cacheable?envify' },
    ],
    postLoaders: [
      { loader: "transform?brfs" }
    ]
  },
  devtool: ['source-map'],
  resolve: {
    root: __dirname,
    alias: {
      'react-canvas': 'lib/ReactCanvas.js'
    }
  }
};
