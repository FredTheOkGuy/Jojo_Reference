import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { EmptyState } from "@/components/ui/Card";
import PageNavigator from "@/components/ui/PageNavigator";
import TopBar, { AvatarButton, BackButton } from "@/components/ui/TopBar";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/services/firebase/firebase";

type ChatGroup = {
  id: string;
  name: string;
  courseCode: string;
  courseNumber: string;
  memberCount: number;
  maxStudents: number;
  lastMessage: string;
  lastMessageTime: string;
};

export default function ChatsScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [groups, setGroups] = useState<ChatGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const uid = user.uid;

    let cancelled = false;

    async function loadChats() {
      try {
        setLoading(true);

        const userRef = doc(db, "users", uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          setGroups([]);
          return;
        }

        const groupIds = (userSnapshot.data().groupIds as string[]) ?? [];

        const loadedGroups = await Promise.all(
          groupIds.map(async (groupId) => {
            const groupRef = doc(db, "study_groups", groupId);
            const groupSnapshot = await getDoc(groupRef);

            if (!groupSnapshot.exists()) return null;

            const groupData = groupSnapshot.data();

            const messagesQuery = query(
              collection(db, "study_groups", groupId, "chat_messages"),
              orderBy("timestamp", "desc"),
              limit(1)
            );

            const messagesSnapshot = await getDocs(messagesQuery);
            const lastMessageDoc = messagesSnapshot.docs[0];
            const lastMessageData = lastMessageDoc?.data();

            return {
              id: groupSnapshot.id,
              name: groupData.groupName ?? "Unnamed Group",
              courseCode: groupData.courseCode ?? "",
              courseNumber: groupData.courseNumber ?? "",
              memberCount: groupData.members?.length ?? 0,
              maxStudents: groupData.maxStudents ?? 0,
              lastMessage: lastMessageData
                ? `${lastMessageData.sender}: ${lastMessageData.message}`
                : "No messages yet",
              lastMessageTime: lastMessageData?.timestamp
                ? lastMessageData.timestamp
                    .toDate()
                    .toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                : "",
            };
          })
        );

        if (!cancelled) {
          setGroups(
            loadedGroups.filter(
              (group): group is ChatGroup => group !== null
            )
          );
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          alert("Failed to load chats.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadChats();

    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar
        title="Messages"
        left={<BackButton onClick={() => navigate("/app")} label="" />}
        right={<AvatarButton onClick={() => navigate("/app/profile")} />}
      />

      <PageNavigator items={["StudyHub", "Messages"]} />

      <main className="flex-1 px-5 py-5 max-w-2xl mx-auto w-full">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-10 h-10 border-4 border-[#ddd8cc] border-t-[#c96332] rounded-full animate-spin" />
          </div>
        ) : groups.length > 0 ? (
          groups.map((group) => (
            <div
              key={group.id}
              onClick={() => navigate(`/app/chat/${group.id}`)}
              className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-4 mb-2.5 flex items-center gap-3.5 cursor-pointer transition-all shadow-sm hover:border-[#f0b897] hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-[12px] flex items-center justify-center font-black text-base font-['Syne'] flex-shrink-0 bg-[#e8edda] text-[#5a6e3a]">
                {group.name.slice(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-bold text-base text-[#1a1610] font-['Syne'] mb-0.5">
                  {group.name}
                </div>

                <div className="text-xs text-[#9a9282] font-medium mb-1">
                  {group.courseCode} {group.courseNumber} ·{" "}
                  {group.memberCount}/{group.maxStudents} members
                </div>

                <div className="text-xs text-[#9a9282] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  {group.lastMessage}
                </div>
              </div>

              {group.lastMessageTime && (
                <span className="text-xs text-[#9a9282] font-semibold flex-shrink-0">
                  {group.lastMessageTime}
                </span>
              )}
            </div>
          ))
        ) : (
          <EmptyState>Join a study group to start chatting.</EmptyState>
        )}
      </main>
    </div>
  );
}