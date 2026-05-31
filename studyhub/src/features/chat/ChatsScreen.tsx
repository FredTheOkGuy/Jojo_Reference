import { motion } from "framer-motion";
import type { StudyGroup } from "../../app/types";
import ChatListItem from "../../components/ui/ChatListItem";
import TopBar, { AvatarButton, BackButton } from "../../components/ui/TopBar";
import { EmptyState } from "../../components/ui/Card";
import PageNavigator from "../../components/ui/PageNavigator";

interface ChatsScreenProps {
  groups: StudyGroup[];
  onDetail: (id: number) => void;
  onChat: (id: number) => void;
  onBack: () => void;
  onProfile: () => void;
}

export default function ChatsScreen({
  groups,
  onChat,
  onBack,
  onProfile,
}: ChatsScreenProps) {
  const myGroups = groups.filter((g) => g.joined);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-[#f2ede3]">
      <TopBar
        title="Messages"
        left={<BackButton onClick={onBack} label="" />}
        right={<AvatarButton onClick={onProfile} />}
      />

      <PageNavigator items={["StudyHub", "Messages"]} />

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto w-full max-w-[min(42rem,100vw)] flex-1 px-[clamp(0.875rem,4vw,1.25rem)] py-5"
      >
        {myGroups.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          >
            {myGroups.map((group) => (
              <motion.div
                key={group.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -2, scale: 1.01 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <ChatListItem group={group} onOpen={onChat} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <EmptyState>Join a study group to start chatting.</EmptyState>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}
