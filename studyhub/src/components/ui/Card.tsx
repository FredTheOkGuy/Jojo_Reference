import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = "", onClick, hoverable = false }: CardProps) {
  const hoverClass = hoverable
    ? "cursor-pointer hover:border-[#f0b897] hover:shadow-md hover:-translate-y-0.5"
    : "";

  return (
    <div
      onClick={onClick}
      className={`bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] shadow-sm transition-all ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3.5">
      <span className="text-xs font-bold uppercase tracking-wider text-[#9a9282]">{title}</span>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="text-sm text-[#c96332] bg-transparent border-0 font-bold cursor-pointer hover:text-[#a34e24]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  children: ReactNode;
}

export function EmptyState({ children }: EmptyStateProps) {
  return <p className="text-center py-8 text-sm text-[#9a9282] font-medium">{children}</p>;
}

interface InfoBoxProps {
  label: string;
  value: ReactNode;
  subValue?: ReactNode;
  className?: string;
}

export function InfoBox({ label, value, subValue, className = "" }: InfoBoxProps) {
  return (
    <Card className={`p-4 ${className}`}>
      <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#9a9282] mb-2">{label}</div>
      <div className="font-bold text-base text-[#1a1610]">{value}</div>
      {subValue && <div className="text-sm text-[#9a9282] font-medium mt-0.5">{subValue}</div>}
    </Card>
  );
}

interface InfoGridProps {
  items: Array<{ label: string; value: ReactNode; subValue?: ReactNode; className?: string }>;
  columns?: 1 | 2;
}

export function InfoGrid({ items, columns = 2 }: InfoGridProps) {
  return (
    <div className={`grid ${columns === 1 ? "grid-cols-1" : "grid-cols-2"} gap-3.5`}>
      {items.map((item) => (
        <InfoBox key={item.label} {...item} />
      ))}
    </div>
  );
}

interface CapacityMeterProps {
  current: number;
  max: number;
  compact?: boolean;
}

export function CapacityMeter({ current, max, compact = false }: CapacityMeterProps) {
  const pct = Math.min(100, Math.round((current / max) * 100));
  const colorClass = pct >= 100 ? "bg-[#c96332]" : pct >= 75 ? "bg-[#8a6a1e]" : "bg-[#5a6e3a]";

  if (compact) {
    return (
      <div className="flex items-center gap-2.5">
        <span className="text-xs font-bold text-[#4a4438] whitespace-nowrap">{current} / {max}</span>
        <div className="flex-1 h-1 bg-[#e4e0d6] rounded-full overflow-hidden max-w-[90px]">
          <div className={`h-full rounded-full transition-all ${colorClass}`} style={{ width: `${pct}%` }} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 mt-1">
      <span className="font-bold text-lg text-[#1a1610] font-['Syne']">{current} / {max}</span>
      <div className="flex-1 h-2 bg-[#e4e0d6] rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-semibold text-[#9a9282]">
        {Math.max(0, max - current)} spot{max - current !== 1 ? "s" : ""} left
      </span>
    </div>
  );
}
