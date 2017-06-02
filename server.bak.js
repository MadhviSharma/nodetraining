var express = require('express');
var bp=require('body-parser');
var app= express();

var mypendings=[];
var pid=1;

app.use(bp.json());

app.get('/showMyData',function(req,res){
    res.json(mypendings);
})

app.listen(3000,function(){
    console.log('server is started');
})

app.post('/postMyData', function(req,res){
    var body=req.body;
    mypendings.push(body);
    res.json(body);
})
