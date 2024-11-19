import express from 'express'
import { login, loginFacebook, signUp, forgotPassword, changePassword } from '../controllers/authControllers.js';

const authRoutes = express.Router();


// define API register (sign-up)
authRoutes.post('/sign-up', signUp);

//define API login
authRoutes.post('/login', login)

// define API login facebok
authRoutes.post('/login-facebook', loginFacebook)

//b1: define forgot password
authRoutes.post('/forgot-password', forgotPassword)

// b2: define API change password\
authRoutes.post('/change-password', changePassword)

export default authRoutes;