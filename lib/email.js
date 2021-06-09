var https = require('https');
var qs = require('querystring');

var email ={}
email.send = function()
{

var options = {
  'method': 'POST',
  'hostname': 'api.mailgun.net',
  'path': '/v3/sandbox3eb02e8521e047d58c57909640b0909e.mailgun.org/messages',
  'auth': {
    username: 'api',
    password: '2da325dcd9042143b9e55337ec619c07-90ac0eb7-0cdbb3'
},//password manipulated
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = qs.stringify({
  'from': 'postmaster@sandbox3eb02e8521e047d58c57909640b0909e.mailgun.org',
  'to': 'mohanrajraja.tech@gmail.com',
  'subject': 'hello',
  'text': 'hi'
});

req.write(postData);

req.end();
}

module.exports = email;