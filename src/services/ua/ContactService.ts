import { IRestResponse } from "typed-rest-client/RestClient";
import { BaseService } from "../common/BaseService";
import { Page } from "../../models/core/Page";
import { Contact } from "../../models/ua/Contact";
import { ContactCreateRequest } from "../../models/ua/ContactCreateRequest";
import * as winston from "winston";
import { queryStringify } from "../../util/Helper";

export class ContactService extends BaseService {
  static getContact(id: number, callback: (err: any, result: Contact | null) => void): void {
    this.rest.get<Contact>("ua/contact/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Contact>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => callback(e, null)
    );
  }

  static getAllContacts(callback: (err: any, result: Page<Contact> | null) => void, queryParams?: any): void {
      const queryString = queryStringify(queryParams);
      this.rest.get<Page<Contact>>("ua/contact?" + queryString, this.defaultHeaders()).then(
        (res: IRestResponse<Page<Contact>>) => {
          if (res.statusCode !== 200) {
            return callback(this.defaultError(res.statusCode), null);
          }
          winston.debug("Response : " + JSON.stringify(res));
          callback(null, res.result);
        }
      ).catch(
        e => callback(e, null)
      );
  }

  static createContact(contactRequest: ContactCreateRequest, callback: (err: any) => void): void {
    this.rest.create<ContactCreateRequest>("ua/contact", contactRequest, this.defaultHeaders()).then(
      (res: IRestResponse<ContactCreateRequest>) => {
        if (res.statusCode !== 201) {
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static update(id: number, contactRequest: ContactCreateRequest, callback: (err: any) => void): void {
    this.rest.update<ContactCreateRequest>("ua/contact/" + id, contactRequest, this.defaultHeaders()).then(
      (res: IRestResponse<ContactCreateRequest>) => {
        if (res.statusCode !== 200) {
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

  static delete(id: number, callback: (err: any) => void): void {
    this.rest.del<Contact>("ua/contact/" + id, this.defaultHeaders()).then(
      (res: IRestResponse<Contact>) => {
        if (res.statusCode !== 204) {
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => callback(e)
    );
  }

}
