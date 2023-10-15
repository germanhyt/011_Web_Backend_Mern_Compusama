import asyncHandler from "express-async-handler";
import DetailsBilling from "../Models/detailsBillingModel";


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

        const details = await DetailsBilling.find({ "id_billing": req.params.id_billing });

        try {
            return res.status(201).json(details);

        } catch (error) {
            return res.status(400).json({ message: 'No hay Details para el Billing', error: error.message });
        }
    }
);

export const getDetailsByProduct = asyncHandler(
    async (req, res) => {

        const details = await DetailsBilling.find({ "id_product": req.params.id_product });

        try {
            return res.status(201).json(details);

        } catch (error) {
            return res.status(400).json({ message: 'No hay Details para el Billing', error: error.message });
        }
    }
);

export const postDetailsBilling = asyncHandler(
    async (req, res) => {

        const { id_billing, id_product, quantity, price } = req.body;


        const new_details = new Payment({
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