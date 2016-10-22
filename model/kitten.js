var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kittySchema = mongoose.Schema({
      name: String
    });

    // NOTE: methods must be added to the schema before compiling it with mongoose.model()
    kittySchema.methods.speak = function () {
      var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
      console.log(greeting);
    }
    kittySchema.methods.jump = function () {
      console.log("jump meaw!");
    }

var Kitten = mongoose.model('Kitten', kittySchema);

module.exports = Kitten;

//module.exports = "Hello";