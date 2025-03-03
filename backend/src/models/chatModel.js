const db = require("../database")

const chats = (req, res) =>{
    const sql = "SELECT * FROM chat_tb"
    db.query(sql, (err, data) =>{
        if(err) return res.json("Error")
        return res.json(data)
    })
}

module.exports = chats