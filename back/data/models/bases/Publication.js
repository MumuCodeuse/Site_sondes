import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class Publication extends Model {}
Publication.init(
    {
        publication_id: {
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
        publication_subject: {
            type: DataTypes.TEXT,
        },
        publication_date: {
            type: DataTypes.INTEGER,
        },
        publication_authors_name: {
            type: DataTypes.TEXT,
        },
        publication_journal: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize, 
        modelName: "Publication", 
        freezeTableName: true, 
    }
);
export default Publication;