import { DataTypes } from "sequelize";
import { sequelize } from "../config/conection.js";
import { Product } from "./product.js";
export const Images = sequelize.define(
  "Tb_Images",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    enebled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
  }
);

Product.hasMany(Images, {
  foreignKey: "product_id",
  as: "images", // Alias para facilitar a associação
});

Images.belongsTo(Product, {
  foreignKey: "product_id",
});
sequelize
  .sync()
  .then(() => {
    console.log("Tabelas sincronizadas imgs.");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar tabelas:", err);
  });