import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class TypeRover extends Model {}
TypeRover.init(
    {
        type_rover_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type_rover_name: {
            type: DataTypes.STRING,
        },
        type_rover_accuracy: {
            type: DataTypes.TEXT,
        },
        type_rover_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "TypeRover", 
        tableName: "type_rover",
        freezeTableName: true, 
        timestamps: false,
    }
);
export default TypeRover;