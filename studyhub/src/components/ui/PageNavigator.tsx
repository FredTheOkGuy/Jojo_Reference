interface PageNavigatorProps {
  items: string[];
}

export default function PageNavigator({ items }: PageNavigatorProps) {
  return (
    <div className="w-full bg-[#f2ede3] border-b border-[#ddd8cc]">
      <div className="max-w-2xl mx-auto px-5 py-2.5 flex items-center gap-2 text-xs font-bold text-[#9a9282]">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-2">
            <span
              className={
                index === items.length - 1 ? "text-[#c96332]" : "text-[#9a9282]"
              }
            >
              {item}
            </span>

            {index < items.length - 1 && (
              <span className="text-[#cec8bc]">/</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
