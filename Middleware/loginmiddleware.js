

const loginMiddleware =  (request, response , next )=>{

try {

    const data = request.body

        const { email , password} = data

       if(!email){

        return response.status(400).json({

            m : "email is required"
        })

       };

       if(!password){

        return response.status(400).json({

            m : "password is required"
        })
       };

       next()

} catch (error) {


return response.status(500).json({

    m : "internal server error ",
    error : error.message
});
    
};

};





module.exports = loginMiddleware