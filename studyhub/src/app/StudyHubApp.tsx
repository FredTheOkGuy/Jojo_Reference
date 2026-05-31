import { useState } from "react";
import { CURRENT_USER, INITIAL_GROUPS } from "../data/mockData";
import LoginScreen from "../features/auth/LoginScreen";
import MainScreen from "../features/study_groups/MainScreen";
import ChatsScreen from "../features/chat/ChatsScreen";
import DetailScreen from "../features/study_groups/DetailScreen";
import ChatScreen from "../features/chat/ChatScreen";
import ProfileScreen from "../features/profile/ProfileScreen";
import AskToJoinModal from "../components/AskToJoinModal";
import { logout } from "../services/firebase/auth";

import type { CreateGroupPayload, StudyGroup } from "./types";

export type {
  CreateGroupPayload,
  DocumentType,
  Member,
  Message,
  StudyGroup,
} from "./types";

type Screen = "login" | "main" | "chats" | "detail" | "chat" | "profile";

export default function StudyHubApp() {
  const [screen, setScreen] = useState<Screen>("login");
  const [groups, setGroups] = useState<StudyGroup[]>(INITIAL_GROUPS);

  const [filterSchool, setFilterSchool] = useState("");
  const [filterNum, setFilterNum] = useState("");
  const [filterCourseName, setFilterCourseName] = useState("");

  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const [requestGroupId, setRequestGroupId] = useState<number | null>(null);
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
            {
              i: CURRENT_USER.initials,
              n: CURRENT_USER.name,
              r: CURRENT_USER.school,
              owner: false,
              c: "#c96332",
            },
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
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
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

  const handleKickMember = (groupId: number, memberInitials: string) => {
    setGroups((currentGroups) =>
      currentGroups.map((group) => {
        if (group.id !== groupId) return group;

        const memberToKick = group.members.find((m) => m.i === memberInitials);
        if (!memberToKick || memberToKick.owner) return group;

        return {
          ...group,
          cur: Math.max(0, group.cur - 1),
          members: group.members.filter((m) => m.i !== memberInitials),
        };
      }),
    );
  };

  const handleDeleteGroup = (id: number) => {
    setGroups((currentGroups) => currentGroups.filter((g) => g.id !== id));
  };

  const handleCreateGroup = (data: CreateGroupPayload) => {
    const newGroup: StudyGroup = {
      id: groups.length,
      name: data.name || "New Study Group",
      course: `${data.code || "MISC"} ${data.number || "000"}`,
      schoolName: CURRENT_USER.school,
      icon: (data.name || data.code || "NEW")
        .split(" ")
        .map((part) => part[0])
        .join("")
        .substring(0, 2)
        .toUpperCase(),
      gi: ["gi-orange", "gi-green", "gi-blue", "gi-purple", "gi-gold"][
        groups.length % 5
      ],
      cur: 1,
      max: data.maxMembers || 8,
      joined: true,
      isPrivate: data.isPrivate ?? false,
      joinRequested: false,

      location: data.location || "TBD",

      mapLocation:
        data.mapLocation ||
        data.location ||
        "Concordia University, Montreal, QC",

      days: data.day || "No date selected",
      time:
        data.startTime && data.endTime
          ? `${data.startTime} – ${data.endTime}`
          : "Time not selected",

      desc: `A new study group for ${data.code || "MISC"} ${
        data.number || "000"
      }.`,
      badgeBg: "#faeade",
      badgeColor: "#c96332",
      members: [
        {
          i: CURRENT_USER.initials,
          n: CURRENT_USER.name,
          r: CURRENT_USER.school,
          owner: true,
          c: "#c96332",
        },
      ],
      docs: [],
      messages: [
        {
          sender: CURRENT_USER.initials,
          senderFull: "You",
          mine: true,
          c: "#c96332",
          text: "I created this group — welcome everyone! 🎉",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
      filterCode: data.code || "MISC",
      filterNum: data.number || "000",
    };

    setGroups([...groups, newGroup]);
  };


  const groupToFormData = (group: StudyGroup): CreateGroupPayload => {
    const [code = "MISC", number = "000"] = group.course.split(" ");
    const [startTime = "17:00", endTime = "18:00"] = group.time.includes(" – ")
      ? group.time.split(" – ")
      : ["17:00", "18:00"];

    return {
      name: group.name,
      code: group.filterCode || code,
      number: group.filterNum || number,
      location: group.location,
      mapLocation: group.mapLocation || group.location,
      day: group.days,
      startTime,
      endTime,
      maxMembers: group.max,
      isPrivate: group.isPrivate,
    };
  };

  const handleUpdateGroup = (id: number, data: CreateGroupPayload) => {
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === id
          ? {
              ...group,
              name: data.name || "New Study Group",
              course: `${data.code || "MISC"} ${data.number || "000"}`,
              icon: (data.name || data.code || "NEW")
                .split(" ")
                .map((part) => part[0])
                .join("")
                .substring(0, 2)
                .toUpperCase(),
              max: data.maxMembers || group.max,
              isPrivate: data.isPrivate,
              location: data.location || "TBD",
              mapLocation:
                data.mapLocation ||
                data.location ||
                "Concordia University, Montreal, QC",
              days: data.day || group.days,
              time:
                data.startTime && data.endTime
                  ? `${data.startTime} – ${data.endTime}`
                  : group.time,
              desc: `A study group for ${data.code || "MISC"} ${
                data.number || "000"
              }.`,
              filterCode: data.code || "MISC",
              filterNum: data.number || "000",
            }
          : group,
      ),
    );
  };

  const requestGroup =
    requestGroupId === null
      ? undefined
      : groups.find((g) => g.id === requestGroupId);

  const handleConfirmJoinRequest = () => {
    if (requestGroupId === null) return;

    setGroups((currentGroups) =>
      currentGroups.map((g) =>
        g.id === requestGroupId ? { ...g, joinRequested: true } : g,
      ),
    );
    setRequestGroupId(null);
  };


  const handleSignOut = async () => {
    try {
      await logout();
    } finally {
      setActiveGroupId(null);
      setScreen("login");
    }
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
      <>
        <AskToJoinModal
          open={requestGroupId !== null}
          group={requestGroup}
          onClose={() => setRequestGroupId(null)}
          onConfirm={handleConfirmJoinRequest}
        />
        <MainScreen
          groups={groups}
          filterSchool={filterSchool}
          filterNum={filterNum}
          filterCourseName={filterCourseName}
          onFilterSchoolChange={setFilterSchool}
          onFilterNumChange={setFilterNum}
          onFilterCourseNameChange={setFilterCourseName}
          onClearFilters={() => {
            setFilterSchool("");
            setFilterNum("");
            setFilterCourseName("");
          }}
          onDetail={(id) => {
            setActiveGroupId(id);
            setDetailFrom("main");
            setScreen("detail");
          }}
          onChats={() => setScreen("chats")}
          onProfile={() => setScreen("profile")}
          onJoin={handleJoin}
          onAskToJoin={(id) => setRequestGroupId(id)}
          onCreate={handleCreateGroup}
        />
      </>
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

  const activeGroup =
    activeGroupId === null
      ? undefined
      : groups.find((g) => g.id === activeGroupId);

  if (screen === "detail" && activeGroup) {
    return (
      <>
        <AskToJoinModal
          open={requestGroupId !== null}
          group={requestGroup}
          onClose={() => setRequestGroupId(null)}
          onConfirm={handleConfirmJoinRequest}
        />
        <DetailScreen
          group={activeGroup}
          editInitialData={groupToFormData(activeGroup)}
          onBack={() => setScreen(detailFrom === "chats" ? "chats" : "main")}
          onChat={() => {
            setChatFrom("detail");
            setScreen("chat");
          }}
          onLeave={() => {
            handleLeave(activeGroup.id);
            setScreen(detailFrom === "chats" ? "chats" : "main");
          }}
          onDelete={() => {
            const confirmed = window.confirm(
              "Delete this study group? This removes the group for everyone in this front-end session.",
            );

            if (!confirmed) return;

            handleDeleteGroup(activeGroup.id);
            setActiveGroupId(null);
            setScreen("main");
          }}
          onJoin={() => handleJoin(activeGroup.id)}
          onAskToJoin={() => setRequestGroupId(activeGroup.id)}
          onUpdate={(data) => handleUpdateGroup(activeGroup.id, data)}
          onKickMember={(memberInitials) => {
            const member = activeGroup.members.find((m) => m.i === memberInitials);
            const confirmed = window.confirm(
              `Kick ${member?.n || "this member"} from the study group?`,
            );

            if (!confirmed) return;

            handleKickMember(activeGroup.id, memberInitials);
          }}
        />
      </>
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
    return (
      <ProfileScreen
        groups={groups}
        onBack={() => setScreen("main")}
        onSignOut={handleSignOut}
      />
    );
  }

  return <div>Unknown screen</div>;
}
