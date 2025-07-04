import { DataTypes, Model } from "sequelize";
import sequelize from "../../sequelize";

class Administrator extends Model{}

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
    createdAT: {
      type: DataTypes.DATE,
      field: 'createdAT',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedAt',
    },
  },
  {
    sequelize,
    modelName: "Administrator",
    tableName: "administrator", // facultatif si le nom correspond
    timestamps: false,
  }
);

export default Administrator;