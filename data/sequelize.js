// 📌 Importation des modules nécessaires
import { Sequelize } from 'sequelize'; // Sequelize est un ORM qui permet de manipuler une base SQL via du JavaScript.
import dotenv from 'dotenv'; // dotenv permet de charger les variables d'environnement depuis un fichier .env.

// 📌 Chargement des variables d'environnement définies dans le fichier .env
dotenv.config(); // Cette ligne permet de récupérer automatiquement les valeurs de connexion stockées dans .env.

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

// 📌 Appel de la fonction de connexion
console.log("🔍 Début de la connexion via Sequelize");
connectDB();

// 📌 Exportation de l'instance Sequelize pour utilisation ailleurs
export default sequelize;
