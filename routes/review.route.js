const express = require("express")
const { addReview, updateReview, delReview, getAllReview } = require("../controllers/review.controller")
const { authMidlleware } = require("../Middleware/authmiddleware")


const router = express.Router()







router.post("/addReview/:id",authMidlleware , addReview)
router.put("/updateReview" , updateReview)
router.delete("/delReview" , delReview)
router.get("/getAllReviews" , getAllReview)























module.exports = router