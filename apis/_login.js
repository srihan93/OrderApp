var authorize = require('./../lib/authorize');

//try to send the error code from here

_login.post = function(data,callback)
{
    authorize.createToken(data,(err)=>
    {
        if(err === false)
        callback(401);
        else
        callback(data);

    });
}

module.exports = _login;