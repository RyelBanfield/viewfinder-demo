import "../styles/globals.css";

import { motion } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../ProtectedRoute";

const noAuthRequired = ["/", "/login", "/join"];

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <AuthProvider>
      <Head>
        <title>Viewfinder</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="mx-auto flex w-11/12 max-w-7xl flex-grow flex-col">
        <Navbar />
        <motion.main
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
          }}
          className="flex flex-grow flex-col"
        >
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </motion.main>
      </div>
    </AuthProvider>
  );
};

export default App;
