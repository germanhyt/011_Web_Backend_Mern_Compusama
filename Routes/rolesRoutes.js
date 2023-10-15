import express from "express";
import { getRolesAll, getRolesByUser, postRoles } from "../Controllers/roles.controller.js";

const rolesRoute = express.Router();

rolesRoute.get("/all", getRolesAll);
rolesRoute.get("/:id", getRolesByUser);
rolesRoute.post("/", postRoles);

export default rolesRoute;


