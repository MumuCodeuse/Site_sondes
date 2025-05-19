import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class Mission extends Model {}
Mission.init(
    {
        mission_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        mission_name: {
            type: DataTypes.STRING,
        },
        start_year: {
            type: DataTypes.INTEGER,
        },
        end_year: {
            type: DataTypes.INTEGER,
        },
        objective: {
            type: DataTypes.TEXT,
        },
        mission_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "Mission", 
        freezeTableName: true, 
    }
);
export default Mission;