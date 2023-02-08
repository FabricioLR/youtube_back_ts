import { Router } from "express"
import multer from "multer"
import CommentController from "./controllers/CommentController"
import HistoricController from "./controllers/HistoricController"
import UserController from "./controllers/UserController"
import VideoController from "./controllers/VideoController"
import uploadVideo from "./services/firebaseServices/updateVideo"
import uploadImage from "./services/firebaseServices/uploadImage"
import VerifyToken from "./services/SecurityServices/verifyToken"

const Multer = multer({
    storage: multer.memoryStorage(),
    limits:{
        fieldSize: 100000
    }
})

const router = Router()

router.post("/Register", UserController.create)
router.post("/Authenticate", UserController.authenticate)
router.post("/ChangeUserImage", VerifyToken, Multer.single("file"), uploadImage, UserController.changeImage)
router.get("/AuthenticateByToken", VerifyToken, UserController.authenticateByToken)
router.post("/GetUser", UserController.get)

router.post("/CreateVideo", VerifyToken, Multer.single("file"), uploadVideo, VideoController.create)
router.post("/GetVideo", VideoController.getVideo)
router.post("/SearchVideos", VideoController.search)
router.get("/GetVideos", VideoController.getVideos)
router.put("/UpdateVisualizations", VideoController.updateVisualizations)
router.post("/AddFeedback", VideoController.updateFeedback)

router.post("/AddToHistoric", VerifyToken, HistoricController.create)
router.get("/GetHistoric", VerifyToken, HistoricController.get)
router.get("/ClearHistoric", VerifyToken, HistoricController.clear)

router.post("/AddComment", VerifyToken, CommentController.create)
router.post("/GetVideoComments", CommentController.get)

export default router