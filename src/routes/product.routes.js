import express from "express"
import { createProduct, updateProduct } from "../controllers/product.controller.js";
import { tokenCheck } from "../middleware/authUser.middleware.js";

export const productRouter = express.Router();


productRouter.get("/product/search");
productRouter.get("product/:id");
// routes need autenticate user
productRouter.put("product/:id", updateProduct);
productRouter.delete("/product/:id");
productRouter.post("/product", createProduct);