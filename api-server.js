var express = require('express');
// var bodyParser = require('body-parser');
var morgan = require('morgan');
var chalk = require('chalk');

//require("./model/patient.js");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function() {
        // we're connected!
        console.log("we're connected!");
      });

// require('dotenv').config();
function serve(PORT) {
  var app = express();
  app.use(morgan('dev'))
  var port = PORT;
  app.listen(port, function () {
      console.log(chalk.green('Api Server listening on port ' + port));
  });
  // TO MAKE ACCESS IN DIST FOLDER VIA PATH
  // LIKE ACCESS PUBLIC STUFF IN LARAVEL
  // app.use(express.static('dist'))
  app.use('/dist', express.static('dist'));
  app.get('/', function (req, res) {
      res.sendFile(__dirname + "/index.html");
  });
  app.get('/api', function (req, res) {
    console.log("HEY HEY");
    var Kitten = require("./model/kitten");
    //var Kitten = mongoose.model('Kitten', kittySchema);
    var fluffy = new Kitten({ name: 'fluffy' });
    fluffy.jump();
    //console.log(kittySchema);
      res.send("api from webpack proxy");
  });
  app.get('/api/123', function (req, res) {
    console.log("HEY HEY");

      res.send("api from webpack proxy 123");
  });

}
exports.serve = serve;



// require('./server/main.api')(app, express);
// module.exports = app;
