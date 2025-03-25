const db = require("../database")

const getDataChat = (req, res) => {
    const { id } = req.params
    let sql = `SELECT u.username, u.lastname, u.name, u.avatar, m.room_id, m.content, m.created_at
                FROM users AS u
                INNER JOIN messages AS m ON u.username = m.sender_id
                WHERE room_id = ?`
    db.query(sql, [id],(err, data) =>{
        if(err) return res.json("Error")
        return res.json(data)
    })
}

module.exports = getDataChat