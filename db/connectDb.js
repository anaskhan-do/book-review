const mongoose = require("mongoose")

const connectDb = async () => {

    try {
        await mongoose.connect("mongodb://localhost:27017/book-database", {

        });
        console.log("MongoDB is connected ");

    } catch (error) {


        console.error("MongoDB connnection failed" , error.message);
        process.exit(1);

    }

};  

module.exports = connectDb