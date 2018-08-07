var request = require('request');

const URL = 'https://api.newrelic.com/v2/applications.json';

var options = {
   method: 'GET',
   url: URL,
   headers: {
      'Accept': 'application/json',
      'X-Api-Key': process.env.npm_config_new_relic_key
   }
};

request(options, function (error, response, body) {
   if (error) throw new Error(error);
   console.log(
      'Response: ' + response.statusCode + ' ' + response.statusMessage
   );
   //console.log(body);
   var jsonContent = JSON.parse(body);
   for (var i=0; i<jsonContent.applications.length; i++){
      if(jsonContent.applications[i].name == process.env.npm_config_app_name) {
                console.log("app exist with name: "+jsonContent.applications[i].name);      
        }
    }
});