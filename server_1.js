var express = require('express');

var app = express();

var mypendings = [

    {
        task : "meet friends at garden",
        finished: false
    },

    {
        task : "feed the dog",
        finished: false
    }
]


app.use(express.static('public'));

app.get('/showmydata', function(req,res){
    res.json(mypendings);
})


app.listen(3000, function(){

    console.log('server is started');
})