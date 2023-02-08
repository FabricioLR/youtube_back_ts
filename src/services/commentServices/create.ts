import Comment from "../../models/Comment"
import User from "../../models/User"
import Video from "../../models/Video"

type CreateData = {
    userId: string
    videoId: string
    comment: string
}

async function create(data: CreateData){
    try {
        const user = await User.findOne({ where: {
            id: data.userId
        }})
    
        const video = await Video.findOne({ where: {
            id: data.videoId
        }})

        if (!video || !user) throw "user or video not found"
        
        const commentC = await Comment.create({
            userId: data.userId, videoId: data.videoId, comment: data.comment
        })

        const comment = await Comment.findOne({
            where: {
                id: commentC.id
            },
            include: {
                model: User,
                as: "user",
                attributes: ["id", "name", "profileImage"]
            }
        })

        if (!comment)throw "add comment error"
        
        return comment
    } catch (error) {
        throw error
    }
}

export default create