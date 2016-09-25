var webpack = require("webpack");

module.exports = {
  entry: {
    "vendor": ["./src/app/vendor","webpack/hot/dev-server","webpack-dev-server/client?http://localhost:8080/"],
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
    new webpack.HotModuleReplacementPlugin()
  ]
}
