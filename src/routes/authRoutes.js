import express from 'express'
import { login, signUp } from '../controllers/authControllers.js';

const authRoutes = express.Router();


// define API register (sign-up)
authRoutes.post('/sign-up', signUp);

//define API login
authRoutes.post('/login', login)
export default authRoutes;