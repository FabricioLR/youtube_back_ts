import { Request, Response } from "express"
import create from "../services/VideoServices/create"
import getVideo from "../services/VideoServices/getVideo"
import getVideos from "../services/VideoServices/getVideos"
import search from "../services/VideoServices/search"
import updateFeedback from "../services/VideoServices/updateFeedback"
import updateVisualizations from "../services/VideoServices/updateVisualizations"

class VideoController {
    async create(request: Request, response: Response){
        const { title } = request.headers
        const { url } = response.locals.file
        const { id } = response.locals.user

        try {
            const result = await create({
                title: (title as string), owner: id, url
            })

            return response.status(200).send({ video: result })
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
    async getVideos(request: Request, response: Response){
        try {
            const result = await getVideos()
            
            return response.status(200).send({ videos: result })
        } catch (error) {
            console.log(error)
            return response.status(400).send({ error })
        }
    }
    async getVideo(request: Request, response: Response){
        const { videoId } = request.body

        try {
            const result = await getVideo({
                videoId
            })

            return response.status(200).send({ video: result })
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
    async updateVisualizations(request: Request, response: Response){
        const { videoId } = request.body

        try {
            const result = await updateVisualizations({
                videoId
            })

            return response.status(200).send({ video: result })
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
    async search(request: Request, response: Response){
        const { title } = request.body

        try {
            const result = await search({
                title
            })

            return response.status(200).send({ videos: result })
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
    async updateFeedback(request: Request, response: Response){
        const { type, videoId } = request.body

        try {
            const result = updateFeedback({
                type, videoId
            })

            return response.status(200).send()
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
}

export default new VideoController()