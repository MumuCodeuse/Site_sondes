import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class ScientificDiscovery extends Model {}
ScientificDiscovery.init(
    {
        scientific_discovery_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        mission_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Mission",
                key: "mission_id",
            },
        },
        discovery_year: {
            type: DataTypes.INTEGER,
        },
        discovery_expected: {
            type: DataTypes.TEXT,
        },
        discovery_category: {
            type: DataTypes.TEXT,
        },
        discovery_result: {
            type: DataTypes.TEXT,
        },
        discovery_evolution_following: {
            type: DataTypes.TEXT,
        },
        discovery_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "ScientificDiscovery", 
        freezeTableName: true, 
    }
);
export default ScientificDiscovery;