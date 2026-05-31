interface FilterBarProps {
  filterSchool: string;
  filterNum: string;
  filterCourseName: string;
  onFilterSchoolChange: (school: string) => void;
  onFilterNumChange: (num: string) => void;
  onFilterCourseNameChange: (name: string) => void;
  onClearFilters: () => void;
  onCreate: () => void;
}

const inputClass =
  "w-full px-3.5 py-2.5 bg-[#faf8f4] border-2 border-[#ddd8cc] rounded-[9px] text-[#4a4438] text-sm font-semibold outline-none transition-all placeholder:text-[#9a9282] focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]";

export default function FilterBar({
  filterSchool,
  filterNum,
  filterCourseName,
  onFilterSchoolChange,
  onFilterNumChange,
  onFilterCourseNameChange,
  onClearFilters,
  onCreate,
}: FilterBarProps) {
  const hasFilters = Boolean(filterSchool || filterNum || filterCourseName);

  return (
    <div className="mb-4">
      <div className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-3.5 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#9a9282]">
              Search Groups
            </div>
            <div className="text-xs text-[#9a9282] font-medium mt-0.5">
              Filter by school, course number, or course name.
            </div>
          </div>

          <button
            type="button"
            onClick={onCreate}
            className="px-4 h-10 rounded-[10px] bg-[#c96332] text-white text-sm font-extrabold cursor-pointer flex items-center justify-center gap-1.5 transition-all hover:bg-[#a34e24] hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex-shrink-0"
            title="Create study group"
          >
            <span>Create Group</span>
            <span className="text-lg leading-none">+</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <input
            type="search"
            value={filterSchool}
            onChange={(e) => onFilterSchoolChange(e.target.value)}
            placeholder="School name"
            className={inputClass}
          />

          <input
            type="search"
            value={filterNum}
            onChange={(e) => onFilterNumChange(e.target.value)}
            placeholder="Course number"
            className={inputClass}
          />

          <input
            type="search"
            value={filterCourseName}
            onChange={(e) => onFilterCourseNameChange(e.target.value)}
            placeholder="Course name"
            className={inputClass}
          />
        </div>

        {hasFilters && (
          <div className="flex justify-end mt-3">
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs font-bold text-[#c96332] bg-transparent border-0 cursor-pointer hover:text-[#a34e24]"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
