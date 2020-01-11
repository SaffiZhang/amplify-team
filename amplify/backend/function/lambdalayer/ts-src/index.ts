import https from 'https';
import AWS, {Endpoint} from 'aws-sdk';
import {URL as urlParse} from 'url';
import {query} from './query';

const appsyncUrl = process.env.API_AMPLIFYTEAM_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl as string).hostname.toString();


const graphqlQuery = query.mutation;
const apiKey = process.env.API_KEY;

exports.handler = async (event: any) => {
  console.log('code compiled from ts');
  const ep = new Endpoint(appsyncUrl as string);
  const req = new AWS.HttpRequest(ep, region as string);

  const item = {
    input: {
      name: 'Lambda Item',
      text: 'Item Generated from Lambda'
    }
  };

  req.method = 'POST';
  req.headers.host = endpoint;
  req.headers['Content-Type'] = 'application/json';
  req.body = JSON.stringify({
    query: graphqlQuery,
    operationName: 'CreateBlog',
    variables: item
  });

  if (apiKey) {
    req.headers['x-api-key'] = apiKey;
  } else {
    const signer = new AWS.Signers.V4(req, 'appsync', true);
    signer.addAuthorization(AWS.config.credentials, new Date());
  }

  console.log('write to db');
  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({...req, host: endpoint}, (result: any) => {
      result.on('data', (d: any) => {
        resolve(JSON.parse(d.toString()));
      });
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });
  console.log('done');
  return {
    statusCode: 200,
    body: data
  };
};
