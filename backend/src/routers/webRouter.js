const express = require("express")
const router = express.Router()

const user = require("../controllers/AuthController")
const getData = require("../controllers/AppController")
const getChat = require("../controllers/ChatController")

//POST
router.post("/", user.login)
router.post("/signup", user.signUp)
router.post("/change-password", user.changePassword)

//GET
router.get("/chat", getData)
router.get("/chat/:id", getChat)

module.exports = router