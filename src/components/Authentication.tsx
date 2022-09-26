import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';

import { auth } from '../firebase';

const Authentication = () => {
  const [isUser, setIsUser] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const additionalUserInfo = getAdditionalUserInfo(userCredential);
        console.log(additionalUserInfo?.isNewUser);
      })
      .catch((error) => alert(error.message));
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then()
      .catch((error) => alert(error.message));
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-neutral-100 text-neutral-900 antialiased">
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
          <div className="flex w-96 flex-col">
            <div className="flex justify-between">
              <input
                className="mb-2 w-[48%] rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="mb-2 w-[48%] rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          </div>
          <div className="mt-3 flex w-96 justify-between border-t-2 pt-3">
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
