import User from "../../models/User"
import Video from "../../models/Video"

type GetData = {
    userId: string
}

async function get(data: GetData){
    try {
        const user = await User.findOne({
            where: {
                id: data.userId
            },
            attributes: ["id", "name", "profileImage"],
            include: {
                model: Video,
                as: "userVideos"
            }
        })

        if (!user) throw "user not found"

        return user
    } catch (error) {
        throw error
    }
}

export default get
