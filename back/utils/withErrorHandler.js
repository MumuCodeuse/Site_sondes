// 📌 Rôle : enveloppe de sécurité : encapsuler les fonctions de contrôleur avec une gestion automatique des erreurs
// Handle : gérer
// Cette fonction enveloppe chaque contrôleur, évite de répeter try catch et si erreur, l'envoie à handleError
// 1. withErrorHandler() attrape l’erreur d’un contrôleur
// 2.Envoie l’erreur à handleErrors()
// 3.handleErrors() utilise formatError() pour formater la réponse

import handleErrors from "./errorHandler.js";

const withErrorHandler = (controllerFn) => {
  return async (req, res, next) => {
    try {
       // Exécution normale du contrôleur (ex : getUser, createPost…)
      await controllerFn(req, res, next)
    } catch (erreur) {
      // Si une erreur survient, on la transmet au gestionnaire d’erreurs
      handleErrors(res, erreur);
    }
  };
};

export default withErrorHandler;