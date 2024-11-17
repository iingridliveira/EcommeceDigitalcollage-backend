import { DataTypes } from "sequelize";
import { sequelize } from "../config/conection.js";
import { Product } from "./product.js";
export const OptionProduct = sequelize.define("Tb_OptionProduct",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

Product.hasMany(OptionProduct, {
  foreignKey: "product_id",
});
sequelize
  .sync()
  .then(() => {
    console.log("Tabelas sincronizadas das opções dos produtos.");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar tabelas:", err);
  });
