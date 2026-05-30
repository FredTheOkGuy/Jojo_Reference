# StudyHub - React TypeScript Conversion

This is a complete React + TypeScript conversion of the StudyHub platform from vanilla HTML/CSS/JavaScript.

## 📁 Project Structure

```
src/
├── app/
│   ├── StudyHubApp.tsx          # Main app component with state management
│   └── types.ts                  # TypeScript interfaces
├── features/
│   ├── auth/
│   │   └── LoginScreen.tsx       # Login page
│   ├── study_groups/
│   │   ├── MainScreen.tsx        # Main study groups listing
│   │   └── DetailScreen.tsx      # Group detail view
│   ├── chat/
│   │   ├── ChatsScreen.tsx       # List of group chats
│   │   └── ChatScreen.tsx        # Individual chat view
│   └── profile/
│       └── ProfileScreen.tsx     # User profile page
├── components/
│   ├── GroupCard.tsx             # Reusable group card component
│   └── CreateGroupModal.tsx      # Modal for creating new groups
└── App.tsx                        # Root component
```

## 🎨 Styling

The project uses **Tailwind CSS** with custom theme colors matching the original design:

- **Primary Color**: `#c96332` (warm orange)
- **Accent Colors**: Green, Blue, Purple, Gold variants
- **Typography**: Syne (headings) + Plus Jakarta Sans (body)
- **Spacing & Radius**: Custom extend configuration in `tailwind.config.ts`

## 🚀 Features Implemented

- **Authentication**: Login screen with email/password
- **Study Groups**:
  - Browse and filter open groups by course code/number
  - Join/leave groups
  - Create new study groups
  - View group details (members, documents, schedule)
- **Messaging**:
  - Real-time chat within study groups
  - Message history with timestamps
  - Send/receive messages
- **Profile**: View and manage user profile

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Install Dependencies

```bash
npm install
```

You'll need to install Tailwind CSS and related dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
```

### Development

```bash
npm run dev
```

The app will run at `http://localhost:5173`

### Build

```bash
npm run build
```

## 🔄 State Management

The app uses React's built-in `useState` hook for state management. All state is centralized in the `StudyHubApp` component and passed down via props.

Key state pieces:
- `screen` - Current active screen (login, main, chats, detail, chat, profile)
- `groups` - Array of all study groups
- `activeGroupId` - Currently selected group
- `filterCode` / `filterNum` - Filter selections for groups
- `toastMessage` - Toast notifications

## 🎯 Component Hierarchy

```
StudyHubApp (main state container)
├── LoginScreen
├── MainScreen
│   ├── GroupCard (multiple)
│   └── CreateGroupModal
├── ChatsScreen
│   └── (displays joined groups)
├── DetailScreen
│   └── (displays group members & docs)
├── ChatScreen
│   └── (message display & input)
└── ProfileScreen
```

## 📝 TypeScript Interfaces

```typescript
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
  docs: Document[];
  messages: Message[];
  filterCode?: string;
  filterNum?: string;
}
```

## 🔄 Navigation Flow

The app uses a custom screen-based navigation system:

1. **Login** → Click "Sign in" → **Main Screen**
2. **Main Screen** → 
   - Click group → **Detail Screen**
   - Click chat icon → **Chats Screen**
   - Click avatar → **Profile Screen**
   - Click "+" → **Create Modal**
3. **Detail Screen** → "Open Chat" → **Chat Screen**
4. **Chat Screen** / **Chats Screen** → "Back" → return to previous screen
5. **Profile Screen** → "Sign out" → **Login**

## 🎨 Color System

The design uses a cohesive color palette:

| Role | Color | Hex |
|------|-------|-----|
| Primary | Orange | #c96332 |
| Success/Accent | Green | #5a6e3a |
| Info | Blue | #3d5fa0 |
| Secondary | Purple | #7a4fa0 |
| Warning | Gold | #8a6a1e |
| Background | Light Beige | #f2ede3 |
| Surface | Off-white | #faf8f4 |
| Text | Dark Brown | #1a1610 |

## 🚀 Future Enhancements

- Backend integration with Firebase (already imported)
- Real database for persistent data
- User authentication
- File upload for documents
- Notifications system
- Dark mode support
- Mobile-responsive improvements

## 📚 Key Conversion Details

### From Vanilla JS to React

**Before (Vanilla JS):**
```javascript
function renderMyGroups() {
  const el = document.getElementById('my-groups-list');
  el.innerHTML = mine.map(myGroupCardHTML).join('');
}
```

**After (React):**
```typescript
const myGroups = groups.filter((g) => g.joined);
return myGroups.map((group) => (
  <GroupCard key={group.id} group={group} joined onDetail={onDetail} />
));
```

### From Inline CSS to Tailwind

**Before:**
```css
.btn-primary {
  width: 100%;
  padding: 0.85rem;
  background: var(--primary);
  color: #fff;
  border-radius: 9px;
}
```

**After:**
```jsx
<button className="w-full py-3.5 bg-[#c96332] text-white rounded-[9px] ...">
```

## 🔧 Development Tips

- Hot Module Replacement (HMR) is enabled - changes reflect instantly
- Use TypeScript for type safety
- Component props are strictly typed
- Toast notifications auto-hide after 2.8 seconds
- Capacity bars change color based on occupancy (0-75%, 75-99%, 100%)

## 📄 License

Part of the ConUHack 2026 Jojo Reference Study Group project.
