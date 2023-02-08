import Historic from "../../models/Historic"

type ClearData = {
    userId: string
}

async function clear(data: ClearData){
    try {
        await Historic.destroy({
            where: {
                userId: data.userId
            }
        })
    } catch (error) {
        throw error
    }
}

export default clear