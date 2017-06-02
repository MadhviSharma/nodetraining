var express = require('express');
var bp=require('body-parser');
var _=require('underscore');


var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var MongoClient=require('mongodb').MongoClient;
var app = express();

var db

MongoClient.connect('mongodb://madhvi_nice:Smile4me@ds147599.mlab.com:47599/nice_nodejs',(err,database)=> {
    if(err) return console.log(err)
    db=database;
}) 

var pid=1;
var pendingtasks=[];

app.use(bp.json());

app.post('/postmydata',(req,res) => {
    db.collection('mytask').save(req.body , (err,result) => {
        if(err) return console.log(err)
        console.log('Saved to DB');
    })
})

app.get('/getMyData',(req,res) =>{
    db.collection('mytask').find().toArray((err,result)=>{
        if(err) return console.log(err)
        res.json(result);
    })
})

app.listen(3000,function() {
    console.log('Server is Started !!!');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});


