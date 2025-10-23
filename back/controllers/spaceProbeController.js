import SpaceProbe from "../data/models/bases/SpaceProbe.js";
import { notFound, badRequest } from "../utils/httpErrors.js";

import Administrator from "../data/models/bases/Administrator.js";
// import { modelsBase, modelsAssociation } from "./data/index.js"
import fs, { appendFile, rmdirSync } from "fs";

// Routes visiteurs, otenir la liste des sondes
const getAllSpaceProbes = async (req, res) => {
  const spaceProbe = await SpaceProbe.findAll(); // renvoie d'u tableau

  if (spaceProbe.length === 0) {
    return notFound(res, "Aucune sonde trouvée");
  }

  res.json(spaceProbe);
};
// Obtenir une sonde précise
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
// MAJ d'une sonde.
// récupération de l'ID de la sonde à compléter
const updateSpaceProbe = async (req, res) => {
  try {
    const spaceProbeId = req.params.id;
    const spaceProbe = await SpaceProbe.findByPk(spaceProbeId);

    if (!spaceProbe) {
      return res.status(404).json({ message: "Sonde non trouvée" });
    } else {
    }
    // Récupérationd des infos de la sonde déjà existante
    // besoin de transmettre les données de la sonde au formulaire ????
    res.json(spaceProbe);

    // Une fois le formulaire complété : Récupérer les infos du formulaire
    const {
      SBNameForm,
      SPYearLaunchForm,
      SPLauncherForm,
      SPObjectiveForm,
      SPCommentForm,
      SPOperatingStateForm,
      SPMeansPropulsionEnergyForm,
      SPImageURLForm,
    } = req.body;

    spaceProbe.space_probe_name = SBNameForm;
    spaceProbe.space_probe_year_launch = SPYearLaunchForm;
    spaceProbe.space_probe_launcher = SPLauncherForm;
    spaceProbe.space_probe_objective = SPObjectiveForm;
    spaceProbe.space_probe_comment = SPCommentForm;
    spaceProbe.space_probe_operating_state = SPOperatingStateForm;
    spaceProbe.space_probe_means_propulsion_energy =
      SPMeansPropulsionEnergyForm;
    spaceProbe.space_probe_image_url = SPImageURLForm;

    // enregistrer les infos dans la BDD
    await spaceProbe.save();
    
    return res
      .status(200)
      .json({ message: "les données ont été enregistrées" });

  } catch (error) {
    return res.status(500).json({
      message:
        "Erreur lors de la récupération ou de la mise à jour de la sonde",
    });
  }
};

// Création d'une sonde

const createSpaceProbe = async (req, res) => {
  try {
    const {
      SBNameForm,
      SPYearLaunchForm,
      SPLauncherForm,
      SPObjectiveForm,
      SPCommentForm,
      SPOperatingStateForm,
      SPMeansPropulsionEnergyForm,
      SPImageURLForm,
    } = req.body;
    // A faire  : vérifier les champs
    const newSpaceProbe = {
      space_probe_name: SBNameForm,
      space_probe_year_launch: SPYearLaunchForm,
      space_probe_launcher: SPLauncherForm,
      space_probe_objective: SPObjectiveForm,
      space_probe_comment: SPCommentForm,
      space_probe_operating_state: SPOperatingStateForm,
      space_probe_means_propulsion_energy: SPMeansPropulsionEnergyForm,
      space_probe_image_url: SPImageURLForm,
    };

    const spaceProbe = await SpaceProbe.create(newSpaceProbe);
    return res
      .status(200)
      .json(spaceProbe)
      .json({ message: "La sonde a bien été créée" });
      
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur la sonde n'a pas été crééee" });
  }
};

export default {
  getAllSpaceProbes,
  getSpaceProbeById,
  updateSpaceProbe,
  createSpaceProbe,
};
