import axios from "axios";

const API_URL = "http://localhost:5000/api/translate";

const translate = async (text, targetLanguage) => {
  try {
    const response = await axios.post(API_URL, {
      text,
      targetLanguage,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default { translate };
