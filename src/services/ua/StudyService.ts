import { IRestResponse } from "typed-rest-client/RestClient";
import { Study } from "../../models/ua/Study";
import { BaseService } from "../common/BaseService";
import { Page } from "../../models/core/Page";
import { StudyCreateRequest } from "../../models/ua/StudyCreateRequest";
import * as winston from "winston";
import HttpError from "../../util/httpError";
import { DocumentResponse } from "../../models/DocumentResponse";

export class StudyService extends BaseService {
    static getStudy(id: number, callback: (err: any, result: Study | null) => void): void {
        this.rest.get<Study>("ua/study/" + id, this.defaultHeaders()).then(
            (res: IRestResponse<Study>) => {
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

    static getAllStudies(callback: (err: any, result: Page<Study> | null) => void): void {
        this.rest.get<Page<Study>>("ua/study", this.defaultHeaders()).then(
            (res: IRestResponse<Page<Study>>) => {
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

    static createStudy(studyRequest: StudyCreateRequest, callback: (err: any) => void): void {
        this.rest.create<StudyCreateRequest>("ua/study", studyRequest, this.defaultHeaders()).then(
            (res: IRestResponse<StudyCreateRequest>) => {
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

    static update(id: number, studyRequest: StudyCreateRequest, callback: (err: any) => void): void {
      this.rest.update<Study>("ua/study/" + id, studyRequest, this.defaultHeaders()).then(
        (res: IRestResponse<Study>) => {
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

    static getAllStudiesForConnectedUser(callback: (err: any, result: Page<Study> | null) => void): void {
      this.rest.get<Page<Study>>("ua/study/me", this.defaultHeaders()).then(
        (res: IRestResponse<Page<Study>>) => {
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

  static getOnGoingStudiesForConnectedUser(callback: (err: any, result: Page<Study> | null, numberStudies: number) => void): void {
    let pageOnGoingStudies: Page<Study>;
    let nbStudies = 0;
    this.getAllStudiesForConnectedUser(function(err, page: Page<Study> | null) {
      if (err) {
        return err;
      }
      if (page) {
        pageOnGoingStudies = new Page<Study>();
        pageOnGoingStudies.meta = page.meta;
        pageOnGoingStudies.content = [];
        if (page.content) {
          page.content.forEach(function(study: any, index: number) {
            if (study.status.id === 1) {
              if (pageOnGoingStudies.content) {
                pageOnGoingStudies.content.push(study);
              }
            }
          });
        }
        winston.debug("Ongoing studies:", pageOnGoingStudies);
        nbStudies = (pageOnGoingStudies.content) ? pageOnGoingStudies.content.length : 0;
        winston.debug("Number of on going studies:", nbStudies);
        callback(null, pageOnGoingStudies, nbStudies);
      } else callback(new HttpError("Page d'études non trouvée", 404), null, 0);
    });
  }

  static delete(id: number, callback: (err: any) => void): void {
      this.rest.del<Study>("ua/study/" + id, this.defaultHeaders()).then(
          (res: IRestResponse<Study>) => {
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

  static generateDocument(studyId: number, documentTypeId: number, callback: (err: any, result: DocumentResponse | null) => void): void {
    this.rest.get<DocumentResponse>("ua/study/" + studyId + "/document/" + documentTypeId + "/generate", this.defaultHeaders()).then(
      (res: IRestResponse<DocumentResponse>) => {
        if (res.statusCode !== 200) {
          winston.debug("Problème lors du chargement du document");
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => {
        callback(e, null);
      }
    );
  }

  static uploadDocument(studyId: number, documentTypeId: number, callback: (err: any) => void): void {
    this.rest.create<DocumentResponse>("ua/study/" + studyId + "/document/" + documentTypeId, this.defaultHeaders()).then(
      (res: IRestResponse<DocumentResponse>) => {
        if (res.statusCode !== 200) {
          winston.debug("Problème lors du chargement du document");
          return callback(this.defaultError(res.statusCode));
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null);
      }
    ).catch(
      e => {
        callback(e);
      }
    );
  }

  static downloadDocument(studyId: number, documentTypeId: number, callback: (err: any, result: DocumentResponse | null) => void): void {
    this.rest.get<DocumentResponse>("ua/study/" + studyId + "/document/" + documentTypeId, this.defaultHeaders()).then(
      (res: IRestResponse<DocumentResponse>) => {
        if (res.statusCode !== 200) {
          winston.debug("Problème lors du chargement du document");
          return callback(this.defaultError(res.statusCode), null);
        }
        winston.debug("Response : " + JSON.stringify(res));
        callback(null, res.result);
      }
    ).catch(
      e => {
        callback(e, null);
      }
    );
  }
}
