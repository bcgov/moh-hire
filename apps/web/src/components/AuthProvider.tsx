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
import { toast } from 'react-toastify';
import { User } from '@ehpr/common';
import { getLoggedUser } from '@services';
import { Spinner } from './Spinner';
import { getErrorMessage } from '../util';

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

const PROTECTED_ROUTES = ['/admin'];

export const AuthProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const router = useRouter();
  const { isAuthenticated, isLoading, user: kcUser, signinSilent, signoutSilent } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);
  const contextValue = useMemo(
    () => ({
      user,
    }),
    [user],
  );

  useEffect(() => {
    const requiresAdminAccess = PROTECTED_ROUTES.includes(router.pathname.split('?')[0]);
    if (!requiresAdminAccess) {
      setInitialized(true);
      return;
    }

    if (!isAuthenticated) {
      signinSilent().catch(() => {
        router.replace('/login');
        setInitialized(true);
      });
    }
    if (!user && kcUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${kcUser.access_token}`;
      getLoggedUser().then(user => {
        setUser(user);
        setInitialized(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, kcUser]);

  useEffect(() => {
    axios.interceptors.response.use(
      res => res,
      e => {
        const message = getErrorMessage(e);
        if (message?.includes('Authentication token')) {
          signoutSilent();
          location.replace(`${location.origin}/login`);
        } else {
          toast.error(message);
        }
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !initialized) {
    return <Spinner size='2x' />;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
