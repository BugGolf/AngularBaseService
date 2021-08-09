import { InjectionToken } from "@angular/core";

export interface BSConfig {
  baseUrl:string;
}
export const BS_CONFIG = new InjectionToken<BSConfig>("BS_CONFIG");