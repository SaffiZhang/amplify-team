/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authAmplifyteam9be10219UserPoolId = process.env.AUTH_AMPLIFYTEAM9BE10219_USERPOOLID
var storageS3BucketName = process.env.STORAGE_S3_BUCKETNAME
var apiAmplifyteamGraphQLAPIIdOutput = process.env.API_AMPLIFYTEAM_GRAPHQLAPIIDOUTPUT
var apiAmplifyteamGraphQLAPIEndpointOutput = process.env.API_AMPLIFYTEAM_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    // TODO implement
    const app = require("../../opt/library")
    console.log(app.hello());
};
