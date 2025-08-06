const express = require("express");
const { createBook, updateBook, deleteBook } = require("../controllers/book.controller");
const { isAdmin, authMidlleware } = require("../Middleware/authmiddleware");


const router = express.Router()









router.post("/createBook",[authMidlleware,isAdmin], createBook)
router.put("/updateBook/:id", updateBook)
router.delete("/deleteBook/:id" , deleteBook)









module.exports = router














