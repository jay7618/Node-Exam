const express = require("express");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !emial || !password) {
            return res.status(400).json({
                message: "All Fileds Are Required"
            })
        }

        const existingUser = await User.findOne({
            email: email.toLoweCase().trim()
        });

        if(existingUser) {
            return res.status(409).json({
                message: "email already reguisterd"
            })
        };

        const hashedPassword = await bycrpt.hash(passworrd, 10);

        const User = await User.create({
            name,
            email: email.toLoweCase().trim(),
            password: hashedPassword
        });

        res.status(201).json({
            message: "user registerd !!",
            User: {
                id: User._id,
                name: userInfo.name,
                email: userInfo.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bycrpt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.status(200).json({
            message: "Profile retrieved successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;

