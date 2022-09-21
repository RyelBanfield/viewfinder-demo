import { updateProfile } from 'firebase/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { auth } from '../../firebase';

const Account: NextPage = () => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');

  const handleUpdateAccount = () => {
    const { currentUser } = auth;

    if (currentUser) {
      updateProfile(currentUser, {
        displayName,
        photoURL: `https://avatars.dicebear.com/api/bottts/${displayName}.svg`,
      })
        .then(() => router.push('/home'))
        .catch((error) => alert(error));
    }
  };
  return (
    <div className="flex-1 items-center justify-center p-3">
      <h1>Account Details</h1>
      <h2>Display Name</h2>
      <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <button type="button" onClick={handleUpdateAccount}>
        Update
      </button>
    </div>
  );
};

export default Account;
