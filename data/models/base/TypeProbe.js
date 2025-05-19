import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class TypeProbe extends Model {}
RoleProbe.init(
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
        freezeTableName: true, 
    }
);
export default TypeProbe;