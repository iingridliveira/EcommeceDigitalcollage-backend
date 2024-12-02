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

      // Busca categorias correspondentes aos IDs fornecidos
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

      // Associa categorias ao produto
      await product.addProductsInCategory(categories);

      // Cria e associa imagens ao produto, se existirem
      if (images.length > 0) {
        const imageInstances = images.map((img) => ({
          product_id: product.id,
          enabled: img.enabled ?? true, // Valor padrão para 'enabled'
          path: img.path, // Caminho da imagem
          type: img.type,
        }));
        // Criação em lote das imagens
        await Images.bulkCreate(imageInstances);
      }

      // Cria e associa opções ao produto, se existirem
      if (options.length > 0) {
        const optionInstances = options.map((opt) => ({
          product_id: product.id,
          title: opt.title,
          shape: opt.shape ?? "square", // Valor padrão para 'shape'
          radius: opt.radius ?? 0, // Valor padrão para 'radius'
          type: opt.type ?? "text", // Valor padrão para 'type'
          values: JSON.stringify(opt.values), // Armazena os valores como JSON
        }));
        // Criação em lote das opções
        await OptionProduct.bulkCreate(optionInstances);
      }

      // Retorna o produto com categorias, imagens e opções associadas
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
          {
            model: OptionProduct,
            as: "options",
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
