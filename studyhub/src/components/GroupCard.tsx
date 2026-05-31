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
  onAskToJoin?: () => void;
}

export default function GroupCard({
  group,
  joined,
  onDetail,
  onJoin,
  onAskToJoin,
}: GroupCardProps) {
  const pct = Math.min(100, Math.round((group.cur / group.max) * 100));
  const capacityClass =
    pct >= 100 ? "bg-[#c96332]" : pct >= 75 ? "bg-[#8a6a1e]" : "bg-[#5a6e3a]";

  const isFull = group.cur >= group.max;
  const colors = GI_COLORS_MAP[group.gi] || GI_COLORS_MAP["gi-orange"];
  const requestPending = group.isPrivate && group.joinRequested && !joined;
  const clickable = joined || group.isPrivate;

  const handleClick = () => {
    if (clickable && onDetail) {
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
      whileTap={clickable ? { scale: 0.985 } : undefined}
      className="mb-3 flex w-full flex-col gap-4 rounded-[14px] border border-[#ddd8cc] bg-[#faf8f4] p-4 shadow-sm transition-colors hover:border-[#f0b897] hover:shadow-lg sm:flex-row sm:items-center sm:p-5"
      onClick={handleClick}
      style={{ cursor: clickable ? "pointer" : "default" }}
    >
      <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
        <motion.div
          whileHover={{ rotate: -2, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[13px] font-['Syne'] text-base font-black sm:h-14 sm:w-14 sm:text-lg"
          style={{ background: colors.bg, color: colors.text }}
        >
          {group.icon}
        </motion.div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 overflow-hidden text-ellipsis whitespace-nowrap font-['Syne'] text-base font-bold text-[#1a1610]">
            {group.name}
          </div>

          <div className="mb-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#9a9282]">
            <span className="min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {group.course}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#9a9282]" />
            <span className="min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {group.days} · {group.time.split(" – ")[0]}
            </span>
          </div>

          <div className="flex max-w-full items-center gap-2.5">
            <span className="whitespace-nowrap text-xs font-bold text-[#4a4438]">
              {group.cur} / {group.max}
            </span>
            <div className="h-1 min-w-16 flex-1 overflow-hidden rounded-full bg-[#e4e0d6] sm:max-w-[110px]">
              <motion.div
                className={`h-full rounded-full ${capacityClass}`}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:flex-col sm:items-end">
        {joined ? (
          <motion.span
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            className="rounded-lg bg-[#e8edda] px-4 py-1.5 text-xs font-bold text-[#5a6e3a]"
          >
            Joined ✓
          </motion.span>
        ) : requestPending ? (
          <span className="rounded-lg border border-[#ddd8cc] bg-[#edeae2] px-4 py-1.5 text-xs font-bold text-[#9a9282]">
            Request Sent
          </span>
        ) : isFull ? (
          <button
            disabled
            className="rounded-lg border border-[#ddd8cc] bg-[#edeae2] px-4 py-1.5 text-xs font-bold text-[#9a9282] cursor-not-allowed"
          >
            Full
          </button>
        ) : (
          <motion.button
            type="button"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={(e) => {
              e.stopPropagation();
              if (group.isPrivate) {
                onAskToJoin?.();
              } else {
                onJoin?.();
              }
            }}
            className="rounded-lg bg-[#faeade] px-4 py-1.5 text-xs font-bold text-[#c96332] transition-all hover:bg-[#c96332] hover:text-white"
          >
            {group.isPrivate ? "Ask to Join" : "Join"}
          </motion.button>
        )}

        {clickable && (
          <motion.span
            animate={{ x: joined ? [0, 3, 0] : 0 }}
            transition={{ duration: 1.6, repeat: joined ? Infinity : 0, repeatDelay: 1.2 }}
            className="text-base font-bold text-[#9a9282]"
          >
            ›
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
