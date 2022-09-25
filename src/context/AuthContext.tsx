import { User } from 'firebase/auth';
import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loading from '../components/Loading';
import { auth } from '../firebase';

export const AuthContext = createContext<User | null | undefined>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
