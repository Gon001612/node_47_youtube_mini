import express from "express"
import { createUser, getUser,getUserById } from "../controllers/userControllers.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { middlewareToken } from "../config/jwt.js";

// create object model represent for all model
 const model = initModels(sequelize);

const userRoutes = express.Router();

// define API get list users
userRoutes.get("/get-users", middlewareToken,  getUser);
userRoutes.get('/get-user/:user_id',middlewareToken, getUserById);
userRoutes.post('/create-user', createUser)


export default userRoutes;