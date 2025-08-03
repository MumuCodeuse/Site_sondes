// 📌 Rôle : formatage de l'erreur : formater l’objet d’erreur selon l’environnement (dev ou production)
// 1. withErrorHandler() attrape l’erreur d’un contrôleur
// 2.Envoie l’erreur à handleErrors()
// 3.handleErrors() utilise formatError() pour formater la réponse

const errorInDev = process.env.NODE_ENV !== "production";

const formatError = (erreur) => {
  if (errorInDev) {
     // En développement, on montre tous les détails
    return {
      message: erreur.message,
      stack: erreur.stack,
      name: erreur.name
    };
  } else {
     // En production, on cache les détails sensibles
    return {
      message: "Une erreur inatendue s'est produite"
    }
  }  
};

export default formatError;
