
var analyze = require('Sentimental').analyze,
    positivity = require('Sentimental').positivity,
    negativity = require('Sentimental').negativity;

var csv = require('csv-write-stream');
var dateFormat = require('dateformat');
var fs = require('fs');
var _ = require("lodash");
var MyTwitterFeed = require('./server/mytwitter');


// change here if you need different feeds and  feed count







var since_id = 0;
var count = 100;
var id = 1;

var max_id = 0;

var searchfeed ='chelseafc';

(function loop() {
    if (count > 0) {
    MyTwitterFeed.getJson(searchfeed, '2016-02-15', since_id,max_id, count, id,function(data){
           //console.log(err);
           console.log(data);
           
           if (data == 'result'){
               
                fs.readFile ('./output/' + searchfeed + '_' + id + '.json', 'utf8', function (err, result) {
        
              
              var obj = JSON.parse(result);
             // console.log(result);
               var since_id = obj.search_metadata.refresh_url.split('&')[0].replace('?since_id=','');
               var  max_id = obj.search_metadata.max_id;
               var  count = obj.search_metadata.count;
               var res = {since_id:since_id,max_id:max_id,count:count};
               console.log(res);
             
              
            });
               
               
           }
           
          //  since_id = data.since_id;
            //max_id = data.max_id;
            //count = data.count;
             //console.log(since_id + '==>' + max_id);
            id++;
            loop();
       });
       
    }
    
}());





           
    