import express from 'express'
import { login, loginFacebook, signUp } from '../controllers/authControllers.js';

const authRoutes = express.Router();


// define API register (sign-up)
authRoutes.post('/sign-up', signUp);

//define API login
authRoutes.post('/login', login)

// define API login facebok
authRoutes.post('/login-facebook', loginFacebook)

export default authRoutes;