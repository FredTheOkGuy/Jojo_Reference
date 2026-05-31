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

export interface StudyGroup {
  id: number;
  name: string;
  course: string;
  icon: string;
  gi: string;
  cur: number;
  max: number;
  joined: boolean;

  /*
    FYI/custom room field.
    Example: "H-561", "LB-320", "EV 1.210"
  */
  location: string;

  /*
    Real physical location used by Google Maps.
    Example: "Concordia University Hall Building, Montreal, QC"
  */
  mapLocation?: string;

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

  /*
    FYI/custom room field.
    Example: "H-561"
  */
  location: string;

  /*
    Map-searchable physical location.
    Example: "Concordia University Hall Building, Montreal, QC"
  */
  mapLocation: string;

  day: string;
  time: string;
  maxMembers: number;
}
