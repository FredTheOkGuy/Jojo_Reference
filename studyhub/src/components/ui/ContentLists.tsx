import React from "react";
import type { Member, DocumentType } from "../../app/StudyHubApp";

interface MembersListProps {
  members: Member[];
}

export function MembersList({ members }: MembersListProps) {
  if (members.length === 0) {
    return (
      <p className="text-sm text-[#9a9282] text-center py-4">No members yet</p>
    );
  }

  return (
    <div className="space-y-2">
      {members.map((member) => (
        <div
          key={member.i}
          className="bg-[#faf8f4] border border-[#ddd8cc] rounded-lg p-3 flex items-center gap-3"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
            style={{ background: member.c }}
          >
            {member.i}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-[#1a1610]">{member.n}</div>
            <div className="text-xs text-[#9a9282] font-medium">{member.r}</div>
          </div>
          {member.owner && (
            <span className="text-xs font-bold px-2 py-1 bg-[#faeade] text-[#c96332] rounded-lg">
              Host
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

interface DocumentsListProps {
  documents: DocumentType[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
  if (documents.length === 0) {
    return (
      <p className="text-sm text-[#9a9282] text-center py-4">No documents</p>
    );
  }

  const getDocIcon = (type: string) => {
    const icons = {
      pdf: "PDF",
      docx: "DOCX",
      pptx: "PPTX",
    };
    return icons[type as keyof typeof icons] || "FILE";
  };

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.n}
          className="bg-[#faf8f4] border border-[#ddd8cc] rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:border-[#f0b897] transition-all"
        >
          <div className="w-12 h-12 bg-[#edeae2] rounded-lg flex items-center justify-center text-xs font-bold text-[#4a4438] flex-shrink-0">
            {getDocIcon(doc.t)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-[#1a1610] truncate">
              {doc.n}
            </div>
            <div className="text-xs text-[#9a9282] font-medium">{doc.s}</div>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9a9282"
            strokeWidth="2"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      ))}
    </div>
  );
}
