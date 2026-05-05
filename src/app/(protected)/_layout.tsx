import { Redirect, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { tokenService } from '@/services/token.service';
import { authEvents } from '@/services/axios';

export default function ProtectedLayout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    tokenService.getAccessToken().then((token) => {
      setIsAuthenticated(!!token);
    });
  }, []);

  // Redirect to login whenever token refresh fails (session expired)
  useEffect(() => {
    return authEvents.onSessionExpired(() => {
      router.replace('/(auth)/login');
    });
  }, []);

  if (isAuthenticated === null) return null;

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="index" options={{ gestureEnabled: false }} />
      <Stack.Screen name="calendar" options={{ gestureEnabled: false }} />
      <Stack.Screen name="report" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
