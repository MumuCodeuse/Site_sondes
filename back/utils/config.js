import dotenv from "dotenv";
import fs from "fs"; //import du module fs de Node.js.. Ce module fait partie de l'API noyau (core) de Node.js, donc pas besoin de l’installer avec npm.

dotenv.config(); // Chargement les variables du .env

// Variables simples
export const errorInDev = process.env.NODE_ENV != "production";
export const port = process.env.PORT || 3000;

// Clés JWT
export const jwtPrivateKeyPath = process.env.JWT_PRIVATE_KEY_PATH || "./keys/private.key";
export const jwtPublicKeyPath = process.env.JWT_PUBLIC_KEY_PATH || "./keys/public.key";

// Contenu réel des clés
export const jwtPrivateKey = fs.readFileSync(jwtPrivateKeyPath, "utf8");
export const jwtPublicKey = fs.readFileSync(jwtPublicKeyPath, "utf8");