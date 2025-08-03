// Ecriture d'un script pour intégrer le mot de passe provisoire en crypté dans la bdd dans mon instance d'administratrice
// 📂 scripts/updateAdminTeporaryPassword.js

import dotenv from "dotenv";
dotenv.config();

//import bibliothèque et autre
import bcrypt from "bcrypt";
import Administrator from "../data/models/bases/Administrator.js";

// connexion à sequelize initialisé et à la bdd
import sequelize from "../data/sequelize.js";

// Paramètres
const saltRounds = 10;
const TemporaryPassword = process.env.PASSWORD_FIRST_LOGIN;
const mailPerso = process.env.EMAILPERSO;

const runHashTemporaryPassword = async () => {
  try {
    // Vérification connexion à la bdd
    await sequelize.authenticate();
    console.log("connexion à la base réussie !");

    // Hachage du mot de passe temporaire
    const hashedTemporaryPassword = await bcrypt.hash(TemporaryPassword, saltRounds);
    const admin = await Administrator.findOne({
      where: {
        email:mailPerso,
      },
  });

  if (!admin) {
    console.log("⚠️ Aucun compte administratrice trouvé pour cet email.");
      return;
  }
  // Mise à jour mot de passe
  admin.password = hashedTemporaryPassword;
  await admin.save();
  console.log("✅ Mot de passe temporaire mis à jour avec succès !");

  } catch (error) {
    console.error("❌ Erreur :", error.message);
  } finally {
    process.exit();
  }
};

  runHashTemporaryPassword()

// executer avec la ligne de commande : node script/updateTempPW.js