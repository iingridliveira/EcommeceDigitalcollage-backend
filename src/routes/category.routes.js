import express from "express"
import { createCategory, updateCategory } from "../controllers/category.controller.js";


export const categoryRouter = express.Router();

categoryRouter.post('/category', createCategory)
categoryRouter.put('/category/:id', updateCategory)