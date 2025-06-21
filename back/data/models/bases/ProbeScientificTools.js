import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js"; 

class ProbeScientificTools extends Model {}

ProbeScientificTools.init(
    {
        probe_scientific_tools_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        probe_scientific_tools_name: {
            type: DataTypes.STRING,
        },
   
        probe_scientific_tools_characteristic: {
            type: DataTypes.TEXT,
        },
        probe_scientific_tools_comment: {
            type: DataTypes.TEXT,
        },
        probe_scientific_tools_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "ProbeScientificTools",
        tableName: "probe_scientific_tools",
        freezeTableName: true, 
        timestamps: false,
    }
);
export default ProbeScientificTools;