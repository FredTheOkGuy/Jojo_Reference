import type { StudyGroup } from "@/app/types";

const GI_COLORS_MAP: Record<string, { bg: string; text: string }> = {
  "gi-orange": { bg: "#faeade", text: "#c96332" },
  "gi-green": { bg: "#e8edda", text: "#5a6e3a" },
  "gi-blue": { bg: "#dde6f5", text: "#3d5fa0" },
  "gi-purple": { bg: "#ede0f7", text: "#7a4fa0" },
  "gi-gold": { bg: "#f7edcc", text: "#8a6a1e" },
};

const GI_KEYS = Object.keys(GI_COLORS_MAP);

function colorForId(id: string) {
  let hash = 0;
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
  return GI_COLORS_MAP[GI_KEYS[hash % GI_KEYS.length]];
}

interface GroupCardProps {
  group: StudyGroup;
  joined: boolean;
  onDetail?: (id: string) => void;
  onJoin?: () => void;
}

export default function GroupCard({ group, joined, onDetail, onJoin }: GroupCardProps) {
  const pct = Math.round((group.memberCount / group.maxStudents) * 100);
  const capacityClass =
    pct >= 100 ? "bg-[#c96332]" : pct >= 75 ? "bg-[#8a6a1e]" : "bg-[#5a6e3a]";

  const isFull = group.memberCount >= group.maxStudents;
  const colors = colorForId(group.id);

  const handleClick = () => {
    if (joined && onDetail) onDetail(group.id);
  };

  return (
    <div
      className={`bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-5 mb-3 flex items-center gap-4 transition-all shadow-sm hover:border-[#f0b897] hover:shadow-md hover:-translate-y-0.5 ${
        joined ? "cursor-pointer" : ""
      }`}
      onClick={handleClick}
      style={!joined ? { cursor: "default" } : {}}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-[13px] flex items-center justify-center font-black text-lg font-['Syne'] flex-shrink-0"
        style={{ background: colors.bg, color: colors.text }}
      >
        {group.name.slice(0, 2).toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-bold text-base text-[#1a1610] font-['Syne'] whitespace-nowrap overflow-hidden text-ellipsis mb-1">
          {group.name}
        </div>
        <div className="text-xs text-[#9a9282] flex gap-2 items-center font-medium mb-2.5">
          <span>{group.courseCode} {group.courseNum}</span>
          <span className="w-1 h-1 rounded-full bg-[#9a9282]"></span>
          <span>{group.day} · {group.startTime}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-[#4a4438] whitespace-nowrap">
            {group.memberCount} / {group.maxStudents}
          </span>
          <div className="flex-1 h-1 bg-[#e4e0d6] rounded-full overflow-hidden max-w-[90px]">
            <div
              className={`h-full rounded-full transition-all ${capacityClass}`}
              style={{ width: `${pct}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        {joined ? (
          <span className="px-4 py-1.5 text-xs font-bold font-['Plus Jakarta Sans'] rounded-lg bg-[#e8edda] text-[#5a6e3a]">
            Joined ✓
          </span>
        ) : isFull ? (
          <button
            disabled
            className="px-4 py-1.5 text-xs font-bold font-['Plus Jakarta Sans'] rounded-lg bg-[#edeae2] text-[#9a9282] border border-[#ddd8cc] cursor-not-allowed"
          >
            Full
          </button>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); onJoin?.(); }}
            className="px-4 py-1.5 text-xs font-bold font-['Plus Jakarta Sans'] rounded-lg bg-[#faeade] text-[#c96332] transition-all hover:bg-[#c96332] hover:text-white"
          >
            Join
          </button>
        )}
        <span className="text-base font-bold text-[#9a9282]">›</span>
      </div>
    </div>
  );
}
