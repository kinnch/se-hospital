var express = require('express');
var morgan = require('morgan');
var chalk = require('chalk');
// require('dotenv').config();

var assert = require('assert');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function serve(PORT) {
  var app = express();
  app.use(morgan('dev'));

  // Register JSON body parsing for Post, Updates, Deletes, etc.
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  var port = PORT;

  app.listen(port, function () {
      console.log(chalk.green('Api Server listening on port ' + port));
  });
  // TO MAKE ACCESS IN DIST FOLDER VIA PATH
  // LIKE ACCESS PUBLIC STUFF IN LARAVEL
  // app.use(express.static('dist'))
  app.use('/dist', express.static('dist'));
 
  
  
  require('./routes/route')(app);
  
  // Passport init
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/api', function (req, res) {
    console.log("HEY HEY");

      res.send("api from webpack proxy");
  });
  app.get('/api/123', function (req, res) {
    console.log("HEY HEY");

      res.send("api from webpack proxy 123");
  });
  
   app.get('*', function (req, res) {
      res.sendFile(__dirname + "/index.html");
  });

}
exports.serve = serve;



// require('./server/main.api')(app, express);
// module.exports = app;
