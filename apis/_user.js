const db = require("../lib/db");
var helpers = require("../lib/helpers");
var validation  = require('./../lib/validation');
var response = require('./../constants/response');
var error = require('./../constants/errors');

//callback methods return err as main parameter, so setting err=true is the call is having some failure
var collection ="users";
var _user = {};

_user.post = function (data, callback) {
  if(validation.userCreation(data))
  {
      var hashedPassword = helpers.hash(data.body.password);
      data.body.password = hashedPassword;
      data.body.id = data.body.phone;
    if(typeof(hashedPassword)!==Boolean)
    {
      db.create(collection,data.body.phone,data.body,function(err)
      {
        callback(response.builder(true, null, {'message':'User created successfully'}, 201));
      });
    }
    else
    {
      callback(response.builder(false, error.commonError, null, 500));
    }
  }
  else
  {
    callback(response.builder(false, error.userCreation, null, 400));
  }
};

module.exports = _user;
