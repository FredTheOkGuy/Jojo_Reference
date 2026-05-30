import { useState } from "react";
import LoginScreen from "../pages/auth/LoginScreen";
import MainScreen from "../pages/study_groups/MainScreen";
import ChatsScreen from "../features/chat/ChatsScreen";
import DetailScreen from "../pages/study_groups/DetailScreen";
import ChatScreen from "../features/chat/ChatScreen";
import ProfileScreen from "../features/profile/ProfileScreen";

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
    members: [
      { i: "AJ", n: "Alice Johnson", r: "Host", owner: true, c: "#c96332" },
      { i: "MB", n: "Marcus Brown", r: "Member", owner: false, c: "#5a6e3a" },
    ],
    docs: [
      { n: "Algo_Notes.pdf", t: "pdf", s: "2.4 MB" },
      { n: "Practice_Set.docx", t: "docx", s: "1.2 MB" },
    ],
    messages: [
      {
        sender: "AJ",
        senderFull: "Alice",
        mine: true,
        c: "#c96332",
        text: "Hey, ready for the test?",
        time: "2:45 PM",
      },
      {
        sender: "MB",
        senderFull: "Marcus",
        mine: false,
        c: "#5a6e3a",
        text: "Almost there! Need to review recursion",
        time: "2:48 PM",
      },
    ],
  },
  {
    id: 1,
    name: "Calculus Crew",
    course: "MATH 203",
    icon: "CA",
    gi: "gi-green",
    cur: 5,
    max: 8,
    joined: false,
    location: "Library LB 320",
    days: "Monday & Wednesday",
    time: "4:00 PM – 5:30 PM",
    desc: "Integration techniques and calculus problem solving.",
    badgeBg: "#e8edda",
    badgeColor: "#5a6e3a",
    members: [],
    docs: [],
    messages: [],
  },
  {
    id: 2,
    name: "Digital Systems Study",
    course: "COEN 244",
    icon: "DS",
    gi: "gi-purple",
    cur: 6,
    max: 10,
    joined: false,
    location: "EV 1.210",
    days: "Friday",
    time: "6:00 PM – 8:00 PM",
    desc: "Digital circuits, logic gates, and Verilog simulations.",
    badgeBg: "#ede0f7",
    badgeColor: "#7a4fa0",
    members: [],
    docs: [],
    messages: [],
  },
];

type Screen = "login" | "main" | "chats" | "detail" | "chat" | "profile";

export default function StudyHubApp() {
  const [screen, setScreen] = useState<Screen>("login");
  const [groups, setGroups] = useState<StudyGroup[]>(INITIAL_GROUPS);
  const [filterCode, setFilterCode] = useState("");
  const [filterNum, setFilterNum] = useState("");
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const [detailFrom, setDetailFrom] = useState<"main" | "chats">("main");
  const [chatFrom, setChatFrom] = useState<"detail" | "chats">("detail");

  const handleJoin = (id: number) => {
    setGroups(groups.map((g) => (g.id === id ? { ...g, joined: true } : g)));
  };

  const handleLeave = (id: number) => {
    setGroups(groups.map((g) => (g.id === id ? { ...g, joined: false } : g)));
  };

  const handleCreateGroup = (data: any) => {
    const newGroup: StudyGroup = {
      id: groups.length,
      name: data.name || "New Study Group",
      course: `${data.code}-${data.number}`,
      icon: (data.code || "NEW").substring(0, 2).toUpperCase(),
      gi: ["gi-orange", "gi-green", "gi-blue", "gi-purple", "gi-gold"][
        groups.length % 5
      ],
      cur: 1,
      max: data.maxMembers || 8,
      joined: true,
      location: data.location || "TBD",
      days: data.day || "Monday",
      time: data.time || "17:00",
      desc: "New study group",
      badgeBg: "#faf8f4",
      badgeColor: "#c96332",
      members: [],
      docs: [],
      messages: [],
      filterCode: data.code,
      filterNum: data.number,
    };
    setGroups([...groups, newGroup]);
  };

  const handleSendMessage = (text: string) => {
    if (activeGroupId !== null) {
      setGroups(
        groups.map((g) =>
          g.id === activeGroupId
            ? {
                ...g,
                messages: [
                  ...g.messages,
                  {
                    sender: "You",
                    senderFull: "You",
                    mine: true,
                    c: "#c96332",
                    text,
                    time: new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  },
                ],
              }
            : g,
        ),
      );
    }
  };

  if (screen === "login") {
    return <LoginScreen onSignIn={() => setScreen("main")} />;
  }

  if (screen === "main") {
    return (
      <MainScreen
        groups={groups}
        filterCode={filterCode}
        filterNum={filterNum}
        onFilterCodeChange={setFilterCode}
        onFilterNumChange={setFilterNum}
        onDetail={(id) => {
          setActiveGroupId(id);
          setDetailFrom("main");
          setScreen("detail");
        }}
        onChats={() => setScreen("chats")}
        onProfile={() => setScreen("profile")}
        onJoin={handleJoin}
        onCreate={handleCreateGroup}
      />
    );
  }

  if (screen === "chats") {
    return (
      <ChatsScreen
        groups={groups}
        onDetail={(id) => {
          setActiveGroupId(id);
          setDetailFrom("chats");
          setScreen("detail");
        }}
        onChat={(id) => {
          setActiveGroupId(id);
          setChatFrom("chats");
          setScreen("chat");
        }}
        onBack={() => setScreen("main")}
        onProfile={() => setScreen("profile")}
      />
    );
  }

  if (screen === "detail" && activeGroupId !== null) {
    return (
      <DetailScreen
        group={groups[activeGroupId]}
        onBack={() => setScreen(detailFrom === "chats" ? "chats" : "main")}
        onChat={() => {
          setChatFrom("detail");
          setScreen("chat");
        }}
        onLeave={() => {
          handleLeave(activeGroupId);
          setScreen(detailFrom === "chats" ? "chats" : "main");
        }}
      />
    );
  }

  if (screen === "chat" && activeGroupId !== null) {
    return (
      <ChatScreen
        group={groups[activeGroupId]}
        onBack={() => setScreen(chatFrom === "chats" ? "chats" : "detail")}
        onSendMessage={handleSendMessage}
      />
    );
  }

  if (screen === "profile") {
    return <ProfileScreen groups={groups} onBack={() => setScreen("main")} />;
  }

  return <div>Unknown screen</div>;
}
