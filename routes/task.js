var _= require('lodash');
var Task = require('../models/task.js');

module.exports = function(app)
{

    app.post('/task' , function(req , res){
       var newtask = new Task(req.body);
       newtask.save(function(err){
           if(err)
           {
               res.json({info: "unable to save new task" , error: err});
               return;
           };
            res.json({info: "Task added successfully"});
       });

    });

    app.get('/task' , function(req , res){
       Task.find(function(err , todos){
           if(err){
               res.json({info: "unable to retrieve all tasks" , error: err});
           };
           res.json({info: "unable to retrieve all tasks" , data: todos});
       });
    });

    app.get('/task/:id' , function(req , res){
        Task.findById(req.params.id , function(err, task){

            if(err)
            {
                res.json({info: "unable to save new task" , error: err});
            };
            if(task)
            {
                res.send(task);
                res.redirect("/");
            };
            res.json({info: "Invalid id for task" , error: err});
        });
        
    });    
    app.put('/task/:id' , function(req , res){
        Task.findById(req.params.id , function(err, task){

            if(err)
            {
                res.json({info: "unable to save new task" , error: err});
            };
            if(task)
            {
                _.merge(task , req.body);
                task.save(function(err){
                        if(err)
                        {
                            res.json({info: "unable to save new task" , error: err});
                        };
                            res.json({info: "Task added successfully"});
                    });      
                res.json({data: task});
            };
            res.json({info: "Invalid id for task" , error: err});
        });
    
    });
}

// module.exports = function(app)
// {
//     _todos = [];

//     app.post('/task' , function(req , res){
//         _todos.push(req.body);
//         res.json({info: "Task added successfully"});
//     });

//     app.get('/task' , function(req , res){
//         res.send(_todos);
//     });

//     app.get('/task/:id' , function(req , res){
//         var task = _.find(_todos , {name: req.params.id});
//         res.send(task);
//     });    
//     app.put('/task/:id' , function(req , res){
//         var index = _.findIndex(_todos , {name: req.params.id});
//         _.merge(_todos[index] , req.body);
//         res.json({info: "Task has been updated"});
//     });
// }