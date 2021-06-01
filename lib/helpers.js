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
  };

module.exports =helpers;