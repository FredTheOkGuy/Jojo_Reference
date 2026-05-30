import type { ReactNode } from "react";

interface ProfileItemProps {
  icon: ReactNode;
  label: string;
  tint?: string;
}

export default function ProfileItem({ icon, label, tint = "#faeade" }: ProfileItemProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#ddd8cc] cursor-pointer transition-opacity hover:opacity-70">
      <div className="flex items-center gap-3 text-sm font-semibold text-[#1a1610]">
        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-base" style={{ background: tint }}>
          {icon}
        </div>
        {label}
      </div>
      <span className="text-[#9a9282] font-bold">›</span>
    </div>
  );
}
