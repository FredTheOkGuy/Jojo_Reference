import type { StudyGroup } from "../../app/types";
import { CapacityMeter } from "./Card";
import { GI_COLORS_MAP } from "../../data/mockData";

interface GroupCardProps {
  group: StudyGroup;
  joined: boolean;
  onDetail?: (id: number) => void;
  onJoin?: () => void;
  onAskToJoin?: () => void;
}

export default function GroupCard({ group, joined, onDetail, onJoin, onAskToJoin }: GroupCardProps) {
  const isFull = group.cur >= group.max;
  const colors = GI_COLORS_MAP[group.gi] || GI_COLORS_MAP["gi-orange"];
  const requestPending = group.isPrivate && group.joinRequested && !joined;

  return (
    <div
      className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-5 mb-3 flex items-center gap-4 transition-all shadow-sm hover:border-[#f0b897] hover:shadow-md hover:-translate-y-0.5"
      onClick={() => { if (joined || group.isPrivate) onDetail?.(group.id); }}
      style={{ cursor: joined || group.isPrivate ? "pointer" : "default" }}
    >
      <div
        className="w-14 h-14 rounded-[13px] flex items-center justify-center font-black text-lg font-['Syne'] flex-shrink-0"
        style={{ background: colors.bg, color: colors.text }}
      >
        {group.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-bold text-base text-[#1a1610] font-['Syne'] whitespace-nowrap overflow-hidden text-ellipsis mb-1">
          {group.name}
        </div>
        <div className="text-xs text-[#9a9282] flex gap-2 items-center font-medium mb-2.5">
          <span>{group.course}</span>
          <span className="w-1 h-1 rounded-full bg-[#9a9282]" />
          <span>{group.days} · {group.time.split(" – ")[0]}</span>
        </div>
        <CapacityMeter current={group.cur} max={group.max} compact />
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        {joined ? (
          <span className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#e8edda] text-[#5a6e3a]">Joined ✓</span>
        ) : requestPending ? (
          <span className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#edeae2] text-[#9a9282] border border-[#ddd8cc]">Request Sent</span>
        ) : isFull ? (
          <button disabled className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#edeae2] text-[#9a9282] border border-[#ddd8cc] cursor-not-allowed">
            Full
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (group.isPrivate) {
                onAskToJoin?.();
              } else {
                onJoin?.();
              }
            }}
            className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#faeade] text-[#c96332] transition-all hover:bg-[#c96332] hover:text-white cursor-pointer"
          >
            {group.isPrivate ? "Ask to Join" : "Join"}
          </button>
        )}
        {(joined || group.isPrivate) && <span className="text-base font-bold text-[#9a9282]">›</span>}
      </div>
    </div>
  );
}
