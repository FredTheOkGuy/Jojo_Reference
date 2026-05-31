import type { StudyGroup } from "../app/types";

interface AskToJoinModalProps {
  open: boolean;
  group?: StudyGroup;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AskToJoinModal({
  open,
  group,
  onClose,
  onConfirm,
}: AskToJoinModalProps) {
  if (!open || !group) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(26,22,16,.5)] px-3 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-to-join-title"
        className="w-full max-w-[min(22rem,94vw)] rounded-[24px] border border-[#ddd8cc] bg-[#faf8f4] p-5 shadow-xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#edeae2] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#4a4438]">
            <span aria-hidden="true">🔒</span>
            Private Group
          </div>
          <h2 id="ask-to-join-title" className="font-black text-2xl text-[#1a1610] font-['Syne'] leading-tight">
            Ask to join {group.name}?
          </h2>
          <p className="mt-2 text-sm font-medium text-[#6f6758] leading-relaxed">
            Your request will be sent to the group host. If approved, you’ll be
            able to open the chat and join the room.
          </p>
        </div>

        <div className="mb-5 rounded-[14px] border border-[#ddd8cc] bg-[#edeae2] px-4 py-3 text-sm text-[#4a4438] font-medium">
          <div>{group.course}</div>
          <div className="mt-1 text-xs text-[#9a9282]">
            {group.days} · {group.time}
          </div>
        </div>

        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-[9px] border-2 border-[#ddd8cc] bg-[#faf8f4] px-4 py-3 text-sm font-bold text-[#4a4438] transition-all hover:border-[#c96332]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-[9px] bg-[#c96332] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#a34e24]"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}