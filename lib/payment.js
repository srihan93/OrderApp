var https = require("https");
var config = require("./config");
var querystring = require("querystring");

var payment = {};

payment.makePayment = function (data) {
  var payload = querystring.stringify(data.body);
  https.request().setHeader();
  var options = {
    protocol: "https:",
    hostname: config.stripe.host,
    path: config.stripe.path,
    headers: {
      Authorization: "Bearer " + config.stripe.authKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  var req = https.request(option, function (res) {
    var status = res.statusCode;
    console.log(status + "done");
    if (status == 200 || status == 201) {
      callback(false);
    } else {
      callback("Status code returned was " + status);
    }
  });

  // Bind to the error event so it doesn't get thrown
  req.on("error", function (e) {
    callback(e);
  });

  // Add the payload
  req.write(payload);

  // End the request
  req.end();
};

module.exports = payment;
