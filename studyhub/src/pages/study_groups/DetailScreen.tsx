import Button from "@/components/ui/Button";
import { CapacityMeter, Card, InfoBox } from "@/components/ui/Card";
import { DocumentsList, ListPanel, MembersList } from "@/components/ui/ContentLists";
import PageNavigator from "@/components/ui/PageNavigator";
import TopBar, { BackButton } from "@/components/ui/TopBar";
import { useAuth } from "@/hooks/useAuth";
import { deleteStudyGroup, leaveStudyGroup } from "@/queries/study_group";
import { db } from "@/services/firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GI_COLORS = [
  { bg: "#faeade", text: "#c96332" },
  { bg: "#e8edda", text: "#5a6e3a" },
  { bg: "#dde6f5", text: "#3d5fa0" },
  { bg: "#ede0f7", text: "#7a4fa0" },
  { bg: "#f7edcc", text: "#8a6a1e" },
];

function colorForId(id: string) {
  let hash = 0;
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
  return GI_COLORS[hash % GI_COLORS.length];
}

export default function DetailScreen() {
  const { id: groupId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [group, setGroup] = useState<any>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!groupId) return;

    async function load() {
      try {
        const snap = await getDoc(doc(db, "study_groups", groupId!));
        if (!snap.exists()) { navigate("/app"); return; }
        const data = snap.data();
        setGroup({ id: snap.id, ...data });
        setMembers(data.members ?? []);

        const docsSnap = await getDocs(collection(db, "study_groups", groupId!, "docs"));
        setDocs(docsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [groupId]);

  const handleLeave = async () => {
    if (!user || !groupId) return;
    try {
      const studentName = user.displayName ?? user.email ?? user.uid;
      await leaveStudyGroup(groupId, studentName, user.uid);
      if (group.creatorName === studentName) {
        deleteStudyGroup(groupId);
      }
      navigate("/app");
    } catch (e) {
      console.error(e);
      alert("Failed to leave group.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f2ede3]">
        <div className="w-10 h-10 border-4 border-[#ddd8cc] border-t-[#c96332] rounded-full animate-spin" />
      </div>
    );
  }

  if (!group) return null;

  const colors = colorForId(group.id);
  const icon = (group.groupName ?? "??").slice(0, 2).toUpperCase();
  const course = `${group.courseCode ?? ""} ${group.courseNumber ?? ""}`.trim();
  const location = [group.studyRoom, group.studyAddress].filter(Boolean).join(" · ");
  const startTime = group.studyTimeStart?.toDate?.().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) ?? group.startTime ?? "—";
  const endTime = group.studyTimeEnd?.toDate?.().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) ?? group.endTime ?? "—";
  const scheduleTime = `${startTime} – ${endTime}`;
  const studyDate = group.studyDate?.toDate?.().toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" }) ?? group.day ?? "—";

  const memberItems = members.map((m: string) => ({
    i: m.slice(0, 2).toUpperCase(),
    n: m,
    r: m === group.creatorName ? "Host" : "Member",
    owner: m === group.creatorName,
    c: "#c96332",
  }));

  const docItems = docs.map((d: any) => ({
    n: d.name,
    t: (d.type?.includes("pdf") ? "pdf" : d.type?.includes("word") ? "docx" : "pdf") as "pdf" | "docx" | "pptx",
    s: d.size ? `${(d.size / 1024 / 1024).toFixed(1)} MB` : "—",
    url: d.url,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar title="" left={<BackButton onClick={() => navigate(-1)} />} />
      <PageNavigator items={["StudyHub", "Group Details", group.groupName ?? ""]} />

      <main className="max-w-2xl mx-auto px-5 py-7 w-full flex-1">
        <Card className="rounded-[18px] p-6 mb-4">
          <div className="flex gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl font-['Syne'] flex-shrink-0"
              style={{ background: colors.bg, color: colors.text }}
            >
              {icon}
            </div>
            <div className="min-w-0">
              <div
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-[0.06em] mb-2"
                style={{ background: colors.bg, color: colors.text }}
              >
                {course}
              </div>
              <h1 className="font-black text-3xl text-[#1a1610] font-['Syne'] leading-tight">
                {group.groupName}
              </h1>
            </div>
          </div>

          <div className="flex gap-2.5">
            <Button label="Open Chat" onClick={() => navigate(`/app/chat/${groupId}`)} variant="primary" fullWidth />
            <Button label="Leave Group" onClick={handleLeave} variant="danger" fullWidth />
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3.5 mb-4">
          <InfoBox label="📍 Location" value={location || "TBD"} />
          <InfoBox label="🗓 Date" value={studyDate} subValue={scheduleTime} />
          <InfoBox
            label="👥 Capacity"
            className="col-span-2"
            value={<CapacityMeter current={members.length} max={group.maxStudents ?? 0} />}
          />
        </div>

        <ListPanel title={`👥 Members (${memberItems.length})`}>
          <MembersList members={memberItems} />
        </ListPanel>

        <ListPanel title="📂 Documents">
          <DocumentsList documents={docItems} />
        </ListPanel>
      </main>
    </div>
  );
}
