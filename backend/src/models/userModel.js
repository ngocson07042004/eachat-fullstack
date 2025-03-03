const db = require("../database")

const userModel = {
    login: (req, res) =>{
        let sql = "SELECT * FROM user_tb WHERE `Username` = ? AND `Password` = ?"
    
        db.query(sql, [req.body.username, req.body.password], (err, data) =>{
            if(err) return res.json("Error")
            if(data.length > 0)
                return res.json("Success")
            else
                return res.json("Failed")
        })
    },

    signUp: (req, res) =>{
        let sqlInsert = "INSERT INTO user_tb (`Username`, `Password`, `CorfimPassword`) VALUES (?)"
        let sqlSelect = "SELECT * FROM user_tb WHERE `Username` = ?"
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
        let sql = "UPDATE user_tb SET `Password` = ?, `CorfimPassword` = ? WHERE `Username` = ?"
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

    getUser: (req, res) =>{
        const sql = "SELECT * FROM user_tb"
        db.query(sql, (err, data) =>{
            if(err) return res.json("Error")
            return res.json(data)
        })
    }
}

module.exports = userModel