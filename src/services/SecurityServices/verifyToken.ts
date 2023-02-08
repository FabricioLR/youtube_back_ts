import { NextFunction, Request, Response } from "express"
import { Secret, verify } from "jsonwebtoken"

const VerifyToken = (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.headers.token as string

        if (token === null || token === undefined || token === "" || token === "null"){
            return response.status(400).send({ error: "token must be provided"})
        }

        verify(token, (process.env.SECRET as Secret), (err, decoded) => {
            if (err) return response.status(400).send({ error: "token invalid" })

            response.locals.user = decoded
            return next()
        })
    } catch (error) {
        return response.status(400).send({ error: "validation token error" })
    }
}

export default VerifyToken