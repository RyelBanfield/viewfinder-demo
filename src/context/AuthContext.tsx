import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';

import Loading from '../components/Loading';
import { auth } from '../firebase';

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) setUser(userData);
      else setUser(null);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
