import { IClient } from "../BaseService";
import { IRequestOptions, IRestResponse } from "typed-rest-client/RestClient";
import { AuthMock } from "./auth/AuthMock";
import { IMock } from "./IMock";
import { MemberMock } from "./member/MemberMock";
import { FirmMock } from "./firm/FirmMock";
import { StudyMock } from "./study/StudyMock";
import { DepartmentMock } from "./department/DepartmentMock";
import { GenderMock } from "./gender/GenderMock";
import { AddressMock } from "./address/AddressMock";
import { CountryMock } from "./country/CountryMock";
import { PositionMock } from "./position/PositionMock";
import { FirmTypeMock } from "./firmType/FirmTypeMock";
import { ContactMock } from "./contact/ContactMock";
import { StatusMock } from "./status/StatusMock";
import { FieldMock } from "./field/FieldMock";
import { ProvenanceMock } from "./provenance/ProvenanceMock";
import { FactureMock } from "./facture/FactureMock";
import { FactureTypeMock } from "./facture/FactureTypeMock";
import { BulletinVersementMock } from "./bulletinVersement/BulletinVersementMock";
import { MemberInscriptionMock } from "./inscriptions/MemberInscriptionMock";
import { PoleMock } from "./pole/PoleMock";
import { ConsultantInscriptionMock } from "./inscriptions/ConsultantInscriptionMock";
import { ConsultantMock } from "./consultant/ConsultantMock";

const MOCKS: IMock[] = [
    new AuthMock(),
    new MemberMock(),
    new ConsultantMock(),
    new FirmMock(),
    new StudyMock(),
    new DepartmentMock(),
    new GenderMock(),
    new AddressMock(),
    new CountryMock(),
    new PositionMock(),
    new FirmTypeMock(),
    new ContactMock(),
    new StatusMock(),
    new FieldMock(),
    new ProvenanceMock(),
    new FactureMock(),
    new FactureTypeMock(),
    new BulletinVersementMock(),
    new MemberInscriptionMock(),
    new ConsultantInscriptionMock(),
    new PoleMock()
];

export class MockResponse<T> implements IRestResponse<T> {
    constructor(
        public result: T | null,
        public statusCode: number
    ) {
    }
}

export class MockClient implements IClient {
    create<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>> {
        let mock: IMock;
        for (mock of MOCKS) {
            const response: IRestResponse<T> | null = mock.create<T>(resource, resources, options);
            if (response) {
                return Promise.resolve(response);
            }
        }
        return Promise.resolve(new MockResponse(null, 404));
    }

    del<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
        let mock: IMock;
        for (mock of MOCKS) {
            const response: IRestResponse<T> | null = mock.del<T>(resource, options);
            if (response) {
                return Promise.resolve(response);
            }
        }
        return Promise.resolve(new MockResponse(null, 404));
    }

    get<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
        let mock: IMock;
        for (mock of MOCKS) {
            const response: IRestResponse<T> | null = mock.get<T>(resource, options);
            if (response) {
                return Promise.resolve(response);
            }
        }
        return Promise.resolve(new MockResponse(null, 404));
    }

    getAll<T>(resource: string, options?: IRequestOptions): Promise<IRestResponse<T[]>> {
        let mock: IMock;
        for (mock of MOCKS) {
            const response: IRestResponse<T[]> | null = mock.getAll<T>(resource, options);
            if (response) {
                return Promise.resolve(response);
            }
        }
        return Promise.resolve(new MockResponse(null, 404));
    }

    options<T>(requestUrl: string, options?: IRequestOptions): Promise<IRestResponse<T>> {
        let mock: IMock;
        for (mock of MOCKS) {
            const response: IRestResponse<T> | null = mock.options<T>(requestUrl, options);
            if (response) {
                return Promise.resolve(response);
            }
        }
        return Promise.resolve(new MockResponse(null, 404));
    }

    update<T>(resource: string, resources: any, options?: IRequestOptions): Promise<IRestResponse<T>> {
        let mock: IMock;
        for (mock of MOCKS) {
            const response: IRestResponse<T> | null = mock.update<T>(resource, resources, options);
            if (response) {
                return Promise.resolve(response);
            }
        }
        return Promise.resolve(new MockResponse(null, 404));
    }
}
