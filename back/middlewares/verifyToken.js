// il faut récupérer le token dans le header de la requête
//Charger la clé publique
// Vérifier le token 
// Vérifier le rôle
// Mettre les infos dans req.admin
// si OK accéder au controlleur
// Si non OK gérerles différente erreur

import Administrator from "../data/models/bases/Administrator.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import { jwt as jwtConfig } from "./utils/config.js";

const token = req.headers.authorization?.split(" ")[1];