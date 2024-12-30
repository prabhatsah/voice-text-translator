import React, { useState } from "react";
import axios from "../services/translatorAPI";
import TranslatorOutput from "./TranslatorOutput";

function InputForm() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("es"); // Default to Spanish
  const [translator, setTranslator] = useState("openai");
  const [translatedOutput, setTranslatedOutput] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.translate(text, language, true);
    console.log(result);
    setTranslatedOutput(result.translatedText);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <textarea
          className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
          placeholder="Enter text to translate"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select
          className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
        <label>Translator</label>
        <select
          className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={translator}
          onChange={(e) => setTranslator(e.target.value)}
        >
          <option value="openai">OpenAI</option>
          <option value="microsoft">Microsoft</option>
          <option value="google">Google</option>
        </select>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 sm:py-3 rounded font-medium transition-all">
          Translate
        </button>
      </form>

      {translatedOutput && (
        <TranslatorOutput translatedText={translatedOutput} />
      )}
    </>
  );
}

export default InputForm;
