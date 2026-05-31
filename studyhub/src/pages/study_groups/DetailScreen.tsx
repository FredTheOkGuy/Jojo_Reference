import type { StudyGroup } from "../../app/types";
import Button from "../../components/ui/Button";
import TopBar, { BackButton } from "../../components/ui/TopBar";
import { CapacityMeter, Card, InfoBox } from "../../components/ui/Card";
import {
  DocumentsList,
  ListPanel,
  MembersList,
} from "../../components/ui/ContentLists";
import { GI_COLORS_MAP } from "../../data/mockData";
import PageNavigator from "../../components/ui/PageNavigator";
import EmbeddedMap from "../../components/EmbeddedMap";

interface DetailScreenProps {
  group: StudyGroup;
  onBack: () => void;
  onChat: () => void;
  onLeave: () => void;
}

export default function DetailScreen({
  group,
  onBack,
  onChat,
  onLeave,
}: DetailScreenProps) {
  const colors = GI_COLORS_MAP[group.gi] || GI_COLORS_MAP["gi-orange"];

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar title="" left={<BackButton onClick={onBack} />} />

      <PageNavigator items={["StudyHub", "Group Details", group.name]} />

      <main className="max-w-2xl mx-auto px-5 py-7 w-full flex-1">
        <Card className="rounded-[18px] p-6 mb-4">
          <div className="flex gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl font-['Syne'] flex-shrink-0"
              style={{ background: colors.bg, color: colors.text }}
            >
              {group.icon}
            </div>

            <div className="min-w-0">
              <div
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-[0.06em] mb-2"
                style={{ background: group.badgeBg, color: group.badgeColor }}
              >
                {group.course}
              </div>

              <h1 className="font-black text-3xl text-[#1a1610] font-['Syne'] leading-tight">
                {group.name}
              </h1>
            </div>
          </div>

          <p className="text-sm text-[#4a4438] leading-relaxed font-medium mb-5">
            {group.desc}
          </p>

          <div className="flex gap-2.5">
            <Button
              label="Open Chat"
              onClick={onChat}
              variant="primary"
              fullWidth
            />

            <Button
              label="Leave Group"
              onClick={onLeave}
              variant="danger"
              fullWidth
            />
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3.5 mb-4">
          <InfoBox
            label="👥 Capacity"
            value={<CapacityMeter current={group.cur} max={group.max} />}
          />

          <InfoBox
            label="🕐 Schedule"
            value={group.days}
            subValue={group.time}
          />
        </div>

        <div className="mb-4">
          <EmbeddedMap
            roomLabel={group.location}
            mapLocation={group.mapLocation}
          />
        </div>

        <ListPanel title={`👥 Members (${group.members.length})`}>
          <MembersList members={group.members} />
        </ListPanel>

        <ListPanel title="📂 Documents">
          <DocumentsList documents={group.docs} />
        </ListPanel>
      </main>
    </div>
  );
}
