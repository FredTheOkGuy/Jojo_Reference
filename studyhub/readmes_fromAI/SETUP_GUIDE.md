# ✅ Setup & Troubleshooting Guide

## 🚀 Quick Start

### Step 1: Install Tailwind CSS

The project uses Tailwind CSS for styling. Install it with PostCSS and Autoprefixer:

```bash
cd studyhub
npm install -D tailwindcss postcss autoprefixer
```

### Step 2: Install All Dependencies

```bash
npm install
```

### Step 3: Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Step 4: Test the App

1. **Login Screen**: Click "Sign in" button
2. **Main Screen**: Browse study groups, use filters
3. **Create Group**: Click "+" button
4. **View Details**: Click any group card
5. **Messaging**: Click "Open Chat" in detail view
6. **Profile**: Click avatar in top-right
7. **Sign Out**: Click "Sign out" on profile page

## 📋 File Structure Verification

After completing setup, you should have:

```
studyhub/
├── node_modules/               (created after npm install)
├── dist/                        (created after npm run build)
├── src/
│   ├── app/
│   │   ├── StudyHubApp.tsx      ✓ Main component
│   │   └── types.ts             ✓ TypeScript interfaces
│   ├── features/
│   │   ├── auth/
│   │   │   └── LoginScreen.tsx  ✓
│   │   ├── study_groups/
│   │   │   ├── MainScreen.tsx   ✓
│   │   │   └── DetailScreen.tsx ✓
│   │   ├── chat/
│   │   │   ├── ChatsScreen.tsx  ✓
│   │   │   └── ChatScreen.tsx   ✓
│   │   └── profile/
│   │       └── ProfileScreen.tsx ✓
│   ├── components/
│   │   ├── GroupCard.tsx        ✓
│   │   └── CreateGroupModal.tsx ✓
│   ├── App.tsx                  ✓ Updated
│   ├── index.css                ✓ Updated
│   └── main.tsx
├── public/
├── package.json                 ✓
├── package-lock.json            ✓
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts           ✓ New
├── postcss.config.js            ✓ New
├── CONVERSION_GUIDE.md          ✓ New
├── MIGRATION_SUMMARY.md         ✓ New
└── BEFORE_AFTER_EXAMPLES.md     ✓ New
```

## 🔍 Troubleshooting

### Issue: Tailwind Classes Not Applied

**Symptom**: Buttons and text appear unstyled.

**Solution**:
1. Make sure `tailwind.config.ts` exists in project root
2. Verify `src/index.css` has Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. Restart the dev server:
   ```bash
   npm run dev
   ```

### Issue: TypeScript Errors

**Symptom**: Red squiggles in IDE showing type errors.

**Solution**:
1. Make sure all component prop interfaces are defined
2. Import types from `app/types.ts`:
   ```typescript
   import { StudyGroup } from '../../app/types';
   ```
3. Use strict null checks:
   ```typescript
   activeGroupId !== null ? <Component /> : null
   ```

### Issue: Components Not Rendering

**Symptom**: Blank screen or page not loading.

**Solution**:
1. Check browser console for errors (F12)
2. Verify `App.tsx` imports `StudyHubApp`:
   ```typescript
   import StudyHubApp from './app/StudyHubApp';
   ```
3. Check `main.tsx` renders the App component

### Issue: Styling Looks Different from Original HTML

**Symptom**: Colors or spacing don't match.

**Solution**:
1. Review `tailwind.config.ts` theme configuration
2. Check custom color values match original CSS variables
3. Use Tailwind DevTools extension to inspect classes
4. Test with `bg-[#c96332]` syntax for custom hex colors

### Issue: State Not Updating

**Symptom**: Joining a group, sending messages, etc. don't work.

**Solution**:
1. Check console for JavaScript errors
2. Verify state handlers are passed as props correctly:
   ```typescript
   <MainScreen 
     onJoin={handleJoin}  // ✓ Correct
     onJoin={handleJoin()} // ✗ Wrong - executes immediately
   />
   ```
3. Ensure immutable state updates in handlers:
   ```typescript
   setGroups((prev) =>
     prev.map((g) => g.id === id ? {...g, joined: true} : g)
   );
   ```

### Issue: Hot Module Replacement (HMR) Not Working

**Symptom**: Changes not reflecting without manual page refresh.

