import { IIssuerOptions } from "../../../lib/types";

export interface ICoreModuleOptions {
    config: IConfigurations;
};

interface IConfigurations {
    issuerOptions: IIssuerOptions;
};