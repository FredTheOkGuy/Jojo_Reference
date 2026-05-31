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
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar title="" left={<BackButton onClick={onBack} />} />

      <PageNavigator items={["StudyHub", "Group Details", group.name]} />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="max-w-2xl mx-auto px-5 py-7 w-full flex-1"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <Card className="rounded-[18px] p-6 mb-4">
            <div className="flex gap-4 mb-4">
              <motion.div
                whileHover={{ rotate: -3, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl font-['Syne'] flex-shrink-0"
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
                  className="font-black text-3xl text-[#1a1610] font-['Syne'] leading-tight"
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

            <div className="flex gap-2.5">
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
          className="grid grid-cols-2 gap-3.5 mb-4"
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
