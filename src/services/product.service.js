import { Product } from "../models/product.js";
import { Category } from "../models/category.js";
import { Images } from "../models/images.js";
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
    images = [], // Recebendo imagens como array de objetos
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
      const categories = await Category.findAll({
        where: {
          id: {
            [Op.in]: category_ids,
          },
        },
      });

      if (categories.length !== category_ids.length) {
        throw new Error("Algumas categorias fornecidas não existem.");
      }

      // Associa as categorias ao produto
      await product.addProductsInCategory(categories);
 
      // Cria e associa imagens ao produto, se existirem
      if (images.length > 0) {
       const imageInstances = images.map((img) => ({
         product_id: product.id,
         enabled: product.enabled, // ou img.enabled, se enviado
         path: img.path, // Usa diretamente o valor fornecido no JSON
         type: img.type,
       }));
       console.log(imageInstances)

        

        await Images.bulkCreate(imageInstances); // Criação em lote
      }

      // Retorna o produto com as categorias e imagens associadas
      const productWithDetails = await Product.findByPk(product.id, {
        include: [
          {
            model: Category,
            as: "productsInCategory",
          },
          {
            model: Images,
            as: "images",
          },
        ],
      });

      return productWithDetails;
    } catch (error) {
      console.error("Erro ao criar produto:", error.message);
      throw error;
    }
  }
}
