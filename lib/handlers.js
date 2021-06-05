var _user = require('./../apis/_user');
var _login = require('./../apis/_login');
var _menu = require('./../apis/_menu');
var validation = require('./validation');
var authorize = require('./authorize');
var _logout = require('../apis/_logout');
var _cart = require('./../apis/_cart');
var _order = require('./../apis/_order');
var error= require('./../constants/errors');
var response = require('./../constants/response');

var handlers = {};

// Not-Found
handlers.notFound = function (data, callback) {
  response.statusCode = 404;
  response.success=false;
  response.message=error.notFound;
  callback(response);
}

handlers.menu = function(data,callback)
{
  let methods = ["get"];
    if (methods.indexOf(data.method) > -1) {
        authorize.validate(data, function (err) {
            if (typeof (err) !== 'boolean') {
              response.data = _menu[data.method]();
              response.success = true;
              response.statusCode = 200;              
                callback(response);
            }
            else {
              response.statusCode = 401;
              response.success=false;
              response.message=error.authorizationFailed;
              callback(response);
            }
        });
    }
    else {
      response.statusCode = 404;
      response.success=false;
      response.message=error.methodNotAllowed;
      callback(response);
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
  {
    response.statusCode = 405;
    response.success=false;
    response.message=error.methodNotAllowed;
    callback(response);
  }
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
  {
    response.statusCode = 405;
    response.success=false;
    response.message=error.methodNotAllowed;
    callback(response);
  }
}

handlers.login = function (data, callback) {
  var methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    _login[data.method](data, (err)=>
    {
      if(err===true)
      {
        response.statusCode = 401;
    response.success=false;
    response.message=error.passwordNotValid;
    callback(response);
      }
      else
      {
        response.statusCode = 201;
        response.success=true;
        response.data = err
        callback(response);
      }
    });
  } else {
    response.statusCode = 405;
    response.success=false;
    response.message=error.methodNotAllowed;
    callback(response);
  }
};


handlers.logout = function (data, callback) {
  var methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    _logout[data.method](data, (err)=>
    {
      callback(err);
    });
  } else {
    response.statusCode = 405;
    response.success=false;
    response.message=error.methodNotAllowed;
    callback(response);
  }
};

handlers.order = function(data,callback)
{
  var methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    _order[data.method](data, (err)=>
    {
      callback(err);
    });
  } else {
    response.statusCode = 405;
    response.success=false;
    response.message=error.methodNotAllowed;
    callback(response);
  }
}

module.exports = handlers;
