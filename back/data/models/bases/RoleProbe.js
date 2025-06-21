import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class RoleProbe extends Model {}
RoleProbe.init(
    {
        role_probe_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_probe_name: {
            type: DataTypes.STRING,
        },
        role_probe_accuracy: {
            type: DataTypes.TEXT,
        },
        role_probe_image_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "RoleProbe", 
        tableName: "role_probe",
        freezeTableName: true, 
        timestamps: false,
    }
);
export default RoleProbe;