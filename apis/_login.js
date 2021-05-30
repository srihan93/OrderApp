var authorize = require('./../lib/authorize');

_login.post = function(data,callback)
{
    authorize.createToken(data,callback);
}

module.exports = _login;