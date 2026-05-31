import { motion } from "framer-motion";

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
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="mb-4"
    >
      <motion.div
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-3.5 shadow-sm"
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#9a9282]">
              Search Groups
            </div>
            <div className="text-xs text-[#9a9282] font-medium mt-0.5">
              Filter by school, course number, or course name.
            </div>
          </div>

          <motion.button
            type="button"
            onClick={onCreate}
            whileHover={{ scale: 1.035, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="px-4 h-10 rounded-[10px] bg-[#c96332] text-white text-sm font-extrabold cursor-pointer flex items-center justify-center gap-1.5 transition-colors hover:bg-[#a34e24] hover:shadow-lg active:scale-[0.98] flex-shrink-0"
            title="Create study group"
          >
            <span>Create Group</span>
            <motion.span
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
              className="text-lg leading-none"
            >
              +
            </motion.span>
          </motion.button>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
        >
          {[
            {
              value: filterSchool,
              onChange: onFilterSchoolChange,
              placeholder: "School name",
            },
            {
              value: filterNum,
              onChange: onFilterNumChange,
              placeholder: "Course number",
            },
            {
              value: filterCourseName,
              onChange: onFilterCourseNameChange,
              placeholder: "Course name",
            },
          ].map((input) => (
            <motion.input
              key={input.placeholder}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              whileFocus={{ scale: 1.015 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              type="search"
              value={input.value}
              onChange={(e) => input.onChange(e.target.value)}
              placeholder={input.placeholder}
              className={inputClass}
            />
          ))}
        </motion.div>

        {hasFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex justify-end mt-3"
          >
            <motion.button
              type="button"
              onClick={onClearFilters}
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.96 }}
              className="text-xs font-bold text-[#c96332] bg-transparent border-0 cursor-pointer hover:text-[#a34e24]"
            >
              Clear search
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
