import Comment from "./Comment"
import Historic from "./Historic"
import User from "./User"
import Video from "./Video"

User.hasMany(Video, { as: "userVideos" })
Video.belongsTo(User, { as: "user" })

User.belongsToMany(Video, { through: Historic })
Video.belongsToMany(User, { through: Historic })

Comment.belongsTo(Video, { as: "video" })
Comment.belongsTo(User, { as: "user" })

