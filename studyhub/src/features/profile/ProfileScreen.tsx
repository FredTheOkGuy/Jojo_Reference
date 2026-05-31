import { motion } from "framer-motion";
import type { StudyGroup } from "../../app/types";
import TopBar, { BackButton } from "../../components/ui/TopBar";
import ProfileItem from "../../components/ui/ProfileItem";
import { CURRENT_USER } from "../../data/mockData";
import PageNavigator from "../../components/ui/PageNavigator";

interface ProfileScreenProps {
  groups: StudyGroup[];
  onBack: () => void;
  onSignOut: () => void | Promise<void>;
}

export default function ProfileScreen({ groups, onBack, onSignOut }: ProfileScreenProps) {
  const joinedCount = groups.filter((g) => g.joined).length;

  return (
    <div className="flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-[#f2ede3]">
      <TopBar title="" left={<BackButton onClick={onBack} />} />

      <PageNavigator items={["StudyHub", "Profile"]} />

      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#faf8f4] border-b border-[#ddd8cc] px-5 py-10 text-center"
      >
        <motion.div
          initial={{ scale: 0.82, rotate: -6 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.07, rotate: -3 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="w-20 h-20 rounded-full bg-[#c96332] text-white font-black text-3xl font-['Syne'] inline-flex items-center justify-center mb-4 shadow-lg"
        >
          {CURRENT_USER.initials}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="font-black text-2xl text-[#1a1610] font-['Syne']"
        >
          {CURRENT_USER.name}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="text-sm text-[#9a9282] font-medium"
        >
          {CURRENT_USER.email}
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.16 } } }}
          className="flex justify-center gap-8 mt-5"
        >
          <ProfileStat label="Groups" value={joinedCount} />
          <ProfileStat label="Sessions" value={14} />
          <ProfileStat label="Docs" value={8} />
        </motion.div>
      </motion.section>

      <motion.main
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className="mx-auto w-full max-w-[min(28rem,100vw)] px-[clamp(0.875rem,4vw,1.25rem)] py-6"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} whileHover={{ x: 3 }}>
          <ProfileItem icon="✏️" label="Edit Profile" />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} whileHover={{ x: 3 }}>
          <ProfileItem icon="🔔" label="Notifications" tint="#f7edcc" />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} whileHover={{ x: 3 }}>
          <ProfileItem icon="🔒" label="Privacy & Security" tint="#e8edda" />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} whileHover={{ x: 3 }}>
          <ProfileItem icon="🎓" label="Academic Info" tint="#ede0f7" />
        </motion.div>
        <motion.button
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={onSignOut}
          className="w-full mt-6 py-3 bg-transparent border-2 border-[#f0cece] rounded-[9px] text-[#a33030] text-sm font-bold cursor-pointer transition-all hover:bg-[#fdf0f0]"
        >
          Sign Out
        </motion.button>
      </motion.main>
    </div>
  );
}

function ProfileStat({ label, value }: { label: string; value: number }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
      whileHover={{ y: -2 }}
      className="text-center"
    >
      <div className="font-black text-2xl text-[#c96332] font-['Syne']">
        {value}
      </div>
      <div className="text-xs text-[#9a9282] font-semibold uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}
