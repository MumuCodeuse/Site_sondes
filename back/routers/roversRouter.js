import {Router} from "express";
import roverController from "../controllers/roverController.js";
import {getAndValidateId} from "../middlewares/getAndValidateId.js";
import verifyToken from "../middlewares/verifyToken.js";


const roversRouteur = Router();

// Routes visiteurs
roversRouteur.get(
  "/rovers", 
  roverController.getAllRovers);

roversRouteur.get(
  "/rovers/:id", 
  getAndValidateId, 
  roverController.getRoverById);

// Routes Administratrice
roversRouteur.post(
  "/rovers", 
  verifyToken, 
  roverController.createRover);

roversRouteur.put(
  "/rovers/:id", 
  verifyToken, 
  getAndValidateId, 
  roverController.updateRover);

roversRouteur.delete(
  "/rovers/:id", 
  verifyToken, 
  getAndValidateId, 
  roverController.deleteRover);

export default roversRouteur;