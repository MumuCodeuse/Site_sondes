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