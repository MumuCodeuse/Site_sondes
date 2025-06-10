// 📌 Importation des modules nécessaires en ES Module
//Importation des composants de Sequelize → récupération des classes essentielles pour définir un modèle :
//Sequelize → Permet d'interagir avec la base SQL.
//DataTypes → Définit le type de chaque colonne (STRING, INTEGER, etc.).
//Model → Permet de créer des modèles Sequelize.
//💡 C'est indispensable pour définir SpaceProbe comme un modèle Sequelize

import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js"; // Connexion PostgreSQL

// 📌 Définition du modèle SpaceProbe (nom en PascalCase)
class SpaceProbe extends Model {}

// 📌 Initialisation du modèle avec les colonnes définies
SpaceProbe.init(
    {
        // 📌 Initialisation du modèle avec les colonnes définies
        space_probe_id: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Définit la clé primaire
            autoIncrement: true, // Correspond au SERIAL dans PostgreSQL
        },
        space_probe_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        space_probe_year_launch: {
            type: DataTypes.INTEGER,
        },
        space_probe_launcher: {
            type: DataTypes.STRING,
        },
        space_probe_objective: {
            type: DataTypes.TEXT,
        },
        space_probe_comment: {
            type: DataTypes.TEXT,
        },
        space_probe_operating_state: {
            type: DataTypes.STRING,
        },
        space_probe_means_propulsion_energy: {
            type: DataTypes.TEXT,
        },
        space_probe_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
    // options
        sequelize, // Connexion à la base PostgreSQL
        modelName: "SpaceProbe", // Nom du modèle (Bonne pratique : PascalCase)
        freezeTableName: true, // Empêche Sequelize de mettre le nom de table au pluriel
    }
);

export default SpaceProbe;

console.log(SpaceProbe === sequelize.models.SpaceProbe);// Doit afficher "true"
