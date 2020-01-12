"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importStar(require("aws-sdk"));
const url_1 = require("url");
const https_1 = __importDefault(require("https"));
class AppSyncClient {
    constructor(options) {
        this.options = options;
        this.validateOptions();
        this.options.endpoint = new url_1.URL(this.options.url).hostname.toString();
    }
    validateOptions() {
        if (!this.options) {
            throw new Error('options is mandatory.');
        }
        if (!this.options.url) {
            throw new Error('Options url is mandatory.');
        }
        if (!this.options.region) {
            throw new Error('Options region is mandatory.');
        }
    }
    getRequest(body) {
        const ep = new aws_sdk_1.Endpoint(this.options.url);
        const req = new aws_sdk_1.default.HttpRequest(ep, this.options.region);
        req.method = 'POST';
        req.headers.host = this.options.endpoint;
        req.headers['Content-Type'] = 'application/json';
        if (body) {
            if (typeof body === 'string') {
                req.body = body;
            }
            else if (typeof body === 'object') {
                req.body = JSON.stringify(body);
            }
            else {
                throw Error('invalid body type: an object or a JSON string');
            }
        }
        if (this.options.apiKey) {
            req.headers['x-api-key'] = this.options.apiKey;
        }
        else {
            const signer = new aws_sdk_1.default.Signers.V4(req, 'appsync', true);
            signer.addAuthorization(aws_sdk_1.default.config.credentials, new Date());
        }
        return req;
    }
    executeRequest(req) {
        return new Promise((resolve, reject) => {
            const httpRequest = https_1.default.request(Object.assign(Object.assign({}, req), { host: this.options.endpoint }), (result) => {
                result.on('data', (d) => {
                    resolve(JSON.parse(d.toString()));
                });
            });
            httpRequest.on('error', (e) => {
                reject(e);
            });
            httpRequest.write(req.body);
            httpRequest.end();
        });
    }
    executeMutation(operationName, query, input, condition = null) {
        if (!operationName) {
            throw new Error('operation name is mandatory.');
        }
        if (!query) {
            throw new Error('query is mandatory.');
        }
        if (!input) {
            throw new Error('input is mandatory.');
        }
        const payload = {
            query,
            operationName,
            variables: {
                input,
                condition
            }
        };
        if (!condition) {
            delete payload.variables.condition;
        }
        const req = this.getRequest(payload);
        return this.executeRequest(req);
    }
    executeQuery(operationName, query, filter = null, limit = null, nextToken = null) {
        if (!operationName) {
            throw new Error('operation name is mandatory.');
        }
        if (!query) {
            throw new Error('query is mandatory.');
        }
        const payload = {
            query,
            operationName,
            variables: {
                filter,
                limit,
                nextToken
            }
        };
        const req = this.getRequest(payload);
        return this.executeRequest(req);
    }
}
exports.AppSyncClient = AppSyncClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXN5bmMtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2FwcC1zeW5jLWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxtREFBc0M7QUFDdEMsNkJBQW9DO0FBQ3BDLGtEQUEwQjtBQUUxQixNQUFhLGFBQWE7SUFHeEIsWUFBWSxPQUF1QjtRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxTQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0UsQ0FBQztJQUVPLGVBQWU7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztTQUM5QztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7U0FDakQ7SUFDSCxDQUFDO0lBRU8sVUFBVSxDQUFDLElBQW1CO1FBQ3BDLE1BQU0sRUFBRSxHQUFHLElBQUksa0JBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sR0FBRyxHQUFHLElBQUksaUJBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsR0FBRyxDQUFDLE1BQU0sR0FB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