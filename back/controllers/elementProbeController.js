import ElementProbe from "../data/models/bases/ElementProbe.js";

// Routes visiteurs
// Accéder à l'ensemble des éléments
const getAllElementProbe = async (req, res) => {
  try {
    const allElementsProbe = await ElementProbe.findAll();
    if (allElementsProbe.length === 0) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "Aucun élément trouvé" });
    }
    return res
      .status(200)
      .json({ success: true, elementProbes: allElementsProbe });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, errorMessage: "Erreur pour accéder à la BDD" });
  }
};

// Accéder à un élément spécifique
const getElementProbeById = async (req, res) => {
  //Middleware getAndValidateId : Validation de l'Id via Joi.
  try {
    const id = req.params.id;
    const elementProbe = await ElementProbe.findByPk(id);
    if (!elementProbe) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "Elément non trouvé" });
    }
    return res.status(200).json({ success: true, elementProbe: elementProbe });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errorMessage: "Erreur pour accéder à la BDD",
    });
  }
};

//------------------------------------------------------------------------------
//Routes administratrices

// Mise à jour d'un élément

const updateElementProbe = async (req, res) => {
  //Middleware getAndValidateId : Validation de l'Id via Joi.
  try {
    const id = req.params.id;
    const elementProbe = await ElementProbe.findByPk(id);
    if (!elementProbe) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "Elément non trouvé" });
    }
const elementUpdate = await elementProbe.update({
  element_probe_name : req.body.elementProbeName,
  element_probe_characteristic :req.body.elementProbeCharacteristic,
  element_probe_comment : req.body.elementProbeComment,
  element_probe_image_url : req.body.elementProbeImageUrl
})
    return res.status(200).json({ success: true, elementProbe: elementUpdate });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, errorMessage: "Erreur accès BDD" });
  }
};

// Création d'un élément

const createElementProbe = async(req, res) => {
  try{
      const existingElementProbe = await ElementProbe.findOne({
        where : {element_probe_name : req.body.elementProbeName}
      });
      if(existingElementProbe) {
        return res.status(400).json({success: false, message: "Un élément de ce nom existe déjà"});
      }

      const newElementProbe = await ElementProbe.create({
        element_probe_name : req.body.elementProbeName,
        element_probe_characteristic : req.body.elementProbeCharacteristic,
        element_probe_comment : req.body.elementProbeComment,
        element_probe_image_url : req.body.elementProbeImageUrl
      });
        return res.status(200).json({success: true, elementProbe: newElementProbe })      
  }
  catch(error){
    return res
      .status(500)
      .json({ success: false, errorMessage: "l'élément n'a pas été créé" });
  }
};

// Suppression d'un élément

const deleteElementProbe = async(req, res) => {
  //Middleware getAndValidateId : Validation de l'Id via Joi.
  try{
    const id = req.params.id;
    const elementProbe = await ElementProbe.findByPk(id);
    if(!elementProbe){
      return res.status(404).json({success: false, errorMessage: "Elément non trouvé"});
    }
   await elementProbe.destroy();
    return res.status(200).json({success: true, message: "Suppression élément"});
  }
  catch(error){
    return res.status(500).json({success: false, errorMessage: "Erreur lors de la suppression de l élément"});
  }
}


export default {
  getAllElementProbe,
  getElementProbeById,
  updateElementProbe,
  createElementProbe,
  deleteElementProbe
};
