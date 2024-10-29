import express from "express"
import { getUser } from "../controllers/userControllers.js";

const userRoutes = express.Router();

// define API get list users
userRoutes.get("/get-users", getUser);

export default userRoutes;