## StudyHub Component Architecture Guide

This document explains how the codebase is now structured as reusable components that accept all data as parameters. This makes it easy to replace hardcoded data with database/API calls.

---

## 📁 Folder Structure

```
src/
├── data/
│   └── mockData.ts                 // ⭐ All hardcoded data (REPLACE THIS)
├── components/
│   └── ui/
│       ├── TopBar.tsx              // Navigation bar
│       ├── Button.tsx              // Reusable button
│       ├── Card.tsx                // Card, Section, InfoGrid
│       ├── MessageList.tsx         // Message components
│       └── ContentLists.tsx        // Members & Documents lists
├── pages/ & features/              // Screen components (use above components)
└── app/
    └── StudyHubApp.tsx             // Main router
```

---

## 🔄 How to Replace Hardcoded Data

### Step 1: Update mockData.ts

Instead of importing from `INITIAL_GROUPS`, fetch from your database:

```typescript
// BEFORE (Current - Hardcoded)
export const INITIAL_GROUPS: StudyGroup[] = [...]

// AFTER (Database)
export async function getInitialGroups(): Promise<StudyGroup[]> {
  const response = await fetch('/api/groups');
  return response.json();
}
```

### Step 2: Update StudyHubApp.tsx

Fetch data on component mount:

```typescript
export default function StudyHubApp() {
  const [groups, setGroups] = useState<StudyGroup[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getInitialGroups();
      setGroups(data);
    }
    loadData();
  }, []);

  // ... rest of code
}
```

---

## 🧩 Component Reference

### TopBar Component

Used in almost every screen. Pass different props to customize:

```typescript
<TopBar
  title="Chats"
  showChatButton={true}
  showBackButton={false}
  showProfileButton={true}
  profileInitials="AJ"
  onChatClick={() => {}}
  onProfileClick={() => {}}
/>
```

**Props:**

- `title?: string` - Center text
- `showChatButton?: boolean` - Show chat icon
- `showBackButton?: boolean` - Show back button
- `showProfileButton?: boolean` - Show profile avatar
- `profileInitials?: string` - Avatar text
- `onChatClick?: () => void` - Chat button handler
- `onBackClick?: () => void` - Back button handler
- `onProfileClick?: () => void` - Profile button handler

---

### Button Component

Reusable button with multiple variants:

```typescript
<Button
  label="Join"
  onClick={() => handleJoin()}
  variant="primary"      // "primary" | "secondary" | "danger" | "ghost"
  size="md"              // "sm" | "md" | "lg"
  disabled={isFull}
  fullWidth={true}
/>
```

**Variants:**

- `primary` - Main action (orange)
- `secondary` - Alternative action
- `danger` - Destructive action (red)
- `ghost` - Transparent background

---

### Card Component

Container for content:

```typescript
<Card hoverable onClick={() => {}}>
  <div>Your content here</div>
</Card>
```

---

### InfoGrid Component

Display structured data:

```typescript
<InfoGrid
  items={[
    { label: "Location", value: "Hall Building H-521" },
    { label: "Members", value: "7 / 10" },
  ]}
  columns={2}
/>
```

---

### MessageList Component

Display chat messages:

```typescript
import { MessageList } from "../../components/ui/MessageList";

<MessageList
  messages={group.messages}
  scrollRef={messagesEndRef}
/>
```

---

### MembersList Component

Display group members:

```typescript
import { MembersList } from "../../components/ui/ContentLists";

<MembersList members={group.members} />
```

---

### DocumentsList Component

Display group documents:

```typescript
import { DocumentsList } from "../../components/ui/ContentLists";

<DocumentsList documents={group.docs} />
```

---

## 📊 Data Interfaces (All in app/StudyHubApp.tsx)

```typescript
export interface Member {
  i: string; // Initials (e.g., "AJ")
  n: string; // Full name
  r: string; // Role
  owner: boolean; // Is group owner
  c: string; // Color code (hex)
}

export interface DocumentType {
  n: string; // File name
  t: "pdf" | "docx" | "pptx"; // File type
  s: string; // File size (e.g., "2.4 MB")
}

export interface Message {
  sender: string; // Short name for avatar
  senderFull: string; // Full name
  mine: boolean; // Is current user's message
  c: string; // Color (hex)
  text: string; // Message text
  time: string; // Timestamp
}

export interface StudyGroup {
  id: number;
  name: string;
  course: string;
  icon: string; // "AL", "CA", etc.
  gi: string; // Color theme ("gi-orange", etc.)
  cur: number; // Current members
  max: number; // Max capacity
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
```

---

## 🔗 Color Theme System

All colors are stored in `mockData.ts`:

```typescript
export const GI_COLORS_MAP = {
  "gi-orange": { bg: "#faeade", text: "#c96332" },
  "gi-green": { bg: "#e8edda", text: "#5a6e3a" },
  // ... more colors
};

export const CURRENT_USER = {
  initials: "AJ",
  name: "Alex Johnson",
  email: "alex.johnson@concordia.ca",
  school: "Concordia University",
};
```

**Update with real data from your database/API.**

---

## 🚀 Example: Converting a Screen to Use Components

### Before (Hardcoded)

```typescript
export default function ProfileScreen({ groups, onBack }) {
  return (
    <div>
      <div className="h-16 bg-[#faf8f4] ...">Back Button</div>
      <div>
        <div className="w-20 h-20 ...">AJ</div>
        <div>Alex Johnson</div>
        {/* ... more hardcoded UI ... */}
      </div>
    </div>
  );
}
```

### After (Component-Based)

```typescript
import TopBar from "../../components/ui/TopBar";
import Button from "../../components/ui/Button";
import { InfoGrid } from "../../components/ui/Card";
import { CURRENT_USER } from "../../data/mockData";

export default function ProfileScreen({ groups, onBack }) {
  const joinedCount = groups.filter(g => g.joined).length;

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      <TopBar showBackButton onBackClick={onBack} />

      <div className="flex-1 max-w-md mx-auto my-8 px-5 w-full flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-[#c96332] ...">
          {CURRENT_USER.initials}
        </div>

        <InfoGrid
          items={[
            { label: "Full Name", value: CURRENT_USER.name },
            { label: "Email", value: CURRENT_USER.email },
            { label: "Groups Joined", value: joinedCount },
            { label: "School", value: CURRENT_USER.school },
          ]}
        />

        <Button label="Sign out" onClick={onBack} variant="danger" fullWidth />
      </div>
    </div>
  );
}
```

**Key benefits:**

- ✅ All data passed as props
- ✅ Reusable components
- ✅ Easy to customize
- ✅ Simple to swap hardcoded data for API calls

---

## 💾 To Connect to Database

1. **Create API service** (`src/services/api.ts`):

```typescript
export async function fetchStudyGroups(): Promise<StudyGroup[]> {
  const response = await fetch("/api/study-groups");
  if (!response.ok) throw new Error("Failed to fetch groups");
  return response.json();
}

export async function fetchUser(): Promise<typeof CURRENT_USER> {
  const response = await fetch("/api/user");
  return response.json();
}
```

2. **Update mockData.ts** to export these functions instead of constants

3. **Update StudyHubApp.tsx** to call these functions on mount

4. **All screens automatically work** - they just receive different data!

---

## ✨ Best Practices

✅ All UI is in components - easy to reuse and test
✅ All data in `data/mockData.ts` - easy to replace
✅ Props drive all behavior - components are "dumb"
✅ Type safety - all interfaces defined in one place
✅ No hardcoded strings - use `CURRENT_USER` and `GI_COLORS_MAP`
