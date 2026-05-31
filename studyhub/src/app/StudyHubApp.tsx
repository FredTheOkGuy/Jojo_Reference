import { useState } from "react";
import { INITIAL_GROUPS } from "../data/mockData";
import LoginScreen from "../pages/auth/LoginScreen";
import MainScreen from "../pages/study_groups/MainScreen";
import ChatsScreen from "../features/chat/ChatsScreen";
import DetailScreen from "../pages/study_groups/DetailScreen";
import ChatScreen from "../features/chat/ChatScreen";
import ProfileScreen from "../features/profile/ProfileScreen";

// ============================================
// TYPE DEFINITIONS
// These define the structure of your data
// Replace the mockData file with real API/database calls
// ============================================

export interface Member {
  i: string; // Initials
  n: string; // Full name
  r: string; // Role (Host, Member, etc.)
  owner: boolean; // Is owner
  c: string; // Color code
}

export interface DocumentType {
  n: string; // File name
  t: "pdf" | "docx" | "pptx"; // File type
  s: string; // File size
}

export interface Message {
  sender: string; // Short name for avatar
  senderFull: string; // Full name
  mine: boolean; // Is current user's message
  c: string; // Color
  text: string; // Message content
  time: string; // Timestamp
}

export interface StudyGroup {
  id: number;
  name: string;
  course: string;
  icon: string;
  gi: string; // Group icon color theme
  cur: number; // Current members
  max: number; // Max capacity
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
