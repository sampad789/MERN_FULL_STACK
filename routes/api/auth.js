const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require("../../modals/User");
const auth = require('../../middleware/auth');


// setting up the post route for authenticate user (Public)

router.post("/", (req, res) => {
    const { email, password } = req.body;
    //minimal validation
    if ( !email || !password) {
        return res.status(400).json({ msg: "please enter all fields" });
    }
    // check for existing user
    User.findOne({ email }).then(user => {
        if (!user) return res.status(400).json({ msg: "user Doesn't exists" });

       // VAlidation of the obtained password 
       // compare method from bcrypt
       bcrypt.compare(password,user.password)
       .then (isMatch =>{
           if (!isMatch) return res.status(400).json({msg : "You've Provided Wrong Credentials"});

           jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        )

       })
    });
});
    // GET route for user to get an user data ,  ,passing auth (middleware) as a parameter to make 
// the route privete

router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user=>res.json(user))
});


module.exports = router;
