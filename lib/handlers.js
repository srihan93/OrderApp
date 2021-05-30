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
    handlers._user[data.method](data, callback);
  } else callback(405);
};

handlers._user.get = function (data, callback) {
  var firstName =
    typeof data.body.firstName == "string" && data.body.firstName.trim() > 0
      ? data.body.firstName.trim()
      : false;
  var lastName =
    typeof data.body.lastName == "string" && data.body.lastName.trim() > 0
      ? data.body.lastName.trim()
      : false;
  var email =
    typeof data.body.email == "string" && data.body.email.trim() > 0
      ? data.body.email.trim()
      : false;

  if (firstName && lastName && email) {
  }
}

handlers._user.post = function (data, callback) {};

handlers.login = function (data, callback) {
  var methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    //handlers._user[data.method](data, callback);
    handlers._login.post(data,callback);
  } else callback(405);
};
handlers.logout = function (data, callback) {
  var methods = ["post"];
  if (methods.indexOf(data.method) > -1) {
    handlers._user[data.method](data, callback);
  } else callback(405);
};
handlers._login.post = function (data, callback) {
  _login.post(data,(err)=>{
    if(err)
    callback(true);
    else{

    }
  });
};

handlers._logout.post = function (data, callback) {};

module.exports = handlers;
