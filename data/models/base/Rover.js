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
        name_rover: {
            type: DataTypes.STRING,
        },
        objective_rover: {
            type: DataTypes.TEXT,
        },
        year_exploration_rover: {
            type: DataTypes.INTEGER,
        },
        comment_rover: {
            type: DataTypes.TEXT,
        },
        Means_propulsion_energy_rover: {
            type: DataTypes.TEXT,
        },
        operating_state_rover: {
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