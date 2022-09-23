/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useContext } from 'react';

import Authentication from '../components/Authentication';
import NavBar from '../components/Navbar';
import { AuthContext, AuthProvider } from '../context/AuthContext';

const App = ({ Component, pageProps }: AppProps) => {
  const user = useContext(AuthContext);

  return !user ? (
    <>
      <Head>
        <title>Viewfinder</title>
      </Head>
      <Authentication />
    </>
  ) : (
    <>
      <Head>
        <title>Viewfinder</title>
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
};

const AuthContextApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    {/* @ts-ignore */}
    <App Component={Component} pageProps={pageProps} />
  </AuthProvider>
);

export default AuthContextApp;
