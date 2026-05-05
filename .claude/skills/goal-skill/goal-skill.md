---
description: >
  Dùng khi làm việc với goal (mục tiêu chi tiêu): GoalSetupScreen, calculation logic,
  GoalContext, goal persistence (AsyncStorage), useSetUserGoal, backend /user/goal API.
  Invoke khi: sửa form nhập goal, sửa công thức tính, sửa goal tracker trong Report,
  hoặc bất kỳ thứ gì liên quan đến daily/monthly/yearly spending limit.
---

# Goal Skill

## What it does
User sets a spending limit by entering ONE of: daily / monthly / yearly.
The other two are auto-calculated and shown as read-only.
Goal is saved to backend DB + cached in AsyncStorage.

---

## Domain Rules

### Input
- Only ONE field editable at a time
- Filling one field → disables the other two
- Reset button clears all and re-enables all fields
- Value must be > 0, integers only, no negatives

### Calculation (preview display — uses 30-day standard)
- daily   → monthly = daily * 30  |  yearly = daily * 365
- monthly → daily = monthly / 30  |  yearly = monthly * 12
- yearly  → daily = yearly / 365  |  monthly = yearly / 12

### Runtime limits (uses real days-in-month)
- Stored as `sourceField + sourceValue` only (not all three)
- `getGoalLimits()` derives daily/monthly/yearly on the fly per date

---

## Key Files

### Frontend
| File | Purpose |
|------|---------|
| `src/utils/calculateGoal.ts` | All math: `calculateGoal()`, `getGoalLimits()`, `spentPercent()`, `goalStatus()` |
| `src/features/onboarding/hooks/useGoalCalculation.ts` | UI state: sourceField, rawInput, isFieldDisabled, getDisplayValue |
| `src/features/onboarding/screens/GoalSetupScreen/index.tsx` | UI — 3 cards, badge "Tự tính", summary, save/skip |
| `src/features/onboarding/screens/GoalSetupScreen/styles.ts` | Styles |
| `src/features/user/api/user.api.ts` | `GET /user/goal`, `POST /user/goal` |
| `src/features/user/hooks/useSetUserGoal.ts` | useMutation → calls userApi.setGoal + saveGoal to context |
| `src/contexts/GoalContext.tsx` | Global goal state: goal, isLoading, hasGoal, saveGoal, clearGoal |
| `src/services/goal.service.ts` | AsyncStorage CRUD: getGoal, saveGoal, clearGoal (with migration) |
| `src/types/user.types.ts` | `UserGoal { sourceField, sourceValue }` |
| `src/app/(onboarding)/goal-setup.tsx` | Route — just renders GoalSetupScreen |
| `src/app/(onboarding)/_layout.tsx` | Stack: welcome → goal-setup (gestureEnabled: false) |

### Backend
| File | Purpose |
|------|---------|
| `src/modules/user/user.controller.ts` | GET /user/goal, POST /user/goal — JwtAuthGuard |
| `src/modules/user/user.service.ts` | getGoal(), setGoal() — reads/writes user.goalSourceField + user.goalSourceValue |
| `src/modules/user/dto/set-goal.dto.ts` | `sourceField: 'daily'|'monthly'|'yearly'`, `sourceValue: Int, Min(1)` |
| `src/modules/user/entities/user.entity.ts` | goalSourceField, goalSourceValue columns |

---

## Data Flow

```
GoalSetupScreen
  → useGoalCalculation (local state: which field, raw input)
  → useSetUserGoal (mutation)
    → userApi.setGoal → POST /user/goal
    → goalService.saveGoal → AsyncStorage
    → GoalContext.saveGoal → updates in-memory state
  → router.replace('/(protected)')
```

---

## GoalContext usage

```tsx
const { goal, hasGoal, saveGoal, clearGoal } = useGoal();
// goal: { sourceField: 'monthly', sourceValue: 3000000 }
// hasGoal: boolean — used to redirect new users to goal-setup
```

---

## Navigation Flow
- New user (no goal) → `(onboarding)/goal-setup` → save → `(protected)`
- Skip → `(protected)` directly (can set goal later from Drawer)
- Re-setting goal from inside app → same GoalSetupScreen, same save flow

---

## Edge Cases
- `sourceValue <= 0` or NaN → `calculated = null`, save button disabled
- AsyncStorage migration: old format `{ daily, monthly, yearly, sourceField }` → new `{ sourceField, sourceValue }` handled in `goal.service.ts`
- `getGoalLimits()` returns `{ 0, 0, 0 }` if sourceValue is invalid
