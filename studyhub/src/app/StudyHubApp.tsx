import { useState } from "react";
import { CURRENT_USER, INITIAL_GROUPS } from "../data/mockData";
import LoginScreen from "../pages/auth/LoginScreen";
import MainScreen from "../pages/study_groups/MainScreen";
import ChatsScreen from "../features/chat/ChatsScreen";
import DetailScreen from "../pages/study_groups/DetailScreen";
import ChatScreen from "../features/chat/ChatScreen";
import ProfileScreen from "../features/profile/ProfileScreen";

import type { CreateGroupPayload, StudyGroup } from "./types";
export type { CreateGroupPayload, DocumentType, Member, Message, StudyGroup } from "./types";

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
    setGroups((currentGroups) =>
      currentGroups.map((g) => {
        if (g.id !== id || g.joined || g.cur >= g.max) return g;
        return {
          ...g,
          joined: true,
          cur: g.cur + 1,
          members: [
            { i: CURRENT_USER.initials, n: CURRENT_USER.name, r: CURRENT_USER.school, owner: false, c: "#c96332" },
            ...g.members,
          ],
          messages: [
            ...g.messages,
            {
              sender: CURRENT_USER.initials,
              senderFull: "You",
              mine: true,
              c: "#c96332",
              text: "Hey everyone! Just joined the group 👋",
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ],
        };
      }),
    );
  };

  const handleLeave = (id: number) => {
    setGroups((currentGroups) =>
      currentGroups.map((g) =>
        g.id === id
          ? {
              ...g,
              joined: false,
              cur: Math.max(0, g.cur - 1),
              members: g.members.filter((m) => m.i !== CURRENT_USER.initials),
            }
          : g,
      ),
    );
  };

  const handleCreateGroup = (data: CreateGroupPayload) => {
    const newGroup: StudyGroup = {
      id: groups.length,
      name: data.name || "New Study Group",
      course: `${data.code || "MISC"} ${data.number || "000"}`,
      icon: (data.name || data.code || "NEW").split(" ").map((part) => part[0]).join("").substring(0, 2).toUpperCase(),
      gi: ["gi-orange", "gi-green", "gi-blue", "gi-purple", "gi-gold"][
        groups.length % 5
      ],
      cur: 1,
      max: data.maxMembers || 8,
      joined: true,
      location: data.location || "TBD",
      days: data.day || "Monday",
      time: data.time ? `${data.time} – onwards` : "17:00 – onwards",
      desc: `A new study group for ${data.code || "MISC"} ${data.number || "000"}.`,
      badgeBg: "#faeade",
      badgeColor: "#c96332",
      members: [{ i: CURRENT_USER.initials, n: CURRENT_USER.name, r: CURRENT_USER.school, owner: true, c: "#c96332" }],
      docs: [],
      messages: [
        {
          sender: CURRENT_USER.initials,
          senderFull: "You",
          mine: true,
          c: "#c96332",
          text: "I created this group — welcome everyone! 🎉",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
      filterCode: data.code || "MISC",
      filterNum: data.number || "000",
    };
    setGroups([...groups, newGroup]);
  };

  const handleSendMessage = (text: string) => {
    if (activeGroupId !== null) {
      setGroups((currentGroups) =>
        currentGroups.map((g) =>
          g.id === activeGroupId
            ? {
                ...g,
                messages: [
                  ...g.messages,
                  {
                    sender: CURRENT_USER.initials,
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

  const activeGroup = activeGroupId === null ? undefined : groups.find((g) => g.id === activeGroupId);

  if (screen === "detail" && activeGroup) {
    return (
      <DetailScreen
        group={activeGroup}
        onBack={() => setScreen(detailFrom === "chats" ? "chats" : "main")}
        onChat={() => {
          setChatFrom("detail");
          setScreen("chat");
        }}
        onLeave={() => {
          handleLeave(activeGroup.id);
          setScreen(detailFrom === "chats" ? "chats" : "main");
        }}
      />
    );
  }

  if (screen === "chat" && activeGroup) {
    return (
      <ChatScreen
        group={activeGroup}
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
