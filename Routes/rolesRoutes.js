import express from "express";
import {
  getRolesAll,
  getRolesByUser,
  postRoles,
  deleteRol,
} from "../Controllers/roles.controller.js";
import { protect } from "../Middleware/AuthMiddleware.js";

const rolesRoute = express.Router();

rolesRoute.get("/all", protect, getRolesAll);
rolesRoute.get("/:id", protect, getRolesByUser);
rolesRoute.post("/", protect, postRoles);
rolesRoute.delete("/:id", protect, deleteRol);

export default rolesRoute;
