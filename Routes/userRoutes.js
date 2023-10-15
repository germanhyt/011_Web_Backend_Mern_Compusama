import express from "express";
import {
    getProfileUser,
    getUsers,
    postLoginUser,
    postRegisterUser,
    putProfileUser
} from "../Controllers/user.controller.js";


const userRoute = express.Router();

userRoute.post("/login", postLoginUser);
userRoute.post("/register", postRegisterUser);
userRoute.get("/profile", getProfileUser);
userRoute.put("/profile",putProfileUser);
userRoute.get("/",getUsers);

export default userRoute;