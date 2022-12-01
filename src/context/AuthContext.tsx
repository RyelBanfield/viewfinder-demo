import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { createContext, useEffect, useState } from 'react';

import Loading from '../components/Loading';
import { auth, db } from '../firebase';

type User = {
  uid: string;
  username: string;
  firstName: string;
  lastName: string;
  accountType: string;
};

export const AuthContext = createContext<User | 'loading' | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | 'loading' | null>('loading');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFromAuth) => {
      if (userFromAuth) {
        const getUserFromDB = async () => {
          const userRef = doc(db, 'users', userFromAuth.uid);
          const userSnap = await getDoc(userRef);
          const userDoc = userSnap.data();

          return userDoc as User;
        };

        getUserFromDB().then((userDoc) => setUser(userDoc));
      } else setUser(null);

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
