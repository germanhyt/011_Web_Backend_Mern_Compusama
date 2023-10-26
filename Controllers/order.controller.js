import asyncHandler from "express-async-handler";
import Order from "../Models/orderModel.js";
// import DetailsOrder from "../Models/detailsOrderModel.js";
// import Business from "../Models/businessModel.js";
// import Address from "../Models/addressModel.js";


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
            // console.log(created_order);
            return res.status(201).json(created_order);

        } catch (error) {
            return res.status(400).json({ message: 'Data del Pedido es inválido', error: error.message });
        }

    }
);


const getOrdersAll = asyncHandler(
    async (req, res) => {

        try {

            Order.find({})
                .populate("id_user")
                .populate("id_business")
                .populate("id_address")
                .exec()
                .then(orders=>{
                    return res.status(201).json(orders);
                })
                .catch(err=>{
                    console.error(err);
                });
                
        } catch (error) {
            return res.status(400).json({ message: 'Data de Orders inválido', error: error.message });
        }

    }
);


const getOrderByLoginUser = asyncHandler(
    async (req,res)=>{
        try{
            const ordersByuser= await Order.find({"id_user":req.user._id}).sort({_id:-1});
            
            res.json(ordersByuser);
            
        }catch(error){
            return res.status(400).json({ message: 'No hay órdenes hechas por el usuario', error: error.message });
        }
    }
);

    
const getOrderById = asyncHandler(

    async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order Not Found" });
        }

        try {

            return res.json(order);
        } catch (error) {
            return res.status(404).json({ message: "Order Not Found", error: error.message });
        }
    }

);


const putOrderChangeState = asyncHandler(
    async (req, res) => {

        const {_id, state_order}= req.body;
        const order = await Order.findById({"_id":_id});

        if (!order) {
            return res.status(404).json({ message: "Order Not Found" });
        }

        try {
              order.state_order= state_order;
              order.updated_at= new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })

           const updated_order= await order.save();

           return res.status(201).json(updated_order);

        } catch (error) {
            return res.status(404).json({ message: "Order Not Found", error: error.message });
        }

    }
);


export { postOrder, getOrdersAll, getOrderById, getOrderByLoginUser, putOrderChangeState };