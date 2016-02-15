
var csv = require('csv-write-stream');

var Twitter = require('twitter'),
  fs = require('fs'),
  _ = require("lodash");

var analyze = require('Sentimental').analyze,
    positivity = require('Sentimental').positivity,
    negativity = require('Sentimental').negativity;

var dateFormat = require('dateformat');

module.exports = function(searchfeed,date,max_id,count,id){
            
        var client = new Twitter({
        consumer_key: '0yNzQJlT8E5wDJtfX1jMwT6Xa',
        consumer_secret: 'ChB39V1ptkXJyiH01XTzqPLh3Gy8zbuatpO7uEvqedbRgk9nn8',
        access_token_key: '',
        access_token_secret: ''
        });
        var params = {q: searchfeed,until :date,max_id:max_id,count :count};
        var obj;
        client.get('search/tweets', params, function(error, tweets, response){
        if (!error) {
            fs.writeFile('./output/' + searchfeed + '_' + id + '.json', JSON.stringify(tweets),function(error){
            });
            fs.readFile('./output/' + searchfeed + '_' + id + '.json', 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            
                var writer = csv({ 
                    headers: [
                        "LanguageCode",
                        "CreatedAt",
                        "TweetId",
                        "UserName",
                        "UserLocation",
                        "UserFollowersCount",
                        "UserFriendsCount",
                        "UserCreatedAt",
                        "UserTimeZone",
                         "Text",
                         "Score",
                         "comparative",
                         "PositiveScore",
                         "PositiveComparative",
                         "PositiveWords",
                         "NegativeScore",
                         "NegativeComparative",
                         "NegativeWords"
                         ]})
                    writer.pipe(fs.createWriteStream('./output/' + searchfeed +  '_' + id   +   '.csv'))
            _.forEach(obj.statuses,function(v,k){
                var anal = analyze(v.text);
                    writer.write(
                        {
                            CreatedAt: dateFormat(v.created_at, 'dd/mm/yyyy HH:MM:ss'),
                            LanguageCode :v.metadata.iso_language_code,
                            TweetId:v.id_str,
                            UserName: v.user.name,
                            UserLocation:v.user.location,
                            UserFollowersCount:v.user.followers_count,
                            UserFriendsCount:v.user.friends_count,
                            UserCreatedAt:dateFormat(v.user.created_at,'dd/mm/yyyy HH:MM:ss'),
                            UserTimeZone:v.user.time_zone,
                            Text:  v.text,
                            Score: anal.score,
                            comparative: anal.comparative,
                            PositiveScore: anal.positive.score,
                            PositiveComparative:anal.positive.comparative,
                            PositiveWords:anal.positive.words,
                            NegativeScore:anal.negative.score,
                            NegativeComparative:anal.negative.comparative,
                            NegativeWords:anal.negative.words
                        }
                        );
            });
            writer.end()
            });
        }
        });
   
}




