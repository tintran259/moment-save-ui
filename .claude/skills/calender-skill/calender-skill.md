---
description: >
  Dùng khi làm việc với CalendarScreen: lưới ảnh theo tháng/ngày, PhotoViewerModal
  (fullscreen swipeable photo viewer), thumbnail strip, open/close animation.
  Invoke khi: sửa layout calendar, sửa PhotoViewer, sửa animation, fix bug swipe/scroll,
  hoặc thay đổi cách group expense theo ngày/tháng trong calendar view.
---

# Calendar Skill

## What it does
Shows all expenses grouped by month → day. Tapping a day opens a fullscreen photo viewer (swipeable cards).

---

## Domain Rules

### Data shape
- `MonthMeta { year, month }` — list of months that have expenses
- `Expense { id, imageUrl, amount, note, expenseDate, createdAt }`
- Expenses grouped: month → day → [expenses]

### PhotoViewer
- Opens when user taps a day that has photos
- Fullscreen overlay (NOT a Modal — uses absoluteFill + zIndex: 9999 to avoid white flash)
- Swipeable horizontal FlatList of photo cards
- Thumbnail strip at bottom synced with main card
- Open animation: bgOpacity 0→1 + card slides up on mount
- Close animation: reverse, then calls `onClose()` in callback (not before)

---

## Key Files

### Screen
| File | Purpose |
|------|---------|
| `src/features/calendar/screens/CalendarScreen/index.tsx` | Root screen — FlatList of MonthSection, conditionally renders PhotoViewerModal outside AppLayout |
| `src/features/calendar/screens/CalendarScreen/styles.ts` | Screen styles |

### Components
| File | Purpose |
|------|---------|
| `.../components/MonthSection/index.tsx` | Renders month header + grid of DayCells |
| `.../components/MonthSection/styles.ts` | Month section styles |
| `.../components/MonthSection/components/DayCell/index.tsx` | Single day cell — shows thumbnails, calls onDayPress |
| `.../components/MonthSection/components/DayCell/styles.ts` | DayCell styles |
| `.../components/PhotoViewerModal/index.tsx` | Fullscreen photo viewer — open/close animation, swipe, thumbnail strip |
| `.../components/PhotoViewerModal/styles.ts` | PEEK, CARD_W, THUMB_* constants + styles |

### Data
| File | Purpose |
|------|---------|
| `src/features/expense/hooks/useExpenseMonths.ts` | `GET /expenses/months` → list of MonthMeta |
| `src/features/expense/hooks/useExpensesByMonth.ts` | `GET /expenses?year&month` → expenses for a month |
| `src/features/expense/api/expense.api.ts` | All expense API calls |
| `src/types/expense.types.ts` | Expense, MonthMeta types |

---

## Data Flow

```
CalendarScreen
  → useExpenseMonths → GET /expenses/months → [MonthMeta]
  → FlatList of MonthSection (year, month)
    → MonthSection → useExpensesByMonth(year, month) → [Expense]
    → DayCell → groups expenses by day → shows thumbnails
    → onDayPress(expenses, startIndex)
  → CalendarScreen sets viewerExpenses + viewerIndex state
  → PhotoViewerModal renders (outside AppLayout) when viewerIndex !== null
```

---

## PhotoViewerModal — Critical Implementation Details

### Why NOT Modal
RN `Modal` causes a white flash (native layer renders white before JS content).
Solution: `<View style={[StyleSheet.absoluteFill, styles.viewerRoot]}>` with `zIndex: 9999`.
Must be rendered **outside AppLayout** (as sibling in CalendarScreen) so absoluteFill covers full screen including header/footer.

### Animation
```tsx
// On mount (open):
useEffect(() => {
  Animated.parallel([bgOpacity 0→1, cardTranslateY 40→0]).start();
}, []);

// Close:
const handleClose = () => {
  Animated.parallel([bgOpacity 1→0, cardTranslateY 0→40]).start(() => onClose());
  // onClose() called INSIDE .start() callback, NOT outside
};
```

### Props (no `visible`)
```tsx
interface PhotoViewerModalProps {
  expenses: Expense[];
  initialIndex: number;
  onClose: () => void;
}
// Parent controls mount/unmount: {viewerIndex !== null && <PhotoViewerModal ... />}
```

### FlatList fix
Photo FlatList needs `style={{ flex: 1 }}` — without it, items using `flex: 1` collapse to 0 height.

### Thumbnail sync
`scrollX` Animated.Value tracks main FlatList scroll position.
Thumbnail strip scrolls via `thumbRef.current?.scrollToOffset()` in `onMomentumScrollEnd`.

---

## CalendarScreen structure
```tsx
return (
  <>
    <AppLayout swipeDisabled={viewerIndex !== null}>
      {/* FlatList of months */}
    </AppLayout>

    {viewerIndex !== null && (
      <PhotoViewerModal
        expenses={viewerExpenses}
        initialIndex={viewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    )}
  </>
);
```

---

## Refresh
Pull-to-refresh invalidates `['expenses']` query key then refetches months.
