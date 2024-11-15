import { DataTypes } from "sequelize";
import { sequelize } from "../config/conection.js";
import { Products } from "./Products.js";

export const OptionProduct = sequelize.define("Tb_OptionProduct",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shape: {
        type: DataTypes.ENUM("square", "circle"),
        allowNull:true,
        defaultValue: "square",
    },
    radius: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    type: {
        type: DataTypes.ENUM("text", "color"),
        allowNull: true,
        defaultValue: "text",
    },
    values: {
        type: DataTypes.STRING,
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
