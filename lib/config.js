//config settings for the API

var environments = {};

environments.development =  {
    'httpPort':5000,
    'httpsPort':5001,
    'envName':'development',
    'hashingSecret' : 'dhizizmaicekret',
}

module.exports = environments.development;