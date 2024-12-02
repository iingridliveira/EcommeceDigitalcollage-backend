import { where } from "sequelize";
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
    const idCategory = await Category.update({
      name,
      slug,
      use_in_menu,
    },
    {where: {id}})
    return idCategory;
  }
}
