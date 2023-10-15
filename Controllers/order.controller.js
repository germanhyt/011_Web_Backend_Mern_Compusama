import asyncHandler from "express-async-handler";
import Order from "../Models/orderModel.js";
import User from "../Models/userModel.js";
import DetailsOrder from "../Models/detailsOrderModel.js";
import Business from "../Models/businessModel.js";
import Address from "../Models/addressModel.js";


const postOrder = asyncHandler(
    async (req, res) => {
        const {
            id_user,
            id_business,
            id_address,
            state_order,
            date_delivery,
            date_promised,
        } = req.body;


        const new_order = new Order({
            id_user,
            id_business,
            id_address,
            state_order,
            date_delivery,
            date_promised,
            total: 3000,
            created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
            updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
        });

        try {
            const created_order = await new_order.save();
            console.log(created_order);
            return res.status(201).json(created_order);

        } catch (error) {
            return res.status(400).json({ message: 'Data del Pedido es inválido', error: error.message });
        }

    }
);


const getOrdersAll = asyncHandler(
    async (req, res) => {

        try {
            const ordersAll = await Order.find({}).sort({ _id: -1 });

            res.json(ordersAll)

        } catch (error) {
            return res.status(400).json({ message: 'Data de Orders inválido', error: error.message });
        }

    }
);


const getOrderById = asyncHandler(

    async (req, res) => {
        const order = await Order.findById(req.params.id);

        try {
            return res.json(order);
        } catch (error) {
            return res.status(404).json({ message: "Order Not Found", error: error.message });
        }
    }

);


const putOrderIsPaid = asyncHandler(
    async (req, res) => {
        const order = await Order.findById(req.params.id);

        try {

        } catch (error) {
            return res.status(404).json({ message: "Order Not Found", error: error.message });
        }

    }
);


const putOrderIsDelivered = asyncHandler(
    async (req, res) => {
        const order = await Order.findById(req.params.id);

        try {
            order.state_order = "ENTREGADO";
            order.date_delivery = "2023-09-30";
            order.date_promised = "2023-10-01";

            order.total = 3000.0;
            order.created_at = "2023-09-30";
            order.updated_at = "2023-08-02";

            const updatedOrder = await order.save();
            res.json(updatedOrder);

        } catch (error) {
            return res.status(404).json({ message: "Order Not Found", error: error.message });
        }
    }
);


export { postOrder, getOrdersAll, getOrderById, putOrderIsPaid, putOrderIsDelivered };