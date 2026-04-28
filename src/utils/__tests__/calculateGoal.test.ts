import {
  getDaysInMonth,
  getGoalLimits,
  spentPercent,
  goalStatus,
} from '../calculateGoal';

// ── getDaysInMonth ────────────────────────────────────────────────────────────

describe('getDaysInMonth', () => {
  it('TC-D01: April has 30 days', () => {
    expect(getDaysInMonth(new Date('2026-04-01'))).toBe(30);
  });

  it('TC-D02: January has 31 days', () => {
    expect(getDaysInMonth(new Date('2026-01-01'))).toBe(31);
  });

  it('TC-D03: February 2025 (non-leap) has 28 days', () => {
    expect(getDaysInMonth(new Date('2025-02-01'))).toBe(28);
  });

  it('TC-D04: February 2024 (leap year) has 29 days', () => {
    expect(getDaysInMonth(new Date('2024-02-01'))).toBe(29);
  });
});

// ── getGoalLimits — sourceField: daily ───────────────────────────────────────

describe('getGoalLimits — sourceField: daily', () => {
  it('TC-L01: April (30 days) — daily limit = sourceValue', () => {
    const limits = getGoalLimits('daily', 200_000, new Date('2026-04-15'));
    expect(limits.daily).toBe(200_000);
  });

  it('TC-L02: April (30 days) — monthly = daily × 30', () => {
    const limits = getGoalLimits('daily', 200_000, new Date('2026-04-15'));
    expect(limits.monthly).toBe(200_000 * 30); // 6_000_000
  });

  it('TC-L03: monthly limit changes for 31-day month (March)', () => {
    const april = getGoalLimits('daily', 200_000, new Date('2026-04-15'));
    const march = getGoalLimits('daily', 200_000, new Date('2026-03-15'));
    expect(march.monthly).toBe(200_000 * 31); // 6_200_000
    expect(march.monthly).toBeGreaterThan(april.monthly);
  });

  it('TC-L04: yearly = daily × 365', () => {
    const limits = getGoalLimits('daily', 200_000, new Date('2026-04-15'));
    expect(limits.yearly).toBe(200_000 * 365); // 73_000_000
  });
});

// ── getGoalLimits — sourceField: monthly ─────────────────────────────────────

describe('getGoalLimits — sourceField: monthly', () => {
  it('TC-L05: monthly limit = sourceValue', () => {
    const limits = getGoalLimits('monthly', 6_000_000, new Date('2026-04-15'));
    expect(limits.monthly).toBe(6_000_000);
  });

  it('TC-L06: daily = monthly / daysInMonth (April = 30)', () => {
    const limits = getGoalLimits('monthly', 6_000_000, new Date('2026-04-15'));
    expect(limits.daily).toBe(Math.round(6_000_000 / 30)); // 200_000
  });

  it('TC-L07: yearly = monthly × 12', () => {
    const limits = getGoalLimits('monthly', 6_000_000, new Date('2026-04-15'));
    expect(limits.yearly).toBe(6_000_000 * 12); // 72_000_000
  });

  it('TC-L08: daily changes for February (28 days) vs April (30 days)', () => {
    const feb   = getGoalLimits('monthly', 6_000_000, new Date('2025-02-15'));
    const april = getGoalLimits('monthly', 6_000_000, new Date('2026-04-15'));
    expect(feb.daily).toBeGreaterThan(april.daily); // fewer days → higher daily limit
  });
});

// ── getGoalLimits — sourceField: yearly ──────────────────────────────────────

describe('getGoalLimits — sourceField: yearly', () => {
  it('TC-L09: yearly limit = sourceValue', () => {
    const limits = getGoalLimits('yearly', 72_000_000, new Date('2026-04-15'));
    expect(limits.yearly).toBe(72_000_000);
  });

  it('TC-L10: monthly = yearly / 12', () => {
    const limits = getGoalLimits('yearly', 72_000_000, new Date('2026-04-15'));
    expect(limits.monthly).toBe(Math.round(72_000_000 / 12)); // 6_000_000
  });

  it('TC-L11: daily = yearly / 365', () => {
    const limits = getGoalLimits('yearly', 72_000_000, new Date('2026-04-15'));
    expect(limits.daily).toBe(Math.round(72_000_000 / 365)); // ~197_260
  });
});

// ── getGoalLimits — edge cases ────────────────────────────────────────────────

