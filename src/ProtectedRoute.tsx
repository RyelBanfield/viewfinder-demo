import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useContext(AuthContext);

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
