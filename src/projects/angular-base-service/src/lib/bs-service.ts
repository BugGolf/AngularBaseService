import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { Observable } from "rxjs";
import { BSConfig, BS_CONFIG } from "./bs-config";

@Injectable()
export class BSService {
  constructor(
    @Inject(HttpClient) private client:HttpClient,
    @Inject(BS_CONFIG) private config:BSConfig
  ) { 

  }

  public collection<Type>(path:string): BSServiceModel<Type> {
    return new BSServiceModel<Type>(path, this.client, this.config);
  }
}

export class BSServiceModel<T> {

  url:string;
  baseUrl:string;

  constructor(
    private path:string,
    private client:HttpClient,
    private config:BSConfig
  ) {
    this.parseConfig();
  }

  private getPath(): string {
    if(this.path.startsWith("/", 0)) {
      this.path = this.path.substr(1);
    }
    return this.path;
  }

  private getBaseUrl(): string {
    if(this.config.baseUrl.endsWith("/", 1)) {
      return this.config.baseUrl;
    } else {
      return this.config.baseUrl + "/";
    }
  }

  private parseConfig(): void {
    this.url = this.getBaseUrl() + this.getPath();
  }

  public get() : Observable<T> {
    return this.client.get<T>(this.url);
  }
}