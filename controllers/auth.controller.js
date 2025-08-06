
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../model/user")


const signUp = async (request, response) => {

    try {

        const { userName, email, password } = request.body


        const existingUser = await User.findOne({ email, userName })

        if (existingUser) {

            return response.status(400).json({

                m: "User is already exicted"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)


        const createUser = new User({

            userName,
            email,
            password: hashPassword

        })

        await createUser.save()

        // console.log(process.env.JWTSecretKey);
        const token = JWT.sign(

            { id: createUser._id, email: createUser.email },
            process.env.JWTSecretKey,
            { expiresIn: "1d" }
        )


        const userT = { ...createUser._doc, }
        delete userT.password;


        return response.status(201).json({
            message: "Signup successful ",
            userT,
            token
        })

    } catch (error) {

        return response.status(500).json({

            m: "internal server error ",
            error: error.message
        })

    }

}


const login = async (request, response) => {


    try {

        const { email, password } = request.body

        const user = await User.findOne({
            email

        })


        if (!user) {

            return response.status(400).json({

                m: "invalid credentials"
            })

        }

        const token = JWT.sign(
            { id: user._id, email: user.email },
            process.env.JWTSecretKey,
            { expiresIn: "1d" });

        const isPasswordCorrect = bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {

            return response.status(401).json({

                m: " invalid credentials"

            })

        }

        return response.status(200).json({

            m: `login Successfully `,
            user,
            token

        });


    } catch (error) {

        return response.status(500).json({

            m: "internal server error",
            error: error.message

        });

    }

}




















module.exports = { signUp, login }