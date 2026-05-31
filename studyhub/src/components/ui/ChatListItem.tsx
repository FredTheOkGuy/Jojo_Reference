import type { StudyGroup_old } from "../../app/types";
import { GI_COLORS_MAP } from "../../data/mockData";

interface ChatListItemProps {
  group: StudyGroup_old;
  onOpen: (id: number) => void;
}

export default function ChatListItem({ group, onOpen }: ChatListItemProps) {
  const lastMessage = group.messages.length > 0 ? group.messages[group.messages.length - 1] : null;
  const preview = lastMessage
    ? `${lastMessage.mine ? "You" : lastMessage.senderFull}: ${lastMessage.text}`
    : "No messages yet";
  const colors = GI_COLORS_MAP[group.gi] || GI_COLORS_MAP["gi-orange"];

  return (
    <div
      className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-4 mb-2.5 flex items-center gap-3.5 cursor-pointer transition-all shadow-sm hover:border-[#f0b897] hover:shadow-md hover:-translate-y-0.5"
      onClick={() => onOpen(group.id)}
    >
      <div
        className="w-12 h-12 rounded-[12px] flex items-center justify-center font-black text-base font-['Syne'] flex-shrink-0"
        style={{ background: colors.bg, color: colors.text }}
      >
        {group.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-base text-[#1a1610] font-['Syne'] mb-0.5">{group.name}</div>
        <div className="text-xs text-[#9a9282] font-medium whitespace-nowrap overflow-hidden text-ellipsis">{preview}</div>
      </div>
      {lastMessage && <span className="text-xs text-[#9a9282] font-semibold flex-shrink-0">{lastMessage.time}</span>}
    </div>
  );
}
