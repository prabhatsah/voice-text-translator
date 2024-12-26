import React from "react";
import InputForm from "./components/InputForm.jsx";
import TranslatorOutput from "./components/TranslatorOutput.jsx";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-4 sm:p-6 bg-white rounded shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Voice/Text Translator
        </h1>
        <InputForm />
        <TranslatorOutput />
      </div>
    </div>
  );
}

export default App;
