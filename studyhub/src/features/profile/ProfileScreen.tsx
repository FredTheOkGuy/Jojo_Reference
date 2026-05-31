import type { StudyGroup_old } from "../../app/types";
import TopBar, { BackButton } from "../../components/ui/TopBar";
import ProfileItem from "../../components/ui/ProfileItem";
import { CURRENT_USER } from "../../data/mockData";
import PageNavigator from "../../components/ui/PageNavigator";

interface ProfileScreenProps {
  groups: StudyGroup_old[];
  onBack: () => void;
  onSignOut: () => void | Promise<void>;
}

export default function ProfileScreen({ groups, onBack, onSignOut }: ProfileScreenProps) {
  const joinedCount = groups.filter((g) => g.joined).length;

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar title="" left={<BackButton onClick={onBack} />} />

      <PageNavigator items={["StudyHub", "Profile"]} />

      <section className="bg-[#faf8f4] border-b border-[#ddd8cc] px-5 py-10 text-center">
        <div className="w-20 h-20 rounded-full bg-[#c96332] text-white font-black text-3xl font-['Syne'] inline-flex items-center justify-center mb-4 shadow-lg">
          {CURRENT_USER.initials}
        </div>
        <div className="font-black text-2xl text-[#1a1610] font-['Syne']">
          {CURRENT_USER.name}
        </div>
        <div className="text-sm text-[#9a9282] font-medium">
          {CURRENT_USER.email}
        </div>
        <div className="flex justify-center gap-8 mt-5">
          <ProfileStat label="Groups" value={joinedCount} />
          <ProfileStat label="Sessions" value={14} />
          <ProfileStat label="Docs" value={8} />
        </div>
      </section>

      <main className="max-w-md mx-auto px-5 py-6 w-full">
        <ProfileItem icon="✏️" label="Edit Profile" />
        <ProfileItem icon="🔔" label="Notifications" tint="#f7edcc" />
        <ProfileItem icon="🔒" label="Privacy & Security" tint="#e8edda" />
        <ProfileItem icon="🎓" label="Academic Info" tint="#ede0f7" />
        <button
          type="button"
          onClick={onSignOut}
          className="w-full mt-6 py-3 bg-transparent border-2 border-[#f0cece] rounded-[9px] text-[#a33030] text-sm font-bold cursor-pointer transition-all hover:bg-[#fdf0f0]"
        >
          Sign Out
        </button>
      </main>
    </div>
  );
}

function ProfileStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="font-black text-2xl text-[#c96332] font-['Syne']">
        {value}
      </div>
      <div className="text-xs text-[#9a9282] font-semibold uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
