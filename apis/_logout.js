var authorize = require('./../lib/authorize');
var error = require('./../constants/errors');
var response = require('./../constants/response');

//try to send the error code or response body from here the output can be defined at API levels - current folder
var _logout={};
_logout.post = function(data,callback)
{
    var token = typeof(data.headers.token) == "string" &&
    data.headers.token.trim().length > 0
      ? data.headers.token.trim()
      : false;
      if(token===false)
      callback(response.builder(false, error.authorizationFailed, null, 401));
    authorize.deleteToken(data,(err)=>
    {
        if(!err)
        
        callback(response.builder(true, null, {'message':'logged out successfully'}, 200));
        else
        callback(response.builder(false, error.authorizationFailed, null, 401));

    });
}

module.exports = _logout;