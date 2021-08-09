import { HttpClient, HttpParams } from "@angular/common/http";
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

  /**
   * Get base url from config.
   * @return
   */
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

  public get(params?:HttpParams | {
    [param: string]: string | string[];
  }):Observable<T[]> {
    return this.client.get<T[]>(this.url, {
      params : params
    });
  }

  public show(id:number, params?:HttpParams | {
    [param: string]: string | string[];
  }): Observable<T> {
    return this.client.get<T>(`${this.url}/${id}`);
  }

  public create(item:T):Observable<T> {
    return this.client.post<T>(this.url, item);
  }

  public update(id:number, item:T):Observable<T> {
    return this.client.put<T>(this.url + `/${id}`, item);
  }

  public save(item:T): Observable<T> {
    if("id" in item) {
      return this.update(item["id"], item);
    } else {
      return this.create(item);
    }
  }
}