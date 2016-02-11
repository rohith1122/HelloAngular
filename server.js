


//var express = require('express');
//var app = express();


var fs = require('fs'),
    JSONStream = require('JSONStream');
    
  var jsonfile = require('jsonfile')


var stream = fs.createReadStream('CIF_ALL_UPDATE_DAILY_toc-update-mon.json', {encoding: 'utf8'}),
    parser = JSONStream.parse('JsonScheduleV1');

stream.pipe(parser);

parser.on('data', function (obj) {
  fs.appendFile("nrail.json", JSON.stringify(obj),function(err){
      
      
      
  });
  //console.log(JSON.stringify(obj));
});




/*
var Twitter = require('twitter');
 var fs = require('fs');
 
var client = new Twitter({
  consumer_key: '0yNzQJlT8E5wDJtfX1jMwT6Xa',
  consumer_secret: 'ChB39V1ptkXJyiH01XTzqPLh3Gy8zbuatpO7uEvqedbRgk9nn8',
  access_token_key: '',
  access_token_secret: ''
});
 
var params = {q: 'chelseafc',count :100};
client.get('search/tweets', params, function(error, tweets, response){
  if (!error) {
      
      fs.writeFile("twitter.json", JSON.stringify(tweets),function(error){
          
      });
      
  }
});

*/




/*
app.get('/',function(req,res){
    
    res.send("<h1>Hello worldasasasas</h1>");
    
    
});




app.listen(3000,function(){
    
    console.log('server running 3000');
    
    
});
*/