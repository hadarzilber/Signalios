import React from 'react';
import AuthProvider from './AuthProvider';
import ThemeProvider from './ThemeProvider';
import AlertProvider from './AlertProvider';
import LoadingProvider from './LoadingProvider';

export default ({ children }) => (
  <ThemeProvider>
    <LoadingProvider>
      <AuthProvider>
        <AlertProvider>{children}</AlertProvider>
      </AuthProvider>
    </LoadingProvider>
  </ThemeProvider>
);
