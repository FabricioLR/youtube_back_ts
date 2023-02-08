import Historic from "../../models/Historic"
import User from "../../models/User"
import Video from "../../models/Video"

type CreateData = {
    userId: string
    videoId: string
}

async function create(data: CreateData){
    try {
        const user = await User.findOne({ where: {
            id: data.userId
        }})
    
        const video = await Video.findOne({ where: {
            id: data.videoId
        }})

        const alredyInHistoric = await Historic.findOne({
            where: {
                videoId: data.videoId
            }
        })

        if (alredyInHistoric){
            await Historic.destroy({
                where: {
                    videoId: data.videoId
                }
            })

            const historic = await Historic.create({ videoId: data.videoId, userId: data.userId})

            return historic
        }

        if (!video || !user) throw "user or video not found"
    
        const historic = await Historic.create({ videoId: data.videoId, userId: data.userId})
    
        return historic
    } catch (error) {
        throw error
    }
}

export default create