import { Router } from "express";
import firstLoginAdminController from "../controllers/firstLoginAdminController.js";
import loginAdminController from "../controllers/loginAdminController.js";
import verifyToken from "../middlewares/verifyToken.js";
const loginRouter = Router();

// 1ere connexion avec mot de passe temoraire pour s'identifier et renvoi d'un token
loginRouter.post("/firstLogin", firstLoginAdminController.firstLoginAPI);

// Nouveau mot de passe et enregistrement dans Bdd postgresql via sequelize
loginRouter.post(
  "/changePassword",
  verifyToken,
  firstLoginAdminController.newPasswordReception
);

// Connexion à l'interface d'admin
loginRouter.post("/login", loginAdminController.loginAdmin);

export default loginRouter;
