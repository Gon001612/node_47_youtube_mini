import express from 'express'

const authRoutes = express.Router();


// define API register (sign-up)
authRoutes.post('/sign-up', signUp);
export default authRoutes;