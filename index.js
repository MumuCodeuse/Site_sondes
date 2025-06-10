import dotenv from "dotenv";
dotenv.config(); // récupère automatiquement les valeurs de connexion stockées dans .env.
console.log(process.env.DB_HOST); // Affiche la valeur définie dans  .env

import express from "express";
// Importe le module Express, qui permet de créer facilement des serveurs web en Node.js.

import sequelize from "./data/sequelize.js"; // Connexion avec Sequelize
import { connectDB } from "./data/sequelize.js";

import models from "./data/index.js"; // Importation des modèles de données

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(`📂 Répertoire du projet : ${__dirname}`);

const app = express();// Nouvelle instance d'application Express 
app.use(express.json());// Middleware qui permet à l'application de comprendre les données JSON dans le corps des requêtes HTTP.

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
    }
};

startServer();








