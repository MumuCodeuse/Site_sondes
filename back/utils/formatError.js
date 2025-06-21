const errorInDev = process.env.NODE_ENV !== "production";

const formatError = (erreur) => {
  if (errorInDev) {
    return {
      message: erreur.message,
      stack: erreur.stack,
      name: erreur.name
    };
  } else {
    return {
      message: "Une erreur est inatendue s'est produite"
    }
  }  
};

export default formatError;
