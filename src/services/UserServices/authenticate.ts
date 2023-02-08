import User from "../../models/User"
import Video from "../../models/Video"
import createToken from "../SecurityServices/createToken"
import verifyPassword from "../SecurityServices/verifyPassword"

type AuthenticateData = {
    email: string
    password: string
}

async function authenticate(data: AuthenticateData){
    try {
        const user = await User.findOne({ 
            where: {
                email: data.email
            },
            attributes: ["id", "name", "profileImage", "password"],
        })
        
        if (!user) throw "user not found"
    
    
        const verify = await verifyPassword({ password: data.password, userPassword: (user.password as string) })

        if (!verify) throw "invalid password or email"
    
        const token = createToken((user.id as string))

        const user1 = await User.findOne({ 
            where: {
                id: user.id
            },
            attributes: ["id", "name", "profileImage", "password"],
            include: {
                model: Video,
                as: "userVideos"
            }
        })
    
        return [user1, token]
    } catch (error) {
        throw error
    }
}

export default authenticate