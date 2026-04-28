import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { GoalProvider } from '@/contexts/GoalContext';
import { toastConfig } from '@/components/ToastConfig';
import { NetworkBanner } from '@/components/NetworkBanner';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <ThemeProvider>
      <GoalProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }} />
          <NetworkBanner />
          <Toast config={toastConfig} topOffset={60} />
        </QueryClientProvider>
      </GoalProvider>
    </ThemeProvider>
  );
}
