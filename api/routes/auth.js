const router = require("express").Router();
const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(req.body.password, salt);
        const hashedAnswer = await bcryptjs.hash(req.body.securityAnswer, salt); 
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            securityQuestion: req.body.securityQuestion,
            securityAnswer: hashedAnswer
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json("Wrong Credentials");
        }

        const validated = await bcryptjs.compare(req.body.password, user.password);

        if (!validated) {
            return res.status(400).json("Wrong Password");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // console.log(token)
        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        // console.log(token)
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// CHECK USERNAME AVAILABILITY
router.get("/check-username/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            return res.status(200).json({ available: false });
        }
        return res.status(200).json({ available: true });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
});

// FORGOT PASSWORD: Verify Security Answer
router.post("/forgot-password/verify-answer", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        
        const isAnswerValid = await bcryptjs.compare(req.body.securityAnswer, user.securityAnswer);
        if (!isAnswerValid) {
            return res.status(400).json({ message: "Incorrect answer to the security question" });
        }

        res.status(200).json({ message: "Security answer verified.", userId: user._id });
    } catch (err) {
        console.error('Error verifying security answer:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// FORGOT PASSWORD: Reset Password
router.patch("/forgot-password/reset", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(req.body.newPassword, salt);

        user.password = hashedPass;
        await user.save();
        
        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// GET SECURITY QUESTION
router.post("/get-security-question", async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ securityQuestion: user.securityQuestion });
    } catch (err) {
        console.error('Error fetching security question:', err);
        return res.status(500).json({ message: "Internal server error." });
    }
});


module.exports = router;
