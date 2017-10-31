//we need to bring express module so we can use the router, pblic folder, etc
//global variables can be const instead of var
const http = require("http");
const express = require('express'); // that returns a function => function call
//can be done this way: var app = require('express')();
var app = express(); // app is a result of running express
// () open/close means run the code, and when there is 
// variable - passing variable and then run the code
app.get('/', (req, res, next) => {
	res.send("Hello, World");
})

//http is part of core we needed to run server
var server = http.createServer(app); //we handed our express app
server.listen(8080);//there might be a module to allow to listen on several ports
console.log("the server is listening on port 8080");
