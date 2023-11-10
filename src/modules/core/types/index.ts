import { IAuthenticationModuleOptions } from "../../../lib/types";

export interface ICoreModuleOptions {
    config: IConfigurations;
};

interface IConfigurations {
    authenticationModule: IAuthenticationModuleOptions;
};