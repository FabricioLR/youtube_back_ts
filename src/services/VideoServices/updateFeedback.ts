import Video from "../../models/Video"

type PayloadData = {
    [key: string]: number
}

type UpdateFeedbackData = {
    videoId: string
    type: string
}

async function updateFeedback(data: UpdateFeedbackData){
    const types = ["like", "deslike", "removeLike", "removeDeslike"]
    const payload: PayloadData = {}

    try {
        if (!types.includes(data.type)) throw "invalid payload type"

        const video = await Video.findOne({
            where: {
                id: data.videoId
            }
        })

        if (!video) throw "video not found"

        types.map((type, index) => {
            if (data.type == type && index == 0){
                payload.like = Number(video.like) + 1
            }
            if (data.type == type && index == 1){
                payload.deslike = Number(video.deslike) + 1
            }
            if (data.type == type && index == 2 && Number(video.like) != 0){
                payload.like = Number(video.like) - 1
            }
            if (data.type == type && index == 3 && Number(video.deslike) != 0){
                payload.deslike = Number(video.deslike) - 1
            }
        })

        if (Object.keys(payload).length == 0) return 
        
        const update = await Video.update(payload, {
            where: {
                id: video.id
            }
        })

        if (!update) throw "error on update video feedback"

        return
    } catch (error) {
        throw error
    }
}

export default updateFeedback