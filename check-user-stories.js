var requestStory = require('request');

const URL = 'https://aglenergy.atlassian.net/rest/api/2/issue/';
const USERNAME = 'sbhattacharjee4@agl.com.au';
const PASSWORD = 'P@ssw0rd1';

var issueIds = process.env.npm_config_user_stories.split(',');

for (let j = 0; j < issueIds.length; j++) {  

        
        var optionsReq = {
            method: 'GET',
            url: URL + issueIds[j],
            auth: { username: USERNAME, password: PASSWORD },
            headers: {
                'Accept': 'application/json'
            }
        };

        requestStory(optionsReq, function (error1, response1, body1) {
        if (error1) throw new Error(error1);
        console.log(
            'Response story: ' + response1.statusCode + ' ' + response1.statusMessage
        );

        var jsonContentStory = JSON.parse(body1);
        console.log(jsonContentStory.key);
        });
}