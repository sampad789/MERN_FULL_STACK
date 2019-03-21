const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs");
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require("../../modals/User");


// setting up the post route for registering new user (Public)

router.post("/", (req, res) => {
    const { name, email, password } = req.body;
    //minimal validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "please enter all fields" });
    }
    // check for existing user
    User.findOne({ email }).then(user => {
        if (user) return res.status(400).json({ msg: "user already exists" });

        const newUser = new User({
            name,
            email,
            password
        });
        // create salt and hash
        bycrypt.genSalt(10, (err, salt) => {
            bycrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {

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

                });
            });
        });
    });
});



module.exports = router;
