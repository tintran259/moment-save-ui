# Goal Logic (Domain Rule)

## Input Rules
- User can input ONLY ONE:
  - daily
  - monthly
  - yearly

- When one field is filled:
  - disable others

---

## Calculation Rules

- Daily → Monthly = daily * 30
- Daily → Yearly = daily * 365

- Monthly → Daily = monthly / 30
- Monthly → Yearly = monthly * 12

- Yearly → Monthly = yearly / 12
- Yearly → Daily = yearly / 365

---

## UX Rules
- Auto update values instantly
- Disable input fields correctly
- Show formatted currency

---

## Edge Cases
- Prevent negative values
- Handle large numbers
- Round values properly