import React, { useState, useEffect, useContext } from "react";
import ChatWindow from "../components/UniGpt/ChatWindow";
import ChatInput from "../components/UniGpt/ChatInput";
import toast from "react-hot-toast";
import { AskRequest } from "../openAiRquests";
import Header from "../components/Header";

export default function MainWindow() {
  const Name = "Moi";

  const [ChatsList, setChatsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResponse = async (prompt, tmpchat, Text) => {
    setLoading(true);
    let tpmResponse = null;
    const result = await AskRequest({ prompt, Text });

    if (result instanceof Error) {
      toast.error("Erreur de resultat");
      tpmResponse = { User: "UniGPT", Text: result.message };
    } else {
      if (result === null) {
        toast.error("Reponse nulle");
      } else {
        tpmResponse = {
          User: "UniGPT",
          Text: result || "Requete echouée, raison inconnue",
        };
      }
    }
    if (tpmResponse) setChatsList([...ChatsList, tmpchat, tpmResponse]);
    setLoading(false);
  };

  const addChat = async (Text, prompt) => {
    let tmpchat = { User: Name || "", Text };
    setChatsList([...ChatsList, tmpchat]);
    addResponse(prompt, tmpchat, Text);
  };

  return (
    <>
      <div className="overflow-hidden">
        <Header />
        <div className="w-full flex justify-center">
          <div className="h-[80vh] overflow-auto flex flex-col items-center justify-end px-4 gap-5 w-full md:w-1/3">
            <ChatWindow ChatsList={ChatsList} loading={loading} />
            <ChatInput addChat={addChat} />
          </div>
        </div>
      </div>
    </>
  );
}
