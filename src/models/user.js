import { DataTypes } from "sequelize";
import { sequelize } from "../config/conection.js";

export const User = sequelize.define(
  "Tb_User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
     firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Tabelas sincronizadas.");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar tabelas:", err);
  });
