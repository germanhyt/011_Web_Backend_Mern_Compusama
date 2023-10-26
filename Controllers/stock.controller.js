import asyncHandler from "express-async-handler";
import Stock from "../Models/stockModel.js";

export const getStockAll = asyncHandler(
    async (req, res) => {

        try {
            const stocks = await Stock.find({}).sort({ _id: -1 });

            res.status(201).json(stocks);
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);

export const getStockByProduct = asyncHandler(
    async (req, res) => {

        const stock = await Stock.findOne({ "id_product": req.params.id });

        try {
            return res.status(201).json(stock);

        } catch (error) {
            return res.status(400).json({ message: 'No hay Stock del Producto', error: error.message });
        }
    }
);


export const postStock = asyncHandler(
    async (req, res) => {

        const { id_product, quantity } = req.body;
        const StockExist = await Stock.findOne({ "id_product": id_product });

        if (StockExist) {
            return res.status(400).json({ error: 'Ya existe stock registrado del Producto' });
        } else {

            const new_Stock = new Stock({
                id_product,
                quantity,
                created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
                updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
            });

            try {
                const created_Stock = await new_Stock.save();

                return res.status(201).json(created_Stock);
            } catch (error) {
                return res.status(400).json({ message: 'Data de Stock es inválido', error: error.message });
            }

        }
    }
);