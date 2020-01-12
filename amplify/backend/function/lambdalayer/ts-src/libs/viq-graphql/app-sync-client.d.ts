import { AppSyncOptions } from './app-sync-options';
export declare class AppSyncClient {
    private options;
    constructor(options: AppSyncOptions);
    private validateOptions;
    private getRequest;
    private executeRequest;
    executeMutation(operationName: string, query: string, input: any, condition?: any): Promise<any>;
    executeQuery(operationName: string, query: string, filter?: any, limit?: number | null, nextToken?: string | null): Promise<any>;
}
