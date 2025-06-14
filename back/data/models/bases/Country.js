import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class Country extends Model {}
Country.init(
    {
        Country_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        country_name: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize, 
        modelName: "Country", 
        freezeTableName: true, 
    }
);
export default Country;