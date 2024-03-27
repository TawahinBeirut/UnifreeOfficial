import { useRef,useEffect } from "react";
import Chat from "./Chat";

export default function ChatWindow({ChatsList,loading}){
    const endOfMessagesRef = useRef(null);
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ChatsList]); 

    return (
        <div className="flex justify-center pl-7 h-10/12 overflow-y-scroll-custom">
        <div className="w-full flex flex-col gap-7 p-3">
            {ChatsList.map(el => (
                <Chat key={el.Text} {...el} />
            ))}
        {loading? "..." : null}
        <div ref={endOfMessagesRef} />
        </div>
        </div>
    )
}