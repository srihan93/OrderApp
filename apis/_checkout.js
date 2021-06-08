const fs = require("fs");
const pay = require('./../lib/pay');
var error = require("./../constants/errors");
var response = require("./../constants/response");
var path = require("path");
const db = require("../lib/db");


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
            initiatePayment(data.body.orderId,order,function(result)
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

initiatePayment = function(cartId,order,callback)
{
    pay.makePayment().then(()=>{
        callback(response.builder(true, null, {'message':"payment success, you're order is preparing"}, 200));
    }
    ).catch((e)=>
    {
        order.paymentStatus ='payment failed';
        db.delete('carts',cartId,function(err)
        {
            updateOrder(order,function(result)
            {
                callback(result);
            })
            
        });
       
    });
}

updateOrder = function(order,callback)
{
    db.update('orders','9840856584',order,function(err)
    {
        if(err===true)
        {
            callback(response.builder(false, error.orderUpdateFailed, null, 500));
        }
        else{
            callback(response.builder(true, null, {'orderId':'9840856584','PaymentStatus':order.paymentStatus,'orderStatus':order.orderStatus}, 200));
        }
    });
}

clearCart = function(cartId,callback)
{

}







module.exports = _checkout;