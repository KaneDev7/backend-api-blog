
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/images')
    },
    
    filename: function (req, file, cb) {
        cb(null,  file.originalname)
    }
})

const upload = multer({ storage })

module.exports = { upload }