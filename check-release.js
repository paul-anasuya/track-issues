var request = require('request');

const URL = '';
const USERNAME = '';
const PASSWORD = '';

var options = {
   method: 'GET',
   url: URL + process.env.npm_config_release_card,
   auth: { username: USERNAME, password: PASSWORD },
   headers: {
      'Accept': 'application/json'
   }
};

request(options, function (error, response, body) {
   if (error) throw new Error(error);
   console.log(
      'Response: ' + response.statusCode + ' ' + response.statusMessage
   );
   //console.log(body);
   var jsonContent = JSON.parse(body);
   if(jsonContent.fields.status.statusCategory.key == 'done'){
       console.log('card status is completed...');
   }
   //console.log("subtask:", jsonContent.fields.subtasks.length);
   for (var i=0; i<jsonContent.fields.subtasks.length; i++){
      //console.log("subtask :"+jsonContent.fields.subtasks[i].fields.summary);
      var summary = jsonContent.fields.subtasks[i].fields.summary.toUpperCase();
      if(summary.indexOf("UAT SIGN") > -1) {
            if(jsonContent.fields.subtasks[i].fields.status.id == '10001')
            {
                console.log("subtask success: "+jsonContent.fields.subtasks[i].fields.summary);
            }          
        }
    }

});
