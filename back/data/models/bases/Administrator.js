import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize.js";

class Administrator extends Model {}

Administrator.init(
  {
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Administrator",
    tableName: "administrator", // facultatif si le nom correspond
    timestamps: true,
  }
);

export default Administrator;
