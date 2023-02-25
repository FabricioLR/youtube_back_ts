import { NextFunction, Request, Response } from "express"
import { Secret, verify } from "jsonwebtoken"

export const VerifyTokenMock = (request: Request, response: Response, next: NextFunction, secret: Secret) => {
    try {
        const token = request.headers.token as string

        if (token === null || token === undefined || token === "" || token === "null"){
            return response.status(400).send({ error: "token must be provided"})
        }

        verify(token, secret, (err, decoded) => {
            if (err) return response.status(400).send({ error: "invalid token" })

            response.locals.user = decoded
            return next()
        })
    } catch (error) {
        return response.status(400).send({ error: "validation token error" })
    }
}

export const VerifyToken = (request: Request, response: Response, next: NextFunction) => VerifyTokenMock(request, response, next, process.env.SECRET as Secret)