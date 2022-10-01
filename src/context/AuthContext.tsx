import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite';
import { createContext, useEffect, useState } from 'react';

import Loading from '../components/Loading';
import { auth, db } from '../firebase';

export const AuthContext = createContext<DocumentData | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFromAuth) => {
      if (userFromAuth) {
        const getUserFromDB = async () => {
          const usersRef = collection(db, 'users');
          const userQuery = query(
            usersRef,
            where('uid', '==', userFromAuth.uid),
          );
          const userSnapshot = await getDocs(userQuery);
          const userDoc = userSnapshot.docs[0].data();
          return userDoc;
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
