
const Book = require("../model/book")





const createBook = async (request, response) => {

    try {

        
        const { title , auther } = request.body

        const existingBook = await Book.find({title})

        if (!existingBook) {

            return response.status(400).json({

                m: "book already existed "
            })
        }

        const createBook = new Book({
            title,
            auther

        })

        await createBook.save()

        return response.status(200).json({
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



















module.exports = {
    createBook,
    updateBook,
    deleteBook
}