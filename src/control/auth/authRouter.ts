import * as winston from "winston";
import { Router } from "express";
import { LoginController } from "./LoginController";
import { LogoutController } from "./LogoutController";
import { AdvancedSearchController } from "./advancedSearchController";

/**
 * Router for Authentication needs
 * @returns {e.Router}
 */
export function authRouter(): Router {
  winston.debug("Mapping Authentication routes");
  const loginController: LoginController = new LoginController();
  const logoutController: LogoutController = new LogoutController();
  const advancedSearchController: AdvancedSearchController = new  AdvancedSearchController();
  const router: Router = Router();

  router.get("/login", loginController.viewLoginForm);
  router.post("/login", loginController.login);
  router.get("/logout", logoutController.logout);
  router.get("/advanced-search", advancedSearchController.advancedSearch);


  return router;
}
