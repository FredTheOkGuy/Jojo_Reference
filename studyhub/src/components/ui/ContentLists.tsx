import type { ReactNode } from "react";
import type { DocumentType, Member } from "../../app/types";
import { Card, EmptyState } from "./Card";

interface MembersListProps {
  members: Member[];
}

export function MembersList({ members }: MembersListProps) {
  if (members.length === 0) {
    return <EmptyState>No members listed.</EmptyState>;
  }

  return (
    <div className="flex flex-col gap-2.5">
      {members.map((member, idx) => (
        <MemberRow key={`${member.i}-${idx}`} member={member} />
      ))}
    </div>
  );
}

export function MemberRow({ member }: { member: Member }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: member.c }}
      >
        {member.i}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-[#1a1610] flex items-center gap-2">
          {member.n}
          {member.owner && <span className="text-xs px-2 py-0.5 rounded-md bg-[#faeade] text-[#c96332] font-bold">Host</span>}
        </div>
        <div className="text-xs text-[#9a9282] font-medium">{member.r}</div>
      </div>
    </div>
  );
}

interface DocumentsListProps {
  documents: DocumentType[];
}

const docTheme: Record<DocumentType["t"], { bg: string; text: string }> = {
  pdf: { bg: "#fde8e8", text: "#b03030" },
  pptx: { bg: "#f7edcc", text: "#8a6a1e" },
  docx: { bg: "#dde6f5", text: "#3d5fa0" },
};

export function DocumentsList({ documents }: DocumentsListProps) {
  if (documents.length === 0) {
    return <p className="text-sm text-[#9a9282] font-medium">No documents yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {documents.map((doc, idx) => (
        <DocumentRow key={`${doc.n}-${idx}`} document={doc} />
      ))}
    </div>
  );
}

export function DocumentRow({ document }: { document: DocumentType }) {
  const colors = docTheme[document.t];
  return (
    <div className="flex items-center gap-2.5 p-2.5 bg-[#edeae2] rounded-[9px] cursor-pointer transition-all hover:bg-[#faeade] hover:border-[#f0b897] border border-transparent">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
        style={{ background: colors.bg, color: colors.text }}
      >
        {document.t.toUpperCase()}
      </div>
      <span className="text-sm font-semibold text-[#1a1610] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
        {document.n}
      </span>
      <span className="text-xs text-[#9a9282] font-medium flex-shrink-0">{document.s}</span>
    </div>
  );
}

export function ListPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="p-4 mb-4">
      <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#9a9282] mb-3">{title}</div>
      {children}
    </Card>
  );
}
