import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class Rover extends Model {}
Rover.init(
    {
        rover_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        space_probe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'SpaceProbe', 
                key: 'space_probe_id'
            }
        },
        rover_name: {
            type: DataTypes.STRING,
        },
        rover_objective: {
            type: DataTypes.TEXT,
        },
        rover_year_exploration: {
            type: DataTypes.INTEGER,
        },
        rover_comment: {
            type: DataTypes.TEXT,
        },
        rover_means_propulsion_energy: {
            type: DataTypes.TEXT,
        },
        rover_operating_state: {
            type: DataTypes.TEXT,
        },
        rover_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "Rover", 
        freezeTableName: true, 
    }
);
export default Rover;