import express from "express";
import userRoutes from "./userRoutes.js";
import videoRoutes from "./videoRoutes.js";
import authRoutes from "./authRoutes.js";

// define object rootRoutes
const rootRoutes = express.Router();

// import userRoutes in rootRoutes
rootRoutes.use("/user", userRoutes)

// import videoRoutes in rootRoutes
rootRoutes.use('/video',videoRoutes)

// import authRoutes in rootRoutes
rootRoutes.use('/auth',authRoutes)

export default rootRoutes;