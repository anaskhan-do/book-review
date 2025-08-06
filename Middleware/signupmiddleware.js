

const signUPmiddlware = async (request, response, next) => {

    try {

        const data = request.body

        if (!data) {

            return response.status(400).json({

                m: " payload is required"
            })

        };


        const { userName, email, password } = data

        if (!userName) {

            return response.status(400).json({

                m: "username is required "
            })

        }

        if (!email) {

            return response.status(400).json({

                m: "email is required "

            })
        }

        if (!password) {

            return response.status(400).json({

                m: " password is required"
            })
        }

        next()


    } catch (error) {


        return response.status(500).json({

            m: "internal server error",
            error: error.message

        })

    }


}


module.exports = signUPmiddlware