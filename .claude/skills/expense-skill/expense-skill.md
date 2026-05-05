---
description: >
  Dùng khi làm việc với expense: chụp ảnh, upload Cloudinary, tạo/sửa/xóa expense,
  AmountInput, CaptureScreen, CapturePreviewPhase, storage signed URL.
  Invoke khi: sửa camera flow, sửa form amount/note, fix upload ảnh, thay đổi
  expense schema, sửa API /expenses, hoặc bất kỳ thứ gì liên quan đến tạo khoản chi.
---

# Expense Skill

## What it does
User captures a photo → gets a signed upload URL → uploads to Cloudinary → fills amount + note → saves expense to backend.

---

## Flow

```
CaptureScreen
  1. Camera live view (expo-camera)
  2. User taps capture → photo taken
  3. Preview phase: user sees photo + amount + note form
  4. Submit:
     a. useUploadImage → GET /storage/upload-url (signed Cloudinary URL)
     b. PUT photo to Cloudinary directly (from device)
     c. useCreateExpense → POST /expenses { imageUrl, amount, note, expenseDate }
  5. Success → navigate back to camera / calendar
```

---

## Domain Rules
- `amount` must be > 0 (integer, VND)
- `image` is required — no expense without photo
- `expenseDate` = date the expense happened (user-selected or today), stored in UTC, displayed in Asia/Ho_Chi_Minh
- Image stored on Cloudinary, only URL saved in DB
- Never store image binary in DB

---

## Key Files

### Frontend
| File | Purpose |
|------|---------|
| `src/features/expense/api/expense.api.ts` | `createExpense()`, `getExpenses()`, `getExpenseMonths()`, `getExpensesByMonth()`, `updateExpense()`, `deleteExpense()` |
| `src/features/expense/hooks/useCreateExpense.ts` | Mutation: POST /expenses |
| `src/features/expense/hooks/useUploadImage.ts` | Get signed URL + upload to Cloudinary |
| `src/features/expense/hooks/useExpenses.ts` | GET /expenses (paginated) |
| `src/features/expense/hooks/useExpenseMonths.ts` | GET /expenses/months → MonthMeta[] |
| `src/features/expense/hooks/useExpensesByMonth.ts` | GET /expenses?year&month → Expense[] |
| `src/features/expense/screens/CaptureScreen/index.tsx` | Camera + preview phases |
| `src/features/expense/screens/CaptureScreen/styles.ts` | Styles |
| `src/features/expense/components/AmountInput/index.tsx` | Currency input component |
| `src/features/expense/components/CameraPermission/index.tsx` | Permission request UI |
| `src/features/expense/components/CapturePreviewPhase/index.tsx` | Post-capture form (photo + amount + note) |
| `src/features/expense/components/CaptureTopBar/index.tsx` | Top bar in capture screen |
| `src/features/expense/constants/captureLayout.ts` | Layout constants for camera view |

### Backend
| File | Purpose |
|------|---------|
| `src/modules/expense/expense.controller.ts` | CRUD endpoints |
| `src/modules/expense/expense.service.ts` | Business logic: create, get, group by date/month |
| `src/modules/expense/entities/expense.entity.ts` | id, userId, imageUrl, amount, note, expenseDate, createdAt |
| `src/modules/expense/dto/create-expense.dto.ts` | imageUrl, amount (>0), note?, expenseDate |
| `src/modules/expense/dto/get-expenses.dto.ts` | Pagination + filter params |
| `src/modules/expense/dto/update-expense.dto.ts` | Partial update |
| `src/modules/storage/storage.controller.ts` | GET /storage/upload-url |
| `src/modules/storage/storage.service.ts` | Cloudinary signed URL generation |

### Types
| File | Purpose |
|------|---------|
| `src/types/expense.types.ts` | `Expense`, `MonthMeta`, `CreateExpensePayload` |

---

## API Endpoints
```
POST   /expenses           → create expense
GET    /expenses           → list (paginated, filter by year/month)
GET    /expenses/months    → list of MonthMeta that have expenses
PATCH  /expenses/:id       → update
DELETE /expenses/:id       → delete
GET    /storage/upload-url → get Cloudinary signed upload URL
```

## Image Upload
1. Frontend: `GET /storage/upload-url` → `{ url, fields }` (Cloudinary signed params)
2. Frontend: `PUT <url>` with photo binary (direct to Cloudinary, not through backend)
3. Frontend: use returned `imageUrl` in create expense payload

## React Query Keys
- `['expenses']` — invalidated after create/update/delete
- `['expense-months']` — invalidated after create/delete
- `['expenses', year, month]` — per-month cache

## Timezone
- Store: UTC in DB (`expenseDate` column)
- Display: convert to `Asia/Ho_Chi_Minh` using `src/utils/date.ts`
