const express = require("express")
const connectDb = require("./db/connectDb")

require("dotenv").config()

const app  = express()
const PORT = process.env.PORT || 4002


app.use(express.json());
app.use(express.urlencoded({extended : true}));



















connectDb()

app.use("/auth",require("./routes/auth.routes"))
app.use("/book",require("./routes/book.route"))
app.use("/review",require("./routes/review.route"))








app.listen(PORT , () => {
console.log(`server is running on this ${PORT}`)

});