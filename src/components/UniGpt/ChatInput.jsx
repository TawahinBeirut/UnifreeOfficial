import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ChatInput({ addChat }) {
  const [content, setContent] = useState([{ role: "system", content: "You are a helpful educational assistant named UniGPT, you are a Part of the website Unifree, a e-learning platform from IUT Lyon 1 made by 4 students (Abdel Gheribi, Gatta Ba, Sami Abbas, Felmon Tewelde Habtay) supervised by their math teacher Aude Joubert" }]);
  const [prompt, setPrompt] = useState("");

  const clear = () => {
    if (prompt.trim().length !== 0) {
      let tmp = content;
      tmp.push({ role: "user", content: prompt });
      setContent(tmp);
      addChat(prompt, content);
      setPrompt("");
    } else {
      toast.error("Prompt vide");
    }
  };

  return (
      <div className="bg-gray-300 p-2 px-4 rounded-xl flex items-center w-full">
        <textarea
          placeholder="Poser une question à UniGPT..."
          rows={1}
          className="bg-transparent outline-none text-gray-800 placeholder-gray-800 flex-1 w-full"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <button onClick={clear} className="ml-4 bg-[#9d2cf6] text-white p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
  );
}
