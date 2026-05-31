import type { StudyGroup } from "../../app/StudyHubApp";
import TopBar from "../../components/ui/TopBar";
import Button from "../../components/ui/Button";
import { Card, InfoGrid } from "../../components/ui/Card";
import { CURRENT_USER } from "../../data/mockData";

interface ProfileScreenProps {
  groups: StudyGroup[];
  onBack: () => void;
}

export default function ProfileScreen({ groups, onBack }: ProfileScreenProps) {
  const joinedCount = groups.filter((g) => g.joined).length;

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar showBackButton onBackClick={onBack} />

      {/* Profile Content */}
      <div className="flex-1 max-w-md mx-auto my-8 px-5 w-full flex flex-col items-center gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-[#c96332] text-white font-black text-3xl font-['Syne'] flex items-center justify-center shadow-lg">
          {CURRENT_USER.initials}
        </div>

        {/* Profile Info */}
        <InfoGrid
          items={[
            { label: "Full Name", value: CURRENT_USER.name },
            { label: "Email", value: CURRENT_USER.email },
            { label: "Groups Joined", value: joinedCount.toString() },
            { label: "School", value: CURRENT_USER.school },
          ]}
          columns={1}
        />

        {/* Sign Out Button */}
        <Button
          label="Sign out"
          onClick={onBack}
          variant="danger"
          fullWidth
          className="mt-2"
        />
      </div>
    </div>
  );
}
