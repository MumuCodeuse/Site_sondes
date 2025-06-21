import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class RoleRover extends Model {}
RoleRover.init(
    {
        role_rover_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_rover_name: {
            type: DataTypes.STRING,
        },
        role_rover_accuracy: {
            type: DataTypes.TEXT,
        },
        role_rover_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "RoleRover", 
        tableName: "role_rover",
        freezeTableName: true, 
        timestamps: false,
    }
);
export default RoleRover;