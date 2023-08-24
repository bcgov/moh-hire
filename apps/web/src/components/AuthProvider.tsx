import axios from 'axios';
import { useRouter } from 'next/router';
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAuth } from 'react-oidc-context';
import { User } from '@ehpr/common';
import { getUser } from '@services';
import { Spinner } from './Spinner';

interface AuthContextType {
  user?: User;
}

const AuthContext = createContext<AuthContextType>({ user: undefined });

const PROTECTED_ROUTES = ['/admin'];

export const AuthProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const router = useRouter();
  const { isAuthenticated, isLoading, user: kcUser, signinSilent } = useAuth();
  const [user, setUser] = useState<User>();
  const [authorized, setAuthorized] = useState(false);
  const contextValue = useMemo(
    () => ({
      user,
    }),
    [user],
  );

  useEffect(() => {
    const requiresAdminAccess = PROTECTED_ROUTES.includes(router.pathname.split('?')[0]);
    if (!requiresAdminAccess) {
      setAuthorized(true);
      return;
    }

    if (!isAuthenticated) {
      signinSilent().catch(() => {
        router.replace('/login');
      });
    }
    if (!user && kcUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${kcUser.access_token}`;
      getUser(kcUser.profile.sub).then(user => {
        setUser(user);
        setAuthorized(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isLoading || !authorized) {
    return <Spinner size='2x' />;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be use within a AuthProvider');
  }
  return context;
};
