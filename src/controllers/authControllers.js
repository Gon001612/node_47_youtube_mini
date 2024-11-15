import initModels from '../models/init-models.js'
import sequelize from '../models/connect.js'
import {Op} from 'sequelize'; // operater
import bcrypt from 'bcrypt'; // libary ma hoa password 
import transporter from '../config/transporter.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; // lib tạo Token 

// tạo object model đại diện cho tất car model của orm
const model = initModels(sequelize);

dotenv.config();

const signUp = async (req,res) => {
    try {
        // take input in body req (email, full_name, pass_word)
        let {full_name, email, pass_word} = req.body;

        // check eamail already exists in db 
        let checkUser = await model.users.findOne({
            where: {
                email
            }
        })

        // code theo huong fail frist: bat nhung loi case truoc
        // nếu user đã tồn tại trogn db => return error 
        if (checkUser) {
            return res.status(400).json({message:"Email already exists"})
        }
        await model.users.create({
            full_name,
            email,
            pass_word: bcrypt.hashSync(pass_word, 10)
        })

        // send email
        //b1: cấu hình email
        const mailOption = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to Our Service",
            html: `
            <h1> Welcome ${full_name} to Our Service</h1>
            `
        }

        //B2: gửi email
        transporter.sendMail(mailOption, (err, inf) => {
            if (err) {
                return res.status(500).json({message:"Send email fail" })
            }
            return res.status(201).json({message:"Create user successfully"})
        })
    } catch (error) {
        res.status(500).json({message:"error API sign-up"})
    }
}

const login = async (req, res) => {
    try {
        // lấy email và passwrod từ body req
        let {email,pass_word} = req.body;
        
        // kiểm tra email có tồn tại trong db hay ko
        // nếu ko có email return ra error

       let checkUser = await model.users.findOne({
        where:{email}
       });
       if (!checkUser) {
        return res.status(500).json({message:"Email is wrong"})
       }
       let checkPass = bcrypt.compareSync(pass_word, checkUser.pass_word)
       if (! checkPass) { 
        return res.status(400).json({message:"Password is wrong"});
       }

       // dùng libary jsonwebtoken để tạo token

       // tạo payload để lưu vào access token 
       let payload = {
        userID: checkUser.user_id
       }

       let accessToken = jwt.sign({payload: payload}, "NODE47", {
        algorithm: "HS256",
        expiresIn: "30m"
       })
        return res.status(200).json({message:"Login successfully", token: accessToken})
    } catch (error) {
        return res.status(500).json({message: "error API login"})
    }
}

export {
    signUp,
    login
}