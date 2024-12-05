import { Category } from "../models/category.js";

export class CategoryService {
  async createCategory(name, slug, use_in_menu) {
    const category = await Category.create({
      name,
      slug,
      use_in_menu,
    });
    return category;
  }
  async updateCategory(id, name, slug, use_in_menu) {
    const idCategory = await Category.update(
      {
        name,
        slug,
        use_in_menu,
      },
      { where: { id } }
    );
    return idCategory;
  }
  async deleteCategoryserver(id) {
    const idCategory = await Category.destroy({ where: { id } });
    return idCategory;
  }
  async getCategoryserver(id) {
    const idCategory = await Category.findAll({ where: { id } });
    return idCategory;
  }

  async getAllCategorieserver({ limit = 12, page = 1, fields, use_in_menu }) {
    const paginationLimit = limit === "-1" ? null : parseInt(limit, 10);
    const offset = paginationLimit
      ? (parseInt(page, 10) - 1) * paginationLimit
      : null;

    const attributes = fields ? fields.split(",") : undefined;

    const where = {};
    if (use_in_menu !== undefined) {
      where.use_in_menu = use_in_menu === "true";
    }
    const result = await Category.findAndCountAll({
      where,
      attributes,
      limit: paginationLimit,
      offset,
    });

    // Retornar o resultado formatado
    return {
      data: result.rows,
      total: result.count,
      currentPage: paginationLimit ? parseInt(page, 10) : null,
      totalPages: paginationLimit
        ? Math.ceil(result.count / paginationLimit)
        : 1,
    };
  }
}

