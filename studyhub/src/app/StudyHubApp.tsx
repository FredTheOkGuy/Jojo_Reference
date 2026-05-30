import { useState } from 'react';
import LoginScreen from '../features/auth/LoginScreen';
import MainScreen from '../features/study_groups/MainScreen';
import ChatsScreen from '../features/chat/ChatsScreen';
import ChatScreen from '../features/chat/ChatScreen';
import DetailScreen from '../features/study_groups/DetailScreen';
import ProfileScreen from '../features/profile/ProfileScreen';

// Types defined inline
interface Member {
  i: string;
  n: string;
  r: string;
  owner: boolean;
  c: string;
}

interface DocumentType {
  n: string;
  t: 'pdf' | 'docx' | 'pptx';
  s: string;
}

interface Message {
  sender: string;
  senderFull: string;
  mine: boolean;
  c: string;
  text: string;
  time: string;
}

interface StudyGroup {
  id: number;
  name: string;
  course: string;
  icon: string;
  gi: string;
  cur: number;
  max: number;
  joined: boolean;
  location: string;
  days: string;
  time: string;
  desc: string;
  badgeBg: string;
  badgeColor: string;
  members: Member[];
  docs: DocumentType[];
  messages: Message[];
  filterCode?: string;
  filterNum?: string;
}

const INITIAL_GROUPS: StudyGroup[] = [
  {
    id: 0,
    name: 'Algorithm Masters',
    course: 'COMP 352',
    icon: 'AL',
    gi: 'gi-orange',
    cur: 7,
    max: 10,
    joined: true,
    location: 'Hall Building H-521',
    days: 'Tuesday & Thursday',
    time: '5:00 PM – 7:00 PM',
    desc: 'Working through algorithm design, complexity analysis, and exam prep.',
    badgeBg: '#faeade',
    badgeColor: '#c96332',
    members: [],
    docs: [],
    messages: [],
  },
];

type Screen = 'login' | 'main' | 'chats' | 'detail' | 'chat' | 'profile';

export default function StudyHubApp() {
  const [screen, setScreen] = useState<Screen>('login');
  const [groups] = useState<StudyGroup[]>(INITIAL_GROUPS);

  return (
    <div className="min-h-screen bg-[#f2ede3]">
      {screen === 'login' && <LoginScreen onSignIn={() => setScreen('main')} />}
      {screen === 'main' && <MainScreen groups={groups} />}
      {screen === 'profile' && <ProfileScreen onBack={() => setScreen('login')} />}
    </div>
  );
}
