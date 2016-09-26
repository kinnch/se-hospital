var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");
var chalk = require('chalk');
var compiler = webpack(config);
function serve(PORT , PORT2) {
  var server = new webpackDevServer(compiler, {
    hot: true,
    quiet: false,
    onInfo: true,
    stats: { color: true },
    proxy: {
      '*': {
        target: `http://localhost:${PORT2}`,
        secure: false
      }
    }
  });
  server.listen(PORT, '0.0.0.0');
  console.log(chalk.green('WEBPACK Server listening on port ' + PORT));
}
exports.serve = serve;
