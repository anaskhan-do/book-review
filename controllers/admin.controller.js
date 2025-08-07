const User = require("../model/user")
const Book = require("../model/book")






const getAllBooks = async (request, response) => {

    try {


        const { query } = request

        const page = +query.page || 1
        const limit = +query.limit || 5
        const searchValue = query.searchValue
        const skip = (page - 1) * limit

        const searchQuery = {

            
        }

        if (searchValue) {

            searchQuery.$or = [
                { title: { $regex: searchValue, $options: "i" } },
                { auther: { $regex: searchValue, $options: "i" } },

            ];
        }


        const books = await Book.find(searchQuery)
            .skip(skip)
            .limit(limit)

        const totalBooks = await Book.countDocuments(searchQuery)

        return response.status(201).json({

            message: "All books fetched successfully",
            totalBooks,
            totPages: Math.ceil(totalBooks / limit),
            books

        })


    } catch (error) {

        return response.status(500).json({

            message: " failed to fetch books",
            error: error.message

        });

    }
}


const getAllUsers = async (request, response) => {


    try {

        const { query } = request

        const page = +query.page || 1
        const limit = +query.limit || 5
        const searchValue = +query.searchValue
        const skip = (page - 1) * limit


        const searchQuery = {

            role: "user"
        }

        if (searchValue) {

           searchQuery.$or = [
                { userName: { $regex: searchValue, $options: "i" } },
                { email: { $regex: searchValue, $options: "i" } }

            ];
        }
        

        const users = await User.find(searchQuery)
            .skip(skip)
            .limit(limit)

        const totalUsers = await User.countDocuments(searchQuery)

        return response.status(201).json({

            message: "All users given below",
            totalUsers,
            totPages: Math.ceil(totalUsers / limit),
            users

        })


    } catch (error) {

        return response.status(500).json({

            message: "users not found",
            error: error.message

        })

    }

}



const deleteUser = async (request, response) => {

    try {

        const id = request.params.id

        const user = await User.findById({

            _id: id,
            role: "user"
        })

        if (!user) {

            return response.status(400).json({
                message: " User not found "

            })
        }

        await User.findByIdAndDelete(user.id)


        return response.status(200).json({

            message: "User deleted succesfully ",
    
          

        })


    } catch (error) {

        return response.status(500).json({

            message: "Internal server error",
            error: error.message

        })

    }
}



const deleteBook = async (request, response) => {

    try {

        const id = request.params.id


        const book = await Book.findById(id)

        if (!book) {

            return response.status(400).json({
                message: " User not found "

            })
        }

        await Book.findByIdAndDelete({_id:id})


        return response.status(200).json({

            message: "Book deleted succesfully ",
          

        })


    } catch (error) {

        return response.status(500).json({

            message: "Internal server error",
            error: error.message

        })

    }
}










module.exports = { getAllUsers, getAllBooks, deleteUser, deleteBook }