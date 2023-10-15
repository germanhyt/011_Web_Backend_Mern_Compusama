import asyncHandler from "express-async-handler";
import Product from "../Models/productModel.js";
// import Reviews from "../Models/reviewsModel.js";
// import User from "../Models/userModel.js";
// import Brand from "../Models/brandModel.js";
// import Subcategory from "../Models/subcategoryModel.js";

const getProducts = asyncHandler(
    async (req, res) => {
        try {
            const pageSize = 12;
            const page = Number(req.query.pageNumber) || 1;
            const keyword = req.query.keyword ? {
                name: {
                    $regex: req.query.keyword,
                    $options: "i",
                },
            } : {}
            const count = await Product.countDocuments({ ...keyword });
            const products = await Product.find({ ...keyword })
                .limit(pageSize)
                .skip(pageSize * (page - 1))
                .sort({ _id: -1 });

            return res.json({
                products,
                page,
                pages: Math.ceil(count / pageSize)
            });
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);

const getProductsAll = asyncHandler(
    async (req, res) => {
        try {
            // const products = await Product.find({}).sort({ _id: -1 });
            // return res.status(201).json(products);

            Product.find({})
                .populate('id_brand')
                .populate('id_subcategory')
                .exec()
                .then(products => {
                    // console.log(products);
                    return res.status(201).json(products);
                })
                .catch(err => {
                    console.error(err);
                });

        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);

const getProductId = asyncHandler(
    async (req, res) => {
        try {
            // console.log(req);
            const product = await Product.findById(req.params.id);

            try {
                return res.status(201).json(product);

            } catch (error) {
                return res.status(400).json({ message: 'Product Not Found', error: error.message });
            }

        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);


const postProduct = asyncHandler(

    async (req, res) => {

        const { id_subcategory, id_brand, code, name, description, price, stock_minimun, discount, image1, image2, image3 } = req.body;
        // console.log(req.body);
        const productExist = await Product.findOne({ "name": name })

        if (productExist) {
            return res.status(400).json({ error: 'Ya existe un producto con el mismo nombre' });
            // throw new Error("Existe un producto con el mismo nombre");
        } else {

            const new_product = new Product({
                id_subcategory,
                id_brand,
                code,
                name,
                description,
                price,
                stock_minimun,
                discount,
                image1,
                image2,
                image3,
                created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
                updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
            });

            try {
                const created_product = await new_product.save();

                return res.status(201).json(created_product);
            } catch (error) {
                return res.status(400).json({ message: 'Data del producto es inválido', error: error.message });
            }

        }
    }
);


const putProduct = asyncHandler(

    async (req, res) => {

        const { id_subcategory, id_brand, code, name, description, price, stock_minimun, discount, image1, image2, image3 } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product Not Found' });
        } else {

            product.id_subcategory = id_subcategory || product.id_subcategory;
            product.id_brand = id_brand || product.id_brand;
            product.code = code || product.code;
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.stock_minimun = stock_minimun || product.stock_minimun;
            product.discount = discount || product.discount;
            product.image1 = image1 || product.image1;
            product.image2 = image2 || product.image2;
            product.image3 = image3 || product.image3;
            product.created_at = product.created_at;
            product.updated_at = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

            try {
                const updated_Product = await product.save();

                return res.json(updated_Product);
            } catch (error) {
                return res.status(400).json({ error: 'Data del producto es inválido', error: error.message });
            }
        }

    }
);

const deleteProduct = asyncHandler(

    async (req, res) => {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.remove();

            return res.json({ message: 'Producto eliminado' });
        } else {
            return res.status(404).json({ error: 'Product Not Found' });
            // throw new Error('Product Not Found');
        }
    }
);


export {
    getProducts,
    getProductsAll,
    getProductId,
    postProduct,
    putProduct,
    deleteProduct,
};



