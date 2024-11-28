import express from "express"
import { createCategory} from "../controllers/category.controller.js";


export const categoryRouter = express.Router();

categoryRouter.post('/category', createCategory);