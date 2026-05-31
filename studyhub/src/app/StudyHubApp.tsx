import AppRoutes from "@/routes/AppRoutes";

export type { CreateGroupPayload, DocumentType, Member, Message, StudyGroup_old as StudyGroup } from "./types";

export default function StudyHubApp() {
  return <AppRoutes />;
}