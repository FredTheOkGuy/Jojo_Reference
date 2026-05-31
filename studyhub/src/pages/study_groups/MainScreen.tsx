import { use, useEffect, useState } from "react";
import type { CreateGroupPayload, StudyGroup, StudyGroup_old } from "@/app/types";
import GroupCard from "@/components/GroupCard";
import CreateGroupModal from "@/components/CreateGroupModal";
import FilterBar from "@/components/ui/FilterBar";
import TopBar, {
  AvatarButton,
  ChatIcon,
  IconButton,
} from "@/components/ui/TopBar";
import { EmptyState, SectionHeader } from "@/components/ui/Card";
import PageNavigator from "@/components/ui/PageNavigator";
import { useNavigate } from "react-router-dom";
import { doc, collection, getDoc, getDocs } from "firebase/firestore"
import { db } from "@/services/firebase/firebase"
import { useAuth } from "@/hooks/useAuth";

interface MainScreenProps {
  filterCode: string;
  filterNum: string;
  onJoin: (id: number) => void;
  onCreate: (data: CreateGroupPayload) => void;
}

export default function MainScreen({
  filterCode,
  filterNum,
  onJoin,
  onCreate,
}: MainScreenProps) {
  const { user } = useAuth();

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);

        const myGroups = await getMyGroups(user.uid);
        const groups = await getAllGroup();

        if (cancelled) return;
        setMyGroups(myGroups);
        setAllGroups(groups);

        const available = groups.filter(g => g.memberCount < g.maxStudents);
        setOpenGroups(available);

        setAvailableCodes([...new Set(available.map((g) => g.courseCode))]);
        setAvailableNums([...new Set(available.map((g) => g.courseNum))]);

        

      } catch (_) {
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
    const codeMatch =
      searchCode === "" || g.courseCode === searchCode;

    const numMatch =
      searchNum === "" || g.courseNum === searchNum;

    return codeMatch && numMatch;
  });

  setDisplayGroups(filtered);
}, [searchCode, searchNum, openGroups]);

  async function getMyGroups(uid: string): Promise<StudyGroup[]> {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return [];
    }

    const groupIds =
      (userSnapshot.data()?.groupIds as string[]) ?? [];

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
            name: data.name as string,
            courseCode: data.courseCode as string,
            courseNum: data.courseNumber as string,
            day: (data.day as string) ?? "DNE",
            startTime: data.startTime as string ?? "DNE",
            endTime: data.endTime as string,
            memberCount: data.members.length,
            maxStudents: data.maxStudents as number,
            isPrivate: data.isPrivate as boolean ?? false
          };
        })
      );

      return groups.filter(
        (group): group is StudyGroup => group !== null
      );
  }

  async function getAllGroup(): Promise<StudyGroup[]> {
    const groupsRef = collection(db, "study_groups");
    const groupsSnapshot = await getDocs(groupsRef);

    return groupsSnapshot.docs.map( doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.groupName as string,
          courseCode: data.courseCode as string,
          courseNum: data.courseNumber as string,
          day: (data.day as string) ?? "DNE",
          startTime: (data.startTime as string) ?? "DNE",
          endTime: (data.endTime as string) ?? "DNE",
          memberCount: data.members.length,
          maxStudents: data.maxStudents as number,
          isPrivate: (data.isPrivate as boolean) ?? false
        };
    })
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
              onJoin={() => onJoin(1)}
            />
          ))
        ) : (
          <EmptyState>No open groups at the moment.</EmptyState>
        )}
      </main>

      <CreateGroupModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(data) => {
          onCreate(data);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
}
