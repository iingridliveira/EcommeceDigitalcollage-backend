import express from "express";
import {
  createProduct,
  getAllproducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { tokenCheck } from "../middleware/authUser.middleware.js";

export const productRouter = express.Router();

productRouter.get("/product/search", getAllproducts);
productRouter.get("/product/:id");
// routes need autenticate user
productRouter.put("/product/:id",tokenCheck, updateProduct);
productRouter.delete("/product/:id");
productRouter.post("/product",tokenCheck, createProduct);
