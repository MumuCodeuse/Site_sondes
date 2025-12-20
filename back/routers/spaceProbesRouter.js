import { Router } from "express";
import spaceProbeControlleur from "../controllers/spaceProbeController.js";

const spaceProbeRouter = Router();

// Routes administratrice
spaceProbeRouter.post("/space_probe", spaceProbeControlleur.createSpaceProbe);
spaceProbeRouter.put("/space_probe/:id",spaceProbeControlleur.updateSpaceProbe);
spaceProbeRouter.delete("/space_probe/:id",spaceProbeControlleur.deleteSpaceProbe);

// Routes visiteur
spaceProbeRouter.get("/space_probes", spaceProbeControlleur.getAllSpaceProbes);
spaceProbeRouter.get("/space_probe/:id",spaceProbeControlleur.getSpaceProbeById);

export default spaceProbeRouter;
