import { Secret, sign } from "jsonwebtoken"

export const createTokenMock = (id: string, secret: Secret) => {
    const token = sign({ id }, secret, {
        expiresIn: 86400,
    })

    return token
}

export const createToken = (id: string) => createTokenMock(id, process.env.SECRET as Secret)