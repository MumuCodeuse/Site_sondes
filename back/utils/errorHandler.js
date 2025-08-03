// 📌 Rôle : Réponse formaté + log : envoyer la réponse JSON formatée à l’utilisateur et afficher l’erreur dans la console
// 1. withErrorHandler() attrape l’erreur d’un contrôleur
// 2.Envoie l’erreur à handleErrors()
// 3.handleErrors() utilise formatError() pour formater la réponse

import formatError from "./formatError.js";

const handleErrors = (
  res, // objet réponse
  erreur, // objet erreur à afficher et à renvoyer
  statusCode = 500, // code du statut à retourner
  message="erreur serveur"
) => {
  console.error("Erreur capturée",erreur);

  res.status(statusCode).json({
    message,
    erreur: formatError(erreur),
  })
};

   export default handleErrors;