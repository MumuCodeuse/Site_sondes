import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.DB_HOST); // Doit afficher la valeur définie dans ton fichier .env

import express from 'express';
// Importe le module Express, qui permet de créer facilement des serveurs web en Node.js.

import pool from './data/db.js';
// Importe la configuration de la connexion à PostgreSQL depuis le fichier `db.js`.
// 'pool' gère la connexion à la base de données.

const app = express();
// Crée une nouvelle instance d'application Express pour gérer les requêtes HTTP.

app.use(express.json());
// Middleware qui permet à l'application de comprendre les données JSON dans le corps des requêtes HTTP.
// Utile pour traiter des requêtes POST ou PUT avec des données envoyées au serveur.


app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
// Démarre le serveur et écoute sur le port 3000.
// Affiche un message dans la console pour indiquer que le serveur fonctionne correctement.
