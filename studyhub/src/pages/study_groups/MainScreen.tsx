import { useState } from "react";
import GroupCard from "../../components/GroupCard";
import CreateGroupModal from "../../components/CreateGroupModal";
import type { StudyGroup } from "../../app/StudyHubApp";

interface MainScreenProps {
  groups: StudyGroup[];
  filterCode: string;
  filterNum: string;
  onFilterCodeChange: (code: string) => void;
  onFilterNumChange: (num: string) => void;
  onDetail: (id: number) => void;
  onChats: () => void;
  onProfile: () => void;
  onJoin: (id: number) => void;
  onCreate: (data: {
    name: string;
    code: string;
    number: string;
    location: string;
    day: string;
    time: string;
    maxMembers: number;
  }) => void;
}

export default function MainScreen({
  groups,
  filterCode,
  filterNum,
  onFilterCodeChange,
  onFilterNumChange,
  onDetail,
  onChats,
  onProfile,
  onJoin,
  onCreate,
}: MainScreenProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const myGroups = groups.filter((g) => g.joined);
  const openGroups = groups.filter((g) => !g.joined);

  const filteredOpenGroups = openGroups.filter((g) => {
    const codeMatch = !filterCode || g.filterCode === filterCode;
    const numMatch = !filterNum || g.filterNum === filterNum;
    return codeMatch && numMatch;
  });

  const courseCodes = [
    ...new Set(openGroups.map((g) => g.filterCode).filter(Boolean)),
  ];
  const courseNumbers = [
    ...new Set(openGroups.map((g) => g.filterNum).filter(Boolean)),
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      {/* Topbar */}
      <div className="h-16 bg-[#faf8f4] border-b border-[#ddd8cc] flex items-center px-5 sticky top-0 z-50">
        <div className="w-24">
          <button
            onClick={onChats}
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
        </div>
        <div className="flex-1 text-center">
          <span className="font-black text-2xl text-[#c96332] font-['Syne'] -tracking-0.5px">
            StudyHub
          </span>
        </div>
        <div className="w-24 flex justify-end">
          <button
            onClick={onProfile}
            className="w-9 h-9 rounded-full bg-[#c96332] text-white font-bold text-sm flex items-center justify-center transition-all hover:shadow-lg cursor-pointer border-2 border-[#f0b897]"
          >
            AJ
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-6 max-w-2xl mx-auto w-full">
        {/* Your Study Groups */}
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9a9282]">
            Your Study Groups
          </span>
          <button className="text-sm text-[#c96332] cursor-pointer bg-none border-none font-bold font-['Plus Jakarta Sans']">
            See all
          </button>
        </div>

        <div>
          {myGroups.length > 0 ? (
            myGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                joined
                onDetail={onDetail}
              />
            ))
          ) : (
            <p className="text-center py-8 text-sm text-[#9a9282] font-medium">
              You haven't joined any groups yet.
            </p>
          )}
        </div>

        <div className="h-px bg-[#ddd8cc] my-7"></div>

        {/* Open Study Groups */}
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9a9282]">
            Open Study Groups
          </span>
        </div>

        {/* Filters */}
        <div className="flex gap-2.5 mb-4 flex-wrap items-center">
          <select
            value={filterCode}
            onChange={(e) => onFilterCodeChange(e.target.value)}
            className="px-3.5 py-3 bg-[#faf8f4] border-2 border-[#ddd8cc] rounded-[9px] text-[#4a4438] text-sm font-semibold outline-none transition-all focus:border-[#c96332] cursor-pointer appearance-none pr-6"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239a9282' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
            }}
          >
            <option value="">All codes</option>
            {courseCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>

          <select
            value={filterNum}
            onChange={(e) => onFilterNumChange(e.target.value)}
            className="px-3.5 py-3 bg-[#faf8f4] border-2 border-[#ddd8cc] rounded-[9px] text-[#4a4438] text-sm font-semibold outline-none transition-all focus:border-[#c96332] cursor-pointer appearance-none pr-6"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239a9282' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
            }}
          >
            <option value="">All numbers</option>
            {courseNumbers.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            className="ml-auto w-9 h-9 rounded-[9px] bg-[#c96332] text-white text-2xl font-black cursor-pointer flex items-center justify-center transition-all hover:bg-[#a34e24] hover:scale-105 hover:shadow-lg flex-shrink-0"
            title="Create group"
          >
            +
          </button>
        </div>

        {/* Open Groups List */}
        <div>
          {filteredOpenGroups.length > 0 ? (
            filteredOpenGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                joined={false}
                onJoin={() => onJoin(group.id)}
                onDetail={() => {}}
              />
            ))
          ) : (
            <p className="text-center py-8 text-sm text-[#9a9282] font-medium">
              No open groups at the moment.
            </p>
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      <CreateGroupModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(data) => {
          onCreate(data);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
}
