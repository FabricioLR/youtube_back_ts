import User from "../../models/User"
import Video from "../../models/Video"

type GetData = {
    userId: string
}

async function get(data: GetData){
    try {
        const user = await User.findOne({ where: {
            id: data.userId
        }})
    
        if (!user) throw "user not found" 
    
        var historic = await User.findAll({
            include: Video,
            where: {
                id: data.userId
            },
            attributes: ["id", "name", "profileImage"],
        })

        if (!historic) throw "get historic failed" 
    
        //historic = historic[0].dataValues
        /* var filteredVideos = []
    
        for (var video in historic.videos){
            filteredVideos.push(historic.videos[video].dataValues)
        }
    
        historic.videos = filteredVideos
    
        delete historic.password */
    
        return historic
    } catch (error) {
        throw error
    }
}

export default get