import sequelize from "../database"
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import User from "./User"
import Video from "./Video"

export interface HistoricModel extends Model<InferAttributes<HistoricModel>, InferCreationAttributes<HistoricModel>>{
    userId: string
    videoId: string
}

const Historic = sequelize.define<HistoricModel>("historic", {
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: "id"
        }
    },
    videoId: {
        type: DataTypes.UUID,
        references: {
            model: Video,
            key: "id"
        }
    }
})

export default Historic