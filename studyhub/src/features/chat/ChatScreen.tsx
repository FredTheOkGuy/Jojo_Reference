import { useState, useEffect, useRef } from 'react';
import { StudyGroup } from '../../app/types';

const GI_COLORS_MAP: Record<string, { bg: string; text: string }> = {
  'gi-orange': { bg: '#faeade', text: '#c96332' },
  'gi-green': { bg: '#e8edda', text: '#5a6e3a' },
  'gi-blue': { bg: '#dde6f5', text: '#3d5fa0' },
  'gi-purple': { bg: '#ede0f7', text: '#7a4fa0' },
  'gi-gold': { bg: '#f7edcc', text: '#8a6a1e' },
};

interface ChatScreenProps {
  group: StudyGroup;
  onBack: () => void;
  onSendMessage: (text: string) => void;
}

export default function ChatScreen({ group, onBack, onSendMessage }: ChatScreenProps) {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const colors = GI_COLORS_MAP[group.gi] || GI_COLORS_MAP['gi-orange'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [group.messages]);

  const handleSend = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      {/* Chat Topbar */}
      <div className="h-14 flex items-center px-5 gap-3 bg-[#faf8f4] border-b border-[#ddd8cc] sticky top-0 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-[#4a4438] cursor-pointer bg-none border-none font-['Plus Jakarta Sans'] font-bold p-1.5 rounded-lg transition-all hover:text-[#c96332] hover:bg-[#faeade]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-base text-[#1a1610] font-['Syne']">{group.name}</div>
          <div className="text-xs text-[#9a9282] font-medium">
            {group.course} · {group.cur} members
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 max-w-2xl mx-auto px-5 py-5 w-full flex flex-col gap-2 overflow-y-auto">
        {group.messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2.5 max-w-[82%] ${msg.mine ? 'self-end flex-row-reverse' : ''}`}>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: msg.c }}
            >
              {msg.sender}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className={`text-xs text-[#9a9282] font-semibold ${msg.mine ? 'text-right' : ''}`}>
                {msg.senderFull}
              </div>
              <div
                className={`px-3.5 py-2.5 rounded-3.5 text-sm leading-relaxed font-medium ${
                  msg.mine
                    ? 'bg-[#c96332] text-white rounded-br-lg'
                    : 'bg-[#faf8f4] border border-[#ddd8cc] text-[#1a1610] rounded-bl-lg'
                }`}
              >
                {msg.text}
              </div>
              <div className={`text-xs text-[#9a9282] font-medium ${msg.mine ? 'text-right' : ''}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#faf8f4] border-t border-[#ddd8cc] px-5 py-3.5 flex gap-2.5 items-center">
        <input
          type="text"
          placeholder="Message…"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          className="flex-1 px-4.5 py-2.75 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-full text-[#1a1610] font-['Plus Jakarta Sans'] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.08)]"
        />
        <button
          onClick={handleSend}
          className="w-9.5 h-9.5 rounded-full bg-[#c96332] border-none cursor-pointer flex items-center justify-center transition-all hover:bg-[#a34e24] flex-shrink-0"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
