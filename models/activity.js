var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activityschema = new Schema(
    {
        name: String,
        description: String,
        activitywhere: String,
        activitywhen: Date
    }
);

module.exports = mongoose.model('activity' , activityschema);