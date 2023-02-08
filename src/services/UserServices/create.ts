import User from "../../models/User"
import createToken from "../SecurityServices/createToken"
import hash from "../SecurityServices/hash"

type CreateData = {
    email: string
    name: string
    password: string
}

async function create(data: CreateData){
    try {
        const UserAlreadyExists = await User.findOne({ 
            where: {
                email: data.email
            },
            attributes: ["id", "name", "profileImage", "password"]
        })

        if (UserAlreadyExists) throw "email already exists"

        const password = await hash(data.password)

        const user = await User.create({ email: data.email, password, name: data.name, profileImage: "" })

        if (!user) throw "create user failed"

        user.password = undefined

        const token = createToken((user.id as string))

        return [user, token]
    } catch (error) {
        throw error
    }
}

export default create