import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

import { auth } from '../firebase';

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) setUser(userData);
      else {
        setUser(null);
        router.replace('/');
      }
    });
    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
