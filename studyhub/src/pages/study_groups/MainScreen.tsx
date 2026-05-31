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
  filterSchool: string;
  filterNum: string;
  filterCourseName: string;
  onFilterSchoolChange: (school: string) => void;
  onFilterNumChange: (num: string) => void;
  onFilterCourseNameChange: (name: string) => void;
  onClearFilters: () => void;
  onDetail: (id: number) => void;
  onChats: () => void;
  onProfile: () => void;
  onJoin: (id: number) => void;
  onAskToJoin: (id: number) => void;
  onCreate: (data: CreateGroupPayload) => void;
}

export default function MainScreen({
  groups,
  filterSchool,
  filterNum,
  filterCourseName,
  onFilterSchoolChange,
  onFilterNumChange,
  onFilterCourseNameChange,
  onClearFilters,
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

  const normalize = (value?: string) => value?.toLowerCase().trim() ?? "";

  const getSchoolSearchText = (group: StudyGroup) =>
    [
      group.schoolName,
      group.mapLocation,
      group.location,
      ...group.members.map((member) => member.r),
    ]
      .filter(Boolean)
      .join(" ");

  const filteredOpenGroups = openGroups.filter((group) => {
    const schoolQuery = normalize(filterSchool);
    const numberQuery = normalize(filterNum);
    const courseNameQuery = normalize(filterCourseName);

    const schoolMatch =
      !schoolQuery ||
      normalize(getSchoolSearchText(group)).includes(schoolQuery);

  // course codes/numbers previously collected here but unused — removed to satisfy lint
    const numberMatch =
      !numberQuery ||
      normalize(group.filterNum || group.course).includes(numberQuery);

    const courseNameMatch =
      !courseNameQuery ||
      normalize(`${group.name} ${group.course} ${group.desc}`).includes(
        courseNameQuery,
      );

    return schoolMatch && numberMatch && courseNameMatch;
  });

  const filteredPrivateGroups = privateGroups.filter((group) => {
    const schoolQuery = normalize(filterSchool);
    const numberQuery = normalize(filterNum);
    const courseNameQuery = normalize(filterCourseName);

    const schoolMatch =
      !schoolQuery || normalize(getSchoolSearchText(group)).includes(schoolQuery);
    const numberMatch =
      !numberQuery || normalize(group.filterNum || group.course).includes(numberQuery);
    const courseNameMatch =
      !courseNameQuery ||
      normalize(`${group.name} ${group.course} ${group.desc}`).includes(courseNameQuery);

    return schoolMatch && numberMatch && courseNameMatch;
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
          filterSchool={filterSchool}
          filterNum={filterNum}
          filterCourseName={filterCourseName}
          onFilterSchoolChange={onFilterSchoolChange}
          onFilterNumChange={onFilterNumChange}
          onFilterCourseNameChange={onFilterCourseNameChange}
          onClearFilters={onClearFilters}
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
          <EmptyState>No study groups match your search.</EmptyState>
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
