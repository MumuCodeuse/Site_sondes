import{ DataTypes, Model} from "sequelize";
import sequelize from "../../sequelize.js";

class ElementProbe extends Model {}
ElementProbe.init(
    {
        element_probe_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    
        element_probe_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        element_probe_characteristic: {
            type: DataTypes.TEXT,
        },

        element_probe_comment: {
            type: DataTypes.TEXT,
        },

        element_probe_image_url: {
            type: DataTypes.STRING,
        },
    },

    {
        sequelize, 
        modelName: "ElementProbe", 
        tableName: "element_probe",
        freezeTableName: true, 
        timestamps: false,
    }
);

export default ElementProbe;