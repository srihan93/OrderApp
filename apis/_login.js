var authorize = require('./../lib/authorize');

var _login = {}
//try to send the error code from here

_login.post = function(data,callback)
{
    authorize.createToken(data,(err)=>
    {
        
        callback(err);

    });
}

module.exports = _login;