import { IIssuerOptions } from "../../../lib/types";

export interface IClientPluginsOptions {
    issuerOptions: IIssuerOptions
}

export interface IAuthorizationURLOptions {
    returnURL: string;
}