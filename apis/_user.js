const db = require("../lib/db");
var helpers = require("../lib/helpers");
var validation  = require('./../lib/validation');

//callback methods return err as main parameter, so setting err=true is the call is having some failure
var collection ="users";
var _user = {};

_user.post = function (data, callback) {
  if(validation.userCreation(data))
  {
      var hashedPassword = helpers.hash(data.body.password);
      data.body.password = hashedPassword;
    if(typeof(hashedPassword)!==Boolean)
    {
      db.create(collection,data.body.phone,data.body,function(err)
      {
        callback(err);
      });
    }
    else
    {
      callback(true);
    }
  }
  else
  {
    callback(true);
  }
};

module.exports = _user;
