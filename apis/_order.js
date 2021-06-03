const db = require("../lib/db");

var _order = {};
var collection = 'orders';

_order.post = function(data,callback){
    var cartId = data.body.phone;
    db.read('carts',cartId,data,function(err,outData)
    {
        if(err===false)
        {
            //createOrderFromCart
        }
    });
    
}




module.exports = _order;