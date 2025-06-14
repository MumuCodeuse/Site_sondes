import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class TestedTechnology extends Model {}
TestedTechnology.init(
    {
        tested_tech_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tested_tech_name: {
            type: DataTypes.STRING,
        },
        tested_tech_description: {
            type: DataTypes.TEXT,
        },
        tested_tech_accuracy: {
            type: DataTypes.TEXT,
        },
        tested_tech_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "TestedTechnology", 
        freezeTableName: true, 
    }
);
export default TestedTechnology;