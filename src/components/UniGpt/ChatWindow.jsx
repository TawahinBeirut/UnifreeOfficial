import { useRef,useEffect } from "react";
import Chat from "./Chat";

export default function ChatWindow({ChatsList,loading}){
    const endOfMessagesRef = useRef(null);
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ChatsList]); 

    return (
        <div className="flex justify-center overflow-y-scroll no-scrollbar">
        <div className="w-full flex items-center flex-col gap-7 p-3">
            {ChatsList.map(el => (
                <Chat key={el.Text} {...el} />
            ))}
        {loading? "..." : null}
        <div ref={endOfMessagesRef} />
        </div>
        </div>
    )
}