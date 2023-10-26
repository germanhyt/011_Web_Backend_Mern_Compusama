import asyncHandler from "express-async-handler";
import Address from "../Models/addressModel.js";


export const getAddressAll = asyncHandler(
    async (req, res) => {

        try {
            const addresses = await Address.find({}).sort({ _id: -1 });

            res.status(201).json(addresses);
           
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);
    
export const getAddressByUser = asyncHandler(
    async (req, res) => {

        const addresses = await Address.find({ "id_user": req.params.id });

        try {
            return res.status(201).json(addresses);

        } catch (error) {
            return res.status(400).json({ message: 'No hay direcciones para el usuario', error: error.message });
        }
    }
);


 export const postAddress = asyncHandler(
    async (req, res) => {
        
        const { address, street, street_number, floor, department, province, district } = req.body;
       
        const addressExist = await Address.findOne({ "address": address });
        if (addressExist) {
            return res.status(400).json({ error: 'Ya existe una dirección con el mismo nombre'});
        } 
        
        const new_address = new Address({
            id_user: req.user._id,
            address, 
            street,
            street_number,
            floor,
            department,
            province,
            district,
            created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
            updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
        });
 
        try {
            const created_address = await new_address.save();

            return res.status(201).json(created_address);
        } catch (error) {
            return res.status(400).json({ message: 'Data de address es inválido', error: error.message });
        }

    }
);
