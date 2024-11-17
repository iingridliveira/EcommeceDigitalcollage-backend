import { DataTypes } from "sequelize";
import { sequelize } from "../config/conection.js";

export const Category = sequelize.define(
    "Tb_Category",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        use_in_menu: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
        },
    },
    {
        timestamps: true,
    }
);

sequelize
  .sync()
  .then(() => {
    console.log("Tabelas sincronizadas Categoria.");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar tabelas:", err);
  });