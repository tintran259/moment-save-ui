import { SemanticColors } from '@/constants/colors';

export type GoalField = 'daily' | 'monthly' | 'yearly';

export interface GoalValues {
  daily: number;
  monthly: number;
  yearly: number;
}

const MONTHS_PER_YEAR    = 12;
const DAYS_PER_YEAR      = 365;
const DAYS_PER_MONTH_STD = 30; // Standard for preview display only

export function getDaysInMonth(date = new Date()): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Preview only — used in GoalSetupScreen to show estimated conversions.
 * Uses 30-day standard so display is consistent across all months.
 */
export function calculateGoal(field: GoalField, value: number): GoalValues {
  const daysInMonth = DAYS_PER_MONTH_STD;

  if (field === 'daily') {
    return {
      daily:   value,
      monthly: Math.round(value * daysInMonth),
      yearly:  Math.round(value * DAYS_PER_YEAR),
    };
  }
  if (field === 'monthly') {
    return {
      daily:   Math.round(value / daysInMonth),
      monthly: value,
      yearly:  Math.round(value * MONTHS_PER_YEAR),
    };
  }
  return {
    daily:   Math.round(value / DAYS_PER_YEAR),
    monthly: Math.round(value / MONTHS_PER_YEAR),
    yearly:  value,
  };
}

/**
 * Compute goal limits dynamically for a given date.
 * Always derives from the original sourceField + sourceValue so limits
 * stay correct across months (e.g. Feb has 28/29 days, not 30).
 */
export function getGoalLimits(
  sourceField: GoalField,
  sourceValue: number,
  date = new Date(),
): GoalValues {
  if (!sourceValue || isNaN(sourceValue) || sourceValue <= 0) {
    return { daily: 0, monthly: 0, yearly: 0 };
  }
  const daysInMonth = getDaysInMonth(date);

  switch (sourceField) {
    case 'daily':
      return {
        daily:   sourceValue,
        monthly: Math.round(sourceValue * daysInMonth),
        yearly:  Math.round(sourceValue * DAYS_PER_YEAR),
      };
    case 'monthly':
      return {
        daily:   Math.round(sourceValue / daysInMonth),
        monthly: sourceValue,
        yearly:  Math.round(sourceValue * MONTHS_PER_YEAR),
      };
    case 'yearly':
      return {
        daily:   Math.round(sourceValue / DAYS_PER_YEAR),
        monthly: Math.round(sourceValue / MONTHS_PER_YEAR),
        yearly:  sourceValue,
      };
  }
}

/** Returns 0–∞ percentage of spending vs goal limit. */
export function spentPercent(spent: number, limit: number): number {
  if (limit <= 0) return 0;
  return (spent / limit) * 100;
}

/** Safe/Warning/Exceeded thresholds */
export function goalStatus(percent: number): 'safe' | 'warning' | 'exceeded' {
  if (percent >= 100) return 'exceeded';
  if (percent >= 80)  return 'warning';
  return 'safe';
}

export const STATUS_COLORS = {
  safe:     SemanticColors.success,
  warning:  SemanticColors.warning,
  exceeded: SemanticColors.danger,
} as const;
