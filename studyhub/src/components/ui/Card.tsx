import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({
  children,
  className = "",
  onClick,
  hoverable = false,
}: CardProps) {
  const hoverClass = hoverable
    ? "hover:border-[#f0b897] hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
    : "";

  return (
    <div
      onClick={onClick}
      className={`bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-5 transition-all shadow-sm ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className = "" }: SectionProps) {
  return (
    <div className={className}>
      {title && (
        <h2 className="text-sm font-bold text-[#4a4438] uppercase tracking-wider mb-3">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

interface InfoGridProps {
  items: {
    label: string;
    value: string | React.ReactNode;
  }[];
  columns?: 1 | 2 | 3 | 4;
}

export function InfoGrid({ items, columns = 2 }: InfoGridProps) {
  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div className={`grid ${colClass[columns]} gap-3`}>
      {items.map((item, idx) => (
        <Card key={idx}>
          <div className="text-xs font-bold uppercase tracking-wider text-[#9a9282] mb-2">
            {item.label}
          </div>
          <div className="text-sm font-bold text-[#1a1610]">{item.value}</div>
        </Card>
      ))}
    </div>
  );
}
