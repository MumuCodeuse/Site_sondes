// Ecriture d'un script pour intégrer le mot de passe provisoire  en crypté et l'adresse mail dans la bdd dans mon instance d'administratrice

import dotenv from "dotenv";
dotenv.config();

//import bibliothèque et autre
import bcrypt from "bcrypt";
import Administrator from "../data/models/bases/Administrator.js";

// connexion à sequelize initialisé et à la bdd
import sequelize from "../data/sequelize.js";

const saltRounds = 10;
const TemporaryPassword = process.env.PASSWORD_FIRST_LOGIN;
const mailPerso = process.env.EMAILPERSO;

const runUpdateOrCreateAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base réussie !");

    const hashedTemporaryPassword = await bcrypt.hash(TemporaryPassword, saltRounds);

    // Vérifie si l'admin existe
    let admin = await Administrator.findOne({ where: { email: mailPerso } });

    if (!admin) {
      console.log("ℹ️ Aucun compte trouvé, création en cours...");
      admin = await Administrator.create({
        email: mailPerso,
        password: hashedTemporaryPassword,
        role: "superadmin" // ou un rôle par défaut
      });
      console.log("✅ Administratrice créée avec succès !");
    } else {
      admin.password = hashedTemporaryPassword;
      await admin.save();
      console.log("✅ Mot de passe temporaire mis à jour avec succès !");
    }
  } catch (error) {
    console.error("❌ Erreur :", error.message);
  } finally {
    process.exit();
  }
};

runUpdateOrCreateAdmin();

// executer avec la ligne de commande : node script/updateTempPW.js


// // Paramètres
// const saltRounds = 10;
// const TemporaryPassword = process.env.PASSWORD_FIRST_LOGIN;
// const mailPerso = process.env.EMAILPERSO;

// const runHashTemporaryPassword = async () => {
//   try {
//     // Vérification connexion à la bdd
//     await sequelize.authenticate();
//     console.log("connexion à la base réussie !");

//     // Hachage du mot de passe temporaire
//     const hashedTemporaryPassword = await bcrypt.hash(TemporaryPassword, saltRounds);
//     const admin = await Administrator.findOne({
//       where: {
//         email:mailPerso,
//       },
//   });

//   if (!admin) {
//     console.log("⚠️ Aucun compte administratrice trouvé pour cet email.");
//       return;
//   }
//   // Mise à jour mot de passe
//   admin.password = hashedTemporaryPassword;
//   await admin.save();
//   console.log("✅ Mot de passe temporaire mis à jour avec succès !");

//   } catch (error) {
//     console.error("❌ Erreur :", error.message);
//   } finally {
//     process.exit();
//   }
// };

//   runHashTemporaryPassword()

// executer avec la ligne de commande : node script/updateTempPW.js