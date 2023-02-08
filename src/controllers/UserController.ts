import { Request, Response } from "express"
import authenticate from "../services/UserServices/authenticate"
import authenticateByToken from "../services/UserServices/authenticateByToken"
import changeImage from "../services/UserServices/changeImage"
import create from "../services/UserServices/create"
import get from "../services/UserServices/get"

class UserController {
    async create(request: Request, response: Response){
        const { email, name, password } = request.body

        try {
            const result = await create({
                email, name, password
            })

            return response.status(200).send({ success: true, user: result[0], token: result[1] })
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
    async authenticate(request: Request, response: Response){
        const { email, password } = request.body
    
        try {
            const result = await authenticate({
                email, password
            })

            return response.status(200).send({ success: true, user: result[0], token: result[1] })
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
    async authenticateByToken(request: Request, response: Response){
        const { id } = response.locals.user

        try {
            const result = await authenticateByToken({
                userId: id
            })

            return response.status(200).send({ success: true, user: result })
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
    async changeImage(request: Request, response: Response){
        const { url } = response.locals.file
        const { id } = response.locals.user

        try {
            await changeImage({
                url, userId: id
            })

            return response.status(200).send({ success: true, profileImage: url })
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
    async get(request: Request, response: Response){
        const { userId } = request.body

        try {

            const result = await get({
                userId
            })

            return response.status(200).send({ user: result })
            
        } catch (error) {
            return response.status(400).send({ error })
        }
    }
}

export default new UserController()