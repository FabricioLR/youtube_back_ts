import sequelize from "../database"
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "Sequelize"
import User from "./User"

export interface VideoModel extends Model<InferAttributes<VideoModel>, InferCreationAttributes<VideoModel>>{
    id?: string
    title: string
    url: string
    like?: number
    deslike?: number
    visualizations?: number
    userId: string
}

const Video = sequelize.define<VideoModel>("videos", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    like: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    deslike: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    visualizations: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: "id"
        }
    }
})

export default Video