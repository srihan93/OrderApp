//Dependencies imports
var http = require('http');
var https = require('https');
var fs = require('fs');
var config = require('./config');
var path = require('path');
var facade = require('./facade');

//declarations
var server ={}

//create servers

server.httpsServerOptions ={
    key:fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'/../https/cert.pem'))
};
server.httpServer = http.createServer(function(req,res)
{
    console.log('you reached http');
    facade.index(req,res);

});

server.httpsServer = https.createServer(server.httpsServerOptions,function(req,res)
{
   console.log('you reached https'); 
   facade.index(req,res);
});


//listening to the ports
server.init = function(){
var greenColor = "\x1b[32m";
server.httpServer.listen(config.httpPort,function()
{
    console.log(greenColor,`Listening to Port: ${config.httpPort}`) ;
});
server.httpsServer.listen(config.httpsPort,function()
{
    console.log(greenColor,`Listening to Port: ${config.httpsPort}`) ;
});
}





module.exports = server;

