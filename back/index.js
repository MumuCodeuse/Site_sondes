import app from "./app.js";

import { connectDB } from "./data/sequelize.js"; // Connexion avec Sequelize

const port = process.env.PORT;

// DEMARRAGE DU SERVEUR
async function startServer() {
  try {

    await connectDB(); // appel la fonction pour connectionVérifie la connexion à la base de données, voir le fichier sequelize.js
    console.log("Base de données connectée avec succès !");

    // Démarrage du serveur uniquement en mode normal
   
    app.listen(port, () => {
    console.log("Serveur démarré sur le port 3000");
      });
      
  } catch (error) {
    console.error("Erreur lors du démarrage du serveur :", error);
    process.exit(1); // Arrête l'application si la connexion échoue
  }
}

// LANCEMENT SI HORS TEST
if (process.env.NODE_ENV !== "test") {
  await startServer();
}
