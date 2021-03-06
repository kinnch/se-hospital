var express = require('express');
var morgan = require('morgan');
var chalk = require('chalk');

//require("./model/patient.js");
var mongoose = require('mongoose');
var MONGO_DB;
var DOCKER_DB = process.env.DB_PORT;
if ( DOCKER_DB ) {
  MONGO_DB = DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/test';
} else {
  // MONGO_DB = process.env.MONGODB;
  MONGO_DB = 'mongodb://localhost:27017/test'
}
var retry = 0;
mongoose.connect(MONGO_DB);

//mongoose.connect('mongodb://0.0.0.0/test');

var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function() {
        // we're connected!
        console.log("we're connected!");
      });

// require('dotenv').config();

var assert = require('assert');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//connect model
var Drug = require("./model/drug");
var Patient = require("./model/patient");

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
 app.use('/resources', express.static('resources'));
  
  
  require('./routes/route')(app);
  
  // Passport init
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/api', function (req, res) {
    console.log("HEY HEY");
    /*
    Kitten.find({ name: /^fluff/ },function (err, kittens) {
      if (err) return console.error(err);
      var kitten_ids = [];
      for(var i = 0; i < kittens.length; i++){
        kitten_ids.push(kittens[i]._id);
      }
      var tohHome = new Home({ name: 'toh2', cats: kitten_ids});
      tohHome.save();
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(kitten_ids));
    });
    */
    
    res.send('SAVED');
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
