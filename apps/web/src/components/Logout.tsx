import { useAuth } from 'react-oidc-context';
import { Button } from './Button';

export const Logout = () => {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return null;
  }

  const logout = async () => {
    await auth.signoutRedirect({ post_logout_redirect_uri: `${location.origin}/login` });
  };

  return (
    <Button variant='secondary' onClick={logout} type='button'>
      Logout
    </Button>
  );
};
