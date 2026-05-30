import { useState } from "react";
import LoginScreen from "../pages/auth/LoginScreen";

interface StudyGroup {
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
  members: any[];
  docs: any[];
  messages: any[];
  filterCode?: string;
  filterNum?: string;
}

const INITIAL_GROUPS: StudyGroup[] = [
  {
    id: 0,
    name: "Algorithm Masters",
    course: "COMP 352",
    icon: "AL",
    gi: "gi-orange",
    cur: 7,
    max: 10,
    joined: true,
    location: "Hall Building H-521",
    days: "Tuesday & Thursday",
    time: "5:00 PM – 7:00 PM",
    desc: "Working through algorithm design, complexity analysis, and exam prep.",
    badgeBg: "#faeade",
    badgeColor: "#c96332",
    members: [],
    docs: [],
    messages: [],
  },
];

type Screen = "login" | "main" | "chats" | "detail" | "chat" | "profile";

export default function StudyHubApp() {
  const [screen, setScreen] = useState<Screen>("login");
  const [groups] = useState<StudyGroup[]>(INITIAL_GROUPS);

  return (
    <div className="min-h-screen bg-[#f2ede3]">
      <LoginScreen onSignIn={() => setScreen("main")} />
    </div>
  );
}
