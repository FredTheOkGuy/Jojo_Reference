import type { RefObject } from "react";
import type { Message } from "../../app/types";

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div
      className={`flex max-w-[92%] gap-2.5 sm:max-w-[82%] ${message.mine ? "self-end flex-row-reverse" : ""}`}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: message.c }}
      >
        {message.sender}
      </div>
      <div className="flex flex-col gap-0.5">
        <div
          className={`text-xs text-[#9a9282] font-semibold ${message.mine ? "text-right" : ""}`}
        >
          {message.senderFull}
        </div>
        <div
          className={`px-3.5 py-2.5 rounded-3xl text-sm leading-relaxed font-medium ${
            message.mine
              ? "bg-[#c96332] text-white rounded-br-lg"
              : "bg-[#faf8f4] border border-[#ddd8cc] text-[#1a1610] rounded-bl-lg"
          }`}
        >
          {message.text}
        </div>
        <div
          className={`text-xs text-[#9a9282] font-semibold ${message.mine ? "text-right" : ""}`}
        >
          {message.time}
        </div>
      </div>
    </div>
  );
}

interface MessageListProps {
  messages: Message[];
  scrollRef?: RefObject<HTMLDivElement | null>;
}

export function MessageList({ messages, scrollRef }: MessageListProps) {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[min(42rem,100vw)] flex-1 flex-col gap-2 overflow-y-auto px-[clamp(0.875rem,4vw,1.25rem)] py-5">
      {messages.map((msg, idx) => (
        <MessageItem key={idx} message={msg} />
      ))}
      <div ref={scrollRef} />
    </div>
  );
}
