var request = require('request');

const URL = 'http://glawi1283.agl.int:8008/api/jwt/login';
const USERNAME = process.env.npm_config_username;
const PASSWORD = process.env.npm_config_password;

var options = {
    method: 'POST',
    url: URL,
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
    console.log(body.toString());
    var req = {
        "values": {
            "Description": "Test Change request",
            "Status": "Draft",
            "z1D_Action": "CREATE",
            "Location Company": "AGL",
            "Company": "AGL",
            "First Name": "Suddhosatta",
            "Last Name": "Banerjee",
            "ASCPY": "AGL",
            "ASORG": "TCS",
            "ASGRP": "Tools",
            "Reason For Change": "Innovaative",
            "Detailed Description": "Detailed Notes/ Business Justification for the Change",
            "Scheduled Start Date": "2017-10-31T10:00:00",
            "Scheduled End Date": "2017-11-01T15:00:00",
            "Actual Start Date": "2017-10-31T10:00:00"
        }
    };
    var requestCR = require('request');
    requestCR(
        {
            method: 'POST'
            , uri: 'http://glawi1283.agl.int:8008/api/arsys/v1/entry/CHG:ChangeInterface_Create'
            , body: JSON.stringify(req),
            headers: {
                'Authorization': 'AR-JWT '+body.toString(),
                'Content-Type': 'application/json'
            }
        }
        , function (error1, response1, body1) {
            if (response1.statusCode == 201) {
                console.log('ResponseCR: ' + response1.statusCode + ' ' + response1.statusMessage)
            } else {
                console.log('error: ' + response1.statusCode)
                console.log(body1)
            }
        }
    )
});