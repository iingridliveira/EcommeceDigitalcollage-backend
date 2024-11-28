import express from "express"
import { createUser, login } from "../controllers/user.controller.js";



export const userRouter = express.Router();

userRouter.post("/user", createUser);
userRouter.post("/user/token", login);



