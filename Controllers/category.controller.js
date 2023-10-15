import asyncHandler from "express-async-handler";
import Category from "../Models/categoryModel";

export const getCategoryAll = asyncHandler(
    async (req, res) => {

        try {
            const categories = await Category.find({}).sort({ _id: -1 });

            res.status(201).json(categories);
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);


export const postCategory = asyncHandler(
    async (req, res) => {

        const { name, description, discount, image } = req.body;
        const categoryExist = await Category.findOne({ "name": name });

        if (categoryExist) {
            return res.status(400).json({ message: 'Ya existe un Category con el mismo nombre' });
        } else {

            const new_Category = new Category({
                name,
                description,
                discount,
                image,
                created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
                updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
            });

            try {
                const created_Category = await new_Category.save();

                return res.status(201).json(created_Category);
            } catch (error) {
                return res.status(400).json({ message: 'Data de Category es inválido', error: error.message });
            }

        }
    }
);