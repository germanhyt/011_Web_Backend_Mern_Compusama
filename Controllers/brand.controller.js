import asyncHandler from "express-async-handler";
import Brand from "../Models/brandModel.js";


const getBrandAll = asyncHandler(
    async (req, res) => {

        try {
            const brands = await Brand.find({}).sort({ _id: -1 });

            res.status(201).json(brands);
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);

const postBrand = asyncHandler(
    async (req, res) => {

        const { name, description } = req.body;
        const brandExist = await Brand.findOne({ "name": name });

        if (brandExist) {
            return res.status(400).json({ error: 'Ya existe un Brand con ese nombre' });
        } else {

            const new_Brand = new Brand({
                name,
                description,
                created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
                updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
            });

            try {
                const created_Brand = await new_Brand.save();

                return res.status(201).json(created_Brand);
            } catch (error) {
                return res.status(400).json({ message: 'Data de Brand es inválido', error: error.message });
            }
        }
    }
);

export { getBrandAll, postBrand };


