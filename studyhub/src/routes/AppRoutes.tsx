import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import SignUpScreen from "@/pages/auth/SignUpScreen";
import MainScreen from "@/pages/study_groups/MainScreen";
import DetailScreen from "@/pages/study_groups/DetailScreen";
import ChatScreen from "@/features/chat/ChatScreen";
import ChatsScreen from "@/features/chat/ChatsScreen";
import ProfileScreen from "@/features/profile/ProfileScreen";

export type { CreateGroupPayload, StudyGroup } from "@/app/types";

export default function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f2ede3]">
        <div className="w-10 h-10 border-4 border-[#ddd8cc] border-t-[#c96332] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/signup" element={<SignUpScreen />} />

      <Route path="/app" element={<MainScreen filterCode="" filterNum="" onJoin={() => {}} onCreate={() => {}} />} />
      <Route path="/app/profile" element={<ProfileScreen />} />
      <Route path="/app/chats" element={<ChatsScreen />} />
      <Route path="/app/detail/:id" element={<DetailScreen />} />
      <Route path="/app/chat/:id" element={<ChatScreen />} />

      {user ? (
        <Route path="/*" element={<Navigate to="/app" />} />
      ) : (
        <Route path="/*" element={<Navigate to="/signup" />} />
      )}
    </Routes>
  );
}
