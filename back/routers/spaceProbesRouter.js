import { Router } from "express";
import spaceProbeControlleur from "../controllers/spaceProbeController.js";
import withErrorHandler from "../utils/withErrorHandler.js";

const spaceProbeRouter = Router();

// Routes administratrice
// spaceProbeRouter.post("/space_probe", createSpaceProbe);
// spaceProbeRouter.put("/space_probe:id",updateSpaceProbe);
// spaceProbeRouter.delete("/space_probe:id", deleteSpaceProbe);

// Routes visiteur
spaceProbeRouter.get("/space_probes", withErrorHandler(spaceProbeControlleur.getAllSpaceProbes));
spaceProbeRouter.get("/space_probe/:id", withErrorHandler(spaceProbeControlleur.getSpaceProbeById));



export default spaceProbeRouter;