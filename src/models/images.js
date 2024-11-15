import { DataTypes } from "sequelize";
import { sequelize } from "../config/conection.js";
import { Products } from "./Products.js"; // Importe o modelo da tabela de produtos

export const Images = sequelize.define("Tb_Images", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Products, // Modelo de referência (tabela de produtos)
            key: 'id',       // Chave primária da tabela de produtos
        },
        onUpdate: 'CASCADE', // Atualiza a chave estrangeira se a chave primária mudar
        onDelete: 'CASCADE', // Deleta o registro se o produto for deletado
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
    }
});
