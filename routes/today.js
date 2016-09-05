var r = require('request').defaults({
    json: true
});
var async = require('async');
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

module.exports = function(app)
{
     app.get('/today' , function(req , res){
        async.parallel({
            task: function(callback){
                 r({uri: "http://127.0.0.1:3800/task"}, function(error, response, body)
                {
                    if(error){
                        callback({service: 'task', error: error});
                        return;
                    }
                    if(!error && response.statusCode === 200){
                        callback(null , body.data);
                    }
                    else{
                        callback(response.statusCode);  
                    }        
                });    
            },   
            activity: function(callback){
                client.get('http://127.0.0.1:3801/activity' , function(error, activity){
                    if(error) {callback(error)};
                    if(activity){
                        callback(null , JSON.parse(activity));
                    }else{
                         r({uri: "http://127.0.0.1:3801/activity"}, function(error, response, body)
                        {
                            if(error){
                                callback({service: 'task', error: error});
                                return;
                            }
                            if(!error && response.statusCode === 200){
                                callback(null , body.data);
                                client.setex('http://127.0.0.1:3801/activity' ,
                                            10,//use setex to set expriration date per seconds 
                                            JSON.stringify(body.data) , 
                                            function(error){
                                                if(error){throw error;}    
                                            } 
                                );
                            }
                            else{
                                callback(response.statusCode);  
                            }        
                        });        
                    }
                });
            }
        },
        function(error , result){
            res.json(
                {
                    error: error ,
                    results: result
                });
        }
        );
    
        
     });
  app.get('/ping' , function(req , res){
      res.json({pong: Date.now()});
  });
    
}


//Before async
//  app.get('/today' , function(req , res){
//          r({uri: "http://127.0.0.1:3801/activity"}, function(error, response, body)
//          {
//                if(!error && response.statusCode === 200){
//                    res.json(body);
//                }
//                else{
//                   res.send(response.statusCode);  
//                }        
//          });
//      });
