var _user = require('./../apis/_user');
var _login = require('./../apis/_login');
var validation = require('./validation');


var handlers = {};

// Not-Found
handlers.notFound = function (data, callback) {
  callback(404);
};


handlers.user = function (data, callback) {
  var methods = ["post", "get"];
  if (methods.indexOf(data.method) > -1) {
          _user[data.method](data,(err)=>
      {
        callback(err);
      });    
  } 
  else 
  callback(405);
}


handlers.login = function (data, callback) {
  var methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    _login[data.method](data, (err)=>
    {
      callback(err);
    });
  } else callback(405);
};


handlers.logout = function (data, callback) {
  var methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    _login[data.method](data, (err)=>
    {
      callback(err);
    });
  } else callback(405);
};


module.exports = handlers;
