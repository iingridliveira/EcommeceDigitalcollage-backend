import { Product } from "../models/product.js";
import { Images } from "../models/images.js";
import { OptionProduct } from "../models/optionProduct.js";
import { Category } from "../models/category.js";
import { Op } from "sequelize";
// Service of read, delete, and update
export class ProductServiceRUD {
  async updateServer(
    id,
    enabled,
    name,
    slug,
    stock,
    description,
    price,
    price_with_discount,
    category_ids,
    images = [],
    options = []
  ) {
    try {
      const updateProduct = await Product.update(
        {
          enabled,
          name,
          slug,
          stock,
          description,
          price,
          price_with_discount,
          category_ids,
        },
        { where: { id } }
      );

      // Atualização das imagens
      await Promise.all(
        images.map(async (image) => {
          if (image.deleted) {
            await Images.destroy({ where: { id: image.id } });
          } else if (image.content) {
            await Images.upsert({
              product_id: id,
              type: image.type,
              path: image.content,
            });
          }
        })
      );

      // Atualização das opções
      await Promise.all(
        options.map(async (option) => {
          if (option.deleted) {
            await OptionProduct.destroy({ where: { id: option.id } });
          } else {
            // Se 'values' for um array ou objeto, converta para JSON string
            const optionValues =
              Array.isArray(option.values) || typeof option.values === "object"
                ? JSON.stringify(option.values)
                : option.values; // Se já for string, não modifica

            // Atualiza ou cria a opção
            await OptionProduct.upsert({
              product_id: id,
              title: option.title,
              shape: option.shape ?? "square", // Valor padrão para 'shape'
              type: option.type ?? "text", // Valor padrão para 'type'
              values: optionValues, // Usa o valor convertido em JSON
              radius: option.radius ?? 0, // Valor padrão para 'radius'
            });
          }
        })
      );

      return updateProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Could not update product.");
    }
  }

  async deleteServer() {
    try {
    } catch (error) {}
  }

  async getServer() {
    try {
    } catch (error) {}
  }

  async getALLServer({
    limit = 12,
    page = 1,
    fields,
    match,
    category_ids,
    "price-range": priceRange,
    ...options
  }) {
    try {
      // Configuração de paginação
      const paginationLimit = limit === "-1" ? null : parseInt(limit, 10);
      const offset = paginationLimit
        ? (parseInt(page, 10) - 1) * paginationLimit
        : null;

      // Configuração de seleção de campos
      const attributes = fields ? fields.split(",") : undefined;

      // Filtros
      const filters = {};

      if (match) {
        filters[Op.or] = [
          { name: { [Op.like]: `%${match}%` } },
          { description: { [Op.like]: `%${match}%` } },
        ];
      }

      if (category_ids) {
        const categories = category_ids.split(",").map(Number);
        filters["$productsInCategory.category_id$"] = { [Op.in]: categories };
      }

      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number);
        filters.price = { [Op.between]: [min, max] };
      }

      const newFilters = Object.keys(options)
        .filter((key) => key.startsWith("option["))
        .map((key) => {
          const optionId = key.match(/\d+/)[0];
          const optionValues = options[key].split(",");
          return {
            "$options.id$": optionId,
            "$options.values$": { [Op.overlap]: optionValues },
          };
        });

      filters[Op.and] = newFilters; // Novo array atribuído a "filters"

      // Query no banco de dados
      const products = await Product.findAndCountAll({
        where: filters,
        attributes,
        include: [
          {
            model: Category,
            attributes: [],
            as: "productsInCategory",
          },
          {
            model: Images,
            attributes: ["id", "path"],
            as: "images",
          },
          {
            model: OptionProduct,
            attributes: ["id", "title", "values"],
            as: "options",
          },
        ],
        limit: paginationLimit,
        offset,
      });

      // Retorno
      return {
        data: products.rows,
        total: products.count,
        limit: paginationLimit,
        page: paginationLimit === null ? null : page,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Could not fetch products.");
    }
  }
}
