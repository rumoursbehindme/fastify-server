
export interface IAuthenticationModuleOptions {
    issuerOptions: IIssuerOptions;
};

export interface IIssuerOptions {
    client_id: string;
    client_secrete: string;
    response_type: string;
    scope: string;
    grant_type: string;
    show_dialog: boolean;
    [key: string]: any;
};