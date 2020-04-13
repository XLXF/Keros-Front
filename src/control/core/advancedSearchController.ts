import { NextFunction, Request, Response } from "express";
import * as winston from "winston";

export class AdvancedSearchController {

    public advancedSearch(req: Request, res: Response, next: NextFunction) {
        winston.info("advanced search");
        res.render("core/advancedSearch");
    }
}

