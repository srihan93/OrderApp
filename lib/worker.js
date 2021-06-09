var fs = require("fs");
var path = require("path");
var helpers = require("./../lib/helpers");
var email = require("./../lib/email");
const { resolve } = require("path");

var worker = {}
worker.baseDir = path.join(__dirname, "/../.data/");
worker.init = ()=>
{
    let orderFile = fs.readdirSync(worker.baseDir+'orders');
    if(orderFile===true)
    {
        console.log(err);
    }
    else{
        orderFile.forEach(element => {
          let userDetails = fs.readFileSync(worker.baseDir+'users/'+element);
          userObject = helpers.parsonJsonToObject(userDetails);
          let mailBody = 'Hi '+userObject.firstName+', your order has been placed successfully, you will get your order delivered in 30 minutes';                    
          let orderDetails = fs.readFileSync(worker.baseDir+'orders/'+element);
          orderObject = helpers.parsonJsonToObject(orderDetails);
          console.log(userObject.email);
          email.send(userObject.email,mailBody).then((resolve)=>
          {
            console.log(resolve);
          }).catch((rejects)=>
          {
            console.log(rejects);
          });

          
        });
    }
}



module.exports = worker;