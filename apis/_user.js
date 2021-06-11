const db = require("../lib/db");
var helpers = require("../lib/helpers");
var validation = require("./../lib/validation");
var response = require("./../constants/response");
var error = require("./../constants/errors");
var fs = require("fs");

//callback methods return err as main parameter, so setting err=true is the call is having some failure
var collection = "users";
var _user = {};

_user.post = function (data, callback) {
  if (validation.userCreation(data)) {
    var hashedPassword = helpers.hash(data.body.password);
    data.body.password = hashedPassword;
    data.body.id = data.body.phone;
    if (typeof hashedPassword !== Boolean) {
      db.create(collection, data.body.phone, data.body, function (err) {
        if (err === true) {
          callback(response.builder(false, error.userExists, null, 400));
        } else {
          callback(
            response.builder(
              true,
              null,
              { message: "User created successfully" },
              201
            )
          );
        }
      });
    } else {
      callback(response.builder(false, error.commonError, null, 500));
    }
  } else {
    callback(response.builder(false, error.userCreation, null, 400));
  }
};

_user.put = function (data, callback) {
  db.read("tokens", data.headers.token, null, function (err, object) {
    if (err !== true) {
      let phone = object.phoneNumber;

      let update = 0;
      db.read("users", phone, null, function (err, userDetails) {
        userDetails.firstName =
          typeof data.body.firstName == "string" &&
          data.body.firstName.trim().length > 0
            ? data.body.firstName.trim()
            : userDetails.firstName;
        userDetails.email =
          typeof data.body.email == "string" &&
          data.body.email.trim().length > 0
            ? data.body.email.trim()
            : userDetails.email;
        userDetails.lastName =
          typeof data.body.lastName == "string" &&
          data.body.lastName.trim().length > 0
            ? data.body.lastName.trim()
            : userDetails.lastName;
        userDetails.password =
          typeof data.body.password == "string" &&
          data.body.password.trim().length > 0
            ? helpers.hash(data.body.password)
            : userDetails.password;
        if (typeof hashedPassword !== Boolean) {
          db.update(collection, phone, userDetails, function (err) {
            if (err === true) {
              callback(response.builder(false, error.userNotExists, null, 400));
            } else {
              callback(
                response.builder(
                  true,
                  null,
                  { message: "User updated successfully" },
                  201
                )
              );
            }
          });
        } else {
          callback(response.builder(false, error.commonError, null, 500));
        }
      });
    } else {
      callback(response.builder(false, error.authorizationFailed, null, 400));
    }
  });
};

_user.delete = function (data, callback) {
  db.read("tokens", data.headers.token, null, function (err, object) {
    if (err !== true) {
      db.delete('users',object.phoneNumber,function(deletedUser)
      {
        if(deletedUser===true)
        {
          callback(response.builder(false, error.userNotExists, null, 400));
        }
        else{
          db.delete('users',object.phoneNumber,function(deletedOrder){
          callback(response.builder(true, null, {"message":"User deleted successfully"}, 200));
          });
        }
        
      });
    } else {
      callback(response.builder(false, error.authorizationFailed, null, 400));
    }
  });

};

module.exports = _user;
