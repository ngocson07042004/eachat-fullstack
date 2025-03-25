// const express = require("express")
// const cors = require("cors")
// const Server = require("socket.io").Server
// const http = require("http")
// const router = require("./src/routers/webRouter")
// const db = require("./src/database")

// const app = express()
// app.use(express.json())
// app.use(cors())

// //Server
// const server = http.createServer(app)
// const io = new Server(server, {cors:{ origin: "*"}})

// //Khai bao router
// app.use("/", router)

// //Socket
// io.on("connection", (socket) => {
//     console.log("connected")
  
//     // Khi người dùng tham gia phòng, gán họ vào phòng theo tên phòng
//     socket.on("join", ({ username, room }) => {
//       socket.username = username
//       socket.room = room
//       socket.join(room) // Gán người dùng vào phòng theo tên phòng
//       console.log(`${username} đã gia nhập phòng: ${room}`)
//     })
  
//     // Khi người dùng gửi tin nhắn, phát tin nhắn tới tất cả người dùng trong phòng, trừ người gửi
//     socket.on("send", (data) => {
//       const { username, message, roomName } = data
//       console.log(data)
//       // Gửi tin nhắn tới tất cả những người trong phòng, trừ người gửi
//       socket.to(roomName).emit("receiver", { username, message })
//       console.log(`Sent message to room: ${roomName}`)
//     })
  
//     socket.on("disconnect", () => {
//       console.log("disconnected")
//     })
//   })

// server.listen(8081, () => console.log("listening..."))
const express = require("express")
const cors = require("cors")
const { Server } = require("socket.io")
const http = require("http")
const router = require("./src/routers/webRouter")
const db = require("./src/database")  // Đảm bảo import kết nối database

const app = express()
app.use(express.json())
app.use(cors())

//Server
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" }})

//Khai báo router
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

    // Kiểm tra và gửi lại tin nhắn cho người dùng khi họ quay lại
    db.query(
      "SELECT username, message FROM chat_tb WHERE room_name = ? AND username = ? ORDER BY timestamp ASC",
      [room, username],
      (err, results) => {
        if (err) {
          console.error("Error retrieving chat_tb:", err)
          return
        }

        // Gửi lại tất cả các tin nhắn bị bỏ lỡ
        results.forEach((message) => {
          socket.emit("receiver", { username: message.username, message: message.message })
        })

        // Xóa tin nhắn sau khi gửi lại
        db.query(
          "DELETE FROM chat_tb WHERE room_name = ? AND username = ?",
          [room, username],
          (err) => {
            if (err) {
              console.error("Error deleting messages:", err)
            }
          }
        )
      }
    )
  })

  // Khi người dùng gửi tin nhắn
  socket.on("sender", (data) => {
    const { hashRoom, username, message } = data
    console.log(data)

    db.query("INSERT INTO messages (room_id, sender_id, content) VALUES (?, ?, ?)",
        [hashRoom, username, message], err => console.log(err))
      socket.to(roomName).emit("receiver", { username, message })
    })

  socket.on("disconnect", () => {
    console.log(`Đã ngắt kết nối`)
  })
})

server.listen(8081, () => console.log("listening..."))