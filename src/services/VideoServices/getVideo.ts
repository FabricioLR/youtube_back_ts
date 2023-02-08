import User from "../../models/User"
import Video from "../../models/Video"

type GetVideoData = {
    videoId: string
}

async function getVideo(data: GetVideoData){
    try {
        var video = await Video.findByPk(data.videoId, {
            include: {
                model: User,
                as: "user",
                attributes: ["id", "name", "profileImage"]
            }
        })
    
        if (!video) throw "video not found" 
    
        return video
    } catch (error) {
        throw error
    }
}

export default getVideo