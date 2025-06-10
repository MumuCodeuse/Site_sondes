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
        freezeTableName: true, 
    }
);

export default AgencyEnterprise;