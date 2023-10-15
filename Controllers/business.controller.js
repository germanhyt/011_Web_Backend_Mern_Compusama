import asyncHandler from "express-async-handler";
import Business from "../Models/businessModel";

export const getBusinessAll = asyncHandler(
    async (req, res) => {

        try {
            const businesss = await Business.find({}).sort({ _id: -1 });

            res.status(201).json(businesss);
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);

export const postBusiness = asyncHandler(
    async (req, res) => {

        const { name, description, email, phone, address, image } = req.body;
        const businessExist = await Business.findOne({ "name": name });

        if (businessExist) {
            return res.status(400).json({ message: 'Ya existe un Business con el mismo nombre' });
        } else {

            const new_Business = new Business({
                name,
                description,
                email,
                phone,
                address,
                image,
                created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
                updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
            });

            try {
                const created_Business = await new_Business.save();

                return res.status(201).json(created_Business);
            } catch (error) {
                return res.status(400).json({ message: 'Data de Business es inválido', error: error.message });
            }

        }
    }
);