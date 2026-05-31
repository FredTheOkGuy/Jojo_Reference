import { motion } from "framer-motion";
import type { StudyGroup } from "../app/StudyHubApp";

const GI_COLORS_MAP: Record<string, { bg: string; text: string }> = {
  "gi-orange": { bg: "#faeade", text: "#c96332" },
  "gi-green": { bg: "#e8edda", text: "#5a6e3a" },
  "gi-blue": { bg: "#dde6f5", text: "#3d5fa0" },
  "gi-purple": { bg: "#ede0f7", text: "#7a4fa0" },
  "gi-gold": { bg: "#f7edcc", text: "#8a6a1e" },
};

interface GroupCardProps {
  group: StudyGroup;
  joined: boolean;
  onDetail?: (id: number) => void;
  onJoin?: () => void;
}

export default function GroupCard({
  group,
  joined,
  onDetail,
  onJoin,
}: GroupCardProps) {
  const pct = Math.round((group.cur / group.max) * 100);
  const capacityClass =
    pct >= 100 ? "bg-[#c96332]" : pct >= 75 ? "bg-[#8a6a1e]" : "bg-[#5a6e3a]";

  const isFull = group.cur >= group.max;
  const colors = GI_COLORS_MAP[group.gi] || GI_COLORS_MAP["gi-orange"];

  const handleClick = () => {
    if (joined && onDetail) {
      onDetail(group.id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={joined ? { scale: 0.985 } : undefined}
      className={`bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-5 mb-3 flex items-center gap-4 cursor-pointer transition-colors shadow-sm hover:border-[#f0b897] hover:shadow-lg ${
        joined ? "pointer" : ""
      }`}
      onClick={handleClick}
      style={!joined ? { cursor: "default" } : {}}
    >
      <motion.div
        whileHover={{ rotate: -2, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="w-14 h-14 rounded-[13px] flex items-center justify-center font-black text-lg font-['Syne'] flex-shrink-0 -tracking-0.5px"
        style={{ background: colors.bg, color: colors.text }}
      >
        {group.icon}
      </motion.div>

      <div className="flex-1 min-w-0">
        <div className="font-bold text-base text-[#1a1610] font-['Syne'] whitespace-nowrap overflow-hidden text-ellipsis mb-1">
          {group.name}
        </div>
        <div className="text-xs text-[#9a9282] flex gap-2 items-center font-medium mb-2.5">
          <span>{group.course}</span>
          <span className="w-1 h-1 rounded-full bg-[#9a9282]"></span>
          <span>
            {group.days} · {group.time.split(" – ")[0]}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-[#4a4438] whitespace-nowrap">
            {group.cur} / {group.max}
          </span>
          <div className="flex-1 h-1 bg-[#e4e0d6] rounded-full overflow-hidden max-w-[90px]">
            <motion.div
              className={`h-full rounded-full ${capacityClass}`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        {joined ? (
          <motion.span
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            className="px-4 py-1.5 text-xs font-bold font-['Plus Jakarta Sans'] rounded-lg bg-[#e8edda] text-[#5a6e3a]"
          >
            Joined ✓
          </motion.span>
        ) : isFull ? (
          <button
            disabled
            className="px-4 py-1.5 text-xs font-bold font-['Plus Jakarta Sans'] rounded-lg bg-[#edeae2] text-[#9a9282] border border-[#ddd8cc] cursor-not-allowed"
          >
            Full
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={(e) => {
              e.stopPropagation();
              onJoin?.();
            }}
            className="px-4 py-1.5 text-xs font-bold font-['Plus Jakarta Sans'] rounded-lg bg-[#faeade] text-[#c96332] transition-all hover:bg-[#c96332] hover:text-white"
          >
            Join
          </motion.button>
        )}
        <motion.span
          animate={{ x: joined ? [0, 3, 0] : 0 }}
          transition={{ duration: 1.6, repeat: joined ? Infinity : 0, repeatDelay: 1.2 }}
          className="text-base font-bold text-[#9a9282]"
        >
          ›
        </motion.span>
      </div>
    </motion.div>
  );
}
