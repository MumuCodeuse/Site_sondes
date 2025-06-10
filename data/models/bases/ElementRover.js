import{ DataTypes, Model} from "sequelize";
import sequelize from "../../sequelize.js";

class ElementRover extends Model {}
ElementRover.init(
    {
        element_rover_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    
        element_rover_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        element_rover_characteristic: {
            type: DataTypes.TEXT,
        },

        element_rover_comment: {
            type: DataTypes.TEXT,
        },

        element_rover_image_url: {
            type: DataTypes.STRING,
        },
    },

    {
        sequelize, 
        modelName: "ElementRover", 
        freezeTableName: true, 
    }
);

export default ElementRover;