var https = require("https");
var qs = require("querystring");
var config = require("./config");

var email = {};
email.send = (toMail, mailBody) => {
  return new Promise((resolve, rejects) => {
    var options = {
      method: "POST",
      hostname: config.mailgun.host,
      path: config.mailgun.path,
      auth: {
        username: config.mailgun.auth.username,
        password: config.mailgun.auth.password,
      }, //password manipulated
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      maxRedirects: 20,
    }
    var postData = qs.stringify({
      from: "postmaster@sandbox3eb02e8521e047d58c57909640b0909e.mailgun.org",
      to: toMail,
      subject: "Your Order preparation has been started",
      text: mailBody,
    });
    var req = https.request(options, function (res) {
      res.setEncoding("utf8");

      res.on("data", function (chunk) {
        console.log("BODY: " + chunk);
      });

      res.on("end", function (chunk) {
        var body = Buffer.concat(chunk);
        console.log(body.toString());
        resolve(chunk);
      });

      res.on("error", function (error) {
        console.error(error);
        rejects(error);
      });
    });


    req.write(postData);
    req.on("error", function (e) {
      console.log("request error");
      rejects(e);
    });
    req.end();
    
  });
};

module.exports = email;
