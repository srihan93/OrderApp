const db = require("../lib/db");
const helpers = require("../lib/helpers");
const email = require('./../lib/email');
const payment = require('./../lib/payment');

var _order = {};

_order.post = function (data, callback) {
  
  db.read("tokens", data.headers.token, data, function (err, userData) {
      if (err !== true) {
          var cartId = userData.phoneNumber;
      db.read("carts", cartId, data, function (err, cart) {
        if (err === false) {
          helpers.createOrder(cart,db.items,function (err) {
              if(err!==false)
              {
                  callback(err);
              }
              callback(true);
          });
        }
        callback(true);
      });
    }
    callback(true);
  });
};

module.exports = _order;
