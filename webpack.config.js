var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    "vendor": ["./src/app/vendor","webpack/hot/dev-server","webpack-dev-server/client?http://0.0.0.0:8080/"],
    "app": "./src/app/main"
  },
  output: {
    path: __dirname,
    filename: "./dist/[name].bundle.js"
  },
  resolve: {
    extensions: ['', '.js','html','json','css']
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.css/,
        loaders: ['to-string-loader','css-loader']
        // exclude: /node_modules/
      },
      { test: /\.html$/, loader: 'html-loader?minimise=true' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"./dist/vendor.bundle.js"),
    new webpack.HotModuleReplacementPlugin()
    // new HtmlWebpackPlugin({inject: false, template: "index.html"})
  ]
}
