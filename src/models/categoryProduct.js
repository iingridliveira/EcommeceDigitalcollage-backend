import { sequelize } from "../config/conection.js";

export const CategoryProduct = sequelize.define("Tb_CategoryProduct", {
  
});
sequelize
  .sync()
  .then(() => {
    console.log("Tabelas sincronizadas Categoriaprodu.");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar tabelas:", err);
  });