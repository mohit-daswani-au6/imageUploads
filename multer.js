var multer = require("multer")
var path = require("path")
function injectdate(filename) {
    var extname = path.extname(filename)
    var newfilename = filename.replace(extname, "") + "-" + Date.now() + extname;
    return newfilename
}
var multerconfig = {
    storage: multer.diskStorage({
        destination: "uploads/",
        filename: function (req, file, cb) {
            cb(null, injectdate(file.originalname))
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter(req, file, cb) {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true)
        } else {
            var newError = new Error("file type is incorrect")
            newError.name == "multerError"
            cb(newError, false)
        }
        console.log(file)
    }
    
}
var upload = multer(multerconfig)
module.exports = upload

