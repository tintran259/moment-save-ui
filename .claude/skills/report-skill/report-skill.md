---
description: >
  Dùng khi làm việc với ReportScreen: báo cáo chi tiêu theo tháng, bar chart,
  GoalTracker (% spent vs limit), FilterReport (chọn tháng), NoGoalBanner,
  PastMonthGoalStatus, StatCard, TopExpenseCard.
  Invoke khi: sửa report UI, sửa goal tracker progress bar, thêm chart mới,
  fix filter tháng, hoặc thay đổi API /report/monthly.
---

# Report Skill

## What it does
Monthly expense report: total spent, daily bar chart, top expenses, goal tracker (vs monthly limit).

---

## Domain Rules
- Default view: current month
- User can switch to previous months via FilterReport
- Goal tracker shows spending vs monthly goal limit (derived from `getGoalLimits()`)
- If no goal set → show NoGoalBanner with link to goal setup
- Past month: show final status (achieved/failed) instead of live progress

---

## Key Files

### Frontend — Hooks
| File | Purpose |
|------|---------|
| `src/features/report/hooks/useMonthlyReport.ts` | GET /report/monthly?year&month → monthly totals |
| `src/features/report/hooks/useReportStatistics.ts` | Derived stats from report data |
| `src/features/report/hooks/useStatistics.ts` | Additional statistics hook |
| `src/features/report/api/report.api.ts` | API calls for report |

### Frontend — Screen
| File | Purpose |
|------|---------|
| `src/features/report/screens/ReportScreen/index.tsx` | Root screen — composes all components |
| `src/features/report/screens/ReportScreen/styles.ts` | Screen styles |
| `src/features/report/screens/ReportScreen/utils.ts` | Helper functions for report display |

### Frontend — Components
| File | Purpose |
|------|---------|
| `.../components/FilterReport/index.tsx` | Month/year picker |
| `.../components/FilterReport/styles.ts` | |
| `.../components/SummaryCard/index.tsx` | Total spent this month |
| `.../components/SummaryCard/styles.ts` | |
| `.../components/StatsGrid/index.tsx` | Grid of StatCards |
| `.../components/StatsGrid/styles.ts` | |
| `.../components/StatCard/index.tsx` | Single stat (avg/day, count, max) |
| `.../components/StatCard/styles.ts` | |
| `.../components/DailyBarChart/index.tsx` | Bar chart of daily spending |
| `.../components/DailyBarChart/styles.ts` | |
| `.../components/GoalTracker/index.tsx` | Progress bar vs monthly goal limit |
| `.../components/GoalTracker/styles.ts` | |
| `.../components/NoGoalBanner/index.tsx` | CTA when user has no goal |
| `.../components/NoGoalBanner/styles.ts` | |
| `.../components/TopExpenseCard/index.tsx` | Highest single expense |
| `.../components/TopExpenseCard/styles.ts` | |
| `.../components/PastMonthGoalStatus/index.tsx` | Final achieved/failed badge for past months |
| `.../components/PastMonthGoalStatus/styles.ts` | |
| `.../components/ReportSkeleton/index.tsx` | Loading skeleton |
| `.../components/ReportSkeleton/styles.ts` | |

### Backend
| File | Purpose |
|------|---------|
| `src/modules/report/report.controller.ts` | GET /report/monthly |
| `src/modules/report/report.service.ts` | Aggregate expenses by month |
| `src/modules/report/dto/get-monthly-report.dto.ts` | year, month params |

---

## Goal Tracker Logic
```ts
import { getGoalLimits, spentPercent, goalStatus } from '@/utils/calculateGoal';

const { goal } = useGoal(); // { sourceField, sourceValue }
const limits = getGoalLimits(goal.sourceField, goal.sourceValue, selectedDate);
const percent = spentPercent(totalSpent, limits.monthly);
const status = goalStatus(percent); // 'safe' | 'warning' | 'exceeded'
```

- `safe` < 80% → green
- `warning` 80–99% → orange  
- `exceeded` ≥ 100% → red

## API
```
GET /report/monthly?year=2025&month=5
→ { totalAmount, expenseCount, avgPerDay, maxExpense, dailyBreakdown[] }
```

## React Query Keys
- `['monthly-report', year, month]`

## Navigation
- Route: `(protected)/report`
- Accessible from AppFooter (tab navigation)
