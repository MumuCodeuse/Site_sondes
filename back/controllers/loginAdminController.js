// I. circuit classique de connexion de l'Admin

// 1. Inclure l'adresse mail de l'admin ds le bdd. Mise en place du rôle admin via table dédiée
// vérifier dans la BDD l'enregistrement de l'admin + le mot de passe : A faire

//2. import bibliothèque et autre
import Administrator from "../data/models/bases/Administrator.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import { jwt } from "./utils/config.js";

// 3.  Récupération email et mot de passe du formulaire de connexion
// POST /login - Authentification de façon classique

const loginAdmin = async (req, res) => {
  const { emailForm, passwordForm } = req.body;

  // Récupération dans la bdd de l'administrateur correspondant
  try {
    const admin = await Administrator.findOne({
      where: { email: emailForm },
    });

    if (!admin) {
      return res.status(401).json({ message: "Admin inconnu" });
    }

    // Comparaison mot de passe
    const passwordHash = admin.password;

    const isMatch = await bcrypt.compare(passwordForm, passwordHash);
    if (!isMatch) {
      res.satus(401).json({ message: "Admin inconnu" });
    }

    //4. Récupérer l'ID, email et le rôle de l'administrateur correspondantConstruction du token pour le renvoyer
    const tokenConstruction = {
      idAdmin: await admin.admin_id,
      emailAdmin: await admin.email,
      roleAdmin: await admin.role,
    };
    const optionToken = {
      algorithm: "RS256",
      expiresIn: "2h",
    };
    //5. Envoie du token, d'un message de confirmation et accès à l'interface
    const token = jwt.sign(tokenConstruction, jwt.jwtPrivateKey, optionToken);
    return res.status(200).json({ token, message: "Accès autorisé" });

    // Accès à l'interface
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur dans la récupération des données" });
  }
};

export default {
  loginAdmin,
};
//6. Nombre de tentatives a définir avant blocage temporaire : pour éviter les brute force attacks: A developper

//7 . Créer le Router
// -------------------------------------------------------------------------
// Gestion de l'oubli de mot de passe : développer

// ------------------------------------------------------------------------------------------------------------------
// Une fois que le Front a reçu le token :
// À chaque requête vers les routes d’administration, le Front doit envoyer ce token (souvent dans le header Authorization).
// Le backend intercepte les requêtes, vérifie et décode le token RSA grâce à la clé publique.
// Et là, regarder le rôle dans le payload du token :
// -Si c’est une administratrice, autorisation ✅
// -Sinon, refus 🚫

// Afficher à l’admin le formulaire de gestion des sondes, rovers, missions
// Ce formulaire est uniquement visible si le Front a reçu un token valide et un rôle “admin”.
