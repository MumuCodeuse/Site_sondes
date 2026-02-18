import Joi from "joi";

// --Récupération de l'id et Vérification-Validation Joi--
export function getAndValidateId(req, res, next) {
  const id = Number(req.params.id);

  const idSchema = Joi.object({
    id: Joi.number().integer().min(1).max(300).required(),
  }).messages({
    "number.base": "L'ID doit être un nombre",
    "number.integer": "L'ID doit être un entier",
    "number.min": "L'ID doit être supérieur ou égal à 1",
    "number.max": "L'ID doit être inférieur ou égal à 300",
    "any.required": "L'Id est obligatoire",
  });
  const validateIdSchema = idSchema.validate({ id });
  if (validateIdSchema.error) {
    return res
      .status(400)
      .json({
        success: false,
        errorMessage: validateIdSchema.error.details[0].message,
      });
  }

  next();
}
