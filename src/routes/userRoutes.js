import express from "express"
import { getUser } from "../controllers/userControllers.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

// create object model represent for all model
 const model = initModels(sequelize);

const userRoutes = express.Router();

// define API get list users
userRoutes.get("/get-users", getUser);


export default userRoutes;