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

        const roles = await Roles.find({ "id_user": req.params.id });
        // console.log(roles);

        try {
            return res.status(201).json(roles);

        } catch (error) {
            return res.status(400).json({ message: 'No hay Roles para el usuario', error: error.message });
        }
    }
);


export const  postRoles = asyncHandler(
    async (req, res) => {

        const {id_user, name, description, image } = req.body;
        const rolesExist = await Roles.findOne({ "name": name });

        if (rolesExist) {
            return res.status(400).json({message:'Ya existe roles para el usuario con el mismo nombre', error:error.message });
        }

        const new_Roles = new Roles({
            id_user,
            name,
            description,
            image,
            created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
            updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
        });

        try {
            const created_Roles = await new_Roles.save();
            // console.log(created_Roles);
            return res.status(201).json(created_Roles);
        } catch (error) {
            return res.status(400).json({ message: 'Data de Roles es inválido', error: error.message });
        }


    }
);


export const deleteRol = asyncHandler(

    async (req, res) => {
        const rolUser = await Roles.findById(req.params.id);

        if (rolUser) {
            await Roles.remove();

            return res.json({ message: 'Rol eliminado' });
        } else {
            return res.status(404).json({ error: 'Rol Not Found' });
        }
    }
);