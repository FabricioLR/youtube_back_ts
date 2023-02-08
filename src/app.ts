import express from "express"
import cors from "cors"
import router from "./router"
import sequelize from "./database"

class App{
    express: express.Express
    constructor(){
        this.express = express()

        this.middleware()
        this.router()
        this.connection()
    }

    middleware(){
        this.express.use(cors())
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: true }))
    }

    router(){
        this.express.use(router)
    }
    
    async connection(){
        require("./models/associations")
        await sequelize.sync()
    }
}

export default new App().express