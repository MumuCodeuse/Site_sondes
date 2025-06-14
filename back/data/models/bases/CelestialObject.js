import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class CelestialObject extends Model {}
CelestialObject.init(
    {
        cel_obj_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cel_obj_name: {
            type: DataTypes.STRING,
        },
        cel_obj_accuracy: {
            type: DataTypes.TEXT,
        },
        cel_obj_comment: {
            type: DataTypes.TEXT,
        },
        cel_obj_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "CelestialObject", 
        tableName: "celestial_object",
        freezeTableName: true, 
        timestamps: false,
    }
);
export default CelestialObject;