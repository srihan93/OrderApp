const db = require("./../lib/db");

var collections = {
  users: "users",
  tokens: "tokens",
};

var authorize ={}

authorize.validate = function (data, callback) {
  var token = data.headers.token;
  db.read(collections.tokens, token, function (err, token) {
    if (!err) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

authorize.createToken = function (data, callback) {
  db.read(collections.users, data.body.phoneNumber,data, function (err, user) {
    if (!err) {
      if (user.password === user.password) {
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
