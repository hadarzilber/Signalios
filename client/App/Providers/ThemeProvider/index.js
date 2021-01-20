import React, { useContext, createContext } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import initialState from './initial.theme';

const ThemeContext = createContext(initialState);

export default props => {
  const theme = createMuiTheme(initialState);

  const { children } = props;

  return (
    <ThemeContext.Provider
      value={{
        theme
      }}
      {...props}
    >
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
