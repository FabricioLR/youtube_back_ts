import { Request, Response } from "express"
import clear from "../services/HistoricServices/clear"
import create from "../services/HistoricServices/create"
import get from "../services/HistoricServices/get"

class HistoricController {
    async create(request: Request, response: Response){
        const { videoId } = request.body
        const { id } = response.locals.user

        try {
            const result = await create({
                userId: id, videoId
            })

            return response.status(200).send({ success: true, historic: result })
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
    async get(request: Request, response: Response){
        const { id } = response.locals.user

        try {
            const result = await get({
                userId: id
            })

            return response.status(200).send({ success: true, historic: result })
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
    async clear(request: Request, response: Response){
        const { id } = response.locals.user

        try {
            
            const result = await clear({
                userId: id
            })

            return response.status(200).send({ success: true })
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
}

export default new HistoricController()