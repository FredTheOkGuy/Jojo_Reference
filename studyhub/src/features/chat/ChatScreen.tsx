import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { StudyGroup } from "../../app/types";
import { MessageList } from "../../components/ui/MessageList";
import TopBar, { BackButton } from "../../components/ui/TopBar";
import PageNavigator from "../../components/ui/PageNavigator";

interface ChatScreenProps {
  group: StudyGroup;
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
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-[#f2ede3]">
      <TopBar
        title=""
        left={<BackButton onClick={onBack} label="" />}
        center={
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-w-0 text-left"
          >
            <div className="max-w-[52vw] overflow-hidden text-ellipsis whitespace-nowrap font-['Syne'] text-base font-bold text-[#1a1610] sm:max-w-none">
              {group.name}
            </div>
            <div className="max-w-[52vw] overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium text-[#9a9282] sm:max-w-none">
              {group.course} · {group.cur} members
            </div>
          </motion.div>
        }
      />
      <PageNavigator items={["StudyHub", "Chat", group.name]} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="flex min-h-0 flex-1 flex-col"
      >
        <MessageList messages={group.messages} scrollRef={messagesEndRef} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="flex items-center gap-2.5 border-t border-[#ddd8cc] bg-[#faf8f4] px-[clamp(0.875rem,4vw,1.25rem)] py-3.5"
      >
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          placeholder="Message…"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1 px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-full text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.08)]"
        />
        <motion.button
          type="button"
          onClick={handleSend}
          whileHover={{ scale: 1.08, rotate: -3 }}
          whileTap={{ scale: 0.92 }}
          className="w-10 h-10 rounded-full bg-[#c96332] border-none cursor-pointer flex items-center justify-center transition-colors hover:bg-[#a34e24] flex-shrink-0"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-none stroke-white"
            strokeWidth="2.5"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}
