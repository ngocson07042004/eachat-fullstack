const db = require("../database")
const { Blockchain, Block } = require("../blockchain")

const userModel = {
    getDataUser: (username, callback) => {
        let sql = "SELECT * FROM users WHERE `username` <> ?"
        db.query(sql, [username],(err, data) => {
            callback(err, data)
        })
    },

    getUsername: () => {
        let sql = "SELECT * FROM users WHERE `username` = ?"
        db.query(sql, [req.body.username], (err, data) => {
            if(err) console.log(err)
            if(data.length > 0)
                return true
        })
        return false
    },

    login: (getReq, callback) => {
        const { username, password } = getReq.body
        let sql = "SELECT * FROM users WHERE `username` = ? AND `password` = ?"
    
        db.query(sql, [username, password], (err, data) => {
            callback(err, data)
        })
    },

    signUp: (getReq, callback) => {
        const { username, password, corfimPassword, name, lastname, dateOfBirth, phone, gender } = getReq.body
        const avatar = getReq.file ? getReq.file.filename : "1744741307078.5808.jpg"
        
        // Khởi tạo blockchain
        const blockchain = new Blockchain()
        const userData = { username, name, lastname, avatar, phone, gender }
        const timestamp = new Date().toISOString()
        const block = new Block(userData, timestamp)
        blockchain.addBlock(block)

        const hashRoom = block.getHash()

        let sql = "INSERT INTO users (`username`, password, `corfimPassword`, `lastname`, `name`, `avatar`, `dateOfBirth`, `gender`, `phone`, `hashRoom`) VALUES (?)"
        const values = [username, password, corfimPassword, lastname, name, avatar, dateOfBirth, gender, phone, hashRoom]

        db.query(sql, [values], (err, data) => {
            callback(err, data)
        })
    },

    changePassword: (getReq, callback) => {
        const { username, password, corfimPassword } = getReq.body
        let sql = "UPDATE users SET `password` = ?, `corfimPassword` = ? WHERE `username` = ?"
        const values = [username, password, corfimPassword]

        db.query(sql, [values], (err, data) => {
            callback(err, data) 
        })
    },
}

module.exports = userModel