var helper = require("./helpers");
var fs = require("fs");
var path = require("path");
const helpers = require("./helpers");

var db = {};
var dbExtension = ".json";
var encoding = "utf-8";
db.baseDir = path.join(__dirname, "/../.data/");
db.items = [
  {'id':1,'name':'cheese pizza','price':450,'description':'bread with cheese'},
  {'id':2,'name':'double cheese pizza','price':500,'description':'bread with extra cheese'},
  {'id':3,'name':'pizza peperoni','price':475,'description':'bread with pepperoni'},
  {'id':4,'name':'pizza diet','price':520,'description':'bread with no cheese'},
  {'id':5,'name':'pizza diet plus','price':580,'description':'bread with no cheese and drinks'},
  {'id':6,'name':'chicken pizza','price':420,'description':'bread with chicken'},
  {'id':7,'name':'farm fresh pizza','price':430,'description':'bread with corn, onion, tomato, caps'},
  {'id':8,'name':'french fries','price':320,'description':'french fries 200gm'},
  {'id':9,'name':'sandwich pizza','price':380,'description':'vegetable sandwich cheese with pizza bread'}
]

//create file with data
db.create = function (dir, fileName, inData, callback) {
    fs.open(db.baseDir + dir +"/"+ fileName+dbExtension, "wx", function (err, filePointer) {
    if (!err && filePointer) {
        var fileData = JSON.stringify(inData);
      fs.writeFile(filePointer, fileData, function (err) {
        fs.close(filePointer, function (err) {
          if (!err) {
            callback(inData);
          } else {
            callback(true);
          }
        });
      });
    }
    else
    {
      callback(true);
    }
  });
};

//read data from file
db.read = function (dir, fileName, inData, callback) {
  fs.readFile(
      db.baseDir + dir + "/" + fileName + dbExtension,
    encoding,
    function (err, data) {
      var parsedObject = helpers.parsonJsonToObject(data);
      if (err===null) {
        callback(false, parsedObject);
      } else {
        callback(true, data);
      }
    }
  );
};

db.update = function (dir, fileName, inData, callback) {
  fs.open(path + dir + fileName + dbExtension, function (err, filePointer) {
    if (!err && filePointer) {
      var fileData = JSON.stringify(data);
      fs.truncate(filePointer, function (err) {
        if (!err) {
          fs.writeFile(filePointer, fileData, function (err) {
            fs.close(filePointer, function () {
              if (!err) {
                callback(false);
              } else {
                callback(true);
              }
            });
          });
        } else {
          callback(true);
        }
      });
    } else {
      callback(true);
    }
  });
};

//delete the file
db.delete = function (dir, fileName, callback) {
    fs.unlink(db.baseDir +dir+ "/" + fileName + dbExtension, function (err) {
        if (err !== null)
            callback(true);
        else
            callback(false);
  });
};

module.exports = db;
