import dotenv from "dotenv";
dotenv.config(); // Cette ligne permet de récupérer automatiquement les valeurs de connexion stockées dans .env.
console.log(process.env.DB_HOST); // Doit afficher la valeur définie dans ton fichier .env

import express from "express";
// Importe le module Express, qui permet de créer facilement des serveurs web en Node.js.

import sequelize from "./data/sequelize.js"; // Connexion avec Sequelize

import SpaceProbe from "./data/models/base/SpaceProbe.js";

const app = express();
// Crée une nouvelle instance d'application Express pour gérer les requêtes HTTP.

app.use(express.json());
// Middleware qui permet à l'application de comprendre les données JSON dans le corps des requêtes HTTP.
// Utile pour traiter des requêtes POST ou PUT avec des données envoyées au serveur.

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
// Démarre le serveur et écoute sur le port 3000.
