import asyncHandler from "express-async-handler";
import Subcategory from "../Models/subcategoryModel.js";

export const getSubcategoryAll = asyncHandler(
    async (req, res) => {

        try {
            const subcategories = await Subcategory.find({}).sort({ _id: -1 });

            res.status(201).json(subcategories);
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);

export const getSubcategoriesByCategory = asyncHandler(
    async (req, res) => {

        const subcategories = await Subcategory.find({ "id_category": req.params.id });
        
        try {
            return res.status(201).json(subcategories);

        } catch (error) {
            return res.status(400).json({ message: 'No hay subcategories para el usuario', error: error.message });
        }
    }
);


export const postSubcategory = asyncHandler(
    async (req, res) => {

        const { id_category,name, description, discount, image } = req.body;
        const SubcategoryExist = await Subcategory.findOne({ "name": name });

        if (SubcategoryExist) {
            return res.status(400).json({ error: 'Ya existe una Subcategory con el mismo nombre' });
        }

        const new_Subcategory = new Subcategory({
            id_category,
            name,
            description,
            discount,
            image,
            created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
            updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
        });

        try {
            const created_Subcategory = await new_Subcategory.save();

            return res.status(201).json(created_Subcategory);
        } catch (error) {
            return res.status(400).json({ message: 'Data de Subcategory es inválido', error: error.message });
        }

    }
);