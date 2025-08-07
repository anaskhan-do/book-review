
const Book = require("../model/book")
const Review = require("../model/review")
const User = require("../model/user")




const addReview = async (request , response ) => {

try {

  const id = request.params.id

    const { comment , rating} = request.body
   
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
        userId : request.user.id,
        
     
    })
    
    await adR.save()

    return response.status(200).json({

        m: " review added succesfully",
        adR
      
        
    })


} catch (error) {
   
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already reviewed this book"
      });
    }

    return response.status(500).json({
      message: "Internal server error",
      error: error.message
    
})
 }

}



const updateReview = async (request , response ) =>{


    try {

    const id = request.params.id
    // const userI = request.user.id
    const { comment , rating  } = request.body;

    const review = await Review.findById(id)

    if (!review) {
      return response.status(400).json({
        m: " review not found "

      })
    }

    const updated = await Review.findOneAndUpdate(

      { _id: id , userId : id},

      { rating, comment },

      { new: true }

    )
   
    if (!updated) {

      return response.status(400).json({
        m: " review not update and found"

      })
    }

    return response.status(200).json({

      m: " review updated successfully",
      updated

    })


  } catch (error) {

    return response.status(500).json({
      message: "Something went wrong",
      error: error.message

    });

  }
}


const delReview = async(request , response ) =>{

try {


    const id = request.params.id 
    const userI = request.user.id


    const review = await Review.findById({id})


    if(!review){

        return response.status(400).json({

            m : "review not found"
        })
    }


    await Review.findOneAndDelete({_id : id})



    return response.status(200).json({

        m : " review deleted successfully",
        
    })


    
} catch (error) {
    return response.status(500).json({

        m : "internal server error",
        error : error.message
    })
  

}

}




const getAllReview = async (request , response )=>{

try {
    
const allR = await Review.find()
 .populate("userId", "userName" , )   
   .populate("bookId", "title auther");

return response.status(200).json({

    m : " All reviews fetched successfully ",
    allR
})


} catch (error) {
    
 return response.status(500).json({

        m : "internal server error",
        error : error.message
    })

}

}


















module.exports = {

    addReview,
    updateReview,
    delReview,
    getAllReview

}