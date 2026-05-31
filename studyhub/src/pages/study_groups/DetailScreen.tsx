import Button from "@/components/ui/Button";
import { CapacityMeter, Card, InfoBox } from "@/components/ui/Card";
import { DocumentsList, ListPanel, MembersList } from "@/components/ui/ContentLists";
import PageNavigator from "@/components/ui/PageNavigator";
import TopBar, { BackButton } from "@/components/ui/TopBar";
import { useAuth } from "@/hooks/useAuth";
import { deleteStudyGroup, leaveStudyGroup, joinStudyGroup } from "@/queries/study_group";
import { db } from "@/services/firebase/firebase";
import { collection, doc, getDoc, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
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

function mapsQuery(address?: string, room?: string) {
  const cleanAddress = String(address ?? "").trim();
  const cleanRoom = String(room ?? "").trim();

  if (cleanAddress && cleanRoom) return `${cleanAddress} ${cleanRoom}`;
  return cleanAddress || cleanRoom;
}

function MapLocationCard({ address, room }: { address?: string; room?: string }) {
  const queryText = mapsQuery(address, room);
  const hasLocation = queryText.length > 0 && queryText.toLowerCase() !== "tbd";
  const embedUrl = hasLocation
    ? `https://www.google.com/maps?q=${encodeURIComponent(queryText)}&output=embed`
    : "";
  const openUrl = hasLocation
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryText)}`
    : "";

  return (
    <Card className="rounded-[18px] overflow-hidden mb-4">
      <div className="p-5 pb-4">
        <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#9a9282] mb-3">
          🗺️ Map Location
        </div>
        <div className="font-bold text-lg text-[#1a1610] leading-snug">
          {address || "Location TBD"}
        </div>
        {room && room !== "TBD" && (
          <div className="text-sm text-[#9a9282] font-semibold mt-2">Room: {room}</div>
        )}
      </div>

      {hasLocation ? (
        <div className="relative h-[280px] bg-[#edeae2] border-t border-[#ddd8cc]">
          <a
            href={openUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white text-[#1a73e8] text-sm font-bold shadow-sm border border-[#ddd8cc] hover:bg-[#f8fbff] transition-colors"
          >
            Open in Maps ↗
          </a>
          <iframe
            title="Study group map location"
            src={embedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="px-5 pb-5 text-sm text-[#9a9282] font-medium">
          Add an address to this group to show the embedded map.
        </div>
      )}
    </Card>
  );
}

export default function DetailScreen() {
  const { id: groupId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [group, setGroup] = useState<any>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUserName = user?.displayName ?? user?.email ?? user?.uid ?? "";
  const joined = currentUserName ? members.includes(currentUserName) : false;

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

  const handleJoin = async () => {
    if (!user || !groupId) return;
    try {
      const studentName = user.displayName ?? user.email ?? user.uid;
      await joinStudyGroup(groupId, studentName);
      setMembers(prev => [...prev, studentName]);
      await updateDoc(doc(db, "users", user.uid), {
             groupIds: arrayUnion(groupId),
           });
      navigate("/app")
    } catch (e) {
      console.error(e);
      alert("Failed to join group.");
    }
  }

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
  const studyAddress = group.studyAddress ?? group.location ?? "";
  const studyRoom = group.studyRoom ?? "";
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
            {joined ? (
              <Button label="Leave Group" onClick={handleLeave} variant="danger" fullWidth />
            ) : (
              <Button label="Join Group" onClick={handleJoin} variant="primary" fullWidth />
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
          <InfoBox
            label="👥 Capacity"
            value={<CapacityMeter current={members.length} max={group.maxStudents ?? 0} />}
          />
          <InfoBox label="⏱️ Schedule" value={studyDate} subValue={scheduleTime} />
        </div>

        <MapLocationCard address={studyAddress} room={studyRoom} />

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
