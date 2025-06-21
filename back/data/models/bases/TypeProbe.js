import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class TypeProbe extends Model {}
TypeProbe.init(
    {
        type_probe_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type_probe_name: {
            type: DataTypes.STRING,
        },
        type_probe_accuracy: {
            type: DataTypes.TEXT,
        },
        type_probe_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "TypeProbe", 
        tableName: "type_probe",
        freezeTableName: true, 
        timestamps: false,
    }
);
export default TypeProbe;