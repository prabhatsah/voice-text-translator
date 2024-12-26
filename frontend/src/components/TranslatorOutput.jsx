import React from "react";

function TranslatorOutput({ translatedText }) {
  return (
    <div className="mt-4 sm:mt-6 p-3 sm:p-4 border border-gray-300 rounded bg-gray-50 text-gray-700 text-sm sm:text-base">
      {translatedText || "Translation will appear here"}
    </div>
  );
}

export default TranslatorOutput;
