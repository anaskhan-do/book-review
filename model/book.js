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


admin :{

    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}


});




const Book = mongoose.model("Book" , bookSchema);
module.exports = Book;



