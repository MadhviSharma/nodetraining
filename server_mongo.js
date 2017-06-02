var express = require('express');
var bp = require('body-parser');
var _ = require('underscore');
var MongoClient = require('mongodb').MongoClient

var app = express();


var db


MongoClient.connect('mongodb://admin:admin@ds147599.mlab.com:47599/MADH_DB', (err, database) =>{
    if(err) return console.log(err)
    db = database
})

var id = 1;
var tasks =[];
app.use(bp.json());

//store in MongoDb
app.post('/tasks', function(req,res){
    db.collection('mytasks').save(req.body,(err,result) => {
        if(err) return console.log(err)
        console.log('Saved to database');
    })
});



app.get('/tasks', (req,res) => {
    res.json(tasks);
});

app.get('/tasks/:id',(req,res) => {
    var tmpid = parseInt(req.params.id);
    var result = _.findWhere(tasks,{id : tmpid});
    if(result){
        res.json(result);
    }else {
        res.status(404).json({ "error" : "Id not found"});
    }
});

app.delete('/tasks/:id',(req,res) => {
var tmpId = parseInt(req.params.id);
var result = _.findWhere(tasks,{id : tmpId});
if(!result){
    res.status(404).json({ "error" : "Id not found"});
}else {
    tasks = _.without(tasks,result);
    res.json(result);
}
});

app.listen(3000,() => {
    console.log("Server is up.");
})