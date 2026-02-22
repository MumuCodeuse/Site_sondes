// ENVIRONNEMENT
import dotenv from "dotenv";
dotenv.config(); // récupère automatiquement les valeurs de connexion stockées dans .env.

// MODULES EXTERNES
import express from "express";
import cors from "cors";

// BASE DE DONNEES ET MODELES DE BASE ET ASSOCIATIONS
import { modelsBase, modelsAssociation } from "./data/index.js"; // Importation des modèles de données

modelsAssociation.associateProbeModels();
modelsAssociation.associateRoverModels();
modelsAssociation.associateMissionModels();

//pour référencer des fichiers et dossiers relatifs : A faire
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log(`Répertoire du projet : ${__dirname}`);

// INITIALISATION DE L'APPLICATION
const app = express();

app.use(express.static("public"));

// MIDDLEWARES GLOBAUX
app.use(express.json()); // permet aussi de parser le corps des requêtes en JSON, body-parser est aujourd’hui intégré nativement dans Express.
app.use(express.urlencoded({ extended: true })); // permet de parser les données URL-encodées
// Autorisation
app.use(cors({ origin: "http://localhost:5500" }));

// ROUTAGE
import spaceProbesRouter from "./routers/spaceProbesRouter.js";
import loginRouter from "./routers/loginRouter.js";
import roversRouter from "./routers/roversRouter.js";
import missionsRouter from "./routers/missionsRouter.js";
import elementProbesRouter from "./routers/elementProbesRouter.js";

//Montage des routers sur endpoints
app.use("/api", spaceProbesRouter);
app.use("/api", loginRouter);
app.use("/api", roversRouter);
app.use("/api", missionsRouter);
app.use("/api", elementProbesRouter);

// ROUTE DEBUG (affiche les routes montées)
app.get("/debug-routes", (req, res) => {
  const routes = app._router.stack
    .filter((layer) => layer.route)
    .map((layer) => layer.route.path);
  res.json({ routes });
});

// EXPORTS (utiles pour les tests)
export { modelsBase, modelsAssociation };
export default app;

// MIDDLEWARE DE GESTION DES toutes les ERREURS qui ne sont pas attrapées par les controlleurs
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Erreur interne du serveur" });
});
