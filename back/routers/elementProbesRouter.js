import {Router} from "express";
import elementProbeController from "../controllers/elementProbeController.js";
import {getAndValidateId} from "../middlewares/getAndValidateId.js";
import verifyToken from "../middlewares/verifyToken.js";


const elementProbesRouteur = Router();

// Routes visiteurs
elementProbesRouteur.get(
  "/elementProbes", 
  elementProbeController.getAllElementsProbe);

elementProbesRouteur.get(
  "/elementProbes/:id", 
  getAndValidateId, 
  elementProbeController.getElementProbeById);

// Routes Administratrice
elementProbesRouteur.post(
  "/elementProbes", 
  verifyToken, 
  elementProbeController.createElementProbe);

elementProbesRouteur.put(
  "/elementProbes/:id", 
  verifyToken, 
  getAndValidateId, 
  elementProbeController.updateElementProbe);

  elementProbesRouteur.delete(
  "/elementProbes/:id", 
  verifyToken, 
  getAndValidateId, 
  elementProbeController.deleteElementProbe);

export default elementProbesRouteur;