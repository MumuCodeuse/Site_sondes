import { Router } from "express";
import spaceProbeControlleur from "../controllers/spaceProbeController.js";
import verifyToken from "../middlewares/verifyToken.js"
import { getAndValidateId } from "../middlewares/getAndValidateId.js";

const spaceProbeRouter = Router();

// Routes visiteur
spaceProbeRouter.get("/space_probes", spaceProbeControlleur.getAllSpaceProbes);
spaceProbeRouter.get("/space_probes/:id", getAndValidateId, spaceProbeControlleur.getSpaceProbeById);

// Routes administratrice
spaceProbeRouter.post("/space_probes", verifyToken, spaceProbeControlleur.createSpaceProbe);
spaceProbeRouter.put("/space_probes/:id", verifyToken,getAndValidateId, spaceProbeControlleur.updateSpaceProbe);
spaceProbeRouter.delete("/space_probes/:id",verifyToken,getAndValidateId, spaceProbeControlleur.deleteSpaceProbe);

export default spaceProbeRouter;
