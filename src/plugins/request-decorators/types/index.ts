export interface ISpotifyGetRequestOptions {
    url: string;
    headers?: any;
    body?: any;
    others?: IOtherGetRequestOptions
}

interface IOtherGetRequestOptions {
    responseType?: 'json' | 'stream' | 'string';
    throwErrorOnStatus?: Array<number>;
    validateSuccessCodes?: boolean; //this supresses the error property and no error will be passed, all the response will be passed in result property.
}