var _= require('lodash');
var activity = require('../models/activity.js');

module.exports = function(app)
{

    app.post('/activity' , function(req , res){
       var newactivity = new activity(req.body);
       newactivity.save(function(err){
           if(err)
           {
               res.json({info: "unable to save new activity" , error: err});
               return;
           };
            res.json({info: "activity added successfully"});
       });

    });

    app.get('/activity' , function(req , res){
       activity.find(function(err , todos){
           if(err){
               res.json({info: "unable to retrieve all activities" , error: err});
           };
           setTimeout(function(){
                res.json({info: "Find all ctivities call exected successfully" , data: todos});
           } , 10000);
           
       });
    });

    app.get('/activity/:id' , function(req , res){
        activity.findById(req.params.id , function(err, activity){

            if(err)
            {
                res.json({info: "unable to save new activity" , error: err});
            };
            if(activity)
            {
                res.json(activity);
                 //res.send(activity);
                 //res.redirect("/");
            }
            else
            {
                res.json({info: "Invalid id for activity" , error: err});    
            }
        
        });
        
    });    
    app.put('/activity/:id' , function(req , res){
        activity.findById(req.params.id , function(err, activity){

            if(err)
            {
                res.json({info: "unable to save new activity" , error: err});
            };
            if(activity)
            {
                _.merge(activity , req.body);
                activity.save(function(err){
                        if(err)
                        {
                            res.json({info: "unable to save new activity" , error: err});
                        };
                            res.json({info: "activity added successfully"});
                    });      
                res.json({data: activity});
            };
            res.json({info: "Invalid id for activity" , error: err});
        });
    
    });
}
