const express = require("express")
const { getAllBooks, getAllUsers, deleteUser } = require("../controllers/admin.controller")
const { deleteBook } = require("../controllers/book.controller")
const { authMidlleware, isAdmin } = require("../Middleware/authmiddleware")




const router = express.Router()







router.get("/getAllBooks" , getAllBooks)
router.get("/getAllUsers" ,[authMidlleware, isAdmin], getAllUsers)

router.delete("/delBook/:id" , deleteBook)
router.delete("/delUser/:id" , deleteUser)














module.exports = router