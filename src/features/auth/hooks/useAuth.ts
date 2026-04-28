import { useEffect, useState } from 'react';
import { tokenService } from '@/services/token.service';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    tokenService.getAccessToken().then((token) => {
      setIsAuthenticated(!!token);
    });
  }, []);

  const logout = async () => {
    await tokenService.clearTokens();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
};
