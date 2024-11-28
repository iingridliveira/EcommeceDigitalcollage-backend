import express from "express"
import { createProduct } from "../controllers/product.controller.js";
import { tokenCheck } from "../middleware/authUser.middleware.js";

export const productRouter = express.Router();


productRouter.post("/product", tokenCheck, createProduct);