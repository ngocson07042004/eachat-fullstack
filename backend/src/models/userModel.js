const db = require("../database")

const userModel = {
    login: (req, res) =>{
        let sql = "SELECT * FROM users WHERE `username` = ? AND `password` = ?"
    
        db.query(sql, [req.body.username, req.body.password], (err, data) =>{
            if(err) return res.json("Error")
            if(data.length > 0)
                return res.json("Success")
            else
                return res.json("Failed")
        })
    },

    signUp: (req, res) =>{
        let sqlInsert = "INSERT INTO users (`username`, `password`, `corfimPassword`) VALUES (?)"
        let sqlSelect = "SELECT * FROM users WHERE `username` = ?"
        const values = [
            req.body.username,
            req.body.password,
            req.body.corfimPassword
        ]

        db.query(sqlSelect, [req.body.username], (err, data) =>{
            if(err) return res.json("Error")
            if(data.length > 0)
                return res.json("Failed")
            else
                db.query(sqlInsert, [values], (result) =>{
                    return res.json(result)
                })
        })
    },

    changePassword: (req, res) =>{
        let sql = "UPDATE users SET `password` = ?, `corfimPassword` = ? WHERE `username` = ?"
        const values = [
            req.body.username,
            req.body.password,
            req.body.corfimPassword
        ]

        db.query(sql, [values], (err, data) =>{
            if(err) return res.json("Error")
            return res.json(data)
            
        })
    },
}

module.exports = userModel