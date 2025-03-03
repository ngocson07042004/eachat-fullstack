const userModel = require("../models/userModel")

const User = {
    login: userModel.login,
    signUp: userModel.signUp,
    changePassword: userModel.changePassword,
    getUser: userModel.getUser
}

module.exports = User