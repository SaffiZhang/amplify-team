/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authAmplifyteame7d43ec3UserPoolId = process.env.AUTH_AMPLIFYTEAME7D43EC3_USERPOOLID
var storageS3BucketName = process.env.STORAGE_S3_BUCKETNAME
var apiAmplifyteamGraphQLAPIIdOutput = process.env.API_AMPLIFYTEAM_GRAPHQLAPIIDOUTPUT
var apiAmplifyteamGraphQLAPIEndpointOutput = process.env.API_AMPLIFYTEAM_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
