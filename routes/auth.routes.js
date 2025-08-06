const express=require("express")
const { signUp, login } = require("../controllers/auth.controller")
const signUPmiddlware = require("../Middleware/signupmiddleware")
const loginMiddleware = require("../Middleware/loginmiddleware")





const router = express.Router()







router.post("/signUP", signUPmiddlware, signUp)

router.post("/login" , loginMiddleware , login)





















module.exports = router


