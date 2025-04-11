const express = require("express")
const router = express.Router()

const user = require("../controllers/AuthController")
const getData = require("../controllers/AppController")
const dataChat = require("../controllers/ChatController")
const upload = require("../Multer")

//POST
router.post("/", user.login)
router.post("/signup", upload.single("avatar"), user.signUp)
router.post("/change-password", user.changePassword)

//GET
router.get("/chat", getData)
router.get("/chat/:id", dataChat)
router.get("/api/users/:username", user.getDataUser)

module.exports = router