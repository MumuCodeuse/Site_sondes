import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js"; 

class ProbeScientificTool extends Model {}

ProbeScientificTool.init(
    {
        probe_scientific_tool_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        probe_scientific_tool_name: {
            type: DataTypes.STRING,
        },
   
        probe_scientific_tool_characteristic: {
            type: DataTypes.TEXT,
        },
        probe_scientific_tool_comment: {
            type: DataTypes.TEXT,
        },
        probe_scientific_tool_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "ProbeScientificTool",
        tableName: "probe_scientific_tool",
        freezeTableName: true, 
        timestamps: false,
    }
);
export default ProbeScientificTool;