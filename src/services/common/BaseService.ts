import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import HttpError from "../../util/httpError";
import { Config } from "../../config/Config";
import { KerosRestClient } from "./KerosRestClient";
import { MockClient } from "./mock/MockClient";
import * as httpContext from "express-http-context";

export interface IClient {
  options<T>(requestUrl: string, options?: IRequestOptions): Promise<IRestResponse<T>>;

  get<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>>;

  getAll<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T[]>>;

  del<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>>;

  create<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>>;

  update<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>>;
}

export class BaseService {
  protected static readonly rest: IClient =
    function () {
      Config.bootstrap();
      if (Config.getUseMock()) {
        return new MockClient();
      }
      return new KerosRestClient(Config.getBackendBaseUrl());
    }();

  protected static defaultError(status: number): HttpError {
    return new HttpError("Erreur de connection avec le back (Status: " + status + ")", 500);
  }

  public static defaultHeaders(): IRequestOptions {
    return {additionalHeaders: {Authorization: httpContext.get("token")}};
  }
}
