var config = require('./config');
var crypto = require('crypto');
var https = require('https');
var querystring = require('querystring');
const db = require('./db');

var helpers ={}

helpers.parsonJsonToObject = function(body){
    try{
        var obj = JSON.parse(body);
        return obj;
    }
    catch(e)
    {
        return;
    }
}

helpers.hash = function(str){
    if(typeof(str) == 'string' && str.length > 0){
      var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
      return hash;
    } else {
      return false;
    }
  }

helpers.createOrder = function(data,callback)
{
  let total =0;
  var order ={'items':[],'total':total};
  data.forEach(item => {
    let list = helpers.getItemsWithPrice(item.id,item.qty);
    if(list!==null)
    {
      order.items.push(list);
      total = total+list.price;
    }
  });

}

helpers.getItemsWithPrice = function (id,qty) {
  let itemDescription ={};
  db.items.forEach(item =>
    {
      if(item.id===id)
      {
        return {'id':id,'name':item.name,'price':qty*item.price};
      }
      else{
        return null;
      }
    })
}


module.exports =helpers;