"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const query_1 = require("./query");
const graphql_1 = require("@viq/graphql");
const appsyncUrl = process.env.API_AMPLIFYTEAM_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new url_1.URL(appsyncUrl).hostname.toString();
const graphqlQuery = query_1.query.mutation;
const listBlogs = query_1.query.listBlogs;
const apiKey = process.env.API_KEY;
const appSyncOptions = {
    url: appsyncUrl,
    region: region,
    apiKey: apiKey,
    endpoint,
};
exports.handler = async (event) => {
    console.log(appSyncOptions);
    const t = new graphql_1.Test();
    console.log('from lib :' + t.sayHello());
    console.log('code compiled from ts');
    // const ep = new Endpoint(appsyncUrl as string);
    // const req = new AWS.HttpRequest(ep, region as string);
    const item = {
        input: {
            name: 'Lambda Item',
            text: 'Item Generated from Lambda'
        }
    };
    const queryParam = {
        filter: null,
        limit: 10,
        nextToken: null
    };
    const client = new graphql_1.AppSyncClient(appSyncOptions);
    // req.method = 'POST';
    // req.headers.host = endpoint;
    // req.headers['Content-Type'] = 'application/json';
    // req.body = JSON.stringify({
    //   query: graphqlQuery,
    //   operationName: 'CreateBlog',
    //   variables: item
    // });
    // req.body = JSON.stringify({
    //   query: listBlogs,
    //   operationName: 'ListBlogs',
    //   variables: queryParam
    // });
    // if (apiKey) {
    //   req.headers['x-api-key'] = apiKey;
    // } else {
    //   const signer = new AWS.Signers.V4(req, 'appsync', true);
    //   signer.addAuthorization(AWS.config.credentials, new Date());
    // }
    console.log('write to db');
    // const data = await new Promise((resolve, reject) => {
    //   const httpRequest = https.request({...req, host: endpoint}, (result: any) => {
    //     result.on('data', (d: any) => {
    //       resolve(JSON.parse(d.toString()));
    //     });
    //   });
    //   httpRequest.on('error', (e) => {
    //     reject(e);
    //   });
    //   httpRequest.write(req.body);
    //   httpRequest.end();
    // });
    const data1 = await client.executeMutation('CreateBlog', graphqlQuery, item.input);
    const data2 = await client.executeQuery('ListBlogs', listBlogs, queryParam.filter, queryParam.limit, queryParam.nextToken);
    console.log('done');
    return {
        statusCode: 200,
        body: {
            data1,
            data2
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy1zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBb0M7QUFDcEMsbUNBQThCO0FBQzlCLDBDQUFpRTtBQUVqRSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDO0FBQ3hFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ2xDLE1BQU0sUUFBUSxHQUFHLElBQUksU0FBUSxDQUFDLFVBQW9CLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFHeEUsTUFBTSxZQUFZLEdBQUcsYUFBSyxDQUFDLFFBQVEsQ0FBQztBQUNwQyxNQUFNLFNBQVMsR0FBRyxhQUFLLENBQUMsU0FBUyxDQUFDO0FBQ2xDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBRW5DLE1BQU0sY0FBYyxHQUFtQjtJQUNyQyxHQUFHLEVBQUUsVUFBb0I7SUFDekIsTUFBTSxFQUFFLE1BQWdCO0lBQ3hCLE1BQU0sRUFBRSxNQUFnQjtJQUN4QixRQUFRO0NBQ1QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFNUIsTUFBTSxDQUFDLEdBQVMsSUFBSSxjQUFJLEVBQUUsQ0FBQztJQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUV6QyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDckMsaURBQWlEO0lBQ2pELHlEQUF5RDtJQUV6RCxNQUFNLElBQUksR0FBRztRQUNYLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxhQUFhO1lBQ25CLElBQUksRUFBRSw0QkFBNEI7U0FDbkM7S0FDRixDQUFDO0lBQ0YsTUFBTSxVQUFVLEdBQUc7UUFDakIsTUFBTSxFQUFFLElBQUk7UUFDWixLQUFLLEVBQUUsRUFBRTtRQUNULFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUM7SUFFRixNQUFNLE1BQU0sR0FBRyxJQUFJLHVCQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFakQsdUJBQXVCO0lBQ3ZCLCtCQUErQjtJQUMvQixvREFBb0Q7SUFDcEQsOEJBQThCO0lBQzlCLHlCQUF5QjtJQUN6QixpQ0FBaUM7SUFDakMsb0JBQW9CO0lBQ3BCLE1BQU07SUFDTiw4QkFBOEI7SUFDOUIsc0JBQXNCO0lBQ3RCLGdDQUFnQztJQUNoQywwQkFBMEI7SUFDMUIsTUFBTTtJQUVOLGdCQUFnQjtJQUNoQix1Q0FBdUM7SUFDdkMsV0FBVztJQUNYLDZEQUE2RDtJQUM3RCxpRUFBaUU7SUFDakUsSUFBSTtJQUVKLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDM0Isd0RBQXdEO0lBQ3hELG1GQUFtRjtJQUNuRixzQ0FBc0M7SUFDdEMsMkNBQTJDO0lBQzNDLFVBQVU7SUFDVixRQUFRO0lBQ1IscUNBQXFDO0lBQ3JDLGlCQUFpQjtJQUNqQixRQUFRO0lBQ1IsaUNBQWlDO0lBQ2pDLHVCQUF1QjtJQUN2QixNQUFNO0lBQ04sTUFBTSxLQUFLLEdBQUcsTUFBTSxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25GLE1BQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixPQUFPO1FBQ0wsVUFBVSxFQUFFLEdBQUc7UUFDZixJQUFJLEVBQUU7WUFDSixLQUFLO1lBQ0wsS0FBSztTQUNOO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9