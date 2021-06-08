const db = require("../lib/db");
const helpers = require("../lib/helpers");
const fs = require("fs");
var path = require("path");
var error = require("./../constants/errors");
var response = require("./../constants/response");

var _order = {};
var baseDir = path.join(__dirname, "/../.data/");
_order.post = function (data, callback) {
  var userData = {};
  try {
    var userData = fs.readFileSync(
      baseDir + "tokens/" + data.headers.token + ".json",
      "utf-8"
    );
  } catch (e) {
    callback(response.builder(false, error.authorizationFailed, null, 401));
  }
  var cartId = JSON.parse(userData).phoneNumber;
  db.read("carts", cartId, data, function (err, cart) {
    if (err === false) {
      helpers.createOrder(cart, db.items, function (err) {
     _order.place(cartId,err,function(response)
     {
       callback(response);
     })      

      });
    }
    else{
      callback(response.builder(false, error.methodNotAllowed, null, 405));
      }
  });
  
}

_order.place = function(cartId,err,callback)
{
  if(err!==true)
  {
    db.create("orders", cartId, err, function (outData) {
      if (outData !== true) {
        let resultData = {'orderId': cartId,'details':outData}
        callback(response.builder(true, null, resultData, 201));
      }
    });
  }
  else{
    callback(response.builder(false, error.cartEmpty, null, 500));
  }
}


module.exports = _order;


