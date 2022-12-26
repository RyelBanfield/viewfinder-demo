import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { auth, db } from "../../firebase";

const Join: NextPage = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  if (user) router.replace("/");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userRef = doc(db, "users", userCredential.user.uid);

        await setDoc(userRef, {
          uid: userCredential.user.uid,
          username,
          firstName,
          lastName,
          email,
          accountType: "viewer",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <h1 className="mb-6 text-3xl font-bold">Join Viewfinder</h1>
      <div className="flex w-96 flex-col">
        <div className="flex justify-between">
          <input
            type="text"
            className="mb-2 w-[48%] rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className="mb-2 w-[48%] rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          type="email"
          className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mb-2 rounded-md border-2 border-neutral-200 bg-black p-2 text-white"
          type="button"
          title="Join"
          onClick={handleSignUp}
        >
          Join
        </button>
      </div>
      <div className="mt-3 flex w-96 justify-between border-t-2 pt-3">
        <p className="text-sm text-neutral-700">Already have an account?</p>
        <Link href="/login">
          <p className="cursor-pointer text-sm font-bold text-neutral-700 hover:underline">
            Login
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Join;
