import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  login,
  updateUser,
} from "../controllers/user.controller.js";
import { tokenCheck } from "../middleware/authUser.middleware.js";

export const userRouter = express.Router();

userRouter.post("/user", createUser);
userRouter.post("/user/token", login);
userRouter.get("/user/:id", getUser);

//routes with autenticate of user
userRouter.put("/user/:id", tokenCheck, updateUser);
userRouter.delete("/user/:id", tokenCheck, deleteUser);

