const { Server } = require("socket.io")
const db = require("./database")

function setupServer(server){
  const io = new Server(server, { cors: { origin: "*" } })

  io.on("connection", socket => {
    console.log("connected")

    // Khi người dùng tham gia phòng
    socket.on("join", ({ user, roomid }) => {
      socket.user = user
      socket.roomid = roomid
      socket.join(roomid)
      console.log(`${user} đã gia nhập phòng: ${roomid}`)
    })

    // Khi người dùng gửi tin nhắn
    socket.on("sender", data => {
      const { room_id, sender_id, content } = data

      // Lưu tin nhắn vào database
      const query = "INSERT INTO messages (`room_id`, `sender_id`, `content`) VALUES (?)"
      const values = [room_id, sender_id, content]

      db.query(query, [values], (err) => {
        if(err) console.log(err)
      })

      const msg = { ...data }
      socket.to(room_id).emit("receiver", msg)
      console.log(`Phòng được kết nối: ${room_id}`)
      console.log(msg)
    })

    // Khi người dùng rời phòng
    socket.on("leave", (roomid) => {
      socket.leave(roomid)
      console.log(`${socket.user} đã rời phòng: ${roomid}`)
    })

    // Khi người dùng mất kết nối
    socket.on("disconnect", () => {
      console.log("disconnected")
    })
  })
}

module.exports = setupServer