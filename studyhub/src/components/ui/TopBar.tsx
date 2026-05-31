import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

interface TopBarProps {
  title?: string;
  center?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

export default function TopBar({ title = "StudyHub", center, left, right }: TopBarProps) {
  return (
    <div className="h-16 bg-[#faf8f4] border-b border-[#ddd8cc] flex items-center px-5 sticky top-0 z-50">
      <div className="w-24">{left}</div>
      <div className="flex-1 text-center">
        {center ?? <span className="font-black text-2xl text-[#c96332] font-['Syne']">{title}</span>}
      </div>
      <div className="w-24 flex justify-end">{right}</div>
    </div>
  );
}

export function IconButton({ children, onClick, title }: { children: ReactNode; onClick?: () => void; title?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="w-9 h-9 bg-[#edeae2] border border-[#ddd8cc] rounded-[10px] inline-flex items-center justify-center text-[#4a4438] transition-all hover:bg-[#faeade] hover:border-[#f0b897] hover:text-[#c96332] cursor-pointer"
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
      className="flex items-center gap-1.5 text-sm text-[#4a4438] bg-transparent border-0 font-bold p-1.5 rounded-lg transition-all hover:text-[#c96332] hover:bg-[#faeade] cursor-pointer"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
      {label}
    </button>
  );
}

export function AvatarButton({ initials = "AJ", onClick }: { initials?: string; onClick?: () => void }) {
  const { user } = useAuth();
  let displayInitials = user?.displayName.split(" ").map((n) => n[0]).join("").toUpperCase() || initials;
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-9 h-9 rounded-full bg-[#c96332] text-white font-bold text-sm flex items-center justify-center transition-all hover:shadow-lg cursor-pointer border-2 border-[#f0b897]"
    >
      {displayInitials}
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
