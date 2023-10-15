import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/connectdb.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import productRoute from "./Routes/productRoutes.js";
import orderRoute from "./Routes/orderRoutes.js";
import userRoute from "./Routes/userRoutes.js";
import addressRoute from "./Routes/addressRoutes.js";
import cors from "cors";
import subcategoryRoute from "./Routes/subcategoryRoutes.js";
import brandRoute from "./Routes/brandRoutes.js";
import stockRoute from "./Routes/stockRoutes.js";
import reviewsRoute from "./Routes/reviewsRoutes.js";
import rolesRoute from "./Routes/rolesRoutes.js";

//Usamos 
dotenv.config(
    { path: './config/.env' }
);
connectDatabase();
const app = express();
app.use(
    express.json()
);
app.use(cors());

// End Points
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/Stock", stockRoute);
app.use("/api/brand", brandRoute);
app.use("/api/order", orderRoute);
app.use("/api/address", addressRoute);
app.use("/api/subcategory", subcategoryRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/roles", rolesRoute);

// Error Handler
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server run in port ${PORT}`));