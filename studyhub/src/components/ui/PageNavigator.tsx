interface PageNavigatorProps {
  items: string[];
}

export default function PageNavigator({ items }: PageNavigatorProps) {
  return (
    <nav className="w-full border-b border-[#e6e0d5]/70 bg-[#f2ede3]/80">
      <div className="mx-auto flex w-full max-w-[min(42rem,100vw)] items-center gap-2 overflow-x-auto px-[clamp(0.875rem,4vw,1.25rem)] py-2.5 text-xs font-bold text-[#9a9282]">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="flex shrink-0 items-center gap-2">
            <span className={index === items.length - 1 ? "max-w-[12rem] truncate text-[#c96332]" : "max-w-[10rem] truncate"}>
              {item}
            </span>
            {index < items.length - 1 && <span>/</span>}
          </div>
        ))}
      </div>
    </nav>
  );
}
