import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class CelestialElement extends Model {}
CelestialElement.init(
    {
        cel_elemt_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cel_elemt_name: {
            type: DataTypes.STRING,
        },
        cel_elemt_accuracy: {
            type: DataTypes.TEXT,
        },
        cel_elemt_comment: {
            type: DataTypes.TEXT,
        },
        cel_elemt_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "CelestialElement", 
        freezeTableName: true, 
    }
);
export default CelestialElement;