import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../ProtectedRoute';

const noAuthRequired = ['/', '/login', '/join'];

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <AuthProvider>
      <Head>
        <title>Viewfinder</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="mx-auto w-11/12">
        <Navbar />
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </div>
    </AuthProvider>
  );
};

export default App;
