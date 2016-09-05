as part of investigating new techs. I have been learning NodeJS through building small projects. I have used online courses(Pluralsight) to lear NodeJS

In this demo, I have created 3 node servers
1. Task server listen to port 3800
	Route: exporting task route that handles http get/post/put calls of my task model
	Model: using mongoose on top of Mongodb to create task schema and map it to a model.
2. Activity Server listen to port 3801
	Route: exporting activity route that handles http get/post/put calls of my activity model
	Model: using mongoose on top of Mongodb to create activity schema and map it to a model
3. Today Server: works as a mediator to collect data from task and activity servers and show it to the user in an async way.
	Route: using request to make task/activity requests and merge results in 1 json object and reply back
	Cache: using redis to cache req that takes 10s. redis is in memory dectionary of my request uri and the results.

Using forever to run task server and activity server
Using Node/Nodemon to run Today server

modules used
express
mongoose 
lodash
body-parser
async
request
redis

+installed 
nodejs
forever
nodemon to monitor script changes instead of stop/start server manually
mongodb
	mongod --storageEngine=mmapv1 --dbpath c:\data\db

Use below syntax to repair database when corrupted
//option 2: repair data
//remove lock
	//rm /data/db/mongod.lock
//repair data
	//mongod --dbpath /data/db --repair
 

Tools
Using NPM
Using chocolatey as a windows package manager
