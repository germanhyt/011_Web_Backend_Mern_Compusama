import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import Roles from "../Models/rolesModel.js";

const protect = asyncHandler(
    async (req, res, next) => {

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                // console.log(req.headers.authorization);
                token = req.headers.authorization.split(" ")[1];
                // console.log(token);
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // console.log(decoded)
                req.user = await User.findById(decoded.id).select("-password");
                next();

            } catch (error) {
                res.status(400);
                throw new Error('No autorizado, ya que el token ha expirado y es incorrecto');
            }
        } else {
            res.status(400);
            throw new Error('No se encuentra autenticado');
        }

        if (!token) {
            res.status(401);
            throw new Error('No autorizado, ya que no existe un token de seguridad');
        }

    }
);

const admin = (req, res, next) => {

    const roles = Roles.findOne({ _id: req.user.id });

    if (req.user && roles.name == "Administrador") {
        next();
    } else {
        res.status(401);
        throw new Error('No autorizado, ya que no es admin');
    }
}

export { protect, admin }