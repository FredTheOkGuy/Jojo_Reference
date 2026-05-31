import type { ReactNode } from "react";

interface TopBarProps {
  title?: string;
  center?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

export default function TopBar({ title = "StudyHub", center, left, right }: TopBarProps) {
  return (
    <div className="sticky top-0 z-50 flex min-h-16 w-full items-center border-b border-[#ddd8cc] bg-[#faf8f4] px-[clamp(0.875rem,4vw,1.25rem)]">
      <div className="flex min-w-12 flex-1 justify-start sm:min-w-24">{left}</div>
      <div className="min-w-0 flex-[2] text-center">
        {center ?? (
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap font-['Syne'] text-[clamp(1.25rem,6vw,1.5rem)] font-black text-[#c96332]">
            {title}
          </span>
        )}
      </div>
      <div className="flex min-w-12 flex-1 justify-end sm:min-w-24">{right}</div>
    </div>
  );
}

export function IconButton({ children, onClick, title }: { children: ReactNode; onClick?: () => void; title?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border border-[#ddd8cc] bg-[#edeae2] text-[#4a4438] transition-all hover:border-[#f0b897] hover:bg-[#faeade] hover:text-[#c96332]"
    >
      {children}
    </button>
  );
}

export function BackButton({ onClick, label = "Back" }: { onClick?: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer items-center gap-1.5 rounded-lg border-0 bg-transparent p-1.5 text-sm font-bold text-[#4a4438] transition-all hover:bg-[#faeade] hover:text-[#c96332]"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
      {label && <span className="hidden sm:inline">{label}</span>}
    </button>
  );
}

export function AvatarButton({ initials = "AJ", onClick }: { initials?: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-[#f0b897] bg-[#c96332] text-sm font-bold text-white transition-all hover:shadow-lg"
    >
      {initials}
    </button>
  );
}

export function ChatIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}
