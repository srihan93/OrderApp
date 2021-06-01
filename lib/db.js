var helper = require("./helpers");
var fs = require("fs");
var path = require("path");
const helpers = require("./helpers");

var db = {};
var dbExtension = ".json";
var encoding = "utf-8";
db.baseDir = path.join(__dirname, "/../.data/");

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
  });
};

//read data from file
db.read = function (dir, fileName, inData, callback) {
  fs.readFile(
      db.baseDir + dir + "/" + fileName + dbExtension,
    encoding,
    function (err, data) {
      var parsedObject = helpers.parsonJsonToObject(data);
      if (!err && data) {
        callback(false, parsedObject);
      } else {
        callback(true, data);
      }
    }
  );
};

db.update = function (dir, fileName, inData, callback) {
  fs.open(path + dir + fileName + dataExtension, function (err, filePointer) {
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
    fs.unlink(db.baseDir + "/" + fileName + dataExtension, function (err) {
    callback(err);
  });
};

module.exports = db;
