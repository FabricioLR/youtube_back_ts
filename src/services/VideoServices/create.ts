import User from "../../models/User"
import Video from "../../models/Video"

type CreateData = {
    owner: string
    title: string
    url: string
}

async function create(data: CreateData){
    try {
        const user = await User.findByPk(data.owner)

        if (!user) throw "user not found"
        
        const video = await Video.create({
            title: data.title,
            url: data.url,
            userId: data.owner
        })

        if (!video) throw "create video failed" 
        
        return video
    } catch (error) {
        throw error
    }
}

export default create