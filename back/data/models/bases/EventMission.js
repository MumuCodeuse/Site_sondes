import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class EventMission extends Model {}
EventMission.init(
    {
        event_mission_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        event_name: {
            type: DataTypes.STRING,
        },
        event_year: {
            type: DataTypes.INTEGER,
        },
        event_description: {
            type: DataTypes.TEXT,
        },
        event_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "EventMission", 
        freezeTableName: true, 
    }
);
export default EventMission;