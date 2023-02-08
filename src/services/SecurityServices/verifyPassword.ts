import { compare } from "bcryptjs"

type VerifyPasswordData = {
    password: string
    userPassword: string
}

async function verifyPassword(data: VerifyPasswordData){
    if (!await compare(data.password, data.userPassword)) return false

    return true
}

export default verifyPassword