import axios from "axios";

const API_URL = "http://localhost:5000/api/translate";

const translate = async (text, targetLanguage, ) => {
  const useOpenAI = true;
  try {
    const response = await axios.post(API_URL, {
      text,
      targetLanguage,
      useOpenAI
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default { translate };
