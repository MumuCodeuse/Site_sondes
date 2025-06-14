import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class AgencyEnterprise extends Model {}
AgencyEnterprise.init(
    {
        agency_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        agency_name: {
            type: DataTypes.STRING,
        },
        agency_description: {
            type: DataTypes.TEXT,
        },
        agency_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "AgencyEnterprise", 
        tableName: "agency_enterprise", // Nom de la table dans la base de données
        freezeTableName: true, // Empêche Sequelize de mettre le nom de table au pluriel
        timestamps: false,
    }
);

export default AgencyEnterprise;