var request = require('request');

const LOGIN_URL = 'http://glawi1283.agl.int:8008/api/jwt/login';
const USERNAME = process.env.npm_config_username;
const PASSWORD = process.env.npm_config_password;
const URL = 'http://glawi1283.agl.int:8008/api/arsys/v1/entry/CHG:ChangeInterface/';

var options = {
    method: 'POST',
    url: LOGIN_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: { 'username': USERNAME, 'password': PASSWORD }
};
request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(
        'Response: ' + response.statusCode + ' ' + response.statusMessage
    );
    var requestGetCR = require('request');
    var CRNumber = process.env.npm_config_crNo;

    var optionsGETCR = {
        method: 'GET',
        url: URL + '?q=\'1000000182\'="' + CRNumber + '" ',
        headers: {
            'Authorization': 'AR-JWT ' + body.toString(),
            'Content-Type': 'application/json'
        }
    };
    requestGetCR(optionsGETCR, function (error1, response1, body1) {
        if (error1) throw new Error(error1);
        console.log(
            'ResponseGETCR: ' + response1.statusCode + ' ' + response1.statusMessage
        );
        var jsonContentCR = JSON.parse(body1);
        var requestId = jsonContentCR.entries[0].values["Request ID"];
        console.log(requestId);
        var requestData = {
            "values": {
                "z1D_Action": "MODIFY",
                "Outage?": "No",
                "Change Request Status": "Closed",
                "Status Reason": "Successful",
                "Actual End Date": "2018-08-10T15:00:00"
            }
        }
        var requestCR = require('request');
        requestCR(
            {
                method: 'PUT'
                , uri: PUT_URL + requestId
                , body: JSON.stringify(requestData),
                headers: {
                    'Authorization': 'AR-JWT '+ body.toString(),
                    'Content-Type': 'application/json'
                }
            }
            , function (error2, response2, body2) {
                if (response2.statusCode == 204) {
                    console.log('ResponseCR: ' + response2.statusCode + ' ' + response2.statusMessage)
                    console.log(body2);
                } else {
                    console.log('error: ' + response2.statusMessage)
                    console.log(body2)
                }
            }
        )
    });
});