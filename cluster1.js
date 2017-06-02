var cluster=require('cluster');
var express=require('express');

if(cluster.isMaster){
    var cpuCount=require('os').cpus().length;
    console.log(cpuCount);
    for(var i=0;i<cpuCount;i+=1){
        cluster.fork();
    }
}
else{
    var app= express();
    app.get('/getMyData',function(req,res){
    console.log("server started");
    res.send('Hello from worker '+cluster.worker.id);
})
}