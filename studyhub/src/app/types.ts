// Re-export types for compatibility
export interface Member {
  i: string;
  n: string;
  r: string;
  owner: boolean;
  c: string;
}

export interface Document {
  n: string;
  t: 'pdf' | 'docx' | 'pptx';
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

export interface StudyGroup {
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
  docs: Document[];
  messages: Message[];
  filterCode?: string;
  filterNum?: string;
}

export interface User {
  initials: string;
  name: string;
  email: string;
  school: string;
}
