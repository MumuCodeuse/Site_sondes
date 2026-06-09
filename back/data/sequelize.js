// Suite à la création de config.js dans le dossier utils, il faudra l'utiliser dans ce fihier pour centraliser la configuration, repérer les autres fichier où la centralisation est possible : 
// import { db } from "../utils/config.js";

// const sequelize = new Sequelize(
//     db.name,
//     db.user,
//     process.env.DB_PASSWORD, // A ajouter dans config.js 
//     {
//         host: db.host,
//         port: db.port,
//         dialect: "postgres",
//         logging: false
//     }
// );

import dotenv from 'dotenv'; // Passer par config.js ???
// 📌 Chargement des variables d'environnement définies dans le fichier .env
dotenv.config(); // récupération automatique des valeurs de connexion stockées dans .env.

// 📌 Importation des modules nécessaires
import { Sequelize } from 'sequelize'; 

// 📌 Initialisation de la connexion Sequelize avec PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nom de la base de données récupéré depuis le fichier .env
    process.env.DB_USER, // Utilisateur de la base de données
    process.env.DB_PASSWORD, // Mot de passe de la base
    {
        host: process.env.DB_HOST, // Adresse du serveur de la base (ex : localhost)
        dialect: 'postgres', // Spécifie que nous utilisons PostgreSQL comme base de données
        logging: false // Désactive les logs SQL dans la console (utile pour éviter l'affichage massif en développement)
    }
);

// 📌 Fonction asynchrone pour vérifier la connexion à la base de données
async function connectDB() {
    try {
        await sequelize.authenticate(); // Attente de l’authentification
        console.log('✅ Connexion réussie à PostgreSQL via Sequelize');
        
    } catch (error) {
        console.error('❌ Échec de la connexion :', error);
    }
}
export { connectDB };
// 📌 Exportation de l'instance Sequelize pour l'utiliser dans d'autres fichiers
console.log("Chargement de sequelize.js");

export default sequelize;
