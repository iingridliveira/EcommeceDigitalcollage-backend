import { Product } from "../models/product.js";
import { Category } from "../models/category.js";
import { Images } from "../models/images.js";
import { OptionProduct } from "../models/optionProduct.js";
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
    images = [],
    options = [],
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
          enabled: img.enabled ?? true, // Se 'enabled' não for enviado, assume 'true'
          path: img.path, // Usa diretamente o valor fornecido no JSON
          type: img.type,
        }));
        console.log(imageInstances);

        // Criação em lote das imagens
        await Images.bulkCreate(imageInstances);
      }

      // Criação e associação das opções ao produto
      if (options.length > 0) {
        const optionInstances = options.map((opt) => ({
          product_id: product.id,
          title: opt.title,
          shape: opt.shape ?? "square", // Se 'shape' não for fornecido, assume 'square'
          radius: opt.radius ?? 0, // Se 'radius' não for fornecido, assume 0
          type: opt.type ?? "text", // Se 'type' não for fornecido, assume 'text'
          values: JSON.stringify(opt.values), // Armazena os valores como uma string JSON
        }));
     console.log(optionInstances)
        // Cria as opções no banco de dados
        await OptionProduct.bulkCreate(optionInstances);
      }

      // Retorna o produto com as categorias, imagens e opções associadas
      const productWithDetails = await Product.findByPk(product.id, {
        include: [
          {
            model: Category,
            as: "productsInCategory",
          },
          {
            model: Images,
            as: "images", // Alias usado para associar as imagens
          },
          {
            model: OptionProduct,
            as: "options", // Alias usado para associar as opções
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
