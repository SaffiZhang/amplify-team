import {URL as urlParse} from 'url';
import {query} from './query';
import {Test, AppSyncOptions, AppSyncClient} from '@viq/graphql';

const appsyncUrl = process.env.API_AMPLIFYTEAM_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl as string).hostname.toString();


const graphqlQuery = query.mutation;
const listBlogs = query.listBlogs;
const apiKey = process.env.API_KEY;

const appSyncOptions: AppSyncOptions = {
  url: appsyncUrl as string,
  region: region as string,
  apiKey: apiKey as string,
  endpoint,
};

exports.handler = async (event: any) => {
  console.log(appSyncOptions);

  const t: Test = new Test();
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

  const client = new AppSyncClient(appSyncOptions);

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
