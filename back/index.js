// 🌿🌿🌿 ENVIRONNEMENT
import dotenv from "dotenv";
dotenv.config(); // récupère automatiquement les valeurs de connexion stockées dans .env.

// 🧩🧩🧩 CONFIGURATION
import { errorInDev, port } from "./utils/config.js";

// 🔌🔌🔌MODULES EXTERNES
import express from "express";
import cors from "cors";
import bodyparser from "body-parser";

// 🧮🧮🧮 BASE DE DONNEES ET   MODELES DE BASE ET ASSOCIATIONS
import sequelize, { connectDB } from "./data/sequelize.js"; // Connexion avec Sequelize
import { modelsBase, modelsAssociation } from "./data/index.js"; // Importation des modèles de données

modelsAssociation.associateProbeModels();
modelsAssociation.associateRoverModels();
modelsAssociation.associateMissionModels();

//pour référencer des fichiers et dossiers relatifs : A faire
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log(`📂 Répertoire du projet : ${__dirname}`);

// 🚀🚀🚀INITIALISATION DE L'APPLICATION
const app = express();

// 🛠️🛠️🛠️ MIDDLEWARES GLOBAUX
app.use(express.json()); // Middleware qui permet à l'application de comprendre les données JSON dans le corps des requêtes HTTP.
app.use(cors()); // autorise les requêtes venant d'autres domaines
app.use(bodyparser.json()); // permet de parser le corps des requêtes en JSON
app.use(bodyparser.urlencoded({ extended: true })); // permet de parser les données URL-encodées

// 🛣️🛣️🛣️ ROUTAGE
import spaceProbeRouter from "./routers/spaceProbesRouter.js";
// import roverRouter from './routers/roversRouter.js';
// import missions from './routers/missionsRouter.js';

//Montage des routers sur endpoints
app.use("/api", spaceProbeRouter);
// app.use('/api', roverRouter);
// app.use('/api', roverRouter);

// 🧪🧪🧪 ROUTE DEBUG (affiche les routes montées)
app.get("/debug-routes", (req, res) => {
  const routes = app._router.stack
    .filter((layer) => layer.route)
    .map((layer) => layer.route.path);
  res.json({ routes });
});

// 📤📤📤 EXPORTS (utiles pour les tests)
export { modelsBase, modelsAssociation };
export default app;

// 😣😣😣 MIDDLEWARE DE GESTION DES ERREURS
app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur :", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Erreur interne du serveur" });
});

// 🔥🔥🔥DEMARRAGE DU SERVEUR
async function startServer() {
  try {
    await sequelize.authenticate(); // Vérifie la connexion à la base de données
    console.log("✅ Connexion à la base de données réussie !");

    await connectDB(); // Vérifie la connexion à la base de données
    console.log("✅ Base de données connectée avec succès !");

    // Démarrage du serveur uniquement en mode normal
    if (process.env.NODE_ENV !== "test") {
      app.listen(port, () => {
        console.log("🚀 Serveur démarré sur le port 3000");
      });
    }
  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur :", error);
    process.exit(1); // Arrête l'application si la connexion échoue
  }
}

// 📡📡📡 LANCEMENT SI HORS TEST
if (process.env.NODE_ENV !== "test") {
  await startServer();
}
