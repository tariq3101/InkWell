const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai'); 

router.post("/", async (req, res) => {
    const { text } = req.body;

    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = text;
        const result = await model.generateContent(prompt);
        
        res.json({ generatedText: result.response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating content.' });
    }
});

module.exports = router;
