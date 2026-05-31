import { motion } from "framer-motion";
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
    <div className="flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-[#f2ede3]">
      <TopBar title="" left={<BackButton onClick={onBack} />} />

      <PageNavigator items={["StudyHub", "Group Details", group.name]} />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="mx-auto w-full max-w-[min(42rem,100vw)] flex-1 px-[clamp(0.875rem,4vw,1.25rem)] py-[clamp(1rem,4vw,1.75rem)]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <Card className="mb-4 rounded-[18px] p-4 sm:p-6">
            <div className="mb-4 flex gap-3 sm:gap-4">
              <motion.div
                whileHover={{ rotate: -3, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl font-['Syne'] text-lg font-black sm:h-16 sm:w-16 sm:text-xl"
                style={{ background: colors.bg, color: colors.text }}
              >
                {group.icon}
              </motion.div>

              <div className="min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-[0.06em] mb-2"
                  style={{ background: group.badgeBg, color: group.badgeColor }}
                >
                  {group.course}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 }}
                  className="font-['Syne'] text-[clamp(1.5rem,7vw,1.875rem)] font-black leading-tight text-[#1a1610]"
                >
                  {group.name}
                </motion.h1>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-[#4a4438] leading-relaxed font-medium mb-5"
            >
              {group.desc}
            </motion.p>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} className="flex-1">
                <Button
                  label="Open Chat"
                  onClick={onChat}
                  variant="primary"
                  fullWidth
                />
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} className="flex-1">
                <Button
                  label="Leave Group"
                  onClick={onLeave}
                  variant="danger"
                  fullWidth
                />
              </motion.div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <InfoBox
              label="👥 Capacity"
              value={<CapacityMeter current={group.cur} max={group.max} />}
            />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <InfoBox
              label="🕐 Schedule"
              value={group.days}
              subValue={group.time}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mb-4"
        >
          <EmbeddedMap
            roomLabel={group.location}
            mapLocation={group.mapLocation}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
        >
          <ListPanel title={`👥 Members (${group.members.length})`}>
            <MembersList members={group.members} />
          </ListPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ListPanel title="📂 Documents">
            <DocumentsList documents={group.docs} />
          </ListPanel>
        </motion.div>
      </motion.main>
    </div>
  );
}
