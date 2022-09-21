import { signOut } from 'firebase/auth';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../firebase';

const Home: NextPage = () => {
  const user = useContext(AuthContext);

  const handleSignOut = () => signOut(auth);

  return (
    user && (
      <div className="flex-1 items-center justify-center p-3">
        <h1>Welcome to Viewfinder</h1>
        <h2>{user.displayName}</h2>
        <Image src={user.photoURL} width={200} height={200} />
        <Link href="/account">Account</Link>
        <button type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    )
  );
};

export default Home;
