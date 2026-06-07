import SpaceProbe from "../data/models/bases/SpaceProbe.js";

// Routes visiteurs

// Obtenir la liste des sondes
const getAllSpaceProbes = async (req, res) => {
  try {
    const allSpaceProbes = await SpaceProbe.findAll(); // renvoie d'un tableau qui peut être vide, donc pas besoin de 404

    return res.status(200).json({ success: true, spaceProbes: allSpaceProbes});
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, errorMessage: "Erreur pour accéder à la BDD" });
  }
};

//--------------------------------------------------------------------------------

// Obtenir une sonde précise

const getSpaceProbeById = async (req, res) => {
  //Middleware getAndValidateId : validation de l'Id via Joi.

  //--Requête BDD--
  try {
    const id = req.params.id;
    const spaceProbe = await SpaceProbe.findByPk(id);
    if (!spaceProbe) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "Sonde spatiale non trouvée" });
    }
    return res.status(200).json({ success: true, spaceProbe: spaceProbe });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, errorMessage: "Erreur pour accéder à la BDD" });
  }
};

//--------------------------------------------------------------------------
// Routes administratrices
// MAJ d'une sonde

const updateSpaceProbe = async (req, res) => {
  //Middleware getAndValidateId : validation de l'Id via Joi.

  //--Requête BDD--
  try {
    const id = req.params.id;
    const spaceProbe = await SpaceProbe.findByPk(id);

    if (!spaceProbe) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "Sonde non trouvée" });
    }

    // enregistrer les changements
    const spaceProbeUpdate = await spaceProbe.update({
      space_probe_name: req.body.spaceProbeName,
      space_probe_year_launch: req.body.spaceProbeYearLaunch,
      space_probe_launcher: req.body.spaceProbeLauncher,
      space_probe_objective: req.body.spaceProbeObjective,
      space_probe_comment: req.body.spaceProbeComment,
      space_probe_operating_state: req.body.spaceProbeOperatingState,
      space_probe_means_propulsion_energy:
        req.body.spaceProbeMeansPropulsionEnergy,
      space_probe_image_url: req.body.spaceProbeImageURL,
    });
    return res.status(200).json({ success: true, spaceProbe: spaceProbeUpdate });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errorMessage:
        "Erreur lors de la récupération ou de la mise à jour de la sonde",
    });
  }
};

//------------------------------------------------------------------------------------------
// Création d'une sonde
const createSpaceProbe = async (req, res) => {
  try {
    const existingSpaceProbe = await SpaceProbe.findOne({
      where: { space_probe_name: req.body.spaceProbeName },
    });
    if (existingSpaceProbe) {
      return res.status(400).json({
        success: false,
        errorMessage: "Une sonde avec ce nom existe déjà"
      });
    }

    const newSpaceProbe = await SpaceProbe.create({
      space_probe_name: req.body.spaceProbeName,
      space_probe_year_launch: req.body.spaceProbeYearLaunch,
      space_probe_launcher: req.body.spaceProbeLauncher,
      space_probe_objective: req.body.spaceProbeObjective,
      space_probe_comment: req.body.spaceProbeComment,
      space_probe_operating_state: req.body.spaceProbeOperatingState,
      space_probe_means_propulsion_energy:
        req.body.spaceProbeMeansPropulsionEnergy,
      space_probe_image_url: req.body.spaceProbeImageURL,
    });
    return res.status(201).json({ success: true, spaceProbe: newSpaceProbe });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errorMessage: "Erreur la sonde n'a pas été créée",
    });
  }
};
// ----------------------------------------------------------------------------------

// Suppression d'une sonde
const deleteSpaceProbe = async (req, res) => {
  //Middleware getAndValidateId : récupération de l'id et validation de l'Id via Joi.

  //--Requête BDD--
  try {
    const id = req.params.id;
    const deletedCount = await SpaceProbe.destroy({
      where: { space_probe_id: id }, // Avec le Model utiliser where :{......
    });

    // Vérification du résultat. Quand utilisation du Model obligé de vérifier si suppression avec deletedCount, destroy renvoi le nombre de ligne supprimée, donc ici : 1
    if (deletedCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: "La sonde a bien été supprimée" });
    } else {
      return res.status(404).json({
        success: false,
        errorMessage: "Aucune sonde trouvée avec cet ID",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      errorMessage: "Erreur lors de la suppression de la sonde",
    });
  }
};

export default {
  getAllSpaceProbes,
  getSpaceProbeById,
  updateSpaceProbe,
  createSpaceProbe,
  deleteSpaceProbe,
};
