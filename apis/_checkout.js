const fs = require("fs");
const pay = require('./../lib/pay');
var error = require("./../constants/errors");
var response = require("./../constants/response");
var path = require("path");

var baseDir = path.join(__dirname, "/../.data/");
var _checkout = {};

_checkout.post= function(data,callback)
{
    var order ={};
    try {
        fs.readFileSync(
          baseDir + "tokens/" + data.headers.token + ".json",
          "utf-8"
        );
        try {
            order = fs.readFileSync(
              baseDir + "orders/" + data.body.orderId + ".json",
              "utf-8"
            );
            order = order = JSON.parse(order)
            if(order.total==data.body.amount)
      {
            initiatePayment(function(result)
            {
                callback(result);
            });
      }
      else
      {
        callback(response.builder(false, error.amountInsufficient, null, 404));
      }
          } catch (e) {
            callback(response.builder(false, error.orderNotFound, null, 404));
          }
      } catch (e) {
        callback(response.builder(false, error.authorizationFailed, null, 401));
      }
      
      
}

initiatePayment = function(callback)
{
    pay.makePayment().then(()=>{
        callback(response.builder(true, null, {'message':"payment success, you're order is preparing"}, 200));
    }
    ).catch((e)=>
    {
        callback(response.builder(false, error.transactionFailed, null, 500));
    });
}







module.exports = _checkout;