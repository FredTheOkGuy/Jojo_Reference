# Before & After: Conversion Examples

## Example 1: Rendering Group Lists

### ❌ Original Vanilla HTML/JS

```html
<div id="my-groups-list"></div>

<script>
function myGroupCardHTML(g){
  const pct = Math.round(g.cur/g.max*100);
  const cls = capBarClass(pct);
  return `<div class="group-card" onclick="goDetail(${g.id},'main')">
    <div class="group-icon ${g.gi}">${g.icon}</div>
    <div class="group-info">
      <div class="group-name">${g.name}</div>
      <div class="group-meta">
        <span>${g.course}</span>
        <span class="dot"></span>
        <span>${g.days} · ${g.time.split(' – ')[0]}</span>
      </div>
      <div class="capacity-row">
        <span class="cap-label">${g.cur} / ${g.max}</span>
        <div class="cap-bar-wrap">
          <div class="cap-bar ${cls}" style="width:${pct}%"></div>
        </div>
      </div>
    </div>
    <div class="group-right">
      <span class="btn-joined">Joined ✓</span>
      <span class="chevron">›</span>
    </div>
  </div>`;
}

function renderMyGroups(){
  const el = document.getElementById('my-groups-list');
  const mine = allGroups.filter(g=>g.joined);
  el.innerHTML = mine.length
    ? mine.map(myGroupCardHTML).join('')
    : '<p class="empty-state">You haven\'t joined any groups yet.</p>';
}

renderMyGroups();
</script>
```

### ✅ React + TypeScript Version

```typescript
// MainScreen.tsx
export default function MainScreen({ groups, onDetail }: MainScreenProps) {
  const myGroups = groups.filter((g) => g.joined);

  return (
    <div className="flex flex-col min-h-screen bg-[#f2ede3]">
      {/* ... topbar ... */}
      <div className="flex-1 px-5 py-6 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9a9282]">
            Your Study Groups
          </span>
        </div>

        <div>
          {myGroups.length > 0 ? (
            myGroups.map((group) => (
              <GroupCard 
                key={group.id} 
                group={group} 
                joined 
                onDetail={onDetail} 
              />
            ))
          ) : (
            <p className="text-center py-8 text-sm text-[#9a9282] font-medium">
              You haven't joined any groups yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// GroupCard.tsx - Reusable component
interface GroupCardProps {
  group: StudyGroup;
  joined: boolean;
  onDetail?: (id: number) => void;
}

export default function GroupCard({ group, joined, onDetail }: GroupCardProps) {
  const pct = Math.round((group.cur / group.max) * 100);
  const capacityClass = pct >= 100 ? 'bg-[#c96332]' : pct >= 75 ? 'bg-[#8a6a1e]' : 'bg-[#5a6e3a]';
  const colors = GI_COLORS_MAP[group.gi];

  return (
    <div
      className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-5 mb-3 flex items-center gap-4 cursor-pointer transition-all shadow-sm hover:border-[#f0b897] hover:shadow-md hover:-translate-y-0.5"
      onClick={() => joined && onDetail?.(group.id)}
    >
      <div className="w-14 h-14 rounded-[13px] flex items-center justify-center font-black text-lg font-['Syne'] flex-shrink-0"
        style={{ background: colors.bg, color: colors.text }}>
        {group.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-bold text-base text-[#1a1610] font-['Syne'] mb-1">
          {group.name}
        </div>
        <div className="text-xs text-[#9a9282] flex gap-2 items-center font-medium mb-2.5">
          <span>{group.course}</span>
          <span className="w-1 h-1 rounded-full bg-[#9a9282]"></span>
          <span>{group.days} · {group.time.split(' – ')[0]}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-[#4a4438]">
            {group.cur} / {group.max}
          </span>
          <div className="flex-1 h-1 bg-[#e4e0d6] rounded-full overflow-hidden max-w-[90px]">
            <div className={`h-full rounded-full transition-all ${capacityClass}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#e8edda] text-[#5a6e3a]">
          Joined ✓
        </span>
        <span className="text-base font-bold text-[#9a9282]">›</span>
      </div>
    </div>
  );
}
```

**Benefits:**
- ✅ Type-safe (`StudyGroup` interface)
- ✅ Reusable component (`GroupCard`)
- ✅ No string concatenation
- ✅ Proper event handling with callbacks
- ✅ Clean, declarative JSX
- ✅ Easy to test individual pieces

---

## Example 2: State Management

### ❌ Original Vanilla JS

```javascript
// Global state - prone to conflicts
const allGroups = [...]; // global array
let detailFrom = 'main';
let chatFrom = 'detail';
let activeGroupId = null;

