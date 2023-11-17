
export interface IConfigurations {
    coreConfigurations: any;
    serverConfigurations: any;
}

export interface IIssuerOptions {
    client_id: string;
    client_secret: string;
    response_type: string;
    redirect_uri: string;
    scope: string;
    grant_type: string;
    show_dialog: boolean;
};

export interface IQueryString {
    Querystring: {
        returnURL: string;
        error?: string;
    }
}

export interface IAPIOptions {
    userDetailsAPIEndpoint: string;
    playListsAPIEndpoint: string;
    newReleasesAPIEndpoint: string;
}