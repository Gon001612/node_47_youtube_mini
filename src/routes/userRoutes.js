import express from "express"
import { createUser, getUser } from "../controllers/userControllers.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { middlewareToken } from "../config/jwt.js";

// create object model represent for all model
 const model = initModels(sequelize);

const userRoutes = express.Router();

// define API get list users
userRoutes.get("/get-users", middlewareToken,  getUser);

userRoutes.post('/create-user', middlewareToken, createUser)


export default userRoutes;