import React from "react";

interface TopBarProps {
  title?: string;
  showChatButton?: boolean;
  showBackButton?: boolean;
  showProfileButton?: boolean;
  profileInitials?: string;
  onChatClick?: () => void;
  onBackClick?: () => void;
  onProfileClick?: () => void;
}

export default function TopBar({
  title,
  showChatButton = false,
  showBackButton = false,
  showProfileButton = false,
  profileInitials = "AJ",
  onChatClick,
  onBackClick,
  onProfileClick,
}: TopBarProps) {
  return (
    <div className="h-16 bg-[#faf8f4] border-b border-[#ddd8cc] flex items-center px-5 sticky top-0 z-50">
      {/* Left Section */}
      <div className="w-24">
        {showChatButton && (
          <button
            onClick={onChatClick}
            className="w-9 h-9 bg-[#edeae2] border border-[#ddd8cc] rounded-[10px] inline-flex items-center justify-center text-[#4a4438] transition-all hover:bg-[#faeade] hover:border-[#f0b897] hover:text-[#c96332]"
            title="Chats"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </button>
        )}
        {showBackButton && (
          <button
            onClick={onBackClick}
            className="flex items-center gap-1.5 text-sm text-[#4a4438] cursor-pointer bg-none border-none font-['Plus Jakarta Sans'] font-bold p-1.5 rounded-lg transition-all hover:text-[#c96332] hover:bg-[#faeade]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>
        )}
      </div>

      {/* Center */}
      {title && (
        <div className="flex-1 text-center">
          <span className="font-black text-2xl text-[#c96332] font-['Syne'] -tracking-0.5px">
            {title}
          </span>
        </div>
      )}

      {/* Right Section */}
      <div className="w-24 flex justify-end">
        {showProfileButton && (
          <button
            onClick={onProfileClick}
            className="w-9 h-9 rounded-full bg-[#c96332] text-white font-bold text-sm flex items-center justify-center transition-all hover:shadow-lg cursor-pointer border-2 border-[#f0b897]"
          >
            {profileInitials}
          </button>
        )}
      </div>
    </div>
  );
}
