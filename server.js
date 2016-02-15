
var analyze = require('Sentimental').analyze,
    positivity = require('Sentimental').positivity,
    negativity = require('Sentimental').negativity;

var csv = require('csv-write-stream');
var dateFormat = require('dateformat');
var fs = require('fs');
var _ = require("lodash");
var MyTwitterFeed = require('./server/mytwitter');


// change here if you need different feeds and  feed count


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
    ]
});
writer.pipe(fs.createWriteStream('./output/chelseafc.csv'));




var since_id = 0;
var count = 100;
var id = 1;

var max_id = 0;


(function loop() {
    if (count > 0) {
    MyTwitterFeed.getJson('celseafc', '2016-02-15', since_id,max_id, count, id,function(data){
        
        
        
        
        
           if (data.statuses.length == 0){
               
               return;
           }
        
            since_id = data.search_metadata.refresh_url.split('&')[0].replace('?since_id=','');
            max_id = data.search_metadata.max_id;
            count = data.search_metadata.count;
             console.log(since_id + '==>' + max_id);
        
            
        _.forEach(data.statuses, function (v, k) {
        var anal = analyze(v.text);
        
        writer.write({
            CreatedAt: dateFormat(v.created_at, 'dd/mm/yyyy HH:MM:ss'),
            LanguageCode: v.metadata.iso_language_code,
            TweetId: v.id_str,
            UserName: v.user.name,
            UserLocation: v.user.location,
            UserFollowersCount: v.user.followers_count,
            UserFriendsCount: v.user.friends_count,
            UserCreatedAt: dateFormat(v.user.created_at, 'dd/mm/yyyy HH:MM:ss'),
            UserTimeZone: v.user.time_zone,
            Text: v.text,
            Score: anal.score,
            comparative: anal.comparative,
            PositiveScore: anal.positive.score,
            PositiveComparative: anal.positive.comparative,
            PositiveWords: anal.positive.words,
            NegativeScore: anal.negative.score,
            NegativeComparative: anal.negative.comparative,
            NegativeWords: anal.negative.words
        });
    });
       writer.end();     
            
            
            
            
            
            //console.log(since_id);
            id++;
            loop();
       });
       
    }
    
}());



//for (var index = 0; index < 1; index++) {

    
    
     //count = count - 5;
     
     //console.log(count);
     
    
    
    
      
      /*  
    _.forEach(data.statuses, function (v, k) {
        var anal = analyze(v.text);
        writer.write({
            CreatedAt: dateFormat(v.created_at, 'dd/mm/yyyy HH:MM:ss'),
            LanguageCode: v.metadata.iso_language_code,
            TweetId: v.id_str,
            UserName: v.user.name,
            UserLocation: v.user.location,
            UserFollowersCount: v.user.followers_count,
            UserFriendsCount: v.user.friends_count,
            UserCreatedAt: dateFormat(v.user.created_at, 'dd/mm/yyyy HH:MM:ss'),
            UserTimeZone: v.user.time_zone,
            Text: v.text,
            Score: anal.score,
            comparative: anal.comparative,
            PositiveScore: anal.positive.score,
            PositiveComparative: anal.positive.comparative,
            PositiveWords: anal.positive.words,
            NegativeScore: anal.negative.score,
            NegativeComparative: anal.negative.comparative,
            NegativeWords: anal.negative.words
        });
    });
  */
//});
//writer.end()
//}


           
    