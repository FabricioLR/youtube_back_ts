import sequelize from "../database"
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import User from "./User"
import Video from "./Video"

export interface CommentModel extends Model<InferAttributes<CommentModel>, InferCreationAttributes<CommentModel>>{
    id?: string
    userId: string
    videoId: string
    comment: string
}

const Comment = sequelize.define<CommentModel>("comments", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
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
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

export default Comment