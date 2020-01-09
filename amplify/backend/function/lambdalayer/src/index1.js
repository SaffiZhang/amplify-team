/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authAmplifyteam9be10219UserPoolId = process.env.AUTH_AMPLIFYTEAM9BE10219_USERPOOLID
var storageS3BucketName = process.env.STORAGE_S3_BUCKETNAME
var apiAmplifyteamGraphQLAPIIdOutput = process.env.API_AMPLIFYTEAM_GRAPHQLAPIIDOUTPUT
var apiAmplifyteamGraphQLAPIEndpointOutput = process.env.API_AMPLIFYTEAM_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl =  process.env.API_AMPLIFYTEAM_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
/* import  {createBlog } from 'query'; */
const graphqlQuery = require('./query');

exports.handler = async (event) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);

    const item = {
        input: {
            name: "Lambda Item",
            text: "Item Generated from Lambda"
        }
    };
    const credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:process.env.AUTH_AMPLIFYTEAM9BE10219_USERPOOLID});
    AWS.config.update({
        region:region,
        credentials:credentials
    });

    req.method = "POST";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: graphqlQuery.createBlog,
        operationName: "createBlog",
        variables: item
    }); 

  
        const signer = new AWS.Signers.V4(req, "appsync", true);
        signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
   
    /* const data = await new Promise((resolve, reject) => {
        const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
            result.on('data', (data) => {
                resolve(JSON.parse(data.toString()));
            });
        });

        httpRequest.write(req.body);
        httpRequest.end();
    });

    return {
        statusCode: 200,
        body: data
    };  */
};