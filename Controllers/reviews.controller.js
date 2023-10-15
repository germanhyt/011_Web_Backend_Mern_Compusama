import asyncHandler from "express-async-handler";
import Reviews from "../Models/reviewsModel.js";
import Product from "../Models/productModel.js";
import User from "../Models/userModel.js";


const getReviewsByProduct = asyncHandler(
    async (req, res) => {
        try {

            const product = await Product.findById(req.params.id);
            // console.log(product)
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            const reviews = await Reviews.find({ id_product: product.id });
            // console.log(reviews)
            return res.json(reviews);

        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    }
);

const postReview = asyncHandler(
    async (req, res) => {

        const { id_product, id_user, name, rating, comment } = req.body;

        // Verificar si el producto existe
        let product = await Product.findOne({ _id: id_product });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Verificar si ya existe una reseña con el mismo comentario
        let existingReview = await Reviews.findOne({ "comment": comment });
        if (existingReview) {
            return res.status(400).json({ error: 'Ya realizó un comentario igual, No haga spam' });
        }

        // Obtener los datos del usuario
        let user = await User.findOne({ _id: id_user }); //cambiar por usuario logeado
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Crear una nueva reseña
        const newReview = new Reviews({
            id_product: product._id,
            id_user: user._id,
            name: name,
            rating: rating,
            comment: comment,
            created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
            updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
        });

        try {
            // Guardar la nueva reseña en la base de datos
            const createdReview = await newReview.save();

            return res.status(201).json(createdReview);
        } catch (error) {
            return res.status(500).json({ message: 'Error de Servidor', error: error.message });
        }
    });



export { getReviewsByProduct, postReview };