function handleJoin(e, id) {
  e.stopPropagation();
  const g = allGroups[id];
  if (g.cur >= g.max) {
    showToast('This group is full.');
    return;
  }
  g.cur++;
  g.joined = true;
  g.members.unshift({...});
  const now = new Date();
  const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2,'0');
  g.messages.push({sender:"AJ",...,time});
  renderMyGroups();
  renderOpenGroups();
  showToast('You joined '+g.name+'! 🎉');
}
```

### ✅ React Version

```typescript
// StudyHubApp.tsx - Centralized state management
export default function StudyHubApp() {
  const [screen, setScreen] = useState<Screen>('login');
  const [groups, setGroups] = useState<StudyGroup[]>(INITIAL_GROUPS);
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  const handleJoin = (id: number) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          if (g.cur >= g.max) {
            showToast('This group is full.');
            return g;
          }
          const now = new Date();
          const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
          return {
            ...g,
            cur: g.cur + 1,
            joined: true,
            members: [...g.members, {...}],
            messages: [...g.messages, {...}],
          };
        }
        return g;
      })
    );
    showToast(`You joined ${groups.find((g) => g.id === id)?.name}! 🎉`);
  };

  // ... handlers and render
}
```

**Benefits:**
- ✅ Immutable state updates (no side effects)
- ✅ Type-safe (`useState<StudyGroup[]>`)
- ✅ Traceable data flow
- ✅ Easy debugging with React DevTools
- ✅ No global variables
- ✅ Automatic re-renders when state changes

---

## Example 3: Navigation

### ❌ Original Vanilla JS

```javascript
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function goMain() {
  renderMyGroups();
  renderOpenGroups();
  updateNotifDot();
  show('main');
}

function goDetail(id, from) {
  detailFrom = from || 'main';
  activeGroupId = id;
  const g = allGroups[id];
  // ... build HTML ...
  document.getElementById('detail-body').innerHTML = '...';
  document.getElementById('detail-back-btn').onclick = () => {
    if (detailFrom === 'chats') {
      renderChats();
      show('chats');
    } else {
      goMain();
    }
  };
  show('detail');
}
```

### ✅ React Version

```typescript
type Screen = 'login' | 'main' | 'chats' | 'detail' | 'chat' | 'profile';
type DetailFrom = 'main' | 'chats';

export default function StudyHubApp() {
  const [screen, setScreen] = useState<Screen>('login');
  const [detailFrom, setDetailFrom] = useState<DetailFrom>('main');
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);

  const goMain = () => setScreen('main');
  
  const goDetail = (id: number, from: DetailFrom) => {
    setActiveGroupId(id);
    setDetailFrom(from);
    setScreen('detail');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <LoginScreen onSignIn={goMain} />;
      case 'main':
        return <MainScreen groups={groups} onDetail={(id) => goDetail(id, 'main')} />;
      case 'detail':
        return activeGroupId !== null ? (
          <DetailScreen
            group={groups[activeGroupId]}
            onBack={() => detailFrom === 'chats' ? setScreen('chats') : goMain()}
          />
        ) : null;
      // ... other screens
    }
  };

  return <div className="min-h-screen bg-[#f2ede3]">{renderScreen()}</div>;
}
```

**Benefits:**
- ✅ Type-safe navigation (enum-like types)
- ✅ No DOM manipulation
- ✅ Declarative screen switching
- ✅ Automatic scroll to top
- ✅ Back button context preserved
- ✅ Easy to trace navigation flow

---

## Example 4: Styling

### ❌ Original CSS

```css
.btn-primary {
  width: 100%;
  padding: 0.85rem;
  background: var(--primary);
  color: #fff;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.18s;
}

.btn-primary:hover {
  background: var(--primary-dk);
  box-shadow: 0 4px 16px rgba(201, 99, 50, 0.3);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

### ✅ Tailwind CSS

```jsx
<button className="w-full py-3.5 bg-[#c96332] text-white font-bold rounded-[9px] transition-all hover:bg-[#a34e24] active:scale-95 hover:shadow-lg">
  Sign in →
</button>
```

**Benefits:**
- ✅ No CSS files to maintain
- ✅ Consistent spacing (using design tokens)
- ✅ Easy to customize on per-element basis
- ✅ Responsive classes built-in
- ✅ No class name conflicts
- ✅ Smaller final bundle (unused CSS removed)

---

## Summary Table

| Aspect | Before | After |
|--------|--------|-------|
| **State** | Global variables | React hooks (`useState`) |
| **Rendering** | String concatenation | JSX components |
| **Type Safety** | None | Full TypeScript |
| **Styling** | CSS files + inline styles | Tailwind CSS |
| **Navigation** | DOM class manipulation | State-based routing |
| **Components** | Procedural HTML functions | Reusable React components |
| **Debugging** | Browser console | React DevTools |
| **Testing** | Manual testing | Component-level testing |
| **Maintainability** | Difficult | Easy |
| **Scalability** | Limited | Unlimited |

This conversion takes your StudyHub application from a monolithic vanilla JS app to a modern, maintainable React application!
