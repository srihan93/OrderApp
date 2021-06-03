var _user = require('./../apis/_user');
var _login = require('./../apis/_login');
var _menu = require('./../apis/_menu');
var validation = require('./validation');
var authorize = require('./authorize');
var _logout = require('../apis/_logout');
var _cart = require('./../apis/_cart');


var handlers = {};

// Not-Found
handlers.notFound = function (data, callback) {
  callback(404);
}

handlers.menu = function(data,callback)
{
  let methods = ["get"];
    if (methods.indexOf(data.method) > -1) {
        authorize.validate(data, function (err) {
            if (typeof (err) !== 'boolean') {
                callback(_menu[data.method]());
            }
            else {
                callback(true);
            }
        });
    }
    else {
        callback(true);
    }
}


handlers.user = function (data, callback) {
  let methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
          _user[data.method](data,(err)=>
      {
        callback(err);
      });    
  } 
  else 
  callback(405);
}


handlers.cart = function (data, callback) {
  let methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
          _cart[data.method](data,(err)=>
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
    _logout[data.method](data, (err)=>
    {
      callback(err);
    });
  } else callback(405);
};


module.exports = handlers;
