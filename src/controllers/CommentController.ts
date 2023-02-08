import { Request, Response } from "express"
import create from "../services/commentServices/create"
import get from "../services/commentServices/get"

class CommentController {
    async create(request: Request, response: Response){
        const { id } = response.locals.user
        const { videoId, comment } = request.body

        try {
            const AddCommentResponse = await create({
                userId: id, videoId, comment
            })

            return response.status(200).send({ comment: AddCommentResponse })
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
    async get(request: Request, response: Response){
        const { videoId } = request.body

        try {
            const GetVideoCommentsResponse = await get({
                videoId
            })

            return response.status(200).send({ comments: GetVideoCommentsResponse})
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
}

export default new CommentController()