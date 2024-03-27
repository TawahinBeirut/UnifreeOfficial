import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ChatInput({ addChat }) {
  const [content, setContent] = useState([{ role: "system", content: "You are a helpful assistant" }]);
  const [prompt, setPrompt] = useState("");

  const clear = () => {
    if (prompt.trim().length !== 0) {
      let tmp = content;
      tmp.push({ role: "user", content: prompt });
      setContent(tmp);
      addChat(prompt, content);
      setPrompt("");
    } else {
      toast.error("Prompt vide (pd)");
    }
  };

  return (
    <div className="flex justify-start pl-2 gap-4">
      <div className="flex flex-col gap-2 text-center">
      </div>
      <div className="bg-gray-300 p-2 rounded-xl flex items-center w-11/12">
        <textarea
          placeholder="Message Jasser-GPT..."
          className="bg-transparent outline-none text-gray-800 placeholder-gray-800 flex-1 break-words"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <button onClick={clear} className="ml-4 bg-gray-600 text-white p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
