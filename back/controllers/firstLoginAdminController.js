// 1  POST /firstLogin  : Récupération email et mot de passe du formulaire de 1ere connexion
// vérification du mot de passe temporaire, si OK alors envoie token pour accès au formulaire de changement de mot de passe
// Intégration de joi à faire

//import bibliothèque et autre
import Administrator from "../data/models/bases/Administrator.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import { jwt as jwtConfig } from "./utils/config.js";

// HTTPS + headers de sécurité pour protéger les échanges.
// 1ere connexion avec mot de passe temporaire pour s'identifier
const firstLoginAPI = async (req, res) => {
  const { emailForm, temporaryPassword } = req.body;
  try {
    const admin = await Administrator.findOne({
      where: { email: emailForm },
    });
    if (!admin) {
      return res
        .status(404)
        .json({
          message:
            "Vous n'êtes pas l'administratrice, vous ne serez pas connecté",
        });
    }
    const isMatch = await bcrypt.compare(temporaryPassword, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Mauvais mot de passe" });
    }

    //Construction token pour le renvoyer
    const tokenConstruction = {
      idAdmin: admin.admin_id,
      emailAdmin: admin.email,
      roleAdmin: admin.role,
    };

    const tokenOptions = {
      algorithm: "RS256",
      expiresIn: "2h",
    };
    const token = jwt.sign(tokenConstruction, jwtConfig.jwtPrivateKey, tokenOptions);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Côté front, accès au formulaire changement du mot de passe
// Ce formulaire est uniquement visible si le Front a reçu un token valide avec un rôle “admin”.

// -----------------------------------------------------------------------------------------------
// 2. Réception nouveau mot de passe et enregistrement dans Bdd postgresql via sequelize

const newPasswordReception = async (req, res) => {
  const { emailForm, NewPasswordForm } = req.body;

  // Il faut vérifier le token
  const publicKey = fs.readFileSync("./keys/public.key", "utf8");
  const decodedJWT = jwt.verify(token, publicKey);
  
  const token = req.headers.authorization?.split(" ")[1];

  if (decodedJWT.roleAdmin === "Administratrice"); // + vérifier si token pas expiré si OK envoyé un 200

  // Récupération de l'administrateur correspondant
  try {
    const admin = await Administrator.findOne({
      where: {
        email: emailForm,
      },
    });

    if(!admin) {
      return res.status(404).json({success: false, message: "Administratrice introuvable"})
    }

    admin.password = NewPasswordForm;
    
    await admin.save(),
    res.status(200).json({ success: true, message: "Nouveau mot de passe enregistré" });
    
  } catch (error) {
    return res.status(500).json({
      message: "Votre nouveau mot de pass n'a pas été enregistré, réessayer",
    });
  }
};

export default {
  firstLoginAPI,
  newPasswordReception,
};
