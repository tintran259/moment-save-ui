import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { tokenService } from '@/services/token.service';

export default function ProtectedLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    tokenService.getAccessToken().then((token) => {
      setIsAuthenticated(!!token);
    });
  }, []);

  if (isAuthenticated === null) return null;

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/enter-phone" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
