import { NextFunction, Request, Response } from "express"
import storage from "./firebase"

const uploadVideo = (request: Request, response: Response, next: NextFunction) => {
    if (!request.file) return next()

    const video = request.file
    const arquivoName = Number(new Date()) + "." + video.originalname.split(".").pop()

    const file = storage.file("/videos" + arquivoName)

    const stream = file.createWriteStream({
        metadata: {
            contentType: video.mimetype
        }
    })

    stream.on("finish", async () => {
        await file.makePublic()

        response.locals.file = { url: file.publicUrl() }
        
        next()
    })

    stream.end(video.buffer)
}

export default uploadVideo