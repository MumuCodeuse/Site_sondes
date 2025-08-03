

import handleErrors from "./errorHandler.js";

// 🧩 400 - Mauvaise requête
export const badRequest = (res, message = "Requête invalide") => {
  handleErrors(res, null, 400, message);
};

// 🧩 401 - Non authentifié
export const unauthorized = (res, message = "Authentification requise") => {
  handleErrors(res, null, 401, message);
};

// 🧩 403 - Accès interdit
export const forbidden = (res, message = "Accès interdit") => {
  handleErrors(res, null, 403, message);
};

// 🧩 404 - Ressource non trouvée
export const notFound = (res, message = "Ressource non trouvée") => {
  handleErrors(res, null, 404, message);
};

// 🧩 409 - Conflit
export const conflict = (res, message = "Conflit détecté") => {
  handleErrors(res, null, 409, message);
};

// 🧩 422 - Erreur de validation
export const validationError = (res, message = "Données invalides") => {
  handleErrors(res, null, 422, message);
};
