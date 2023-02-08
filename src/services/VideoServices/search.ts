type SearchData = {
    title: string
}

async function search(data: SearchData){
    //var list0 = []
    try {
        /* const videos = await Video.findAll({
            include: "user"
        })

        if (!videos) throw "get videos failed"
        
        videos.map(video => list0.push(video.dataValues))

        list0.map(video => {
            video.user = video.user.dataValues
            video.user.password = "" 
            video.user.email = ""
        })
    
        const list = []
    
        for (const video of list0){
            if (String(video.title).toLocaleLowerCase().includes(String(data.title).toLocaleLowerCase())){
                list.push(video)
            }
        }
    
        return list */
    } catch (error) {
        throw error
    }
}

export default search