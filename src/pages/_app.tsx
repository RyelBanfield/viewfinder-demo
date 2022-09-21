/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';

import type { AppProps } from 'next/app';

import { AuthProvider } from '../context/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
