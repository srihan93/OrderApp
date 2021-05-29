

var handlers = {};

// Not-Found
handlers.notFound = function(data,callback){
  console.log('Hi There');
    callback(404);
  }

handlers.user = function(data,callback)
{
  callback(200);
}


module.exports = handlers;