
var worker ={}

worker.loop = function()
{
setTimeout(function()
{
    console.log(Date.now);
    worker.loop();
},10000);
}


worker.loop();