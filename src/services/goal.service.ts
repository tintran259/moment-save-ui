import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { UserGoal } from '@/types/user.types';

export const goalService = {
  async getGoal(): Promise<UserGoal | null> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.USER_GOAL);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Record<string, unknown>;

      // Migrate old format: { daily, monthly, yearly, sourceField } → { sourceField, sourceValue }
      if (!('sourceValue' in parsed) && 'sourceField' in parsed) {
        const sourceField = parsed.sourceField as UserGoal['sourceField'];
        const sourceValue = parsed[sourceField] as number;
        const migrated: UserGoal = { sourceField, sourceValue };
        await AsyncStorage.setItem(STORAGE_KEYS.USER_GOAL, JSON.stringify(migrated));
        return migrated;
      }

      return parsed as unknown as UserGoal;
    } catch {
      return null;
    }
  },

  async saveGoal(goal: UserGoal): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_GOAL, JSON.stringify(goal));
  },

  async clearGoal(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_GOAL);
  },
};
