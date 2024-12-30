require("dotenv").config();
const express = require("express");
const axios = require("axios");
//const { Configuration, OpenAIApi } = require("openai");
const OpenAI = require("openai");
const router = express.Router();

// Azure Translator API details
const translatorEndpoint = "https://api.cognitive.microsofttranslator.com/translate";
const azureApiKey = process.env.AZURE_TRANSLATOR_KEY;

// OpenAI API details
// const openaiConfig = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(openaiConfig);
const openai = new OpenAI({ // Changed this part
  apiKey: process.env.OPENAI_API_KEY,
});

// Define supported language pairs (e.g., 'en' for English, 'es' for Spanish)
const supportedLanguages = ['en', 'es', 'fr', 'de'];

// Route to handle translation requests
router.post("/", async (req, res) => {
  const { text, targetLanguage, useOpenAI } = req.body;

  if (!supportedLanguages.includes(targetLanguage)) {
    return res.status(400).json({
      error: `Language ${targetLanguage} is not supported.`,
    });
  }

  try {
    console.log(useOpenAI);
    
    if (useOpenAI) {
      // Use OpenAI for translation
      // const response = await openai.createCompletion({
      //   model: "text-davinci-003",
      //   prompt: `Translate the following text into ${targetLanguage}: ${text}`,
      //   max_tokens: 100,
      // });
      const response = await openai.chat.completions.create({ // Updated method
        model: "gpt-3.5-turbo", // Updated model
        messages: [{ 
          role: "user", 
          content: `Translate the following text into ${targetLanguage}: ${text}`
        }],
        max_tokens: 100,
      });
      console.log('OpenAI Response:', response.choices[0].message.content);
      const translatedText = response.choices[0].message.content.trim();
      
      
      return res.json({ translatedText });
    } else {
      // Use Microsoft Azure Translator
      const response = await axios.post(translatorEndpoint, null, {
        headers: {
          'Ocp-Apim-Subscription-Key': azureApiKey,
          'Content-Type': 'application/json',
        },
        params: {
          'api-version': '3.0',
          'to': targetLanguage,
        },
        data: [{ 'Text': text }],
      });
      const translatedText = response.data[0].translations[0].text;
      return res.json({ translatedText });
    }
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    return res.status(500).json({
      error: error.response ? error.response.data : "Internal Server Error",
    });
  }
});

module.exports = router;



// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// // Azure Translator API details
// const translatorEndpoint = "https://api.cognitive.microsofttranslator.com";
// const apiKey = process.env.AZURE_TRANSLATOR_KEY; // Store your API key in .env file for security
// console.log("API Key:", apiKey);


// const supportedLanguages = [
//   'en', // English
//   'es', // Spanish
//   'fr', // French
//   'de', // German
//   // Add more language codes as required
// ];

// router.post("/", async (req, res) => {
//   const { text, targetLanguage } = req.body;

//   // Validate that the target language is supported
//   if (!supportedLanguages.includes(targetLanguage)) {
//     return res.status(400).json({
//       error: `Language ${targetLanguage} is not supported.`,
//     });
//   }

//   try {
//     const response = await axios({
//         baseURL: translatorEndpoint,
//         url: '/translate',
//         method: 'post',
//         headers: {
//           'Ocp-Apim-Subscription-Key': apiKey,
//           'Ocp-Apim-Subscription-Region': 'centralindia', // Add your Azure region
//           'Content-Type': 'application/json'
//         },
//         params: {
//           'api-version': '3.0',
//           'to': targetLanguage
//         },
//         data: [{
//           'text': text
//         }]
//       });

//     // Extract the translated text from the response
//     const translatedText = response.data[0].translations[0].text;
//     res.json({ translatedText });
//   } catch (error) {
//     console.error("Error Details:", error.response ? error.response.data : error.message);
//     res.status(500).json({
//       error: error.response ? error.response.data : "Internal Server Error",
//     });
//   }
// });

// module.exports = router;
