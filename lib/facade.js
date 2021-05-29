var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var router = require('./router');
//var handlers = require('./handlers');


var facade = {}

facade.index = function (req,res)
{
    var parsedUrl = url.parse(req.url,true);
    var path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    var queryString = parsedUrl.query;
    var action = req.method.toLowerCase();
    var headers = req.headers;
    var decoder =  new StringDecoder('utf-8');
    var buffer = '';
    req.on('data',function(data){
        buffer+=decoder.write(data);
    });
    req.on('end',function(){
        buffer+=decoder.end();
        var handler = typeof(router.routes[path])!=='undefined'?router.routes[path]:router.routes.notFound; 
        var data='';
        handler(data,(statusCode)=>{
            res.writeHead(statusCode);
            res.end('success');
           
        });
        
    });
   
    
}


module.exports = facade;