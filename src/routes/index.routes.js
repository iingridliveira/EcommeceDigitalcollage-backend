import { Router } from "express";
import { userRouter } from "./user.routes.js"

const routes =  Router();

routes.use("/v1",userRouter);


export {routes};