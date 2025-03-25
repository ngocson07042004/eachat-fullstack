const db = require("../database")

const getDataApp = (req, res) => {
    let sql = `
        SELECT DISTINCT u.username, u.avatar, u.lastname, u.name, 
       rs.hashRoom, rs.roomname, r.role, 
       m.content, m.created_at AS date_time
FROM users AS u
INNER JOIN room_members AS r ON u.username = r.user_id
INNER JOIN rooms AS rs ON r.room_id = rs.hashRoom
LEFT JOIN messages AS m ON m.room_id = rs.hashRoom 
  AND m.created_at = (
      SELECT MAX(m2.created_at) 
      FROM messages AS m2 
      WHERE m2.room_id = rs.hashRoom
  )
WHERE r.role IN ("Quản trị viên", "Thành viên")
ORDER BY rs.hashRoom ASC`

    db.query(sql, (err, data) =>{
        if(err) return res.json("Error")
        return res.json(data)
    })
}

module.exports = getDataApp