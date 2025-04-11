const chat = require("../models/ChatModel")

const getDataChat = (req, res) =>{
    chat(req, (err, data) =>{
         if(err) return res.json("Error")
        return res.json(data)
    })
}

module.exports = getDataChat