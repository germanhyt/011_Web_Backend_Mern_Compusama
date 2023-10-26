import expres from "express";
import { getBusinessAll, postBusiness } from "../Controllers/business.controller.js";
import { protect } from "../Middleware/AuthMiddleware.js";


const businessRoute=expres.Router();

businessRoute.get("/all",protect, getBusinessAll);
businessRoute.post("/",protect, postBusiness);

export default businessRoute;