import { deleteUser, updateProfile } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { auth, db } from '../../firebase';

const Account: NextPage = () => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');

  const handleUpdateAccount = () => {
    const { currentUser } = auth;
    if (currentUser) {
      updateProfile(currentUser, { displayName })
        .then(() => router.push('/home'))
        .catch((error) => alert(error));
    }
  };

  const handleDeleteAccount = () => {
    const { currentUser } = auth;
    if (currentUser) {
      deleteUser(currentUser)
        .then(() => {
          const deleteUserData = async () => {
            const usersCollection = collection(db, 'users');

            const userQuery = query(
              usersCollection,
              where('uid', '==', currentUser.uid),
            );

            const userDoc = await getDocs(userQuery);
            const userDocID = userDoc.docs[0].id;

            await deleteDoc(doc(usersCollection, userDocID));
          };

          deleteUserData();
        })
        .catch((error) => alert(error));
    }
  };

  return (
    <div className="flex-1 items-center justify-center p-3">
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
        <button
          className="mb-2 rounded-md border-2 border-neutral-200 p-2 hover:bg-red-600 focus:border-neutral-500 focus:outline-none"
          type="button"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Account;
