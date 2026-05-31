import type { CreateGroupPayload, StudyGroup } from "@/app/types";
import CreateGroupModal from "@/components/CreateGroupModal";
import GroupCard from "@/components/GroupCard";
import { EmptyState, SectionHeader } from "@/components/ui/Card";
import FilterBar from "@/components/ui/FilterBar";
import PageNavigator from "@/components/ui/PageNavigator";
import TopBar, {
  AvatarButton,
  ChatIcon,
  IconButton,
} from "@/components/ui/TopBar";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/services/firebase/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface MainScreenProps {
  filterCode: string;
  filterNum: string;
  onJoin: (id: string) => void;
  onCreate: (data: CreateGroupPayload) => void;
}

export default function MainScreen({
}: MainScreenProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [myGroups, setMyGroups] = useState<StudyGroup[]>([]);
  const [allGroups, setAllGroups] = useState<StudyGroup[]>([]);
  const [openGroups, setOpenGroups] = useState<StudyGroup[]>([]);
  const [availableCodes, setAvailableCodes] = useState<string[]>([]);
  const [availableNums, setAvailableNums] = useState<string[]>([]);
  const [displayGroups, setDisplayGroups] = useState<StudyGroup[]>([]);
  const [searchCode, setSearchCode] = useState("");
  const [searchNum, setSearchNum] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const uid = user.uid;
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        await reloadGroups(uid, cancelled);
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          alert("Failed to load group data. Please try again later.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    const filtered = openGroups.filter((g) => {
      const codeMatch = searchCode === "" || g.courseCode === searchCode;
      const numMatch = searchNum === "" || g.courseNum === searchNum;

      return codeMatch && numMatch;
    });

    setDisplayGroups(filtered);
  }, [searchCode, searchNum, openGroups]);

  async function reloadGroups(uid: string, cancelled = false) {
    const joinedGroups = await getMyGroups(uid);
    const groups = await getAllGroups();

    if (cancelled) return;

    setMyGroups(joinedGroups);
    setAllGroups(groups);

    const joinedIds = new Set(joinedGroups.map((g) => g.id));

    const available = groups.filter(
      (g) => !joinedIds.has(g.id) && g.memberCount < g.maxStudents
    );

    setOpenGroups(available);

    setAvailableCodes([...new Set(available.map((g) => g.courseCode))]);
    setAvailableNums([...new Set(available.map((g) => g.courseNum))]);
  }

  async function getMyGroups(uid: string): Promise<StudyGroup[]> {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return [];
    }

    const groupIds = (userSnapshot.data()?.groupIds as string[]) ?? [];

    const groups = await Promise.all(
      groupIds.map(async (groupId) => {
        const groupRef = doc(db, "study_groups", groupId);
        const groupSnapshot = await getDoc(groupRef);

        if (!groupSnapshot.exists()) {
          return null;
        }

        const data = groupSnapshot.data();

        return {
          id: groupSnapshot.id,
          name: data.groupName as string,
          courseCode: data.courseCode as string,
          courseNum: data.courseNumber as string,
          day: (data.day as string) ?? "DNE",
          startTime:
            (data.startTime as string) ??
            (data.studyTimeStart?.toDate?.().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) as string) ??
            "DNE",
          endTime:
            (data.endTime as string) ??
            (data.studyTimeEnd?.toDate?.().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }) as string) ??
            "DNE",
          memberCount: data.members?.length ?? 0,
          maxStudents: data.maxStudents as number,
          isPrivate: (data.isPrivate as boolean) ?? false,
        };
      })
    );

    return groups.filter((group): group is StudyGroup => group !== null);
  }

  async function getAllGroups(): Promise<StudyGroup[]> {
    const groupsRef = collection(db, "study_groups");
    const groupsSnapshot = await getDocs(groupsRef);

    return groupsSnapshot.docs.map((groupDoc) => {
      const data = groupDoc.data();

      return {
        id: groupDoc.id,
        name: data.groupName as string,
        courseCode: data.courseCode as string,
        courseNum: data.courseNumber as string,
        day: (data.day as string) ?? "DNE",
        startTime:
          (data.startTime as string) ??
          (data.studyTimeStart?.toDate?.().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }) as string) ??
          "DNE",
        endTime:
          (data.endTime as string) ??
          (data.studyTimeEnd?.toDate?.().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }) as string) ??
          "DNE",
        memberCount: data.members?.length ?? 0,
        maxStudents: data.maxStudents as number,
        isPrivate: (data.isPrivate as boolean) ?? false,
      };
    });
  }

  async function handleJoinGroup(groupId: string) {
    if (!user) return;

    try {
      const uid = user.uid;
      const studentName = user.displayName ?? user.email ?? uid;

      await updateDoc(doc(db, "study_groups", groupId), {
        members: arrayUnion(studentName),
      });

      await updateDoc(doc(db, "users", uid), {
        groupIds: arrayUnion(groupId),
      });

      await reloadGroups(uid);
    } catch (error) {
      console.error(error);
      alert("Failed to join group.");
    }
  }

  async function handleCreateGroup(data: CreateGroupPayload) {
    if (!user) return;

    try {
      const uid = user.uid;
      const creatorName = user.displayName ?? user.email ?? uid;

      const startDate = new Date();
      const [hours, minutes] = data.time.split(":").map(Number);
      startDate.setHours(hours, minutes, 0, 0);

      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 2);

      const groupRef = await addDoc(collection(db, "study_groups"), {
        groupName: data.name,
        courseCode: data.code,
        courseNumber: data.number,
        creatorName,
        studyAddress: data.location,
        studyRoom: "",
        studyDate: startDate,
        studyTimeStart: startDate,
        studyTimeEnd: endDate,
        day: data.day,
        startTime: data.time,
        endTime: endDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        maxStudents: data.maxMembers,
        members: [creatorName],
        isPrivate: false,
        createdAt: serverTimestamp(),
      });

      await addDoc(collection(db, "study_groups", groupRef.id, "chat_messages"), {
        sender: "System",
        message: `${creatorName} created the group.`,
        timestamp: serverTimestamp(),
      });

      await updateDoc(doc(db, "users", uid), {
        groupIds: arrayUnion(groupRef.id),
      });

      await reloadGroups(uid);
      setShowCreateModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create group.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar
        left={
          <IconButton onClick={() => navigate("/app/chats")} title="Chats">
            <ChatIcon />
          </IconButton>
        }
        right={<AvatarButton onClick={() => navigate("/app/profile")} />}
      />

      <PageNavigator items={["StudyHub", "Main"]} />

      <main className="flex-1 px-5 py-6 max-w-2xl mx-auto w-full">
        <SectionHeader title="Your Study Groups" actionLabel="See all" />

        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="w-10 h-10 border-4 border-[#ddd8cc] border-t-[#c96332] rounded-full animate-spin" />
          </div>
        ) : myGroups.length > 0 ? (
          myGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              joined
              onDetail={() => navigate(`/app/detail/${group.id}`)}
            />
          ))
        ) : (
          <EmptyState>You haven't joined any groups yet.</EmptyState>
        )}

        <div className="h-px bg-[#ddd8cc] my-7" />

        <SectionHeader title="Open Study Groups" />

        <FilterBar
          filterCode={searchCode}
          filterNum={searchNum}
          courseCodes={availableCodes}
          courseNumbers={availableNums}
          onFilterCodeChange={setSearchCode}
          onFilterNumChange={setSearchNum}
          onCreate={() => setShowCreateModal(true)}
        />

        {displayGroups.length > 0 ? (
          displayGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              joined={false}
              onJoin={() => handleJoinGroup(group.id)}
              onDetail={() => navigate(`/app/detail/${group.id}`)}
            />
          ))
        ) : (
          <EmptyState>No open groups at the moment.</EmptyState>
        )}
      </main>

      <CreateGroupModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={() => setShowCreateModal(false)}
      />
    </div>
  );
}