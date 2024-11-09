import initModels from '../models/init-models.js'
import sequelize from '../models/connect.js'
import {Op} from 'sequelize'

// tạo object model đại diện cho tất car model của orm
const model = initModels(sequelize);


const getVideos = async (req,res) => {
    try {
        let page = 2;
        let size = 4;
        let index = (page - 1) * size;
        let data = await model.video.findAll({
            offset: index,
            limit: size
        });
        return res.status(200).json(data)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"error for api get list video"
        })
    }
}

const getTypesVideo = async (req,res) => {
    try {
        let data = await model.video_type.findAll();
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({message:"error for api get video-type"})
    }
}

const getVideosByTypeId = async (req,res) => {
    try {
        let {typeId} = req.params;
        let data = await model.video.findAll({
            where: {
                type_id: typeId
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({message:"error for api get video by types"})
    }
}

const getVideoById = async (req,res) => {
    try {
        let {videoId} = req.params;
        let data = await model.video.findOne({
            where: {
                video_id: videoId,
            },
            include: [
                {
                    model: model.users,
                    as: "user"
                }
            ]
        });
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({message:"error for api get video by id"})
    }
}

export {
    getVideos,
    getTypesVideo,
    getVideosByTypeId,
    getVideoById,
}