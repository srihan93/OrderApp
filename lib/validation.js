const db = require("./db");

var validation = {};

validation.userCreation = function (data) {
  var firstName =
    typeof(data.body.firstName) == "string" &&
    data.body.firstName.trim().length > 0
      ? data.body.firstName.trim()
      : false;
  var lastName =
    typeof(data.body.lastName) == "string" &&
    data.body.lastName.trim().length > 0
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
      ? data.body.password
      : false;
  if (!firstName || !lastName || !email || !phone || !password) {
    return false;
  } else {
    return true;
  }
};

validation.addProductToCart = function (productIds,callback) {
  console.log(productIds);
  let availableProducts = [];
  let error = 0;

  db.items.forEach((element) => {
    availableProducts.push(element["id"]);
  });
  productIds.forEach(x=>
    {
      if(availableProducts.includes(x['id'])===false)
      {
        error++;
      }
    });
  
    console.log(error);
  if(error===0)
  {
    callback(false);
  }
  else
  {
    callback(true);
  }

};

module.exports = validation;
