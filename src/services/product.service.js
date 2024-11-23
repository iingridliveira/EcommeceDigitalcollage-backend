import { Product } from "../models/product.js";
import { Category } from "../models/category.js";
import { Op } from "sequelize";

export class ProductService {
  async createProduct({
    enabled,
    name,
    slug,
    stock,
    description,
    price,
    price_with_discount,
    category_ids,
  }) {
    try {
      // Cria o produto
      const product = await Product.create({
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
      });

      // Busca as categorias correspondentes aos IDs fornecidos
      const categorias = await Category.findAll({
        where: {
          id: {
            [Op.in]: category_ids,
          },
        },
      });

      if (categorias.length !== category_ids.length) {
        throw new Error("Algumas categorias fornecidas não existem.");
      }

      // Associa as categorias ao produto
      await product.addProductsInCategory(categorias); // Alias atual



      // Retorna o produto com as categorias associadas
      const productWithCategories = await Product.findByPk(product.id, {
        include: [
          {
            model: Category,
            as: "productsInCategory", // Certifique-se de que esse é o alias correto
          },
        ],
      });

      return productWithCategories;
    } catch (error) {
      console.error("Erro ao criar produto:", error.message);
      throw error;
    }
  }
}
