import { DataTypes } from "sequelize";
import { sequelize } from "../config/conection.js";

export const Product = sequelize.define(
    "Tb_Product",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
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
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        price_with_discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        timestamps:true,
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