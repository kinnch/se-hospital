var appServer = require('./webpack-server.js');
var apiServer = require('./api-server.js');
var chalk = require('chalk');
require('dotenv').config();

const PROD = process.env.NODE_ENV === "production";
const API_PORT = process.env.API_PORT;
const WEBPACK_PORT = process.env.WEBPACK_PORT;

// IN DEVELOPMENT MODE appServer WILL PROXY REQUEST TO apiServer
// CAN CONFIG WHAT TO PROXY IN webpack-server.js
if (PROD) {
  apiServer.serve(API_PORT);
} else {
  console.log(chalk.red('----- RUNONG IN DEVELOPMENT MODE'));
  apiServer.serve(API_PORT);
  appServer.serve(WEBPACK_PORT,API_PORT);
}
