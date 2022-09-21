import { updateProfile } from 'firebase/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import NavBar from '../../components/Navbar';
import { auth } from '../../firebase';

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

  return (
    <>
      <NavBar />
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
        </div>
      </div>
    </>
  );
};

export default Account;
