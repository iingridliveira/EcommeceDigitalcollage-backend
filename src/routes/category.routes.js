import express from "express"
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.controller.js";
import { tokenCheck } from "../middleware/authUser.middleware.js";



export const categoryRouter = express.Router();

categoryRouter.get("/category/:id", getCategory);
categoryRouter.get("/category/search", getAllCategories);
// routes need autenticate user
categoryRouter.post('/category', tokenCheck, createCategory)
categoryRouter.put('/category/:id',tokenCheck, updateCategory)
categoryRouter.delete("/category/:id",tokenCheck, deleteCategory);
