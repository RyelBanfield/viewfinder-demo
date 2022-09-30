import { deleteUser, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { auth, db } from '../../firebase';

const Account: NextPage = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [currentAccountType, setCurrentAccountType] = useState<string | null>(
    null,
  );

  const userRef = doc(db, 'users', user!.uid);

  const handleUpdateAccount = () => {
    updateProfile(user!, { displayName })
      .then()
      .catch((error) => alert(error));
  };

  const handleAccountTypeChange = async () => {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const { accountType } = userSnap.data();
      const newAccountType = accountType === 'viewer' ? 'creator' : 'viewer';
      await setDoc(userRef, { accountType: newAccountType }, { merge: true });
      setCurrentAccountType(newAccountType);
    }
  };

  const handleDeleteAccount = () => {
    const { currentUser } = auth;
    if (currentUser) {
      deleteUser(currentUser)
        .then(() => router.replace('/'))
        .catch((error) => alert(error));
    }
  };

  useEffect(() => {
    const setUserAccountType = async () => {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const { accountType } = userSnap.data();
        setCurrentAccountType(accountType);
      }
    };
    setUserAccountType();
  }, []);

  return (
    <main className="flex flex-grow flex-col items-center justify-center p-3">
      <h1 className="mb-6 text-3xl font-bold">Account Details</h1>
      <div className="flex w-64 flex-col">
        <h2>Display Name</h2>
        <input
          className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <button
          className="mb-2 rounded-md border-2 border-neutral-200 p-2 hover:bg-neutral-200 focus:border-neutral-500 focus:outline-none"
          type="button"
          onClick={handleUpdateAccount}
        >
          Update
        </button>
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
        <button
          className="mb-2 rounded-md bg-red-600 p-2 hover:bg-red-700 focus:border-neutral-500 focus:outline-none"
          type="button"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </main>
  );
};

export default Account;
