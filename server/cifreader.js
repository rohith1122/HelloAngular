var fs = require('fs');
var JSONStream = require('JSONStream');
var jsonfile = require('jsonfile')


module.exports = function(){
 
 
var stream = fs.createReadStream('./CIF_ALL_UPDATE_DAILY_toc-update-mon.json', {encoding: 'utf8'}),
    parser = JSONStream.parse('JsonAssociationV1');

stream.pipe(parser);

parser.on('data', function (obj) {
  fs.appendFile("nrail.json", JSON.stringify(obj),function(err){
  });
});
     
     
 
 

}