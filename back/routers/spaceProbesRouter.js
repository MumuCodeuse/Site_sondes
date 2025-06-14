import { Router } from "express";

import getAllSpaceProbes from "../controllers/spaceProbeController.js";

const spaceProbeRouter = Router();
spaceProbeRouter.get("/", getAllSpaceProbes);

export default spaceProbeRouter;