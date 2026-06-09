// 1  POST /firstLogin  : Récupération email et mot de passe du formulaire de 1ere connexion
// vérification du mot de passe temporaire, si OK alors envoie token pour accès au formulaire de changement de mot de passe
// Intégration de joi à faire
// https://cursa.app/fr/page/validation-des-donnees-avec-le-package-joi

//import bibliothèque et autre
import Administrator from "../data/models/bases/Administrator.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";

import { jwt as jwtConfig } from "../utils/config.js";

// HTTPS + headers de sécurité pour protéger les échanges.
// Point à faire

// 1ere connexion avec mot de passe temporaire pour s'identifier
const firstLoginAPI = async (req, res) => {
  console.log("Requête reçue :", req.body);

  const { emailForm, temporaryPassword } = req.body;

  // Validation Joi
  const schemaFirstLoginAPI = Joi.object({
    emailForm: Joi.string().email().required(),
    temporaryPassword: Joi.string()
      .min(8)
      .max(50)
      .pattern(/^[\p{L}\p{N}\s'’,.!?@#$%^&*()_\-+=]+$/u)
      .required(),
  });

  const validation = schemaFirstLoginAPI.validate(req.body);

  if (validation.error) {
     console.log("Erreur Joi :", error.details);
    return res.status(400).json({
      success: false,
      errorMessage: validation.error.details[0].message,
    });
  }

  try {
    const admin = await Administrator.findOne({
      where: { email: emailForm },
    });
    console.log("Admin trouvé :", admin);
    if (!admin) {
      console.log("Aucun admin trouvé pour :", emailForm);
      return res.status(404).json({
        success: false,
        errorMessage: "Vous n'êtes pas l'administratrice, email inconnu",
      });
    }

    console.log("Mot de passe envoyé :", temporaryPassword);
    console.log("Hash stocké :", admin.password);

    const isMatch = await bcrypt.compare(temporaryPassword, admin.password);
    console.log("Résultat comparaison bcrypt :", isMatch);

    if (!isMatch) {
      console.log("Mot de passe incorrect");
      return res.status(401).json({
        success: false,
        errorMessage: "Mauvais mot de passe",
      });
    }

    //Construction token pour le renvoyer
    console.log("Clé privée chargée :", process.env.JWT_PRIVATE_KEY_PATH ? "OK" : "ABSENTE");

    const tokenConstruction = {
      idAdmin: admin.admin_id,
      emailAdmin: admin.email,
      roleAdmin: admin.role,
    };
    console.log("Payload JWT :", tokenConstruction);

    const tokenOptions = {
      algorithm: "RS256",
      expiresIn: "2h",
    };
    const token = jwt.sign(
      tokenConstruction,
      jwtConfig.jwtPrivateKey,
      tokenOptions,
    );
    console.log("Token généré :", token);
    return res.status(200).json({ success: true, token });
  
  } catch (error) {
    console.error("ERREUR dans /firstLogin :", error);
    return res
      .status(500)
      .json({ success: false, errorMessage: "Erreur serveur" });
  }
};

// Côté front, accès au formulaire changement du mot de passe
// Ce formulaire est uniquement visible si le Front a reçu un token valide avec un rôle “admin”.

// -----------------------------------------------------------------------------------------------
// 2. Réception nouveau mot de passe et enregistrement dans Bdd postgresql via sequelize

const newPasswordReception = async (req, res) => {
  const { emailForm, newPasswordForm } = req.body;

  const schemaNewPasswordReception = joi.object({
    emailForm: joi.string().email().required(),
    newPasswordForm: joi
      .string()
      .min(8)
      .max(50)
      .pattern(/^[A-Za-z0-9!@#$%^&*()_\-+=]+$/)
      .required(),
  });

  const validation = schemaNewPasswordReception.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      success: false,
      errorMessage: validation.error.details[0].message,
    });
  }

  // Récupération de l'administrateur correspondant
  try {
    const admin = await Administrator.findOne({
      where: {
        email: emailForm,
      },
    });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Administratrice introuvable" });
    }

    const samePassword = await bcrypt.compare(newPasswordForm, admin.password);
    if (samePassword) {
      return res.status(400).json({
        success: false,
        errorMessage: "Vous devez changer de mot de passe",
      });
    }
    const hashNewPassword = await bcrypt.hash(newPasswordForm, 10);
    admin.password = hashNewPassword;
    await admin.save();
    return res
      .status(200)
      .json({ success: true, message: "Nouveau mot de passe enregistré" });
  } catch (error) {
    return res.status(500).json({
      errorMessage:
        "Votre nouveau mot de passe n'a pas été enregistré, réessayer",
    });
  }
};

export default {
  firstLoginAPI,
  newPasswordReception,
};
