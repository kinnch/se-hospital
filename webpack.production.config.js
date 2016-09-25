var webpack = require("webpack");

module.exports = {
  entry: {
    "vendor": "./src/app/vendor",
    "app": "./src/app/main"
  },
  output: {
    path: __dirname,
    filename: "./dist/[name].bundle.js"
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.css/,
        loaders: ['style!css']
        // exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"./dist/vendor.bundle.js"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
}
