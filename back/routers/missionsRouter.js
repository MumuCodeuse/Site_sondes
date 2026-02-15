import {Router} from "express";
import missionController from "../controllers/missionController.js";
import {getAndValidateId} from "../middlewares/getAndValidateId.js";
import verifyToken from "../middlewares/verifyToken.js";


const missionsRouteur = Router();

// Routes visiteurs
missionsRouteur.get(
  "/missions", 
  missionController.getAllMissions);

missionsRouteur.get(
  "/missions/:id", 
  getAndValidateId, 
  missionController.getMissionById);

// Routes Administratrice
missionsRouteur.post(
  "/missions", 
  verifyToken, 
  missionController.createMission);

missionsRouteur.put(
  "/missions/:id", 
  verifyToken, 
  getAndValidateId, 
  missionController.updateMission);

  missionsRouteur.put(
  "/missions/:id", 
  verifyToken, 
  getAndValidateId, 
  missionController.deleteMission);

export default missionsRouteur;
