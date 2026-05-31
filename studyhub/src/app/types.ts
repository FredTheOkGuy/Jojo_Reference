export interface Member {
  i: string;
  n: string;
  r: string;
  owner: boolean;
  c: string;
}

export interface DocumentType {
  n: string;
  t: "pdf" | "docx" | "pptx";
  s: string;
}

export interface Message {
  sender: string;
  senderFull: string;
  mine: boolean;
  c: string;
  text: string;
  time: string;
}

export interface StudyGroup_old {
  id: number;
  name: string;
  course: string;
  icon: string;
  gi: string;
  cur: number;
  max: number;
  joined: boolean;
  location: string;
  days: string;
  time: string;
  desc: string;
  badgeBg: string;
  badgeColor: string;
  members: Member[];
  docs: DocumentType[];
  messages: Message[];
  filterCode?: string;
  filterNum?: string;
}

export interface CreateGroupPayload {
  name: string;
  code: string;
  number: string;
  location: string;
  day: string;
  time: string;
  maxMembers: number;
}

export type StudyGroup  = {
  id: string;
  name: string;
  courseCode: string;
  courseNum: string;
  day: string;
  startTime: string;
  endTime: string;
  memberCount: number;
  maxStudents: number;
  isPrivate: boolean;
}