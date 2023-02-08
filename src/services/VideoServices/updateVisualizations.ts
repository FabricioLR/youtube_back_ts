import Video from "../../models/Video"

type UpdateVisualizationsData = {
    videoId: string
}

async function updateVisualizations(data: UpdateVisualizationsData){
    try {
        const video = await Video.findOne({
            where: {
                id: data.videoId
            }
        })

        if (!video) throw "video not found"
    
        const visualizations = await Video.update(
            {
                visualizations: (video.visualizations as number) + 1
            },
            {
                where: {
                    id: data.videoId
                }
            }
        )

        video.dataValues.visualizations = (video.visualizations as number) + 1

        return video
    } catch (error) {
        throw error
    }
}

export default updateVisualizations