const db = require("../lib/db");
const dbs = require("../lib/db");
const { getItemsWithPrice } = require("../lib/helpers");
const helpers = require("../lib/helpers");
const email = require("./../lib/email");
const payment = require("./../lib/payment");
const fs = require("fs");
var path = require("path");
var error = require("./../constants/errors");
var response = require("./../constants/response");

var _order = {};
var baseDir = path.join(__dirname, "/../.data/");
_order.post = function (data, callback) {
  var userData={};
  try {
    var userData = fs.readFileSync(
      baseDir + "tokens/" + data.headers.token + ".json",
      "utf-8"
    );
  } catch (e) {
    callback(response.builder(false, error.authorizationFailed, null, 401));
  }
  var cartId = JSON.parse(userData).phoneNumber;
  dbs.read("carts", cartId, data, function (err, cart) {
    if (err === false) {
      helpers.createOrder(cart,db.items,function (err) {
          if(err!==true)
          {
            payment.makePayment().then((r)=>{
              //console.log(r);
          }
          ).catch((e)=>
          {
            callback(response.builder(false, error.paymentFailed, null, 500));
              //console.log(e);
          });
          
          }
          callback(response.builder(false, error.methodNotAllowed, null, 405));
      });
    }
    callback(response.builder(false, error.methodNotAllowed, null, 405));
  });
  };

module.exports = _order;
