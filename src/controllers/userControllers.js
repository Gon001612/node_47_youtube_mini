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

export {
    getUser,
}