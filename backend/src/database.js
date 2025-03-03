const mysql = require("mysql")


const connected = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "eachat"
})


connected.connect(err =>{
    if(err) console.log(err)
    console.log("Connected!")
    connected.query("USE eachat", (error) =>{
        if(error) console.log(err)
        console.log("Connected database!")   
    })
})

module.exports = connected