var response = {
    'success':false,
    'message':'',
    'data':{},
    'statusCode':0
}

var result = 
{
    'success':false,
    'message':'',
    'data':{},
    'statusCode':500
}

response.builder = function(success,message,data,statusCode)
{
    if(statusCode===200||statusCode===201)
    {
        result.success=true;
        result.statusCode = statusCode;
        result.data = data;
        return result;
    }
    else{
        result.success=false;
        result.statusCode = statusCode;
        result.message = message
        return result;
    }
}


module.exports = response;