
const Book = require("../model/book")





const createBook = async (request, response) => {

    try {

        
        const { title , auther } = request.body

        const existingBook = await Book.findOne({ title })

        if (existingBook) {

            return response.status(400).json({

                m: "book already existed "
            })
        }

        const createBook = new Book({
            title,
            auther,
            adminId: request.user.id



        })

        await createBook.save()

        return response.status(201).json({
            m: "Book created successfully ",
            createBook
        })

    } catch (error) {

        return response.status(500).json({

            m: " internal server error",
            error: error.message
        })

    }
}



const updateBook = async (request, response) => {

    try {

        const id = request.params.id
        const {title , auther} = request.body


        const book = await Book.findById(id)

        if (!book) {

            return response.status(400).json({

                m: "Book not found"

            })
        }

        const updatedBook = await Book.findOneAndUpdate(

            { _id: id },

            { title, auther },

            { new: true }

        )


        return response.status(200).json({

            m: "Book updated successfully ",
            updatedBook
        })


    } catch (error) {

        return response.status(500).json({

            m: "internal server error",
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

                m: "Book not found ",

            })
        }

        const dt = await Book.findOneAndDelete({

            _id: id

        })

        return response.status(201).json({

            m: "Book deleted successfully",
            dt

        })


    } catch (error) {
        return response.status(500).json({

            m: "internal server error",
            error: error.message

        });

    }

}


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
















module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getAllBooks
}