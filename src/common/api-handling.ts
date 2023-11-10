import nodeFetch, { HeadersInit } from 'node-fetch';

export interface IApiRequestModel {
    url: string;
    headers?: HeadersInit;
    body?: any;
    options?: IApiRequestModelOptions;
}

export interface IApiRequestModelOptions {
    responseType?: 'json' | 'stream' | 'string';
    throwErrorOnStatus?: Array<number>;
    validateSuccessCodes?: boolean; //this supresses the error property and no error will be passed, all the response will be passed in result property.
}

export async function getRequest(req: IApiRequestModel) {
    return nodeFetch(req.url, {
        method: 'GET',
        headers: req.headers
    });
}

