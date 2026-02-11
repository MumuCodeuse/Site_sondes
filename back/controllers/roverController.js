import Rover from "../data/models/bases/Rover.js";

// Routes visiteurs
// Obtenir tous les Rovers
const getAllRovers = async (req, res) => {
  try {
    const allRovers = await Rover.findAll();
    if (allRovers.length === 0) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "Aucun rover trouvé" });
    }
    return res.status(200).json({ success: true, rovers: allRovers });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, errorMessage: "erreur pour accéder à la BDD" });
  }
};

// Obtenir un rover spécifique
const getRoverById = async (req, res) => {
  //Middleware getAndValidateId : Validation de l'Id via Joi.

  const id = req.params.id;
  try {
    const rover = await Rover.findByPk(id);
    if (!rover) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "Rover non trouvé" });
    }
    return res.status(200).json({ success: true, rover: rover });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, errorMessage: "Erreur pour accéder à la BDD" });
  }
};

// Routes administratrice
// Mise à jour d'un rover

const updateRover = async (req, res) => {
  try {
    const id = req.params.id;
    const rover = await Rover.findByPk(id);
    if (!rover) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "Rover non trouvé" });
    }
    const roverUpdate = await rover.update({
      rover_name: req.body.roverName,
      rover_objective: req.body.roverObjective,
      rover_year_exploration: req.body.roverYearExploitation,
      rover_comment: req.body.roverComment,
      rover_means_propulsion_energy: req.body.roverMeansPropulsionEnergy,
      rover_operating_state: req.body.roverOperatingState,
      rover_image_url: req.body.roverImageUrl,
    });
    return res.status(200).json({ success: true, rover: roverUpdate });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, errorMessage: "Erreur pour accéder à la BDD" });
  }
};

// Création d'un rover

const createRover = async (req, res) => {
  try {
    const existingRover = await Rover.findOne({
      where: { rover_name: req.body.roverName },
    });
    if (existingRover) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "Ce rover existe déjà" });
    }

    const newRover = await Rover.create({
      rover_name: req.body.roverName,
      rover_objective: req.body.roverObjective,
      rover_year_exploration: req.body.roverYearExploitation,
      rover_comment: req.body.roverComment,
      rover_means_propulsion_energy: req.body.roverMeansPropulsionEnergy,
      rover_operating_state: req.body.roverOperatingState,
      rover_image_url: req.body.roverImageUrl,
    });
    return res.status(201).json({ success: true, rover: newRover });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, errorMessage: "Erreur pour accéder à la BDD" });
  }
};

// Suppression d'un rover
const deleteRover = async (req, res) => {
  try {
    const id = req.params.id;
    const rover = await Rover.findByPk(id);
    if (!rover) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "Rover non trouvé" });
    }
    
    await rover.destroy();
    return res.status(200).json({ success: true, message: "Rover supprimé" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        errorMessage: "Erreur lors de la suppression du rover",
      });
  }
};

export default {
  getAllRovers,
  getRoverById,
  updateRover,
  createRover,
  deleteRover,
};
