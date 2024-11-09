import initModels from '../models/init-models.js'
import sequelize from '../models/connect.js'
import {Op} from 'sequelize'

// tạo object model đại diện cho tất car model của orm
const model = initModels(sequelize);

const signUp = asyn(req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message:"error API sign-up"})
    }
}