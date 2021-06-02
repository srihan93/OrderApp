var db = require('./../lib/db');


var menu ={};

menu.get = function()
{
    return db.items;
}





module.exports = menu;