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
    }
}

module.exports = environments.development;