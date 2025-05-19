// 📌 Importation des modules nécessaires en ES Module
//Importation des composants de Sequelize → Tu récupères les classes essentielles pour définir un modèle :
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
        name_space_probe: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year_launch_space_probe: {
            type: DataTypes.INTEGER,
        },
        launcher_space_probe: {
            type: DataTypes.STRING,
        },
        objective_space_probe: {
            type: DataTypes.TEXT,
        },
        comment_space_probe: {
            type: DataTypes.TEXT,
        },
        operating_state_space_probe: {
            type: DataTypes.STRING,
        },
        Means_propulsion_energy_probe: {
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

export default {SpaceProbe};

console.log(SpaceProbe === sequelize.models.SpaceProbe);// Doit afficher "true"
