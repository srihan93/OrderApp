//config settings for the API

var environments = {};

environments.development =  {
    'httpPort':5000,
    'httpsPort':5001,
    'envName':'development',
    'hashingSecret' : 'dhizizmaicekret',
    'stripe':{
        'host':'https://api.stripe.com',
        'path':'/v1/charges',
        'token':'tok_visa',
        'authKey':'sk_test_4eC39HqLyjWDarjtT1zdp7dc'
    },
    'mailgun':{
        host:'api.mailgun.net',
        path:'/v3/sandbox3eb02e8521e047d58c57909640b0909e.mailgun.org/messages',
        auth:{
            username:'api',
            password:'2da325dcd9042143b9e55337ec619c07-90ac0eb7-0cdbb3'
        },


    }
}

module.exports = environments.development;