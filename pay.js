var http = require('https');
var qs = require('querystring');
var pay = {};

pay.makePayment = ()=>{
    return new Promise((resolve, rejects)=>{
    var postData = qs.stringify({
        'amount': '2000',
        'currency': 'usd',
        'source': 'tok_visa',
        'description': 'pizza order'
      });
    
    var options = {
        'method': 'POST',
        'protocol':'https:',
        'host': 'api.stripe.com',
        'path': '/v1/charges',
        'headers': {
         'Authorization': 'Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc',
            'Content-Type': 'application/x-www-form-urlencoded',
            'content-length': Buffer.byteLength(postData)
        }
       };
         
         var req = http.request(options, function(res) {
           res.setEncoding('utf8');
           res.on('data', function (chunk) {
                  console.log('BODY: ' + chunk);
           });
           res.on('end', function (chunk) {
            var body = Buffer.concat(chunk);
            console.log(body.toString());
            resolve(chunk);
          });
        
          res.on("error", function (error) {
            console.error(error);
            rejects(error);
          });
         }).end();
         req.on('error', function(e) {
             console.log('request error');
                        rejects(e);
          });
        });
    }
    module.exports= pay;

