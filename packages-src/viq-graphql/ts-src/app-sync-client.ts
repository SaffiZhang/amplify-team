import {AppSyncOptions} from './app-sync-options';
import AWS, {Endpoint} from 'aws-sdk';
import {URL as urlParse} from 'url';
import https from 'https';

export class AppSyncClient {
  private options: AppSyncOptions;

  constructor(options: AppSyncOptions) {
    this.options = options;
    this.validateOptions();
    this.options.endpoint = new urlParse(this.options.url).hostname.toString();
  }

  private validateOptions() {
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

  private getRequest(body?: any | string): AWS.HttpRequest {
    const ep = new Endpoint(this.options.url);
    const req = new AWS.HttpRequest(ep, this.options.region);
    req.method = 'POST';
    req.headers.host = this.options.endpoint;
    req.headers['Content-Type'] = 'application/json';

    if (body) {
      if (typeof body === 'string') {
        req.body = body;
      } else if (typeof body === 'object') {
        req.body = JSON.stringify(body);
      } else {
        throw Error('invalid body type: an object or a JSON string');
      }
    }
    if (this.options.apiKey) {
      req.headers['x-api-key'] = this.options.apiKey;
    } else {
      const signer = new AWS.Signers.V4(req, 'appsync', true);
      signer.addAuthorization(AWS.config.credentials, new Date());
    }
    return req;
  }

  private executeRequest(req: AWS.HttpRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const httpRequest = https.request({...req, host: this.options.endpoint}, (result: any) => {
        result.on('data', (d: any) => {
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

  public executeMutation(operationName: string, query: string, input: any, condition: any = null): Promise<any> {
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

  public executeQuery(operationName: string, query: string, filter: any = null,
                      limit: number | null = null, nextToken: string | null = null): Promise<any> {
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
