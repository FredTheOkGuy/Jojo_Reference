import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";
import { sendMessage, listenToMessages } from "@/queries/study_group";
import { MessageList } from "@/components/ui/MessageList";
import TopBar, { BackButton } from "@/components/ui/TopBar";
import PageNavigator from "@/components/ui/PageNavigator";

export default function ChatScreen() {
  const { id: groupId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [courseLabel, setCourseLabel] = useState("");
  const [memberCount, setMemberCount] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!groupId) return;
    getDoc(doc(db, "study_groups", groupId)).then((snap) => {
      if (!snap.exists()) return;
      const d = snap.data();
      setGroupName(d.groupName ?? "");
      setCourseLabel(`${d.courseCode ?? ""} ${d.courseNumber ?? ""}`.trim());
      setMemberCount(d.members?.length ?? 0);
    });
  }, [groupId]);

  useEffect(() => {
    if (!groupId) return;
    const unsubscribe = listenToMessages(groupId, (msgs) => {
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [groupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const currentUserName = user?.displayName ?? user?.email ?? user?.uid ?? "Me";

  // Convert Firestore messages to the shape MessageList expects
  const formattedMessages = messages.map((m: any) => ({
    sender: (m.sender ?? "?").slice(0, 2).toUpperCase(),
    senderFull: m.sender ?? "Unknown",
    mine: m.sender === currentUserName,
    c: m.sender === currentUserName ? "#c96332" : "#5a6e3a",
    text: m.message ?? "",
    time: m.timestamp?.toDate?.().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) ?? "",
  }));

  const handleSend = async () => {
    const text = messageInput.trim();
    if (!text || !groupId || !user) return;
    setMessageInput("");
    try {
      await sendMessage(groupId, currentUserName, text);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar
        title=""
        left={<BackButton onClick={() => navigate(-1)} label="" />}
        center={
          <div className="text-left">
            <div className="font-bold text-base text-[#1a1610] font-['Syne']">{groupName}</div>
            <div className="text-xs text-[#9a9282] font-medium">
              {courseLabel} · {memberCount} members
            </div>
          </div>
        }
      />
      <PageNavigator items={["StudyHub", "Chat", groupName]} />
      <MessageList messages={formattedMessages} scrollRef={messagesEndRef} />

      <div className="bg-[#faf8f4] border-t border-[#ddd8cc] px-5 py-3.5 flex gap-2.5 items-center">
        <input
          type="text"
          placeholder="Message…"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
          className="flex-1 px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-full text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.08)]"
        />
        <button
          type="button"
          onClick={handleSend}
          className="w-10 h-10 rounded-full bg-[#c96332] border-none cursor-pointer flex items-center justify-center transition-all hover:bg-[#a34e24] flex-shrink-0"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
