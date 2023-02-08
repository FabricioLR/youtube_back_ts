import Comment from "../../models/Comment"
import User from "../../models/User"
import Video from "../../models/Video"

type GetData = {
    videoId: string
}

async function get(data: GetData){
    try {
        const video = await Video.findOne({
            where: {
                id: data.videoId
            }
        })

        if (!video) throw "video not found"
        
        const comments = await Comment.findAll({
            where: {
                videoId: data.videoId
            },
            include: {
                model: User,
                as: "user",
                attributes: ["id", "name", "profileImage"]
            }
        })

        return comments
    } catch (error) {
        throw error
    }
}

export default get