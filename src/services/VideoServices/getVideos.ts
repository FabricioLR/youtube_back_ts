import User from "../../models/User"
import Video from "../../models/Video"

async function getVideos(){
    try {
        const videos = await Video.findAll({
            include: {
                model: User,
                as: "user",
                attributes: ["id", "name", "profileImage"]
            }
        })

        if (!videos) throw "get videos failed"

        return videos
    } catch (error) {
        throw error
    }
}

export default getVideos