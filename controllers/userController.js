const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.userLogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            res.status(200).json({message:"User is not existied "});
        }

        const isMatching =  await bcrypt.compare(password,user.password);
        if (!isMatching) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {id:user._id, email:user.email},
            process.env.JWT,
            {expiresIn:"2hrs"}

        )

        res.status(200).json({
            success: true,
            message:"Successfully login",
            token
        })
    } catch (error) {
         res.status(500).json({ success: false, message: error.message });
    }
}