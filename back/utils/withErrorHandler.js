import handleErrors from "./errorHandler.js";

const withErrorHandler = (controllerFn) => {
  return async (req, res, next) => {
    try {
      await controllerFn(req, res, next)
    } catch (erreur) {
      handleErrors(res, erreur);
    }
  };
};

export default withErrorHandler;