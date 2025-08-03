import dotenv from "dotenv";
dotenv.config(); // Chargement les variables du .env

import fs from "fs"; //import du module fs de Node.js.. Ce module fait partie de l'API noyau (core) de Node.js, donc pas besoin de l’installer avec npm.

// Variables simples
export const errorInDev = process.env.NODE_ENV != "production";

export const isDev = process.env.NODE_ENV === "developpement";
export const port = process.env.PORT || 3000;

// db
export const db = {
  host : process.env.DB_HOST,
  port : process.env.DB_PORT,
  user : process.env.DB_USER,
  // pasword : process.env.DB_PASSWORD
  name : process.env.DB_NAME,
};

// Clés JWT
export const jwt = {
  jwtPrivateKeyPath : process.env.JWT_PRIVATE_KEY_PATH,
  jwtPublicKeyPath : process.env.JWT_PUBLIC_KEY_PATH ,
  jwtPrivateKey : fs.readFileSync(jwtPrivateKeyPath, "utf8"),
  jwtPublicKey : fs.readFileSync(jwtPublicKeyPath, "utf8"),
};

// Infos Admin
export const firstLoginPassword = process.env.PASSWORD_FIRST_LOGIN;
export const adminEmail = process.env.EMAILPERSO;