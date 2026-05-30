import { StudyGroup } from '../../app/types';

const GI_COLORS_MAP: Record<string, { bg: string; text: string }> = {
  'gi-orange': { bg: '#faeade', text: '#c96332' },
  'gi-green': { bg: '#e8edda', text: '#5a6e3a' },
  'gi-blue': { bg: '#dde6f5', text: '#3d5fa0' },
  'gi-purple': { bg: '#ede0f7', text: '#7a4fa0' },
  'gi-gold': { bg: '#f7edcc', text: '#8a6a1e' },
};

interface DetailScreenProps {
  group: StudyGroup;
  onBack: () => void;
  onOpenChat: () => void;
  onLeave: () => void;
}

export default function DetailScreen({ group, onBack, onOpenChat, onLeave }: DetailScreenProps) {
  const pct = Math.round((group.cur / group.max) * 100);
  const capacityClass =
    pct >= 100 ? 'bg-[#c96332]' : pct >= 75 ? 'bg-[#8a6a1e]' : 'bg-[#5a6e3a]';
  const colors = GI_COLORS_MAP[group.gi] || GI_COLORS_MAP['gi-orange'];

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

      {/* Content */}
      <div className="max-w-2xl mx-auto px-5 py-7 w-full flex-1">
        {/* Hero Section */}
        <div className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[18px] p-6.5 mb-4 shadow-sm">
          <div
            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-[0.06em] mb-3"
            style={{ background: group.badgeBg, color: group.badgeColor }}
          >
            {group.course}
          </div>
          <h1 className="font-black text-4xl text-[#1a1610] font-['Syne'] mb-1.5 -tracking-0.5px leading-tight">
            {group.name}
          </h1>
          <p className="text-sm text-[#4a4438] leading-relaxed font-medium mb-5">{group.desc}</p>

          {/* Action Buttons */}
          <div className="flex gap-2.5">
            <button
              onClick={onOpenChat}
              className="flex-1 py-3 px-4 bg-[#c96332] text-white rounded-[10px] font-bold text-sm font-['Plus Jakarta Sans'] transition-all hover:bg-[#a34e24] hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Open Chat
            </button>
            <button
              onClick={onLeave}
              className="flex-1 py-3 px-4 bg-[#fdf0f0] text-[#a33030] rounded-[10px] font-bold text-sm font-['Plus Jakarta Sans'] transition-all hover:bg-[#fdf0f0] cursor-pointer border-2 border-[#f0cece]"
            >
              Leave Group
            </button>
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-2 gap-3.5 mb-4">
          {/* Location */}
          <div className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#9a9282] mb-2">📍 Location</div>
            <div className="font-bold text-base text-[#1a1610]">{group.location}</div>
          </div>

          {/* Schedule */}
          <div className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#9a9282] mb-2">🕐 Schedule</div>
            <div className="font-bold text-base text-[#1a1610]">{group.days}</div>
            <div className="text-sm text-[#9a9282] font-medium mt-0.5">{group.time}</div>
          </div>

          {/* Capacity */}
          <div className="col-span-2 bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#9a9282] mb-2">👥 Capacity</div>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-bold text-lg text-[#1a1610] font-['Syne']">
                {group.cur} / {group.max}
              </span>
              <div className="flex-1 h-1.75 bg-[#e4e0d6] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${capacityClass}`} style={{ width: `${pct}%` }}></div>
              </div>
              <span className="text-xs font-semibold text-[#9a9282]">
                {group.max - group.cur} spot{group.max - group.cur !== 1 ? 's' : ''} left
              </span>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-4.5 mb-4 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#9a9282] mb-3">
            👥 Members ({group.members.length})
          </div>
          <div className="flex flex-col gap-2.5">
            {group.members.length > 0 ? (
              group.members.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: member.c }}
                  >
                    {member.i}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-[#1a1610] flex items-center gap-2">
                      {member.n}
                      {member.owner && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-[#faeade] text-[#c96332] font-bold">
                          Host
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#9a9282] font-medium">{member.r}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#9a9282] font-medium">No members listed.</p>
            )}
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-4.5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#9a9282] mb-3">
            📂 Documents
          </div>
          <div className="flex flex-col gap-1.75">
            {group.docs.length > 0 ? (
              group.docs.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 bg-[#edeae2] rounded-[9px] cursor-pointer transition-all hover:bg-[#faeade] hover:border-[#f0b897] border border-transparent"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{
                      background:
                        doc.t === 'pdf'
                          ? '#fde8e8'
                          : doc.t === 'pptx'
                            ? '#f7edcc'
                            : '#dde6f5',
                      color:
                        doc.t === 'pdf'
                          ? '#b03030'
                          : doc.t === 'pptx'
                            ? '#8a6a1e'
                            : '#3d5fa0',
                    }}
                  >
                    {doc.t.toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-[#1a1610] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {doc.n}
                  </span>
                  <span className="text-xs text-[#9a9282] font-medium flex-shrink-0">{doc.s}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#9a9282] font-medium">No documents yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
