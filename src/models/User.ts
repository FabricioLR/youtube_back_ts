import sequelize from "../database"
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "Sequelize"

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>{
    id?: string
    password?: string
    email: string
    name: string
    profileImage?: string
}

const User = sequelize.define<UserModel>("users", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

export default User