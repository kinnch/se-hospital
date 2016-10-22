var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    "polyfills": "./src/app/polyfills.js",
    "vendor": ["./src/app/vendor","webpack/hot/dev-server","webpack-dev-server/client?http://0.0.0.0:8080/"],
    "app": "./src/app/main"
  },
  output: {
    path: __dirname,
    filename: "./dist/[name].bundle.js"
  },
  resolve: {
    extensions: ['', '.js','html','css','jpeg','jpg','png','gif','svg']
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.css/,
        loaders: ['to-string-loader','css-loader']
        // exclude: /node_modules/
      },
       {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
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
