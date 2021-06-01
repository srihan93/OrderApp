var validation = {};

validation.userCreation = function(data)
{
  var firstName =
    typeof(data.body.firstName) == "string" && data.body.firstName.trim().length > 0
      ? data.body.firstName.trim()
      : false;
  var lastName =
    typeof(data.body.lastName) == "string" && data.body.lastName.trim().length > 0
      ? data.body.lastName.trim()
      : false;
  var email =
    typeof(data.body.email) == "string" && data.body.email.trim().length > 0
      ? data.body.email.trim()
      : false;
  var phone =
    typeof(data.body.phone) == "number" && data.body.phone > 0
      ? data.body.phone
      : false;
  var password =
    typeof(data.body.password) == "string" && data.body.password.length > 0
      ? data.body.phone
      : false;
  if (!firstName || !lastName || !email || !phone || !password) {
    return false;
  } else {
    return true;
  }
}

module.exports = validation;
