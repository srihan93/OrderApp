const data = require("../lib/data");
var helpers = require("../lib/helpers");

var _user = {};

_user.post = function (data, callback) {
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
  var phone =
    typeof data.body.phone == "number" && data.body.phone > 0
      ? data.body.phone
      : false;
  if (firstName && lastName && email && phone) {
  } else {
    callback(true);
  }
};

module.exports = _user;
