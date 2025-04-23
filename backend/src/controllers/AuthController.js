const userModel = require("../models/userModel")

const { getDataUser, getUsername, login, signUp, changePassword } = userModel

const User = {
    getDataUser: (req, res) => {
        const { username } = req.params
        getDataUser(username, (err, data) => {
            if(err) return res.json("Error")
            res.json(data)
        })
    },

    login: (req, res) => {
        login(req, (err, data) => {
            if(err) return res.json("Error")
            if(data.length > 0)
                return res.json("Success")
            else
                return res.json("Failed")
        })
    },

    signUp: (req, res) => {
        signUp(req, (err, data) => {
            if(err) res.json("Error")
            if(getUsername) res.json(data)
            else res.json("Failed")
        })
    },

    changePassword: (req, res) => {
        changePassword(req, (err, data) => {
            if(err) res.json("Error")
            return res.json(data)
        })
    }
}

module.exports = User