**Solution**:
1. Don't modify `src/main.tsx`
2. Ensure Vite config hasn't been changed
3. Save files normally (don't use "Save All" extensions)
4. Restart dev server: `npm run dev`

## 🎨 Customization Tips

### Change Primary Color

1. Edit `tailwind.config.ts`:
   ```typescript
   colors: {
     primary: '#YOUR_COLOR',
     'primary-lt': '#LIGHTER_SHADE',
     'primary-dk': '#DARKER_SHADE',
     // ...
   }
   ```
2. Update component color maps (in `GroupCard.tsx`, etc.)
3. Restart dev server

### Add New Filter Options

In `MainScreen.tsx`, add to the filter selects:
```typescript
<option value="CSEN">CSEN</option>
```

### Customize Group Icons

Edit `GI_COLORS_MAP` in components:
```typescript
const GI_COLORS_MAP: Record<string, { bg: string; text: string }> = {
  'gi-custom': { bg: '#hexcolor', text: '#hexcolor' },
};
```

### Change Toast Duration

In `StudyHubApp.tsx`:
```typescript
setTimeout(() => setToastVisible(false), 5000); // 5 seconds instead of 2.8s
```

## 🧪 Testing Checklist

- [ ] Login screen appears on load
- [ ] "Sign in" button navigates to main screen
- [ ] Groups display with correct data
- [ ] Filters work (course code and number)
- [ ] "+" button opens create modal
- [ ] Create group form validates input
- [ ] Group card shows "Joined ✓" button correctly
- [ ] "Join" button changes group status
- [ ] "Full" button shows when group is at capacity
- [ ] Clicking group navigates to detail view
- [ ] Detail view shows members, documents, schedule
- [ ] "Open Chat" button navigates to chat view
- [ ] Messages display correctly in chat
- [ ] Input field sends messages
- [ ] "Back" buttons navigate correctly
- [ ] Chats screen shows joined groups
- [ ] Profile screen shows user info
- [ ] "Sign out" returns to login
- [ ] Toast notifications appear for actions
- [ ] Responsive layout works on mobile

## 🏗️ Build & Deploy

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## 📱 Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 IDE Setup (VS Code)

### Recommended Extensions

1. **Tailwind CSS IntelliSense** - Provides autocomplete for Tailwind classes
2. **TypeScript Vue Plugin** - Better TypeScript support
3. **ES7+ React/Redux/React-Native snippets** - React snippets
4. **Prettier** - Code formatting

### Settings (`.vscode/settings.json`)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Documentation](https://vite.dev)

## ✨ Performance Tips

1. **Lazy Load Images** - For group icons and avatars
2. **Virtualize Long Lists** - If you have many groups
3. **Memoize Components** - Use `React.memo()` for expensive renders
4. **Code Split Routes** - Separate code for each screen
5. **Use DevTools** - Check performance in React DevTools

## 🐛 Debugging Tips

### Console Logging

```typescript
// Good for debugging state changes
const handleJoin = (id: number) => {
  console.log('Before:', groups);
  // ... update logic ...
  console.log('After:', updatedGroups);
};
```

### React DevTools

1. Install React DevTools browser extension
2. Inspect components in the Components tab
3. Check state with the "Hooks" section
4. Track prop changes

### TypeScript Errors

Make sure to:
- Import types correctly
- Use `as const` for literal types
- Define all props interfaces
- Use nullish coalescing (`??`) and optional chaining (`?.`)

## 🚨 Common Mistakes

❌ **Modifying state directly**
```typescript
g.cur = g.cur + 1; // DON'T DO THIS
```

✅ **Use setState to create new object**
```typescript
return {...g, cur: g.cur + 1};
```

---

❌ **Passing functions incorrectly**
```typescript
<button onClick={handleClick()}>Click</button> {/* Executes immediately */}
```

✅ **Pass function reference**
```typescript
<button onClick={handleClick}>Click</button> {/* Correct */}
<button onClick={() => handleClick(id)}>Click</button> {/* Also correct */}
```

---

❌ **Mutating arrays**
```typescript
group.members.push(newMember); // Direct mutation
```

✅ **Create new array**
```typescript
{...group, members: [...group.members, newMember]};
```

## 📞 Need Help?

- Check component files for implementation patterns
- Review `StudyHubApp.tsx` for state management example
- Look at `BEFORE_AFTER_EXAMPLES.md` for conversion patterns
- Test individual components in isolation
- Use React DevTools for debugging

Good luck! 🎉
