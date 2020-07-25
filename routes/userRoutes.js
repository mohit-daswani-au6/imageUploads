const {  post,  delete1 } = require("../controller/userController")
const { Router } = require("express")
const router = Router()
//-------------------------------------------------------Post Request Route
router.post("/user/register", post.register_user)
router.post("/user/login", post.login_user)
//-------------------------------------------------------Delete Request Route
router.delete("/user/logout/:userToken", delete1.logout_user)



module.exports = router