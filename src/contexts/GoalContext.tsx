import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { goalService } from '@/services/goal.service';
import { UserGoal } from '@/types/user.types';

interface GoalContextValue {
  goal:      UserGoal | null;
  isLoading: boolean;
  hasGoal:   boolean;
  saveGoal:  (goal: UserGoal) => Promise<void>;
  clearGoal: () => Promise<void>;
}

const GoalContext = createContext<GoalContextValue>({
  goal:      null,
  isLoading: true,
  hasGoal:   false,
  saveGoal:  async () => {},
  clearGoal: async () => {},
});

export const GoalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goal,      setGoal]      = useState<UserGoal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    goalService.getGoal()
      .then((g) => {
        setGoal(g);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const saveGoal = useCallback(async (g: UserGoal) => {
    await goalService.saveGoal(g);
    setGoal(g);
  }, []);

  const clearGoal = useCallback(async () => {
    await goalService.clearGoal();
    setGoal(null);
  }, []);

  const value = React.useMemo(
    () => ({ goal, isLoading, hasGoal: !!goal, saveGoal, clearGoal }),
    [goal, isLoading, saveGoal, clearGoal],
  );

  return (
    <GoalContext.Provider value={value}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoal = () => useContext(GoalContext);
