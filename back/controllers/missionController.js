import Mission from "../data/models/bases/Mission.js";
import Joi from "joi";

// Routes visiteurs

// Accéder à l'ensemble des missions
const getAllMissions = async (req, res) => {
  try {
    const allMissions = await Mission.findAll();
    if (allMissions.length === 0) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "aucune sonde trouvée" });
    }
    return res.status(200).json({ success: true, missions: allMissions });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, errorMessage: "Erreur pour accéder à la BDD" });
  }
};
//----------------------------------------------------------------------------

// Accéder à une mission en particulier
const getMissionById = async (req, res) => {
  //Middleware getAndValidateId : Validation de l'Id via Joi.

  //--Requête BDD--
  try {
    const id = req.params.id;
    const mission = await Mission.findByPk(id);
    if (!mission) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "Mission non trouvée" });
    }
    return res.status(200).json({ success: true, mission: mission });
  } catch(error) {
    return res
      .status(500)
      .json({ success: false, errorMessage: "erreur pour accéder à la BDD" });
  }
};

//----------------------------------------------------------------------------

//Routes administratrice
// Mise à jour d'une mission
 const updateMission = async (req, res) => {

  try {
    const id = req.params.id;
    const mission = await Mission.findByPk(id);
   
    if(!mission) {
      return res.status(404).json({success: false, errorMessage:"mission non trouvée"})
    }

    const missionSchema = Joi.object({
      missionName : Joi.string().required(),
      missionStartYear : Joi.number().integer(),
      missionEndYear : Joi.number().integer(),
      missionObjective : Joi.string(),
      mission_image_url : Joi.string().uri().pattern(/^https:\/\//)
    }).messages({
      "string.base": "Ce champ doit être un texte",
      "number.base": "Ce champ doit être un nombre entier",
      "string.uri": "Ce champ doit être une URL valide"
    });

    const validatemissionSchema = missionSchema.validate(req.body);
    if (validatemissionSchema.error) {
    return res
      .status(400)
      .json({
        success: false,
        errorMessage: validatemissionSchema.error.details[0].message,
      });
  }
// Structuration des erreurs par Joi
/*{
  value: { ... },
  error: {
    details: [
      {
        message: "Le champ missionName est obligatoire",
        path: ["missionName"],
        type: "string.base"
      }
    ]
  }
}
*/

    const missionUpdate = await mission.update({
      mission_name : req.body.missionName,
      mission_start_year: req.body.missionStartYear,
      mission_end_year: req.body.missionEndYear,
      mission_objective: req.body.missionObjective,
      mission_image_url: req.body.missionImageUrl,
    });
    return res.status(200).json({success: true, mission: missionUpdate})

  } catch(error) { 
    return res.status(500).json({success:false, errorMessage:"Erreur lors de la récupération ou de la mise à jour de la mission"})
  }
 };


//  Création d'une mission
const createMission = async (req, res) => {
  try {
    const existingMission = await Mission.findOne({
      where: { mission_name: req.body.missionName },
    });
    if (existingMission) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "Une mission de ce nom existe déjà" });
    }

    const newMission = await Mission.create({
      mission_name: req.body.missionName,
      mission_start_year: req.body.missionStartYear,
      mission_end_year: req.body.missionEndYear,
      mission_objective: req.body.missionObjective,
      mission_image_url: req.body.missionImageUrl,
    });

    return res.status(200).json({ success: true, mission: newMission });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, errorMessage: "la mission n'a pas été créée" });
  }
};


// Suppression d'une mision
const deleteMission = async(req, res) => {
  //Middleware getAndValidateId : Validation de l'Id via Joi.
try{
  const id = req.params.id;
  const mission = await Mission.findByPk(id);
  if(!mission){
    return res.status(404).json({success: false, errorMessage:"Mission non trouvée" })
  };

  await mission.destroy();
  return res.status(200).json({success:true, message:"Mission supprimée"})
} catch(error) {
  return res.status(500).json({success:false, errorMessage:"Erreur lors de la suppression de la mission"})
};
};

export default {
  getAllMissions,
  getMissionById,
  updateMission,
  createMission,
  deleteMission,
};
