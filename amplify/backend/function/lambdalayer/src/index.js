"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const aws_sdk_1 = __importStar(require("aws-sdk"));
const url_1 = require("url");
const query_1 = require("./query");
const appsyncUrl = process.env.API_AMPLIFYTEAM_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new url_1.URL(appsyncUrl).hostname.toString();
const graphqlQuery = query_1.query.mutation;
const apiKey = process.env.API_KEY;
exports.handler = async (event) => {
    console.log('code compiled from ts');
    const ep = new aws_sdk_1.Endpoint(appsyncUrl);
    const req = new aws_sdk_1.default.HttpRequest(ep, region);
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
    }
    else {
        const signer = new aws_sdk_1.default.Signers.V4(req, 'appsync', true);
        signer.addAuthorization(aws_sdk_1.default.config.credentials, new Date());
    }
    console.log('write to db');
    const data = await new Promise((resolve, reject) => {
        const httpRequest = https_1.default.request(Object.assign(Object.assign({}, req), { host: endpoint }), (result) => {
            result.on('data', (d) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy1zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLG1EQUFzQztBQUN0Qyw2QkFBb0M7QUFDcEMsbUNBQThCO0FBRTlCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUM7QUFDeEUsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDbEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxTQUFRLENBQUMsVUFBb0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUd4RSxNQUFNLFlBQVksR0FBRyxhQUFLLENBQUMsUUFBUSxDQUFDO0FBQ3BDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBRW5DLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUNyQyxNQUFNLEVBQUUsR0FBRyxJQUFJLGtCQUFRLENBQUMsVUFBb0IsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sR0FBRyxHQUFHLElBQUksaUJBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLE1BQWdCLENBQUMsQ0FBQztJQUV0RCxNQUFNLElBQUksR0FBRztRQUNYLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxhQUFhO1lBQ25CLElBQUksRUFBRSw0QkFBNEI7U0FDbkM7S0FDRixDQUFDO0lBRUYsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDcEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsa0JBQWtCLENBQUM7SUFDakQsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLEtBQUssRUFBRSxZQUFZO1FBQ25CLGFBQWEsRUFBRSxZQUFZO1FBQzNCLFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUMsQ0FBQztJQUVILElBQUksTUFBTSxFQUFFO1FBQ1YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUM7S0FDbkM7U0FBTTtRQUNMLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGlCQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7S0FDN0Q7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDakQsTUFBTSxXQUFXLEdBQUcsZUFBSyxDQUFDLE9BQU8saUNBQUssR0FBRyxLQUFFLElBQUksRUFBRSxRQUFRLEtBQUcsQ0FBQyxNQUFXLEVBQUUsRUFBRTtZQUMxRSxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFO2dCQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLE9BQU87UUFDTCxVQUFVLEVBQUUsR0FBRztRQUNmLElBQUksRUFBRSxJQUFJO0tBQ1gsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9