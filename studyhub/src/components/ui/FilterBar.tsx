import { Plus } from "lucide-react";

interface FilterBarProps {
  filterCode: string;
  filterNum: string;
  courseCodes: string[];
  courseNumbers: string[];
  onFilterCodeChange: (code: string) => void;
  onFilterNumChange: (num: string) => void;
  onCreate: () => void;
}

const selectClass = "px-3.5 py-2.5 bg-[#faf8f4] border-2 border-[#ddd8cc] rounded-[9px] text-[#4a4438] text-sm font-semibold outline-none transition-all focus:border-[#c96332] cursor-pointer";

export default function FilterBar({
  filterCode,
  filterNum,
  courseCodes,
  courseNumbers,
  onFilterCodeChange,
  onFilterNumChange,
  onCreate,
}: FilterBarProps) {
  return (
    <div className="flex gap-2.5 mb-4 flex-wrap items-center">
      <select value={filterCode} onChange={(e) => onFilterCodeChange(e.target.value)} className={selectClass}>
        <option value="">All codes</option>
        {courseCodes.map((code) => <option key={code} value={code}>{code}</option>)}
      </select>

      <select value={filterNum} onChange={(e) => onFilterNumChange(e.target.value)} className={selectClass}>
        <option value="">All numbers</option>
        {courseNumbers.map((num) => <option key={num} value={num}>{num}</option>)}
      </select>

      <button
        type="button"
        onClick={onCreate}
        className="ml-auto w-9 h-9 rounded-[9px] bg-[#c96332] text-white flex items-center justify-center transition-all hover:bg-[#a34e24] hover:scale-105 hover:shadow-lg flex-shrink-0"
        title="Create group"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}
