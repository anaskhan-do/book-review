
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({


    userName: {
        type: String,
        require: true,
        trim: true,
        unique: true

    },

    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true

    },

    password: {
        type: String,
        require: true,

    },

    role: {

        type: String,
        Enumerator: ["user , admin"],
        default: "user"
    },

    createAt:{
        type: Date,
        default : Date.now
    }

});




const User = mongoose.model("User" , userSchema)
module.exports = User;