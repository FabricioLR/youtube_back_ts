import { NextFunction, Request, Response } from "express";
import storage from "./firebase";

const uploadImage = (request: Request, response: Response, next: NextFunction) => {
    if (!request.file) return next()

    const image = request.file
    const arquivoName = Number(new Date()) + "." + image.originalname.split(".").pop()

    const file = storage.file("/images" + arquivoName)

    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype
        }
    })

    stream.on("finish", async () => {
        await file.makePublic()

        response.locals.file = { url: file.publicUrl() }
        
        next()
    })

    stream.end(image.buffer)
}

export default uploadImage