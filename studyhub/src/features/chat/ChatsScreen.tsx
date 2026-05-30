import { StudyGroup } from '../../app/types';

const GI_COLORS_MAP: Record<string, { bg: string; text: string }> = {
  'gi-orange': { bg: '#faeade', text: '#c96332' },
  'gi-green': { bg: '#e8edda', text: '#5a6e3a' },
  'gi-blue': { bg: '#dde6f5', text: '#3d5fa0' },
  'gi-purple': { bg: '#ede0f7', text: '#7a4fa0' },
  'gi-gold': { bg: '#f7edcc', text: '#8a6a1e' },
};

interface ChatsScreenProps {
  groups: StudyGroup[];
  onBack: () => void;
  onOpenChat: (id: number) => void;
}

export default function ChatsScreen({ groups, onBack, onOpenChat }: ChatsScreenProps) {
  const myGroups = groups.filter((g) => g.joined);

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      {/* Topbar */}
      <div className="h-16 bg-[#faf8f4] border-b border-[#ddd8cc] flex items-center px-5 sticky top-0 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-[#4a4438] cursor-pointer bg-none border-none font-['Plus Jakarta Sans'] font-bold p-1.5 rounded-lg transition-all hover:text-[#c96332] hover:bg-[#faeade]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="flex-1 text-center">
          <div className="font-bold text-lg text-[#1a1610] font-['Syne']">Messages</div>
        </div>
        <div className="w-16"></div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-5 max-w-2xl mx-auto w-full">
        {myGroups.length > 0 ? (
          myGroups.map((group) => {
            const lastMessage =
              group.messages.length > 0 ? group.messages[group.messages.length - 1] : null;
            const preview = lastMessage
              ? (lastMessage.mine ? 'You: ' : lastMessage.senderFull + ': ') + lastMessage.text
              : 'No messages yet';
            const colors = GI_COLORS_MAP[group.gi] || GI_COLORS_MAP['gi-orange'];

            return (
              <div
                key={group.id}
                className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-4 mb-2.5 flex items-center gap-3.5 cursor-pointer transition-all shadow-sm hover:border-[#f0b897] hover:shadow-md hover:-translate-y-0.5"
                onClick={() => onOpenChat(group.id)}
              >
                <div
                  className="w-12 h-12 rounded-[12px] flex items-center justify-center font-black text-base font-['Syne'] flex-shrink-0 -tracking-0.5px"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {group.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base text-[#1a1610] font-['Syne'] mb-0.5">
                    {group.name}
                  </div>
                  <div className="text-xs text-[#9a9282] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    {preview}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  {lastMessage && (
                    <span className="text-xs text-[#9a9282] font-semibold">{lastMessage.time}</span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center py-12 text-sm text-[#9a9282] font-medium">
            Join a study group to start chatting.
          </p>
        )}
      </div>
    </div>
  );
}
