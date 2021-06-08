var _user = require("./../apis/_user");
var _login = require("./../apis/_login");
var _menu = require("./../apis/_menu");
var _checkout= require('./../apis/_checkout');
var validation = require("./validation");
var authorize = require("./authorize");
var _logout = require("../apis/_logout");
var _cart = require("./../apis/_cart");
var _order = require("./../apis/_order");
var error = require("./../constants/errors");
var response = require("./../constants/response");

var handlers = {};

// Not-Found
handlers.notFound = function (data, callback) {
  response.statusCode = 404;
  response.success = false;
  response.message = error.notFound;
  callback(response);
};

handlers.menu = function (data, callback) {
  let methods = ["get"];
  if (methods.indexOf(data.method) > -1) {
    authorize.validate(data, function (err) {
      if (typeof err !== "boolean") {
        callback(response.builder(true, null, _menu[data.method](), 200));
      } else {
        callback(response.builder(false, error.authorizationFailed, null, 401));
      }
    });
  } else {
    callback(response.builder(false, error.methodNotAllowed, null, 405));
  }
};

handlers.user = function (data, callback) {
  let methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    _user[data.method](data, (err) => {
      callback(err);
    });
  } else {
    callback(response.builder(false, error.methodNotAllowed, null, 405));
  }
};

handlers.cart = function (data, callback) {
  let methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    _cart[data.method](data, (err) => {
      callback(err);
    });
  } else {
    callback(response.builder(false, error.methodNotAllowed, null, 405));
  }
};

handlers.login = function (data, callback) {
  var methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    _login[data.method](data, (err) => {
      if (err === true) {
        callback(response.builder(false, error.authorizationFailed, null, 401));
      } else {
        callback(response.builder(true, null,err, 201));
      }
    });
  } else {
    callback(response.builder(false, error.methodNotAllowed, null, 405));
  }
};

handlers.logout = function (data, callback) {
  var methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    _logout[data.method](data, (err) => {
      callback(err);
    });
  } else {
    callback(response.builder(false, error.methodNotAllowed, null, 405));
  }
};

handlers.order = function (data, callback) {
  var methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    _order[data.method](data, (err) => {
      callback(err);
    });
  } else {
    callback(response.builder(false, error.methodNotAllowed, null, 405));
  }
};

handlers.checkout = function (data, callback) {
  var methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    _checkout[data.method](data, (err) => {
      callback(err);
    });
  } else {
    callback(response.builder(false, error.methodNotAllowed, null, 405));
  }
};


module.exports = handlers;
