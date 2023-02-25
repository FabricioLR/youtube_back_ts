import { compare } from "bcryptjs"

export const verifyPassword = async (password: string, userPassword: string) => {
    if (!await compare(password, userPassword)) return false

    return true
}