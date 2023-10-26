import asyncHandler from "express-async-handler";
import Billing from "../Models/billingModel.js";

export const getBillingAll = asyncHandler(
    async (req, res) => {

        try {
            const billings = await Billing.find({}).sort({ _id: -1 });

            return res.status(201).json(billings);
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);

export const getBillingsByOrder = asyncHandler(
    async (req, res) => {

        const billings = await Billing.findOne({ "id_order": req.params.id });

        try {
            return res.status(201).json(billings);

        } catch (error) {
            return res.status(400).json({ message: 'No hay Facturas para la orden', error: error.message });
        }
    }
);


export const postBilling = asyncHandler(
    async (req, res) => {

        const { id_order, number_billing } = req.body;
        const billingExist = await Billing.findOne({ "id_order": id_order });

        if (billingExist) {
            return res.status(400).json({ error: 'Ya existe una factura de este ordden' });
        } 

        const new_billing = new Billing({
            id_order,
            number_billing,
            created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
            updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
        });

        try {
            const created_billing = await new_billing.save();

            return res.status(201).json(created_billing);
        } catch (error) {
            return res.status(400).json({ message: 'Data de Factura o Billing es inválido', error: error.message });
        }
    }
);


