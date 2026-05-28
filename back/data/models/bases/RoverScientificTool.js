import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js"; 

class RoverScientificTool extends Model {}

RoverScientificTool.init(
    {
        rover_scientific_tool_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rover_scientific_tool_name: {
            type: DataTypes.STRING,
        },
   
        rover_scientific_tool_characteristic: {
            type: DataTypes.TEXT,
        },
        rover_scientific_tool_comment: {
            type: DataTypes.TEXT,
        },
        rover_scientific_tool_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "RoverScientificTool", 
        tableName: "rover_scientific_tool",
        freezeTableName: true, 
        timestamps: false,
    }
);
export default RoverScientificTool;