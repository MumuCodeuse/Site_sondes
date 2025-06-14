import dotenv from "dotenv";
dotenv.config(); // récupère automatiquement les valeurs de connexion stockées dans .env.

import express from "express";

import cors from "cors";
import bodyparser from "body-parser";

import sequelize from "./data/sequelize.js"; // Connexion avec Sequelize
import { connectDB } from "./data/sequelize.js";

import { modelsBase, modelsAssociation } from "./data/index.js"; // Importation des modèles de données
modelsAssociation.associateProbeModels();
modelsAssociation.associateRoverModels();
modelsAssociation.associateMissionModels();

//pour référencer des fichiers et dossiers relatifs : A faire
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(`📂 Répertoire du projet : ${__dirname}`);

// Importation des routers

import spaceProbeRouter from './routers/spaceProbesRouter.js';



// import roverRouter from './routers/roverRoute.js';
// import missions from './routers/missionsRouter.js';

// Nouvelle instance d'application Express
const app = express();
app.use(express.json()); // Middleware qui permet à l'application de comprendre les données JSON dans le corps des requêtes HTTP.

//Installation des middlewares
app.use(cors()); // autorise les requêtes venant d'autres domaines
app.use(bodyparser.json()); // permet de parser le corps des requêtes en JSON
app.use(bodyparser.urlencoded({ extended: true })); // permet de parser les données URL-encodées

// 📌 Middleware pour gérer les erreurs

//Montage des routers sur endpoints
app.use('/space_probes', spaceProbeRouter); // Route pour les sondes spatiales
// app.use('rovers', roverRouter);
// app.use('missions', missionRouter);

app.get("/debug-routes", (req, res) => {
  const routes = app._router.stack
    .filter(layer => layer.route)
    .map(layer => layer.route.path);
  res.json({ routes });
});


export { modelsBase, modelsAssociation };

// 📌 Fonction principale pour démarrer le serveur
async function startServer() {
  try {
    await connectDB(); // Vérifie la connexion à la base de données
    console.log("✅ Base de données connectée avec succès !");

    app.listen(3000, () => {
      console.log("🚀 Serveur démarré sur le port 3000");
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur :", error);
    process.exit(1); // Arrête l'application si la connexion échoue
  }
}

if (process.env.NODE_ENV !== "test") {
 await startServer();
}

app.get("/debug-routes", (req, res) => {
  const routes = app._router.stack
    .filter(layer => layer.route)
    .map(layer => layer.route.path);
  res.json({ routes });
});


export default app; // Exportation de l'application Express pour les tests
