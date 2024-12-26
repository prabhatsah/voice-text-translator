require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Azure Translator API details
const translatorEndpoint = "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env.AZURE_TRANSLATOR_KEY; // Store your API key in .env file for security
console.log("API Key:", apiKey);


const supportedLanguages = [
  'en', // English
  'es', // Spanish
  'fr', // French
  'de', // German
  // Add more language codes as required
];

router.post("/", async (req, res) => {
  const { text, targetLanguage } = req.body;

  // Validate that the target language is supported
  if (!supportedLanguages.includes(targetLanguage)) {
    return res.status(400).json({
      error: `Language ${targetLanguage} is not supported.`,
    });
  }

  try {
    const response = await axios({
        baseURL: translatorEndpoint,
        url: '/translate',
        method: 'post',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Ocp-Apim-Subscription-Region': 'centralindia', // Add your Azure region
          'Content-Type': 'application/json'
        },
        params: {
          'api-version': '3.0',
          'to': targetLanguage
        },
        data: [{
          'text': text
        }]
      });

    // Extract the translated text from the response
    const translatedText = response.data[0].translations[0].text;
    res.json({ translatedText });
  } catch (error) {
    console.error("Error Details:", error.response ? error.response.data : error.message);
    res.status(500).json({
      error: error.response ? error.response.data : "Internal Server Error",
    });
  }
});

module.exports = router;
