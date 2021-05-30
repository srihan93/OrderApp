var helper = require('./helpers');
var fs = require('fs');
var path = require('path');
const helpers = require('./helpers');

var data = {}
var dataExtension ='.json';
var encoding ='utf-8';
data.baseDir = path.join(__dirname,'/../.data/');

data.create = function()
{

}

//read data from file
data.read = function(dir,fileName,data,callback)
{
    fs.readFile(data.baseDir+dir+'/'+fileName+dataExtension,encoding,function(err,data){
        var parsedObject = helpers.parsonJsonToObject(data);
        if(!err && data)
        {
            callback(false,parsedObject);
        }
        else{
            callback(true,data);
        }
    });
    
}

data.update = function()
{

}

//delete the file
data.delete = function(dir,fileName,callback)
{
    fs.unlink(data.baseDir+'/'+fileName+dataExtension,function(err){
        callback(err);
    });
}

module.exports = data;