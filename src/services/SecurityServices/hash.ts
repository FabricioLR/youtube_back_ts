import { hash as Hash } from "bcryptjs"

async function hash(password: string){
    const encryptedPassword = await Hash(password, 10)

    return encryptedPassword
}

export default hash