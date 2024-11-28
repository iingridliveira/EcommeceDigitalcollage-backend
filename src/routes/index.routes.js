import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { categoryRouter } from "./category.routes.js";
import { productRouter } from "./product.routes.js";

const routes = Router();

routes.use("/v1", userRouter);
routes.use("/v1", categoryRouter);
routes.use("/v1", productRouter)


export { routes };
