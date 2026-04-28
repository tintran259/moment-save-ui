# CLAUDE.md

## 🧠 Overview

Mobile app (React Native - Expo) inspired by Locket + expense tracking.

* Capture moments (photo)
* Attach expense
* Track vs goals (day/month/year)

---

## 🎯 Core Flow

1. Welcome → Login (phone)
2. OTP verify
3. Check user state:
   * If NEW user (no goal yet) → Goal Setup
   * If EXISTING user → Camera
4. Capture / import photo
5. Add expense → Save moment
6. View in Calendar / Report

---

## 💰 Goal Logic

see the skill .claude/skills/goal-logic.md

---

## 💰 Calendar Logic

see the skill .claude/skills/calendar-logic.md

---

## 📱 Main Screens

* Welcome
* Auth (Phone + OTP)
* Goal Setup (ONLY for new users)
* Camera
* Post Capture
* Calendar
* Report

---

## 🏗️ Structure (STRICT)

```
src/
├── app/
|   components/
│   └── ComponentName/
│     ├── index.tsx
│     └── styles.ts
├── features/
│   └── featureName/
│       ├── api/
│       ├── hooks/
│       └── screens/
│           └── ScreenName/
│               ├── index.tsx
│               ├── styles.ts
│               └── components/
│                   └── ComponentName/
│                       ├── index.tsx
│                       └── styles.ts
├── constants/
├── services/
├── shared/
├── store/
```

❗ MUST follow structure exactly. No custom variations.

---

## 🔄 Data Flow (ENFORCED)

UI → Hook → API → Service → Backend

❌ No direct API calls in components
❌ No business logic in UI

---

## 🎨 UX Rules (CRITICAL)

* Camera-first: load instantly
* Smooth transitions only (no abrupt UI change)
* Minimum steps to complete action
* Always show feedback (loading, success, error)
* Keep UI minimal, focus on content

---

## ⚡ Performance Rules (MANDATORY)

### Rendering

* Use `React.memo` for components
* Use `useCallback` / `useMemo` to avoid re-render
* Avoid inline functions in JSX

### Lists (IMPORTANT)

* Use `FlatList` (NOT map for large data)
* Always set:

  * `keyExtractor`
  * `initialNumToRender`
  * `windowSize`
* Use `getItemLayout` if possible

### Images

* Use optimized image loading (cache, resize)
* Avoid loading full-size images

### Data

* Use React Query for caching
* Avoid refetching unnecessary data
* Pagination / lazy load for large datasets

### Navigation

* Lazy load screens
* Avoid heavy logic in screen mount

### General

* No blocking UI thread
* No heavy computation inside render
* Move logic to hooks

---

## 🧩 Code Rules (STRICT)

### Component Structure

```
components/
  └── SubComponent/
      ├── index.tsx
      └── styles.ts
```

Rules:

* 1 file = 1 component ONLY
* `index.tsx` = logic only
* `styles.ts` = StyleSheet only
* No inline styles
* No multiple components in same file
* Max 200–300 lines per file
* colors in file it have to move into `constants/colors.ts`

---

## 📦 Constants & Data

* Shared data in `constants/`
* No duplicated mock data
* Replace mock with API ASAP

---

## 🧠 Hooks Rules

* Business logic MUST be in hooks
* One hook = one responsibility
* API handled via React Query

---

## ⚙️ Tech

* Expo (React Native)
* TypeScript
* React Query
* Zustand

---

## 🎯 Goal

Build a fast, smooth, scalable app.

❗ Performance and UX are top priority.
❗ Code must follow structure strictly.
❗ No lag, no unnecessary re-render, no slow loading.
