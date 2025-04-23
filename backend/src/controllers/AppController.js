const data = require("../models/appModel")

const getData = (req, res) => {
    data((err, data) => {
        if(err) return res.json("Error")
        return res.json(data)
    })
}

module.exports = getData