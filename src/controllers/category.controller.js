import { CategoryService } from "../services/category.service.js";
import { handleError } from "./utils/error.js";
const instaciaService = new CategoryService();

const createCategory = async (req, res) => {
  try {
    const { name, slug, use_in_menu } = req.body;
    const newCategory = await instaciaService.createCategory(
      name,
      slug,
      use_in_menu
    );
    return res.status(201).json({
      message: "category criada",
      newCategory,
    });
  } catch (error) {
    handleError(error, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, use_in_menu } = req.body;
    const newCategoryUpdate = await instaciaService.updateCategory(
      id,
      name,
      slug,
      use_in_menu
    );
    return res.status(201).json({
      message: "Category atualizada",
      newCategoryUpdate,
    });
  } catch (error) {
    handleError(error, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const newCategorydelete = await instaciaService.deleteCategoryserver(id);
    return res.status(201).json({
      message: "Category delete",
      newCategorydelete,
    });
  } catch (error) {
    handleError(error, res);
  }
};
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await instaciaService.getCategoryserver(id);

    if (category && category.length > 0) {
      return res.status(200).json({
        message: "Category encontrada",
        category,
      });
    } else {
      return res.status(404).json({
        message: "Categoria não encontrada",
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const result = await instaciaService.getAllCategorieserver(req.query);
    return res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
};
export { createCategory, updateCategory, deleteCategory, getAllCategories, getCategory };
