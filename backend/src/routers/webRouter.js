const express = require("express")
const router = express.Router()

const user = require("../controllers/AuthController")
const getChats = require("../controllers/chatController")

//POST
router.post("/", user.login)
router.post("/signup", user.signUp)
router.post("/change-password", user.changePassword)

//GET
router.get("/chat", user.getUser)
router.get("/chat/:id", getChats)

module.exports = router