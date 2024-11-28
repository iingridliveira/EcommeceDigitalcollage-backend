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
}
