import initModels from '../models/init-models.js'
import sequelize from '../models/connect.js'
import { Op } from 'sequelize'; // operater
import bcrypt from 'bcrypt'; // libary ma hoa password 
import transporter from '../config/transporter.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; // lib tạo Token 
import { createToken } from '../config/jwt.js';
import crypto from 'crypto'

// tạo object model đại diện cho tất car model của orm
const model = initModels(sequelize);

dotenv.config();

const signUp = async (req, res) => {
    try {
        // take input in body req (email, full_name, pass_word)
        let { full_name, email, pass_word } = req.body;

        // check eamail already exists in db 
        let checkUser = await model.users.findOne({
            where: {
                email
            }
        })

        // code theo huong fail frist: bat nhung loi case truoc
        // nếu user đã tồn tại trogn db => return error 
        if (checkUser) {
            return res.status(400).json({ message: "Email already exists" })
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
                return res.status(500).json({ message: "Send email fail" })
            }
            return res.status(201).json({ message: "Create user successfully" })
        })
    } catch (error) {
        res.status(500).json({ message: "error API sign-up" })
    }
}

const login = async (req, res) => {
    try {
        // lấy email và passwrod từ body req
        let { email, pass_word } = req.body;

        // kiểm tra email có tồn tại trong db hay ko
        // nếu ko có email return ra error

        let checkUser = await model.users.findOne({
            where: { email }
        });
        if (!checkUser) {
            return res.status(500).json({ message: "Email is wrong" })
        }
        let checkPass = bcrypt.compareSync(pass_word, checkUser.pass_word)
        if (!checkPass) {
            return res.status(400).json({ message: "Password is wrong" });
        }

        // dùng libary jsonwebtoken để tạo token

        // tạo payload để lưu vào access token 
        let payload = {
            userID: checkUser.user_id
        }

        let accessToken = createToken(payload);

        return res.status(200).json({ message: "Login successfully", token: accessToken })
    } catch (error) {
        return res.status(500).json({ message: "error API login" })
    }
}

const loginFacebook = async (req, res) => {
    try {

        let { id, email, name } = req.body;
        // lấy info user tu db
        let checkUser = await model.users.findOne({
            where: { email }
        });
        // nếu email không tồn tại trong db => tiến hành tạo user mới, send mail và return accessToken
        if (!checkUser) {
            let newUser = await model.users.create({
                full_name: name,
                email,
                face_app_id: id
            })
            // send email welcome 
            //b1: cấu hình email
            const mailOption = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Welcome to Our Service",
                html: `
            <h1> Welcome ${name} to Our Service</h1>
            `
            }

            //B2: gửi email
            return transporter.sendMail(mailOption, (err, inf) => {
                if (err) {
                    return res.status(500).json({ message: "Send email fail" })
                }
                // tạo accessToken 
                // tạo payload để lưu vào access token 
                let payload = {
                    userId: newUser.user_id
                }

                let accessToken = createToken(payload)

                return res.status(201).json({ message: "Login successfully", token: accessToken })
            })
        }
        // nếu user đã tồn tại 
        // tạo accessToken 
        // tạo payload để lưu vào access token 
        let payload = {
            userId: checkUser.user_id
        }

        let accessToken = createToken(payload)
        return res.status(200).json({ message: "Login successfully", token: accessToken })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'error API login facbook' })
    }
}

const forgotPassword = async (req, res) => {
    try {
        let { email } = req.body;
        let checkUser = await model.users.findOne({
            where: { email }
        })
        if (!checkUser) {
            return res.status(400).json({ message: "Email is wrong" })
        }
        // tao code
        let randomCode = crypto.randomBytes(6).toString("hex");
        // tao biến để lưu expire code
        let expired = new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
        
        // lưu code vào db
        await model.code.create({
            code: randomCode,
            expired
        })

        // send email gui code forget password 
         // send email welcome 
            //b1: cấu hình email
            const mailOption = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Verify Code",
                html: `
            <h1> ${randomCode} </h1>
            `
            }

            //B2: gửi email
            return transporter.sendMail(mailOption, (err, inf) => {
                if (err) {
                    return res.status(500).json({ message: "Send email fail" })
                }

                return res.status(200).json({ message: "send code change password successfully" })
            })

    } catch (error) {
        return res.status(500).json({ message: "error API forgot password" })
    }
}

const changePassword = async (req, res) => {
    try {
        let {email, code, newPass} = req.body;

        // check email có tồn tại trong db hay ko
        let checkEmail = await model.users.findOne({
            where: {email}
        });

        if (!checkEmail) {
            return res.status(400).json({message:'Email is wrong'})
        }
        if(!code) {
            return res.status(400).json({message:'code is wrong'})
        } 
        let checkCode = await model.code.findOne({
            where: {code}
        })
        if (!checkCode) {
            return res.status(400).json({message:'code is wrong'})
        }

        let hashNewPass = bcrypt.hashSync(newPass,10);
        // c1
        checkEmail.pass_word = hashNewPass;
        checkEmail.save();

        // c2 dùng function update

        // huỷ code sau khi change password
        await model.code.destroy({
            where:{code}
        })
        return res.status(200).json({message:'change password successfully'})
    } catch (error) {
        return res.status(500).json({message: "error API change password"})
    }
}

export {
    signUp,
    login,
    loginFacebook,
    forgotPassword,
    changePassword,
}