import asyncHandler from "express-async-handler";
import DetailsOrder from "../Models/detailsOrderModel.js";

export const getDetailsOrderAll = asyncHandler(
    async (req, res) => {

        try {
            const details = await DetailsOrder.find({}).sort({ _id: -1 });

            res.status(201).json(details);
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);

export const getDetailsOrderByOrder = asyncHandler(
    async (req, res) => {

        const details = await DetailsOrder.find({"id_order":req.params.id});

        if(!details){
            return res.status(400).json({error: "No existe detalles de la orden"});
        }

        try {
            return res.status(201).json(details);

        } catch (error) {
            return res.status(400).json({ message: 'No hay Details para el Orders', error: error.message });
        }
    }
);

export const postDetailsOrder = asyncHandler(
    async (req, res) => {
        
        const { id_order, id_product, quantity } = req.body;

        const new_details = new DetailsOrder({
            id_order,
            id_product,
            quantity,
            created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
            updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
        });

        try {
            const created_details = await new_details.save();

            return res.status(201).json(created_details);
        } catch (error) {
            return res.status(400).json({ message: 'Data de DetailsBilling es inválido', error: error.message });
        }

    }
);