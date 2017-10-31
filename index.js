//we need to bring express module so we can use the router, pblic folder, etc
//global variables can be const instead of var
const http = require("http");
//http needs to get us there and 
const express = require('express'); // that returns a function => function call
//can be done this way: var app = require('express')();
var app = express(); // app is a result of running express
// () open/close means run the code, and when there is 
// variable - passing variable and then run the code
var socketio = require("socket.io")
app.use(express.static(__dirname + '/public')); //use is a middleware
// browser sees index.html file and loads it
// we want to add added some stuff
var users = [];
app.get('/', (req, res, next) => {
	res.send("Hello, World");
})

//http is part of core we needed to run server
var server = http.createServer(app); //we handed our express app
server.listen(8080);//there might be a module to allow to listen on several ports
var io = socketio.listen(server); //only listens for sockets
// the way that socket.io works...
// 1. .on to listen - I will listen for stuff from you
// 2. .emit to send - if I need to send something to you
io.sockets.on('connect', (socket)=>{//call back so stuff to be ran
	console.log('someone connected via s socket')
	//add all event listener
	socket.on('nameToServer',(data)=>{//this is someone who just connected
		var clientInfo = {
			name: data;
			clientId: socket.id
		};
		users.push(clientInfo);
		console.log(data);
		io.sockets.emit("newUser", users);
	});	
	socket.on('messageToServer',(messageObject)=>{
		console.log(messageObject)
		io.sockets.emit('messageToClient',messageObject); //sending to sockets-to everybody
	}); // event listener - someone just connected

});
console.log("the server is listening on port 8080");


