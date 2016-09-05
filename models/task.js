var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskschema = new Schema(
    {
        name: String,
        description: String
    }
);

module.exports = mongoose.model('Task' , taskschema);