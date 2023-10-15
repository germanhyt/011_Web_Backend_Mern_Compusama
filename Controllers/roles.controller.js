import asyncHandler from "express-async-handler";
import Roles from "../Models/rolesModel.js";

export const getRolesAll = asyncHandler(
    async (req, res) => {

        try {
            const roles = await Roles.find({}).sort({ _id: -1 });

            res.status(201).json(roles);
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);

export const getRolesByUser = asyncHandler(
    async (req, res) => {

        const roles = await Roles.find({ "id_user": req.params.id_user });

        try {
            return res.status(201).json(roles);

        } catch (error) {
            return res.status(400).json({ message: 'No hay Roles para el usuario', error: error.message });
        }
    }
);


export const postRoles = asyncHandler(
    async (req, res) => {

        const { name, description, image } = req.body;
        const rolesExist = await Roles.findOne({ "name": name });

        if (rolesExist) {
            return res.status(400).json({ error: 'Ya existe roles con el mismo nombre' });
        } else {

            const new_Roles = new Roles({
                name,
                description,
                image,
                created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
                updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
            });

            try {
                const created_Roles = await new_Roles.save();

                return res.status(201).json(created_Roles);
            } catch (error) {
                return res.status(400).json({ message: 'Data de Roles es inválido', error: error.message });
            }

        }
    }
);