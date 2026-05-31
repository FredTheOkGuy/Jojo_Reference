import { useEffect, useRef, useState } from "react";
import type { StudyGroup_old } from "../../app/types";
import { MessageList } from "../../components/ui/MessageList";
import TopBar, { BackButton } from "../../components/ui/TopBar";
import PageNavigator from "../../components/ui/PageNavigator";

interface ChatScreenProps {
  group: StudyGroup_old;
  onBack: () => void;
  onSendMessage: (text: string) => void;
}

export default function ChatScreen({
  group,
  onBack,
  onSendMessage,
}: ChatScreenProps) {
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [group.messages]);

  const handleSend = () => {
    const text = messageInput.trim();
    if (!text) return;
    onSendMessage(text);
    setMessageInput("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar
        title=""
        left={<BackButton onClick={onBack} label="" />}
        center={
          <div className="text-left">
            <div className="font-bold text-base text-[#1a1610] font-['Syne']">
              {group.name}
            </div>
            <div className="text-xs text-[#9a9282] font-medium">
              {group.course} · {group.cur} members
            </div>
          </div>
        }
      />
      <PageNavigator items={["StudyHub", "Chat", group.name]} />
      <MessageList messages={group.messages} scrollRef={messagesEndRef} />

      <div className="bg-[#faf8f4] border-t border-[#ddd8cc] px-5 py-3.5 flex gap-2.5 items-center">
        <input
          type="text"
          placeholder="Message…"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1 px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-full text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.08)]"
        />
        <button
          type="button"
          onClick={handleSend}
          className="w-10 h-10 rounded-full bg-[#c96332] border-none cursor-pointer flex items-center justify-center transition-all hover:bg-[#a34e24] flex-shrink-0"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-none stroke-white"
            strokeWidth="2.5"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
