import { DataTypes } from "sequelize";
import { sequelize } from "../config/conection.js";
import { Product } from "./product.js";
export const Images = sequelize.define("Tb_Images", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },

    enebled: {
        type: DataTypes.BOOLEAN,
        autoIncrement: false,
        defaultValue: 0,
        },
    path: {
        type: DataTypes.STRING,
        autoIncrement: true,
        defaultValue: 0,
        },
    },
    {
        timestamps:true,
    }
);

Product.hasMany(Images, {
  foreignKey: "product_id",
});
sequelize
  .sync()
  .then(() => {
    console.log("Tabelas sincronizadas.");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar tabelas:", err);
  });