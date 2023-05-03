
const path = require("path")
const fs = require("fs")
const mkdirp = require("mkdirp")
const multer = require("multer");


const storage1 = multer.diskStorage({
    
    destination: async (req, file, cb) => {
        console.log("avvvv",req.user)
        if (!fs.existsSync(`./uploads/property/${req.user}`)) {
            await mkdirp.sync(`./uploads/property/${req.user}`)
        }
        cb(null,`./uploads/property/${req.user}`)
    },

    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },
})

const upload1 = multer({
    storage: storage1,
    // limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        console.log("avvvv mm")
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype === "application/pdf") {
            cb(null, true)
        } else {
            return cb(null, false)
        }
    },
})



  




exports.uploadFile1 = upload1;