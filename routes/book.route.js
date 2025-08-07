const express = require("express");
const { createBook, updateBook, deleteBook, getAllBooks } = require("../controllers/book.controller");
const { isAdmin, authMidlleware } = require("../Middleware/authmiddleware");


const router = express.Router()









router.post("/createBook",[authMidlleware , isAdmin], createBook)
router.put("/updateBook/:id",[authMidlleware,isAdmin], updateBook)
router.delete("/deleteBook/:id" ,[authMidlleware,isAdmin], deleteBook)
router.get("/getAll", getAllBooks)










module.exports = router














