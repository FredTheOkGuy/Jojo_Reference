interface ProfileScreenProps {
  onBack: () => void;
}

export default function ProfileScreen({ onBack }: ProfileScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      {/* Sub Topbar */}
      <div className="h-14 flex items-center px-5 gap-3 bg-[#faf8f4] border-b border-[#ddd8cc] sticky top-0 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-[#4a4438] cursor-pointer bg-none border-none font-['Plus Jakarta Sans'] font-bold p-1.5 rounded-lg transition-all hover:text-[#c96332] hover:bg-[#faeade]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
      </div>

      {/* Profile Content */}
      <div className="flex-1 max-w-md mx-auto my-8 px-5 w-full flex flex-col items-center gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-[#c96332] text-white font-black text-3xl font-['Syne'] flex items-center justify-center shadow-lg">
          AJ
        </div>

        {/* Profile Fields */}
        <div className="w-full bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#ddd8cc]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#9a9282] mb-1">Full Name</div>
            <div className="text-base font-semibold text-[#1a1610]">Alex Johnson</div>
          </div>
          <div className="px-5 py-4 border-b border-[#ddd8cc]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#9a9282] mb-1">Email</div>
            <div className="text-base font-semibold text-[#1a1610]">alex.johnson@concordia.ca</div>
          </div>
          <div className="px-5 py-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#9a9282] mb-1">School</div>
            <div className="text-base font-semibold text-[#1a1610]">Concordia University</div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={onBack}
          className="w-full py-3.5 bg-transparent text-[#a33030] font-bold border-2 border-[#f0cece] rounded-[9px] font-['Plus Jakarta Sans'] text-sm transition-all hover:bg-[#fdf0f0] hover:border-[#e0a0a0] cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
