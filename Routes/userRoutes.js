import express from "express";
import {
  getProfileUser,
  getUsers,
  postLoginUser,
  postRegisterUser,
  putProfileUser,
} from "../Controllers/user.controller.js";
import { protect } from "../Middleware/AuthMiddleware.js";

const userRoute = express.Router();

userRoute.post("/login", postLoginUser);
userRoute.post("/register", postRegisterUser);
userRoute.get("/profile", protect, getProfileUser);
userRoute.put("/profile", protect, putProfileUser);
userRoute.get("/",protect, getUsers);

export default userRoute;
