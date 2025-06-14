import SpaceProbe from "../data/models/bases/SpaceProbe";
// import { modelsBase, modelsAssociation } from "./data/index.js"

const getAllSpaceProbe = async (req, res) => {
  try {
    console.log("🔍 Requête reçue pour GET /space_probes"); // Vérifie si la requête arrive bien
    const spaceProbe = await SpaceProbe.findAll();
    console.log("✅ Sondes récupérées :", spaceProbe);
   
    res.json(spaceProbe);
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ message: "Erreur serveur", error });
    

  }
};

export default getAllSpaceProbe;