describe('getGoalLimits — edge cases', () => {
  it('TC-L12: sourceValue = 0 → all limits are 0', () => {
    const limits = getGoalLimits('daily', 0);
    expect(limits.daily).toBe(0);
    expect(limits.monthly).toBe(0);
    expect(limits.yearly).toBe(0);
  });

  it('TC-L13: NaN sourceValue → all limits are 0', () => {
    const limits = getGoalLimits('monthly', NaN);
    expect(limits.daily).toBe(0);
    expect(limits.monthly).toBe(0);
    expect(limits.yearly).toBe(0);
  });
});

// ── spentPercent ──────────────────────────────────────────────────────────────

describe('spentPercent', () => {
  it('TC-P01: spent = 0 → 0%', () => {
    expect(spentPercent(0, 5_000_000)).toBe(0);
  });

  it('TC-P02: spent = half the limit → 50%', () => {
    expect(spentPercent(2_500_000, 5_000_000)).toBe(50);
  });

  it('TC-P03: spent = exact limit → 100%', () => {
    expect(spentPercent(5_000_000, 5_000_000)).toBe(100);
  });

  it('TC-P04: spent > limit → >100% (component clamps to 100, function does not)', () => {
    expect(spentPercent(6_000_000, 5_000_000)).toBe(120);
  });

  it('TC-P05: limit = 0 → 0% (no division by zero)', () => {
    expect(spentPercent(999_999, 0)).toBe(0);
  });
});

// ── goalStatus ────────────────────────────────────────────────────────────────

describe('goalStatus', () => {
  it('TC-S01: 0% → safe (Hôm nay: chưa chi tiêu)', () => {
    expect(goalStatus(0)).toBe('safe');
  });

  it('TC-S02: 79% → safe (dưới ngưỡng cảnh báo)', () => {
    expect(goalStatus(79)).toBe('safe');
  });

  it('TC-S03: 80% → warning (đúng ngưỡng cảnh báo)', () => {
    expect(goalStatus(80)).toBe('warning');
  });

  it('TC-S04: 99% → warning (sắp đạt giới hạn)', () => {
    expect(goalStatus(99)).toBe('warning');
  });

  it('TC-S05: 100% → exceeded (đúng giới hạn)', () => {
    expect(goalStatus(100)).toBe('exceeded');
  });

  it('TC-S06: 150% → exceeded (vượt mức)', () => {
    expect(goalStatus(150)).toBe('exceeded');
  });
});

// ── end-to-end scenario: goal + statistics ────────────────────────────────────
// Simulates what GoalTracker computes when given real API statistics

describe('Goal tracker end-to-end scenarios', () => {
  const APRIL = new Date('2026-04-15');

  it('TC-E01: daily goal 200k — spent 150k today → safe (75%)', () => {
    const limits = getGoalLimits('daily', 200_000, APRIL);
    const pct    = spentPercent(150_000, limits.daily);
    expect(pct).toBe(75);
    expect(goalStatus(pct)).toBe('safe');
  });

  it('TC-E02: monthly goal 5M — spent 4.1M → warning (82%)', () => {
    const limits = getGoalLimits('monthly', 5_000_000, APRIL);
    const pct    = spentPercent(4_100_000, limits.monthly);
    expect(pct).toBe(82);
    expect(goalStatus(pct)).toBe('warning');
  });

  it('TC-E03: monthly goal 5M — spent 6M → exceeded (120%), bar clamped to 100', () => {
    const limits = getGoalLimits('monthly', 5_000_000, APRIL);
    const rawPct = spentPercent(6_000_000, limits.monthly);
    const barPct = Math.min(rawPct, 100); // component clamps
    expect(rawPct).toBe(120);
    expect(barPct).toBe(100);
    expect(goalStatus(rawPct)).toBe('exceeded');
  });

  it('TC-E04: yearly goal 60M — spent 15M → safe (25%)', () => {
    const limits = getGoalLimits('yearly', 60_000_000, APRIL);
    const pct    = spentPercent(15_000_000, limits.yearly);
    expect(pct).toBe(25);
    expect(goalStatus(pct)).toBe('safe');
  });

  it('TC-E05: daily goal 200k — monthly stats 6M → monthTotal vs limits.monthly', () => {
    // When sourceField=daily, monthly limit = daily × daysInMonth(April=30)
    const limits = getGoalLimits('daily', 200_000, APRIL);
    expect(limits.monthly).toBe(6_000_000);
    const pct = spentPercent(6_000_000, limits.monthly);
    expect(pct).toBe(100);
    expect(goalStatus(pct)).toBe('exceeded');
  });
});
