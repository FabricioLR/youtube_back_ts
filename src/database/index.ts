import { Sequelize } from "Sequelize"

const sequelize = new Sequelize((process.env.url as string))

export default sequelize