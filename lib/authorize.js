const db = require("./../lib/db");
const helpers = require("./helpers");

var collections = {
  users: "users",
  tokens: "tokens",
};

var authorize ={}

authorize.validate = function (data, callback) {
  var token = data.headers.token;
  db.read(collections.tokens, token,data, function (err, outData) {
    if (!err) {
      callback(db.items);
    } else {
      callback(true);
    }
  });
};

authorize.createToken = function (data, callback) {
  db.read(collections.users, data.body.phoneNumber,data, function (err, user) {
    if (!err) {
      let hashedPassword = helpers.hash(data.body.password);
      if (hashedPassword === user.password) {
        var tokenBody = {};
        tokenBody.value = data.body.phoneNumber+Date.now();
        tokenBody.expires = "";
        tokenBody.phoneNumber = 9840856584;

        db.create(
          collections.tokens,
          tokenBody.value,
          tokenBody,
          function (err) {
            callback(err);
          }
        );
      }
      else
      callback(true);
    } else {
      callback(true);
    }
  });
};

authorize.deleteToken = function (data, callback) {
  db.delete(collections.tokens, data.headers.token, function (err) {
    callback(err);
  });
};

module.exports = authorize;
