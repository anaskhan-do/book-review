
const Book = require("../model/book")
const Review = require("../model/review")
const User = require("../model/user")




const addReview = async (request , response ) => {

try {

    const id = request.params.id

    const { comment , rating} = request.body
    const user = await User.findById(request.user.id)
    const book = await Book.findById(id)

    if(!book){

        return response.status(400).json({

            m : "Book not found / cannot add review"
        })
    }

    
    const adR = new Review({

        comment,
        rating,
        bookId: book._id, 
        userId : user._id,
        
     
    })

    console.log(adR);
    
    await adR.save()

    return response.status(200).json({

        m: " review added succesfully",
        adR
        
        
    })


} catch (error) {

    return response.status(500).json({

        m : "internal server error",
        error : error.message
    })
    
}
 }





const updateReview = (request , response ) =>{

}


const delReview = (request , response ) =>{


}




const getAllReview = (request , response )=>{



}


















module.exports = {

    addReview,
    updateReview,
    delReview,
    getAllReview

}