import { IStringable } from "../interface/IStringable";
import { Department } from "../core/Department";
import { Country } from "../core/Country";
import { Address } from "../core/Address";
import { Document } from "../Document";

export class ConsultantInscription implements IStringable {
    constructor(
        private id ?: number,
        private firstName ?: string,
        private lastName ?: string,
        private department ?: Department,
        private email ?: string,
        private phoneNumber ?: string,
        private outYear ?: number,
        private nationality ?: Country,
        private socialSecurityNumber ?: string,
        private address ?: Address,
        private documents ?: Document []
    ) {}
}
