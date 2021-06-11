const db = require("../lib/db");
const validation = require("../lib/validation");
var error = require("./../constants/errors");
var response = require("./../constants/response");


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
                            callback(response.builder(false, error.cannotCreateCart, null, 500));
                        }
                        else
                        {
                            callback(response.builder(true, null, {"message":"cart created successfully, call /order to check"}, 200));
                        }
                    });
                }
            });
            
        }
        else{
            callback(response.builder(false, error.cartValidation, null, 400));
        }
    });
  
}




module.exports = _cart;