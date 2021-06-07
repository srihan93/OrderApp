//Dependencies imports
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
const pay = require("./pay");


//declarations
var server ={}

//create servers


server.httpServer = http.createServer(function(req,res)
{
    console.log('you reached http');
    pay.makePayment().then(()=>{
        console.log('then');
    }
    ).catch((e)=>
    {
        console.log(e);
    });

});




//listening to the ports
server.init = function(){
var greenColor = "\x1b[32m";
server.httpServer.listen('5003',function()
{
    console.log(greenColor,`Listening to Port:5003`) ;
});

}

server.init();











