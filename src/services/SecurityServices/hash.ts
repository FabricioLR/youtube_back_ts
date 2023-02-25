import { hash as Hash } from "bcryptjs"

export const hash = async (password: string) => {
    return await Hash(password, 10)
}