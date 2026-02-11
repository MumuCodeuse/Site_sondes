// Vérification du Token
// il faut récupérer le token dans le header de la requête
//Charger la clé publique
// vérifier que le header Authorization existe
// extraire le token
// vérifier la signature RSA
// vérifier l’expiration
// vérifier le rôle
// attacher le payload à req.admin,  Mettre les infos dans req.admin
// appeler next() si tout est bon
// Si non OK gérer les différentes erreurs

import jwt from "jsonwebtoken";
import fs from "fs";

const verifyToken = (req, res, next) => {
  // 1) Vérifier que le header Authorization existe
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Accès interdit" });
    ;
  }
  // 2) Extraire le token
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Accès interdit" });
    ;
  }
  try {
    // 3) Vérifier le token
    const publicKey = fs.readFileSync("./keys/public.key", "utf8");
    const decodedJWT = jwt.verify(token, publicKey);
    
    // 4) Vérifier le rôle
    if (decodedJWT.roleAdmin !== "Administratrice") {
      return res.status(403).json({success: false, message:"Accès interdit"})
    }
    // 5) Attacher le payload à la requête
      req.admin = decodedJWT;

      // 6) Continuer vers la route protégée
      next();
    } catch(error) {
    return res.status(401).json({success: false, message: "Identification incorrecte"})
  }
};

export default verifyToken;
