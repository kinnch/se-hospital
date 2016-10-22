var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var homeSchema = mongoose.Schema({
      name: String,
      cats: [{ type: Schema.Types.ObjectId, ref: 'Kitten' }]
    });

var Home = mongoose.model('Home', homeSchema);

module.exports = Home;