// I. circuit classique de connexion de l'Admin

// 1. Inclure l'adresse mail de l'admin ds le bdd. Mise en place du rôle admin via table dédiée
// vérifier dans la BDD l'enregistrement de l'admin + le mot de passe : A faire

//2. import bibliothèque et autre
import Administrator from "../data/models/bases/Administrator.js";
import jwt from "jsonwebtoken";
import { jwt as jwtConfig } from "../utils/config.js";
import bcrypt from "bcrypt";
import Joi from "joi";

// 3.  Récupération email et mot de passe du formulaire de connexion
// POST /login - Authentification de façon classique

const loginAdmin = async (req, res) => {
  const { emailForm, passwordForm } = req.body;

  const schemaLoginAPI = Joi.object({
    emailForm: Joi.string().email().required(),
    passwordForm: joi
      .string()
      .min(8)
      .max(50)
      .pattern(/^[A-Za-z0-9!@#$%^&*()_\-+=]+$/)
      .required(),
  });

  const validation = schemaLoginAPI.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      success: false,
      message: validation.error.details[0].message,
    });
  }
  // Pour info sur JOI : validation.error = {
  //   details: [
  //     {
  //       message: '"emailForm" must be a valid email',
  //       path: ['emailForm'],
  //       type: 'string.email',
  //       context: { ... }          }]}
  // details = tableau de toutes les erreurs trouvées
  // [0] = première erreur
  // .message =  message d’erreur lisible généré par Joi

  // Récupération dans la bdd de l'administrateur correspondant
  try {
    const admin = await Administrator.findOne({
      where: { email: emailForm },
    });

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, errorMessage: "Admin inconnu" });
    }

    // Comparaison mot de passe
    const passwordHash = admin.password;

    const isMatch = await bcrypt.compare(passwordForm, passwordHash);
    if (!isMatch) {
      return res
        .satus(401)
        .json({ success: false, errorMessage: "Admin inconnu" });
    }

    //4. Récupérer l'ID, email et le rôle de l'administrateur correspondant. Construction du token pour le renvoyer
    const tokenConstruction = {
      idAdmin: admin.admin_id,
      emailAdmin: admin.email,
      roleAdmin: admin.role,
    };
    const optionToken = {
      algorithm: "RS256", // Mode de signature avec 2 clés différentes, privé et public
      expiresIn: "2h",
    };
    //5. Envoie du token, d'un message de confirmation et accès à l'interface
    const token = jwt.sign(
      tokenConstruction,
      jwtConfig.jwtPrivateKey,
      optionToken,
    );
    return res
      .status(200)
      .json({ success: true, token, message: "Accès autorisé" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errorMessage: "Erreur dans la récupération des données",
    });
  }
};

export default {
  loginAdmin,
};
//6. Nombre de tentatives a définir avant blocage temporaire : pour éviter les brute force attacks: A developper

//7 . Créer le Router
// -------------------------------------------------------------------------
// Gestion de l'oubli de mot de passe : à développer

// ------------------------------------------------------------------------------------------------------------------
// Une fois que le Front a reçu le token :
// À chaque requête vers les routes d’administration, le Front doit envoyer ce token (dans le header Authorization).
// Le backend intercepte les requêtes, vérifie et décode le token RSA grâce à la clé publique.
// Et là, regarder le rôle dans le payload du token :
// -Si c’est une administratrice, autorisation
// -Sinon, refus

// Afficher à l’admin le formulaire de gestion des sondes, rovers, missions
// Ce formulaire est uniquement visible si le Front a reçu un token valide et un rôle “admin”.
// enregistrer le token, côté Front  soit ds un cookie sécurisé (HTTPOnly + Secure + SameSite), C’est la méthode recommandée en sécurité moderne.Pourquoi ?Le JS du navigateur ne peut pas lire un cookie HTTPOnly → protège contre les attaques XSS.Le cookie est envoyé automatiquement au backend.Tu n’as pas besoin de faire localStorage.getItem("token"); soit Deuxième choix : sessionStorage. À utiliser si :tu veux que l’utilisateur soit déconnecté quand il ferme l’onglet. tu veux éviter que le token reste sur la machine. Avantages :isparaît quand l’onglet se ferme, moins exposé que localStorage
