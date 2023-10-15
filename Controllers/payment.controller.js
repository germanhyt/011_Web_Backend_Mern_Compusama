import asyncHandler from "express-async-handler";
import Payment from "../Models/paymentModel";

export const getPaymentAll = asyncHandler(
    async (req, res) => {

        try {
            const paymentes = await Payment.find({}).sort({ _id: -1 });

            res.status(201).json(paymentes);
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);

export const getPaymentByBilling = asyncHandler(
    async (req, res) => {

        const payments = await Payment.find({ "id_billing": req.params.id_billing });

        try {
            return res.status(201).json(payments);

        } catch (error) {
            return res.status(400).json({ message: 'No hay Payments para el Billing', error: error.message });
        }
    }
);

export const postPayment = asyncHandler(
    async (req, res) => {

        const { id_billing, method, amount_total } = req.body;
        const paymentExist = await Payment.findOne({ "id_billing": id_billing });

        if (paymentExist) {
            return res.status(400).json({ error: 'Ya existe un Payment con el mismo id' });
        } else {

            const new_Payment = new Payment({
                id_billing,
                method,
                amount_total,
                created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
                updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
            });

            try {
                const created_Payment = await new_Payment.save();

                return res.status(201).json(created_Payment);
            } catch (error) {
                return res.status(400).json({ message: 'Data de Payment es inválido', error: error.message });
            }

        }
    }
);