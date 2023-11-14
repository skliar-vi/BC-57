const multer = require('multer')
const path = require('path')

const destination = path.resolve('temp')

const multerConfig = multer.diskStorage({
    destination,
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
})

// const multerConfig = multer.memoryStorage()

const upload = multer({
    storage: multerConfig
})

module.exports = upload