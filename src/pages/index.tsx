import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';

const Authentication: NextPage = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  const [isUser, setIsUser] = useState(true);
  const [routing, setRouting] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    setRouting(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => router.replace('/account'))
      .catch((error) => alert(error.message));
  };

  const handleSignIn = () => {
    setRouting(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => router.replace('/home'))
      .catch((error) => alert(error.message));
  };

  const handleGoogleSignIn = () => {
    setRouting(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => router.replace('/home'))
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    if (user && !routing) router.replace('/home');
  }, [user]);

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-100 text-neutral-900 antialiased">
      <h1 className="mb-6 text-3xl font-bold">Viewfinder</h1>
      {isUser ? (
        <>
          <div className="flex w-64 flex-col">
            <input
              className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
              placeholder="Password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="mb-2 rounded-md border-2 border-neutral-200 p-2 hover:bg-neutral-200 focus:border-neutral-500 focus:outline-none"
              type="button"
              onClick={handleSignIn}
            >
              Log In
            </button>
            <button
              className="mb-2 rounded-md border-2 border-neutral-200 p-2 hover:bg-neutral-200 focus:border-neutral-500 focus:outline-none"
              type="button"
              onClick={() => handleGoogleSignIn()}
            >
              Sign in with Google
            </button>
          </div>
          <div className="mt-3 flex w-64 justify-between border-t-2 pt-3">
            <p className="text-sm text-neutral-700">
              Don&apos;t have an account?
            </p>
            <button
              className="text-sm font-bold text-neutral-700 hover:underline"
              type="button"
              onClick={() => setIsUser(false)}
            >
              Sign up
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex w-64 flex-col">
            <input
              className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="mb-2 rounded-md border-2 border-neutral-200 p-2 hover:bg-neutral-200 focus:border-neutral-500 focus:outline-none"
              type="button"
              title="Create Account"
              onClick={handleSignUp}
            >
              Create Account
            </button>
            <button
              className="mb-2 rounded-md border-2 border-neutral-200 p-2 hover:bg-neutral-200 focus:border-neutral-500 focus:outline-none"
              type="button"
              onClick={() => handleGoogleSignIn()}
            >
              Sign in with Google
            </button>
          </div>
          <div className="mt-3 flex w-64 justify-between border-t-2 pt-3">
            <p className="text-sm text-neutral-700">Have an account?</p>
            <button
              className="text-sm font-bold text-neutral-700 hover:underline"
              type="button"
              onClick={() => setIsUser(true)}
            >
              Log in
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default Authentication;
