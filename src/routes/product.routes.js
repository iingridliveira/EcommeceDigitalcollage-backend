import express from "express"
import { createProduct } from "../controllers/product.controller.js";

export const productRouter = express.Router();


productRouter.post("/product", createProduct)