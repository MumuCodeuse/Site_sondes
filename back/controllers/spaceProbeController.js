import SpaceProbe from "../data/models/bases/SpaceProbe.js";
import Administrator from "../data/models/bases/Administrator.js";
// import { modelsBase, modelsAssociation } from "./data/index.js"
import fs from "fs";

// Routes visiteurs
const getAllSpaceProbes = async (req, res) => {
  const spaceProbe = await SpaceProbe.findAll(); // C'est un tableau même vide qui est renvoyé !
  
  if(spaceProbe.length === 0) {
    return notFound(res, "Aucune sonde trouvée");
  }

  res.json(spaceProbe);
};

const getSpaceProbeById = async (req, res) => {
  const spaceProbeId = req.params.id;
  if (isNaN(spaceProbeId)) {
    return badRequest(res, "ID de sonde invalide");
  }
  const spaceProbe = await SpaceProbe.findByPk(spaceProbeId);
  if (!spaceProbe) {
    return notFound(res, "Sonde non trouvée");
  }

  res.json(spaceProbe);
};

// Routes administratrices
// récupération de l'ID de la sonde à compléter
// const putSpaceProbeById = async (req, res) => {
//   const spaceProbeId = req.params.id;
//   const spaceProbe = await SpaceProbe.findByPk(spaceProbeId);

//   if (!spaceProbe) {
//     return res.status(404).json({ message: "Sonde non trouvée" });
//   }
//   res.json(spaceProbe);
// };

// Router
// spaceProbeRouter.post(
//   "/admin_Space_Probe",
//   withErrorHandler(spaceProbeControlleur.xxxxxx)
// ); // modification d'une sonde

// Création d'une sonde

export default { getAllSpaceProbes, getSpaceProbeById };
