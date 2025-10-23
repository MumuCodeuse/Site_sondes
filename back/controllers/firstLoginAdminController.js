// 1  POST /firstLogin  : Récupération email et mot de passe du formulaire de 1ere connexion
// vérification du mot de passe temporaire, si OK alors envoie token pour accès au formulaire de changement de mot de passe 
// Intégration de Bcrypt et de joi à faire

//import bibliothèque et autre
import Administrator from "../data/models/bases/Administrator.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import {jwt} from "./utils/config.js"


app.post("/firstLogin", async (req, res) => {
  try {
    const { emailForm, temporaryPassword } = req.body;

    const admin = await Administrator.findOne({
      where: {
        email: emailForm,
      },
    });
    if (admin && temporaryPassword === process.env.PASSWORD_FIRST_LOGIN) {
      // envoyer le token, le constituer, pour accéder au formulaire de changement de mot de passe
      // Récupérer l'ID, email et le rôle de l'administrateur correspondant
      const idAdmin = admin.admin_id;
      const emailAdmin = admin.email;
      const roleAdmin = admin.role;

      //Construction token pour le renvoyer
      const tokenConstruction = { idAdmin, emailAdmin, roleAdmin };
      const optionToken = {
        algorithm: "RS256",
        expiresIn: "2h",
      };
      const token = jwt.sign(tokenConstruction, jwt.jwtPrivateKey, optionToken);
      return res.status(200).json({ token });
    } else {
      return res
        .status(401)
        .json({
          message:
            "Vous n'êtes pas l'administratrice, vous ne serez pas connecté",
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur dans la récupération des données" });
  }
});

// Côté front, accès au formulaire changement du mot de passe
// Ce formulaire est uniquement visible si le Front a reçu un token valide avec un rôle “admin”.

// -----------------------------------------------------------------------------------------------
// 2. Réception nouveau mot de passe et enregistrement dans Bdd postgresql via sequelize

app.post("/changePassword", async (req, res) => {
  try {
    const { emailForm, NewPasswordForm } = req.body;

    // Il faut vérifier le token
    const publicKey = fs.readFileSync("./keys/public.key", "utf8");
    const decodedJWT = jwt.verify(token, publicKey);
    // Lecture payload +
    if (decodedJWT.roleAdmin === "Administratrice"); // + vérifier si token pas expiré si OK envoyé un 200

    // Récupération de l'administrateur correspondant
    const admin = await Administrator.findOne({
      where: {
        email: emailForm,
      },
    });
    admin.password = NewPasswordForm;
    return [
      admin.save(),
      res.status(200).json({ message: "Nouveau mot de passe enregistré" }),
    ];
    // envoir JWT
  } catch (error) {
    return res.status(500).json({
      message: "Votre nouveau mot de pass n'a pas été enregistré, réessayer",
    });
  }
});
