import { Router } from "express";
import spaceProbeController from "../controllers/spaceProbeController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { getAndValidateId } from "../middlewares/getAndValidateId.js";

const spaceProbesRouter = Router();

// Routes visiteur
spaceProbesRouter.get(
  "/space_probes", 
  spaceProbeController.getAllSpaceProbes
);

spaceProbesRouter.get(
  "/space_probes/:id",
  getAndValidateId,
  spaceProbeController.getSpaceProbeById,
);

// Routes administratrice
spaceProbesRouter.post(
  "/space_probes",
  verifyToken,
  spaceProbeController.createSpaceProbe,
);
spaceProbesRouter.put(
  "/space_probes/:id",
  verifyToken,
  getAndValidateId,
  spaceProbeController.updateSpaceProbe,
);
spaceProbesRouter.delete(
  "/space_probes/:id",
  verifyToken,
  getAndValidateId,
  spaceProbeController.deleteSpaceProbe,
);

export default spaceProbesRouter;
