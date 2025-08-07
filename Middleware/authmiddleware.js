const JWT = require("jsonwebtoken")
const User = require("../model/user")


const authMidlleware = async (request, response, next) => {

    try {


        const authHeader = request.headers.authorization

        if (!authHeader) {

            return response.status(400).json({

                m: "Token is missing"
            })

        }


        const token = authHeader.split(" ")[1];

        const decoded = JWT.verify(token, process.env.JWTSecretKey)

        request.user = decoded


        next()


    } catch (error) {

        return response.status(500).json({

            error: error.message
        })

    }
}


const isAdmin = async (request , response , next)=>{


    try {


        // const user = await User.find({

        //     role : " admin"
        // })

      
        if(request.user.role !== "admin"){
            return response.status(400).json({
                m : "Access denied , Admin Only"

            })
        }
        
    } catch (error) {
        
        return response.status(500).json({
            m: " internal server error",
            error : error.message
        })
    }

    next()

}



module.exports = {authMidlleware , isAdmin}