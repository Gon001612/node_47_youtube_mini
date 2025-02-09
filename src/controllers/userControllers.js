import connect from '../../db.js'

import initModels from '../models/init-models.js'
import sequelize from '../models/connect.js'
import {Op} from 'sequelize'

// tạo object model đại diện cho tất car model của orm
const model = initModels(sequelize);

const getUser = async (req, res) => {
    try {
        const [data] = await connect.query(`
            select * from users
            `)
        res.send(data)
    } catch (error) {
        return res.status(500).json({ message: "error from get user " })
    }
}

const getUserById = async (req,res) => {
    try {
        let {user_id} = req.params;
        let data = await model.users.findOne({
            where:{user_id}
        })
        return res.status(200).json(data)
        
    } catch (error) {
        return res.status(500).json({message:"Error API get user by id"})
    }
}

const createUser = async (req,res) => {
    try {
        let {full_name, email} = req.body;
        await model.users.create({
            data: {
                full_name,
                email
            }
        })
        return res.status(201).json({message: "Create user successfully"})
    } catch (error) {
        return res.status(500).json({message: "error from API"})
    }
}

export {
    getUser,
    createUser,
    getUserById,
}