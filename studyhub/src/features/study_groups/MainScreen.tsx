import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
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

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" } },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

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

  const matchesFilters = (group: StudyGroup) => {
    const schoolQuery = normalize(filterSchool);
    const numberQuery = normalize(filterNum);
    const courseNameQuery = normalize(filterCourseName);

    const schoolMatch =
      !schoolQuery || normalize(getSchoolSearchText(group)).includes(schoolQuery);
    const numberMatch =
      !numberQuery || normalize(group.filterNum || group.course).includes(numberQuery);
    const courseNameMatch =
      !courseNameQuery ||
      normalize(`${group.name} ${group.course} ${group.desc}`).includes(
        courseNameQuery,
      );

    return schoolMatch && numberMatch && courseNameMatch;
  };

  const filteredOpenGroups = openGroups.filter(matchesFilters);
  const filteredPrivateGroups = privateGroups.filter(matchesFilters);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-[#f2ede3]">
      <TopBar
        left={
          <IconButton onClick={onChats} title="Chats">
            <ChatIcon />
          </IconButton>
        }
        right={<AvatarButton onClick={onProfile} />}
      />

      <PageNavigator items={["StudyHub", "Main"]} />

      <motion.main
        variants={pageVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-[min(42rem,100vw)] flex-1 px-[clamp(0.875rem,4vw,1.25rem)] py-[clamp(1rem,3vw,1.5rem)]"
      >
        <SectionHeader title="Your Study Groups" actionLabel="See all" />
        <motion.div variants={listVariants} initial="hidden" animate="show">
          <AnimatePresence mode="popLayout">
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <EmptyState>You haven't joined any groups yet.</EmptyState>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="my-7 h-px origin-left bg-[#ddd8cc]"
        />

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

        <motion.div layout variants={listVariants} initial="hidden" animate="show">
          <AnimatePresence mode="popLayout">
            {filteredOpenGroups.length > 0 ? (
              filteredOpenGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  joined={false}
                  onDetail={onDetail}
                  onJoin={() => onJoin(group.id)}
                />
              ))
            ) : (
              <motion.div
                key="no-search-results"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <EmptyState>No public study groups match your search.</EmptyState>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="my-7 h-px origin-left bg-[#ddd8cc]"
        />

        <SectionHeader title="Private Study Groups" />
        <motion.div layout variants={listVariants} initial="hidden" animate="show">
          <AnimatePresence mode="popLayout">
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
              <motion.div
                key="no-private-results"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <EmptyState>No private groups match your search.</EmptyState>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.main>

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
