import asyncHandler from "express-async-handler";
import DetailsBilling from "../Models/detailsBillingModel.js";


export const getDetailsBillingAll = asyncHandler(
    async (req, res) => {

        try {
            const details = await DetailsBilling.find({}).sort({ _id: -1 });

            res.status(201).json(details);
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);

export const getDetailsByBilling = asyncHandler(
    async (req, res) => {

        const detailsByBilling = await DetailsBilling.find({ "id_billing": req.params.idBilling });

        try {
            return res.status(201).json(detailsByBilling);

        } catch (error) {
            return res.status(400).json({ message: 'No hay Details para el Billing', error: error.message });
        }
    }
);


export const postDetailsBilling = asyncHandler(
    async (req, res) => {

        const { id_billing, id_product, quantity, price } = req.body;

        const new_details = new DetailsBilling({
            id_billing,
            id_product,
            quantity,
            price,
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