import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { tokenService } from '@/services/token.service';
import { goalService } from '@/services/goal.service';

type AppState = 'loading' | 'welcome' | 'goal-setup' | 'main';

export default function Index() {
  const [state, setState] = useState<AppState>('loading');

  useEffect(() => {
    async function bootstrap() {
      try {
        const token = await tokenService.getAccessToken();
        if (!token) {
          setState('welcome');
          return;
        }
        const goal = await goalService.getGoal();
        setState(goal ? 'main' : 'goal-setup');
      } catch {
        setState('welcome');
      }
    }
    bootstrap();
  }, []);

  if (state === 'loading')    return null;
  if (state === 'welcome')    return <Redirect href="/(onboarding)/welcome" />;
  if (state === 'goal-setup') return <Redirect href="/(onboarding)/goal-setup" />;
  return <Redirect href="/(protected)" />;
}
