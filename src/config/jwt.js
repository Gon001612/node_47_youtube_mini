import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config();

const createToken = (data) => {
    jwt.sign({ payload: data }, process.env.SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "30m"
    })
}  

// define function để xác minh token
const verifyToken = (token) => {
    try {
        jwt.verify(token, process.env.SECRET_KEY)
        return true;
    } catch (error) {
        return false;
    }
}

// define middleware to check token 
const middlewareToken = (req,res,next) => {
    let {token} = req.headers;
    if (!token) {
        return res.status(401).json({message:"Unauthorized"})
    }
    let checkToken = verifyToken(token);
    if (checkToken) {
        next(); // pass check token
    }
    else {
        return res.status(401).json({message: 'Unauthorized'})
    }
}

export {
    createToken,
    verifyToken,
    middlewareToken,
}