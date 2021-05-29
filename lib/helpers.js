

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

module.exports =helpers;