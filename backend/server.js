const express = require("express")
const cors = require("cors")
const Server = require("socket.io").Server
const http = require("http")
const router = require("./src/routers/webRouter")
const db = require("./src/database")

const app = express()
app.use(express.json())
app.use(cors())

//Server
const server = http.createServer(app)
const io = new Server(server, {cors:{ origin: "*"}})

//Khai bao router
app.use("/", router)

//Socket
io.on("connection", (socket) => {
    console.log("connected")
  
    // Khi người dùng tham gia phòng, gán họ vào phòng theo tên phòng
    socket.on("join", ({ username, room }) => {
      socket.username = username
      socket.room = room
      socket.join(room) // Gán người dùng vào phòng theo tên phòng
      console.log(`${username} đã gia nhập phòng: ${room}`)
    })
  
    // Khi người dùng gửi tin nhắn, phát tin nhắn tới tất cả người dùng trong phòng, trừ người gửi
    socket.on("send", (data) => {
      const { username, message, roomName } = data
      console.log(data)
      // Gửi tin nhắn tới tất cả những người trong phòng, trừ người gửi
      socket.to(roomName).emit("receiver", { username, message })
      console.log(`Sent message to room: ${roomName}`)
    })
  
    socket.on("disconnect", () => {
      console.log("disconnected")
    })
  })

server.listen(8081, () => console.log("listening..."))

