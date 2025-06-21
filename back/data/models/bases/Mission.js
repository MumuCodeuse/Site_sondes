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
        mission_start_year: {
            type: DataTypes.INTEGER,
        },
        mission_end_year: {
            type: DataTypes.INTEGER,
        },
        mission_objective: {
            type: DataTypes.TEXT,
        },
        mission_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "Mission", 
        tableName: "mission",
        freezeTableName: true, 
        timestamps: false,
    }
);
export default Mission;