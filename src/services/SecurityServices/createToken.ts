import { Secret, sign } from "jsonwebtoken"

function createToken(id: string){
    const token = sign({ id }, (process.env.SECRET as Secret), {
        expiresIn: 86400,
    })

    return token
}

export default createToken