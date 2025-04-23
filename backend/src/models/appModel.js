const db = require("../database")

const getDataApp = (callback) => {
    let sql = `SELECT u.username, u.lastname, u.name, u.avatar, m.room_id, m.sender_id, m.content, m.created_at
                FROM users u
                INNER JOIN messages m ON m.sender_id = u.username
                ORDER BY m.created_at DESC`

    db.query(sql, (err, data) => {
        callback(err, data)
    })
}

module.exports = getDataApp