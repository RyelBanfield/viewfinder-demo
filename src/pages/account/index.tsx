import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  setDoc,
} from 'firebase/firestore/lite';
import { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';

const Account: NextPage = () => {
  const [userRef, setUserRef] =
    useState<DocumentReference<DocumentData> | null>(null);
  const user = useContext(AuthContext);

  const [currentAccountType, setCurrentAccountType] = useState<string | null>(
    null,
  );

  const handleAccountTypeChange = async () => {
    if (userRef) {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const { accountType } = userSnap.data();
        const newAccountType = accountType === 'viewer' ? 'creator' : 'viewer';
        await setDoc(userRef, { accountType: newAccountType }, { merge: true });
        setCurrentAccountType(newAccountType);
      }
    }
  };

  useEffect(() => {
    const setUserAccountType = async () => {
      if (userRef) {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const { accountType } = userSnap.data();
          setCurrentAccountType(accountType);
        }
      }
    };
    setUserAccountType();
  }, []);

  useEffect(() => {
    if (user !== 'loading') setUserRef(doc(db, 'users', user!.uid));
  }, [user]);

  return (
    <main className="flex flex-grow flex-col items-center justify-center p-3">
      <h1 className="mb-6 text-3xl font-bold">Account settings</h1>
      <div className="flex w-64 flex-col">
        {currentAccountType && (
          <button
            className="mb-2 rounded-md border-2 border-neutral-200 p-2 hover:bg-neutral-200 focus:border-neutral-500 focus:outline-none"
            type="button"
            onClick={handleAccountTypeChange}
          >
            {currentAccountType === 'viewer'
              ? 'Switch to Creator'
              : 'Switch to Viewer'}
          </button>
        )}
      </div>
    </main>
  );
};

export default Account;
