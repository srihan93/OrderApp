var authorize = require('./../lib/authorize');

//try to send the error code or response body from here the output can be defined at API levels - current folder

_logout.post = function(data,callback)
{
    authorize.deleteToken(data,(err)=>
    {
        if(!err)
        callback(false);
        else
        callback(true);

    });
}

module.exports = _logout;