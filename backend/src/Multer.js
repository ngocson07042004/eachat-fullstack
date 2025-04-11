const path = require("path")
const multer = require("multer")

// Cấu hình Multer để lưu ảnh vào thư mục server
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./users")
    },
    
    filename: (req, file, cb) => {
        const unique = Date.now() + (Math.random() * 1E9) + path.extname(file.originalname)
        cb(null, unique)
    },
})

const upload = multer({ storage })

module.exports = upload