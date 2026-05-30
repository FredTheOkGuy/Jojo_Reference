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
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar
        title="Messages"
        left={<BackButton onClick={onBack} label="" />}
        right={<AvatarButton onClick={onProfile} />}
      />

      <PageNavigator items={["StudyHub", "Messages"]} />

      <main className="flex-1 px-5 py-5 max-w-2xl mx-auto w-full">
        {myGroups.length > 0 ? (
          myGroups.map((group) => (
            <ChatListItem key={group.id} group={group} onOpen={onChat} />
          ))
        ) : (
          <EmptyState>Join a study group to start chatting.</EmptyState>
        )}
      </main>
    </div>
  );
}
