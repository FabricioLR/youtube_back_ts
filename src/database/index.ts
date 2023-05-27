import { Sequelize } from "sequelize"

const sequelize = new Sequelize((process.env.url as string))

export default sequelize