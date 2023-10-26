import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/connectdb.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import cors from "cors";
import productRoute from "./Routes/productRoutes.js";
import orderRoute from "./Routes/orderRoutes.js";
import userRoute from "./Routes/userRoutes.js";
import addressRoute from "./Routes/addressRoutes.js";
import subcategoryRoute from "./Routes/subcategoryRoutes.js";
import brandRoute from "./Routes/brandRoutes.js";
import stockRoute from "./Routes/stockRoutes.js";
import reviewsRoute from "./Routes/reviewsRoutes.js";
import rolesRoute from "./Routes/rolesRoutes.js";
import billingRoute from "./Routes/billingRoutes.js";
import businessRoute from "./Routes/businessRoutes.js";
import categoryRoute from "./Routes/categoryRoutes.js";
import detailsBillingRoute from "./Routes/detailsBillingRoutes.js";
import detailsOrderRoute from "./Routes/detailsOrderRoutes.js";
import paymentRoute from "./Routes/paymentRoutes.js";

//Usamos
dotenv.config({ path: "./config/.env" });
connectDatabase();

const app = express();
app.use(express.json());
app.use(cors());

// End Points
app.use("/api/address", addressRoute);
app.use("/api/billing", billingRoute);
app.use("/api/business", businessRoute);
app.use("/api/category", categoryRoute);
app.use("/api/details-billing", detailsBillingRoute);
app.use("/api/details-order", detailsOrderRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/brand", brandRoute);
app.use("/api/subcategory", subcategoryRoute);

app.use("/api/products", productRoute);
app.use("/api/Stock", stockRoute);

app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/roles", rolesRoute);

// Error Handler
app.use(notFound);
app.use(errorHandler);

//Exportamos la app
export default app;
