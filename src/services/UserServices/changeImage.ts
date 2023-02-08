import User from "../../models/User"

type ChangeImageData = {
    userId: string
    url: string
}

async function changeImage(data: ChangeImageData){
    try {
        const user = await User.update({
            profileImage: data.url
        }, {
            where: {
                id: data.userId
            }
        })

        if (!user) throw "update profile image failed"
    } catch (error) {
        throw error
    }
}

export default changeImage