import { useState } from "react";
import type { CreateGroupPayload, StudyGroup } from "../../app/types";
import GroupCard from "../../components/GroupCard";
import CreateGroupModal from "../../components/CreateGroupModal";
import FilterBar from "../../components/ui/FilterBar";
import TopBar, {
  AvatarButton,
  ChatIcon,
  IconButton,
} from "../../components/ui/TopBar";
import { EmptyState, SectionHeader } from "../../components/ui/Card";
import PageNavigator from "../../components/ui/PageNavigator";

interface MainScreenProps {
  groups: StudyGroup[];
  filterCode: string;
  filterNum: string;
  onFilterCodeChange: (code: string) => void;
  onFilterNumChange: (num: string) => void;
  onDetail: (id: number) => void;
  onChats: () => void;
  onProfile: () => void;
  onJoin: (id: number) => void;
  onAskToJoin: (id: number) => void;
  onCreate: (data: CreateGroupPayload) => void;
}

export default function MainScreen({
  groups,
  filterCode,
  filterNum,
  onFilterCodeChange,
  onFilterNumChange,
  onDetail,
  onChats,
  onProfile,
  onJoin,
  onAskToJoin,
  onCreate,
}: MainScreenProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const myGroups = groups.filter((g) => g.joined);
  const openGroups = groups.filter((g) => !g.joined && !g.isPrivate);
  const privateGroups = groups.filter((g) => !g.joined && g.isPrivate);

  const filteredOpenGroups = openGroups.filter((g) => {
    const codeMatch = !filterCode || g.filterCode === filterCode;
    const numMatch = !filterNum || g.filterNum === filterNum;
    return codeMatch && numMatch;
  });

  const courseCodes = [
    ...new Set(groups.map((g) => g.filterCode).filter(Boolean)),
  ] as string[];
  const courseNumbers = [
    ...new Set(groups.map((g) => g.filterNum).filter(Boolean)),
  ] as string[];

  const filteredPrivateGroups = privateGroups.filter((g) => {
    const codeMatch = !filterCode || g.filterCode === filterCode;
    const numMatch = !filterNum || g.filterNum === filterNum;
    return codeMatch && numMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar
        left={
          <IconButton onClick={onChats} title="Chats">
            <ChatIcon />
          </IconButton>
        }
        right={<AvatarButton onClick={onProfile} />}
      />

      <PageNavigator items={["StudyHub", "Main"]} />

      <main className="flex-1 px-5 py-6 max-w-2xl mx-auto w-full">
        <SectionHeader title="Your Study Groups" actionLabel="See all" />
        {myGroups.length > 0 ? (
          myGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              joined
              onDetail={onDetail}
            />
          ))
        ) : (
          <EmptyState>You haven't joined any groups yet.</EmptyState>
        )}

        <div className="h-px bg-[#ddd8cc] my-7" />

        <SectionHeader title="Open Study Groups" />
        <FilterBar
          filterCode={filterCode}
          filterNum={filterNum}
          courseCodes={courseCodes}
          courseNumbers={courseNumbers}
          onFilterCodeChange={onFilterCodeChange}
          onFilterNumChange={onFilterNumChange}
          onCreate={() => setShowCreateModal(true)}
        />

        {filteredOpenGroups.length > 0 ? (
          filteredOpenGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              joined={false}
              onJoin={() => onJoin(group.id)}
            />
          ))
        ) : (
          <EmptyState>No open groups at the moment.</EmptyState>
        )}

        <div className="h-px bg-[#ddd8cc] my-7" />

        <SectionHeader title="Private Study Groups" />
        {filteredPrivateGroups.length > 0 ? (
          filteredPrivateGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              joined={false}
              onDetail={onDetail}
              onAskToJoin={() => onAskToJoin(group.id)}
            />
          ))
        ) : (
          <EmptyState>No private groups match your filters.</EmptyState>
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
