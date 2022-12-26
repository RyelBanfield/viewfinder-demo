import { signInWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase";

const Login: NextPage = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  if (user) router.push("/");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );
  };

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <h1 className="mb-2 text-3xl font-bold">Viewfinder</h1>
      <h2 className="mb-6 text-sm">Welcome back.</h2>
      <div className="flex w-64 flex-col">
        <input
          type="email"
          className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
          placeholder="Email"
          autoComplete="on"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
          placeholder="Password"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mb-2 rounded-md border-2 border-neutral-200 bg-black p-2 text-white"
          type="button"
          onClick={handleSignIn}
        >
          Log In
        </button>
      </div>
      <div className="mt-3 flex w-64 justify-between border-t-2 pt-3">
        <p className="text-sm text-neutral-700">Don&apos;t have an account?</p>
        <Link href="/join">
          <p className="cursor-pointer text-sm font-bold text-neutral-700 hover:underline">
            Join VF
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
