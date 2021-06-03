const db = require("../lib/db");
const validation = require("../lib/validation");

var _cart ={};
var collection ="carts";

_cart.post = function(data,callback){
    validation.addProductToCart(data.body,function(err)
    {
        let cartName;
        if(err===false)
        {
            db.read('tokens',data.headers.token,data,function(err,userData){
                if(err===false)
                {
                    cartName = userData["phoneNumber"];
                    db.create(collection,cartName,data.body,function(err)
                    {
                        if(err===true)
                        {
                            callback(true);
                        }
                        else
                        {
                            callback(false);
                        }
                    });
                }
            });
            
        }
        else{
            callback(true);
        }
    });
  
}




module.exports = _cart;