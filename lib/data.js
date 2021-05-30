var helper = require("./helpers");
var fs = require("fs");
var path = require("path");
const helpers = require("./helpers");

var data = {};
var dataExtension = ".json";
var encoding = "utf-8";
data.baseDir = path.join(__dirname, "/../.data/");

//create file with data
data.create = function (dir, fileName, data, callback) {
  fs.open(data.baseDir + dir + fileName, "wx", function (err, filePointer) {
    if (!err && filePointer) {
      var fileData = JSON.stringify(data);
      fs.writeFile(filePointer, fileData, function (err) {
        fs.close(filePointer, function () {
          if (!err) {
            callback(false);
          } else {
            callback(true);
          }
        });
      });
    }
  });
};

//read data from file
data.read = function (dir, fileName, data, callback) {
  fs.readFile(
    data.baseDir + dir + "/" + fileName + dataExtension,
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

data.update = function (dir, fileName, data, callback) {
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
data.delete = function (dir, fileName, callback) {
  fs.unlink(data.baseDir + "/" + fileName + dataExtension, function (err) {
    callback(err);
  });
};

module.exports = data;
