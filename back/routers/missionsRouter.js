import {Router} from "express";
import missionController from "../controllers/missionController.js";
import getAndValidateId from "../Middlewares/getAndValidateId.js";
import verifyToken from "../middlewares/verifyToken.js";


const missionRouteur = Router();

// Routes visiteurs
missionRouteur.get("/missions", missionController.getAllMissions);
missionRouteur.get("/missions/:id", getAndValidateId, missionController.getMissionById);

// Routes Administratrice
missionRouteur.post("/missions", verifyToken, missionController.createMission);
missionRouteur.put("/missions/:id", verifyToken, getAndValidateId, missionController.createMission);

export default missionRouteur;
