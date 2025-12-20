import { EmptyResultError } from "sequelize";
import SpaceProbe from "../data/models/bases/SpaceProbe.js";
import Joi from "joi";

//------------------------------------------------------------------------
// Routes visiteurs
// obtenir la liste des sondes
const getAllSpaceProbes = async (req, res) => {
  try {
    const spaceProbes = await SpaceProbe.findAll(); // renvoie d'un tableau
    if (spaceProbes.length === 0) {
      return res.status(404).json({ message: "Aucune sonde trouvée" });
    }
    return res.status(200).json(spaceProbes);
  } catch (error) {
    return res.status(500).json({ message: "Erreur pour accéder à la BDD" });
  }
};

// Obtenir une sonde précise
const idSchema = Joi.object({
  spaceProbeId: Joi.number().integer().min(1).max(300).required(),
}).messages({
  "number.base": "L'ID doit être un nombre",
  "number.integer": "L'ID doit être un entier",
  "number.min": "L'ID doit être supérieur ou égal à 1",
  "number.max": "L'ID doit être inférieur ou égal à 300",
  "any.required": "L'Id est obligatoire",
});

const getSpaceProbeById = async (req, res) => {
  const spaceProbeId = Number(req.params.id);

  // Validation avec Joi
  const result = idSchema.validate({ spaceProbeId });

  if (result.error) {
    return res.status(400).json({ message: result.error.details[0].message });
    console.log(result);
  }
  try {
    const spaceProbe = await SpaceProbe.findByPk(spaceProbeId);
    if (!spaceProbe) {
      return res.status(404).json({ message: "Sonde spatiale non trouvée" });
    }
    return res.status(200).json(spaceProbe);
  } catch (error) {
    return res.status(500).json({ message: "Erreur pour accéder à la BDD" });
  }
};

//--------------------------------------------------------------------------
// Routes administratrices
// MAJ d'une sonde

// récupération de l'ID de la sonde à compléter
const updateSpaceProbeById = Joi.object({
  spaceProbeId: Joi.number().integer().min(1).max(300).required(),
});

const updateSpaceProbe = async (req, res) => {
  const spaceProbeId = Number(req.params.id);
  if (isNaN(spaceProbeId)) {
    return res
      .status(400)
      .json({ message: "ID non valide, un nombre est attendu" });
  }
  try {
    const spaceProbe = await SpaceProbe.findByPk(spaceProbeId);

    if (!spaceProbe) {
      return res.status(404).json({ message: "Sonde non trouvée" });
    }

    // enregistrer toutes les infos du formulaire de manière plus compacte
    await spaceProbe.update(req.body);
    return res.status(200).json({ spaceProbe });
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
    const existingProbe = await SpaceProbe.findOne({
      where: { space_probe_name: req.body.space_probe_name },
    });
    if (existingProbe) {
      return res.status(400).json({
        error: "Une sonde avec ce nom existe déjà",
      });
    }

    const newSpaceProbe = await SpaceProbe.create(req.body);
    return res.status(201).json(newSpaceProbe);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur la sonde n'a pas été crééee" });
  }
};

// Suppression d'une sonde
const deleteSpaceProbe = async (req, res) => {
  const spaceProbeId = Number(req.params.id);
  if (isNaN(spaceProbeId)) {
    return res
      .status(400)
      .json({ message: "ID non valide, un nombre est attendu" });
  }
  try {
    const deletedCount = await SpaceProbe.destroy({
      where: { space_probe_id: spaceProbeId },
    });

    // Vérification du résultat
    if (deletedCount === 1) {
      return res.status(200).json({ message: "La sonde a bien été supprimée" });
    } else {
      return res
        .status(404)
        .json({ message: "Aucune sonde trouvée avec cet ID" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la sonde" });
  }
};

export default {
  getAllSpaceProbes,
  getSpaceProbeById,
  updateSpaceProbe,
  createSpaceProbe,
  deleteSpaceProbe,
};

/* Gestion des erreur par JOI
{
  error: {
    details: [
      {
        message: '"spaceProbeId" must be greater than or equal to 1',
        path: ['spaceProbeId'],
        type: 'number.min',
        context: { ... }
      }
    ]
  },
  value: { spaceProbeId: 0 }
}
*/

// Récupérationd des infos de la sonde déjà existante pour les afficher dans le formulaire côté front

// Une fois le formulaire complété : Récupérer les infos du formulaire
/*  const {
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
    spaceProbe.space_probe_image_url
    = SPImageURLForm;
*/
