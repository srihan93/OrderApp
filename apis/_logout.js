var authorize = require('./../lib/authorize');

//try to send the error code or response body from here the output can be defined at API levels - current folder

_logout.post = function(data,callback)
{
    authorize.deleteToken(data,(err)=>
    {
        if(err === false)
        callback(401);
        else
        callback(data);

    });
}

module.exports = _logout;