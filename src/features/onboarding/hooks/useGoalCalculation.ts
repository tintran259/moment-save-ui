import { useMemo, useState } from 'react';
import {
  calculateGoal,
  GoalField,
  GoalValues,
} from '@/utils/calculateGoal';
import { formatDigits, formatCompact } from '@/utils/format';

interface GoalCalculationState {
  /** Which field the user is currently typing in */
  sourceField: GoalField | null;
  /** Raw digit string from the input */
  rawInput: string;
  /** Calculated values (null when input is empty/invalid) */
  calculated: GoalValues | null;
  /** Handlers */
  handleInput: (text: string, field: GoalField) => void;
  handleReset: () => void;
  isFieldDisabled: (field: GoalField) => boolean;
  /** Display value for a given field (raw digits for source, formatted for others) */
  getDisplayValue: (field: GoalField) => string;
  canSave: boolean;
}

export function useGoalCalculation(): GoalCalculationState {
  const [sourceField, setSourceField] = useState<GoalField | null>(null);
  const [rawInput, setRawInput]       = useState('');

  const calculated = useMemo<GoalValues | null>(() => {
    if (!sourceField || !rawInput) return null;
    const val = parseInt(rawInput, 10);
    if (isNaN(val) || val <= 0) return null;
    return calculateGoal(sourceField, val);
  }, [sourceField, rawInput]);

  const handleInput = (text: string, field: GoalField) => {
    const digits = text.replace(/\D/g, '');
    setSourceField(field);
    setRawInput(digits);
  };

  const handleReset = () => {
    setSourceField(null);
    setRawInput('');
  };

  const isFieldDisabled = (field: GoalField) =>
    sourceField !== null && field !== sourceField;

  const getDisplayValue = (field: GoalField): string => {
    if (field === sourceField) return formatDigits(rawInput);
    if (calculated) return formatCompact(calculated[field]);
    return '';
  };

  return {
    sourceField,
    rawInput,
    calculated,
    handleInput,
    handleReset,
    isFieldDisabled,
    getDisplayValue,
    canSave: calculated !== null,
  };
}
