import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js"; 

class RoverScientificTools extends Model {}

RoverScientificTools.init(
  {
    rover_scientific_tools_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rover_scientific_tools_name: {
      type: DataTypes.STRING,
    },
   
    rover_scientific_tools_characteristic: {
      type: DataTypes.TEXT,
    },
    rover_scientific_tools_comment: {
      type: DataTypes.TEXT,
    },
    rover_scientific_tools_image_url: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize, 
    modelName: "RoverScientificTools", 
    freezeTableName: true, 
  }
);
export default RoverScientificTools;