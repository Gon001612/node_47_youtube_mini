import express from 'express';
import { getTypesVideo, getVideoById, getVideos, getVideosByTypeId } from '../controllers/videoControllers.js';

const videoRoutes = express.Router();

// define API get list videos
videoRoutes.get("/get-videos", getVideos);
// video APi get type video
videoRoutes.get("/get-types-video", getTypesVideo);
// define API get list video by video tpye
videoRoutes.get("/get-videos/:typeId", getVideosByTypeId)
// define API get detail video from video id
videoRoutes.get("/get-video/:videoId", getVideoById)

export default videoRoutes