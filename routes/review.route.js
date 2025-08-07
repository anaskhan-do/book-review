const express = require("express")
const { addReview, updateReview, delReview, getAllReview } = require("../controllers/review.controller")
const { authMidlleware } = require("../Middleware/authmiddleware")


const router = express.Router()







router.post("/addReview/:id",authMidlleware , addReview)

router.put("/updateReview/:id" ,authMidlleware , updateReview)

router.delete("/delReview/:id",authMidlleware , delReview)

router.get("/getAllReviews" , getAllReview)























module.exports = router