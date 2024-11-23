import { sequelize } from "../config/conection.js";
import { DataTypes } from "sequelize";

export const CategoryProduct = sequelize.define("Tb_CategoryProduct", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});
sequelize
  .sync()
  .then(() => {
    console.log("Tabelas sincronizadas Categoriaprodu.");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar tabelas:", err);
  });