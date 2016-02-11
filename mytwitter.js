
var fs = require('fs');
var Twitter = require('twitter');







 var client =  Twitter({
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
       
 

