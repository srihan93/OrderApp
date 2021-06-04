"use strict"
var config = require('./config');
var crypto = require('crypto');
var https = require('https');
var querystring = require('querystring');

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

helpers.createOrder = function(data,menu,callback)
{
  let total =0;
  var order ={'items':[],'total':total};
  data.forEach(item => {
    let list = helpers.getItemsWithPrice(item.id,item.qty,menu);
    if(list!==undefined)
    {
      order.items.push(list);
      order.total = order.total+list.price;
    }
  });
return order;
}

helpers.getItemsWithPrice = function (id,qty,menu) {
  let itemDescription ={};
  menu.forEach(item =>
    {
      if(item.id===id)
      {
        itemDescription = Object({'id':id,'name':item.name,'price':qty*item.price});
        return;
      }
    });
    return itemDescription;
}


module.exports =helpers;