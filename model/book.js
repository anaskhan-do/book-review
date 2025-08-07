const mongoose = require("mongoose")


const bookSchema = new mongoose.Schema({

title:{

    type: String,
    require: true,
    trime: true

},

auther:{

    type: String,
    require: true,
    trim: true

},

adminId :{

    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},


  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    required: true
  },

createAt:{

    type : Date,
    default: Date.now
}


});




const Book = mongoose.model("Book" , bookSchema);
module.exports = Book;



