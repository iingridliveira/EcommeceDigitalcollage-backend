import { Product } from "../models/product.js";
import { Images } from "../models/images.js";
import { OptionProduct } from "../models/optionProduct.js";
import { Category } from "../models/category.js";

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

  async getALLServer(queryParams) {
    const {
      limit = 12,
      page = 1,
      fields,
      match,
      category_ids,
      "price-range": priceRange,
      ...options
    } = queryParams;

    try {
      const filters = {};

      // Filtro por match (nome ou descrição)
      if (match) {
        filters["$or"] = [
          { name: { $like: `%${match}%` } },
          { description: { $like: `%${match}%` } },
        ];
      }

      // Filtro por categorias
      if (category_ids) {
        const categories = category_ids.split(",").map(Number);
        filters["category_ids"] = { $overlap: categories };
      }

      // Filtro por faixa de preços
      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number);
        filters["price"] = { $between: [min, max] };
      }

      // Filtro por opções
      Object.keys(options).forEach((key) => {
        if (key.startsWith("option[")) {
          const optionId = key.match(/\d+/)[0];
          const optionValues = options[key].split(",");
          filters["$and"] = filters["$and"] || [];
          filters["$and"].push({
            "$options.id$": optionId,
            "$options.values$": { $overlap: optionValues },
          });
        }
      });

      // Paginação
      const pagination = {};
      if (Number(limit) !== -1) {
        pagination.limit = Number(limit);
        pagination.offset = (Number(page) - 1) * Number(limit);
      }

      // Seleção de campos
      const attributes = fields ? fields.split(",") : undefined;

      const products = await Product.findAndCountAll({
        where: filters,
        attributes,
        include: [
          {
            model: Category,
            attributes: category_ids,
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
        ...pagination,
      });

      return {
        data: products.rows,
        total: products.count,
        limit: Number(limit),
        page: Number(limit) === -1 ? null : Number(page),
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Could not fetch products.");
    }
  }
}
